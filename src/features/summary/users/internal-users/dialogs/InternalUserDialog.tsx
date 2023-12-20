import TabBar from "@Components/TabBar";
import { DialogCustomTitle } from "@Components/dialogs";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { AppDispatch } from "@Store/index";
import { setInternalUser } from "@Store/internal_user_store";
import { Box, DialogContent } from "@mui/material";
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
import {
  useInternal,
  useInternalCreate,
  useInternalUpdate,
} from "../helper/internal_user_helper";
import InternalUserInfo from "./InternalUserInfo";
import TranslateHelper from "@Local/index";
import AnyUpdateBox from "@Components/AnyUpdateBox";
import InternalUserActions from "./InternalUserActions";

function InternalUserDialog() {
  /// Internal user store
  const { internalUser } = useInternal();
  const isEdit = Boolean(internalUser);

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

  /// Tabbar state
  const [tabIndex, setTabIndex] = useState<number>(0);

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

  useEffect(() => {
    if (internalUser?.role_id === formik.values.role_id) {
      formik.setFieldValue(
        "permission_sub_resources",
        internalUser?.permission_sub_resources
      );
      formik.setFieldValue("regions", internalUser?.regions);
      return;
    }
    formik.setFieldValue("permission_sub_resources", null);
    formik.setFieldValue("regions", null);
  }, [formik.values.role_id]);

  return (
    <>
      <DialogCustomTitle title={title} />
      <AnyUpdateBox anyUpdate={anyUpdate} />
      <DialogContent>
        <InternalUserInfo />
        <Box mt={1} sx={{ backgroundColor: "transparent" }}>
          <TabBar
            index={tabIndex}
            onChanged={setTabIndex}
            tabs={[
              {
                title: TranslateHelper.overView(),
                panel: (
                  <OverViewContent
                    onRolePermission={() => {
                      setTabIndex(1);
                    }}
                    formik={formik}
                  />
                ),
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
      <InternalUserActions onChanged={onChangedAction} />
    </>
  );
}

export default InternalUserDialog;
