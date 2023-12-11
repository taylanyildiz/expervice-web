import PrimaryButton from "@Components/PrimaryButton";
import TabBar from "@Components/TabBar";
import VisibilityComp from "@Components/VisibilityComp";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { AppDispatch } from "@Store/index";
import { setInternalUser } from "@Store/internal_user_store";
import { Avatar, Box, DialogContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import OverViewContent from "./InternalUserOverviewContent";
import InternalUserPermissionsContent from "./InternalUserPermissionsContent";
import ConstantRepository from "@Repo/constant_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { useFormik } from "formik";
import InternalUser, {
  defaultInternal,
} from "@Models/internal-user/internal_user";
import InternalUserSecurityContent from "./InternalUserSecurityContent";
import { internalUserValidator } from "../validator/internal_user_validator";
import InternalUserRepository from "@Repo/internal_user_repositoy";
import { caption, dateToFormat } from "@Utils/functions";
import {
  useInternal,
  useInternalCreate,
  useInternalUpdate,
} from "../helper/internal_user_helper";
import InternalUserInfo from "./InternalUserInfo";
import Colors from "@Themes/colors";
import TranslateHelper from "@Local/index";

function InternalUserDialog() {
  /// Internal user store
  const { internalUser } = useInternal();
  const isEdit = Boolean(internalUser);
  const creatorDisplayName = `${internalUser?.creator?.first_name} ${internalUser?.creator?.last_name}`;

  /// Dialog hook
  const { openLoading, closeDialog, openConfirm } = useDialog();

  /// Constant repository
  const conantRepo = new ConstantRepository();

  /// Internal user repository
  const internalRepo = new InternalUserRepository();

  /// Dispach
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Dialog title depends on [isEdit]
  const title = isEdit
    ? TranslateHelper.internalUserEdit()
    : TranslateHelper.internalUserCreate();

  /// Action type state
  const [actionType, setActionType] = useState<number | null>(null);

  /// Click action
  const onChangedAction = async (type: EActionType) => {
    if (type === EActionType.Delete) {
      const confirm = await openConfirm(
        TranslateHelper.deleteInternalUser(),
        TranslateHelper.sureDeleteInternalUser()
      );
      if (confirm) {
        const result = await openLoading(async () => {
          return await internalRepo.deleteInternalUser();
        });
        if (result) closeDialog();
      }
      return;
    }
    setActionType(type);
    formik.handleSubmit();
  };

  /// Get permission resources
  const getPermissions = async () => {
    openLoading(async () => {
      await Promise.all([conantRepo.getPermissionResources()]);
    });
  };

  /// Initialize component
  useEffect(() => {
    getPermissions();
  }, []);

  /// Initialize values
  useEffect(() => {
    if (!internalUser) return;
    for (let [k, v] of Object.entries(internalUser)) {
      formik.setFieldValue(k, v);
    }
  }, [internalUser]);

  /// Destroyed
  useEffect(() => {
    return () => {
      dispatch(setInternalUser(null));
      internalRepo.getInternalUsers();
    };
  }, []);

  /// Process internal user
  const process = async (): Promise<InternalUser | null> => {
    const result = await openLoading(async () => {
      let result: InternalUser | null = null;

      // Create internal user
      if (!isEdit) {
        result = await internalRepo.createInternalUser(internalProcess!);
      }

      // Update internal user
      else {
        if (info) {
          result = await internalRepo.updateInternalUser(info!);
          dispatch(setInternalUser(result));
        }
        if (permission) {
          result = await internalRepo.updateInternalPermissions(permission);
        }
        if (activate !== null) {
          result = await internalRepo.updateInternalStatus(activate);
        }
        if (status) {
          result = await internalRepo.sendInvite();
        }
      }
      return result;
    });
    return result ?? internalUser;
  };

  /// Submit handle
  const onSubmitHandle = async () => {
    let result = await process();
    if (!result) return;
    dispatch(setInternalUser(result));

    switch (actionType) {
      case EActionType.SaveClose:
        closeDialog();
        break;
      case EActionType.SaveNew:
        formik.resetForm();
        dispatch(setInternalUser(null));
        break;
    }
  };

  /// Formik
  const initialValues: InternalUser = defaultInternal;
  const formik = useFormik({
    initialValues,
    validationSchema: internalUserValidator,
    onSubmit: onSubmitHandle,
  });

  /// Create internal hook
  const internalProcess = useInternalCreate(formik);

  /// Update internal hook
  const { info, permission, activate, status, anyUpdate } = useInternalUpdate(
    internalUser,
    formik
  );

  return (
    <>
      <DialogCustomTitle title={title} />
      <VisibilityComp visibility={anyUpdate}>
        <Box pl={1} m={0} sx={{ backgroundColor: Colors.warning }}>
          <Typography
            fontSize={13}
            color="white"
            children="Please click save to save changes"
          />
        </Box>
      </VisibilityComp>
      <DialogContent>
        <InternalUserInfo />
        <Box mt={1} sx={{ backgroundColor: "transparent" }}>
          <TabBar
            tabs={[
              {
                title: TranslateHelper.overView(),
                panel: <OverViewContent formik={formik} />,
              },
              {
                title: TranslateHelper.permissions(),
                panel: <InternalUserPermissionsContent formik={formik} />,
              },
              {
                title: TranslateHelper.securityLogin(),
                panel: <InternalUserSecurityContent formik={formik} />,
              },
            ]}
          />
        </Box>
      </DialogContent>
      <DialogCustomActions
        actions={[
          <VisibilityComp
            visibility={isEdit}
            children={
              <PrimaryButton
                height={30}
                fontWeight="normal"
                color="black"
                children="Delete"
                variant="outlined"
                onClick={() => onChangedAction(EActionType.Delete)}
              />
            }
          />,
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="white"
            children="Save"
            onClick={() => onChangedAction(EActionType.Save)}
          />,
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="white"
            children="Save & New"
            onClick={() => onChangedAction(EActionType.SaveNew)}
          />,
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="white"
            children="Save & Close"
            onClick={() => onChangedAction(EActionType.SaveClose)}
          />,
        ]}
        leading={{
          visibility: isEdit,
          children: (
            <Grid container alignItems="center" columnSpacing={1}>
              <Grid item>
                <Typography
                  variant="body1"
                  fontSize={12}
                  color="grey"
                  children={`Created by ${creatorDisplayName}`}
                />
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    height: 30,
                    width: 30,
                    fontSize: 12,
                    color: "white",
                    backgroundColor: "grey",
                  }}
                  children={caption(creatorDisplayName)}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  fontSize={12}
                  color="grey"
                  children={dateToFormat(internalUser?.created_at)}
                />
              </Grid>
            </Grid>
          ),
        }}
      />
    </>
  );
}

export default InternalUserDialog;
