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
import InternalUser from "@Models/internal-user/internal_user";
import {
  EInternalStatus,
  EInternalUserRole,
} from "../entities/internal_user_enums";
import InternalUserSecurityContent from "./InternalUserSecurityContent";
import { internalUserValidator } from "../validator/internal_user_validator";
import InternalUserProcess from "../entities/internal_user_process";
import InternalUserRepository from "@Repo/internal_user_repositoy";
import InternalUserUpdate from "../entities/internal_user_update";
import InternalUserPermission from "../entities/internal_user_permission";
import { caption, dateToFormat, equalInterface } from "@Utils/functions";
import { useInternal, useInternalOld } from "../helper/internal_user_helper";
import InternalUserInfo from "./InternalUserInfo";

function InternalUserDialog() {
  /// Internal user store
  const { internalUser } = useInternal();
  const isEdit = Boolean(internalUser);
  const creatorDisplayName = `${internalUser?.creator?.first_name} ${internalUser?.creator?.last_name}`;

  /// Internal olds hook
  const { oldInfo, oldInvite, oldStatus, oldPermissions } = useInternalOld();

  /// Dialog hook
  const { openLoading, closeDialog, openConfirm } = useDialog();

  /// Constant repository
  const conantRepo = new ConstantRepository();

  /// Internal user repository
  const internalRepo = new InternalUserRepository();

  /// Dispach
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Dialog title depends on [isEdit]
  const title = isEdit ? "Internal User Edit" : "Internal User Create";

  /// Action type state
  const [actionType, setActionType] = useState<number | null>(null);

  /// Click action
  const onChangedAction = async (type: EActionType) => {
    if (type === EActionType.Delete) {
      const confirm = await openConfirm(
        "Delete Internal User",
        "Are you sure to delete user?"
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
    };
  }, []);

  /// Process internal user
  const process = async (
    value: InternalUserProcess
  ): Promise<InternalUser | null> => {
    const result = await openLoading(async () => {
      let result: InternalUser | null = null;

      // Create internal user
      if (!isEdit) result = await internalRepo.createInternalUser(value);
      // Update internal user
      else {
        const updateInternal: InternalUserUpdate = {
          id: value.id!,
          first_name: value.first_name,
          last_name: value.last_name,
          email: value.email,
          phone: value.phone,
        };

        /// Update user
        const canUpdate = equalInterface(updateInternal, oldInfo);
        if (!canUpdate) {
          result = await internalRepo.updateInternalUser(updateInternal);
        }

        /// Update permission
        const permissions: InternalUserPermission = {
          id: value.id!,
          role_id: value.role_id!,
          access_regions: value.access_regions,
          permissions: value.permissions,
        };
        const canPermission = equalInterface(oldPermissions, permissions);
        if (!canPermission) {
          result = await internalRepo.updateInternalPermissions(permissions);
        }

        /// Update status
        const status = value.is_active;
        const caStatus = status !== oldStatus;
        if (caStatus) {
          result = await internalRepo.updateInternalStatus(status, value.id!);
        }
      }
      return result;
    });
    return result ?? internalUser;
  };

  /// Send invite
  const sendInvite = async (user: InternalUser): Promise<void> => {
    if (!user) return;
    await openLoading(async () => {
      const status = formik.values.status;
      const invited = [
        EInternalStatus.Invited,
        EInternalStatus.ReSend,
      ].includes(status!);
      const canSend = oldInvite !== status && invited;
      if (!canSend) return;
      await internalRepo.sendInvite(user.id!);
    });
  };

  /// Submit handle
  const onSubmitHandle = async (value: InternalUser) => {
    const values: InternalUserProcess = {
      id: value.id,
      first_name: value.first_name!,
      last_name: value.last_name!,
      email: value.email,
      phone: value.phone,
      access_regions: value.regions?.map((e) => e.id!),
      permissions: value.permission_sub_resources?.map((e) => e.id!),
      is_active: value.is_active,
      role_id: value.role_id!,
    };
    let result = await process(values);
    if (!result) return;
    dispatch(setInternalUser(result));
    await sendInvite(result);

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
  const initialValues: InternalUser = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    is_active: true,
    permission_sub_resources: null,
    regions: null,
    status: EInternalStatus.NotInvited,
    role_id: EInternalUserRole.OfficeManager,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: internalUserValidator,
    onSubmit: onSubmitHandle,
  });

  return (
    <>
      <DialogCustomTitle title={title} />
      <DialogContent>
        <InternalUserInfo />
        <Box mt={1} sx={{ backgroundColor: "transparent" }}>
          <TabBar
            tabs={["Overview", "Permissions", "Security & Login"]}
            panels={[
              <OverViewContent formik={formik} />,
              <InternalUserPermissionsContent formik={formik} />,
              <InternalUserSecurityContent formik={formik} />,
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
