import PrimaryButton from "@Components/PrimaryButton";
import TabBar from "@Components/TabBar";
import VisibilityComp from "@Components/VisibilityComp";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { AppDispatch, RootState } from "@Store/index";
import { setInternalUser } from "@Store/internal_user_store";
import { Box, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { equalInterface } from "@Utils/functions";

function InternalUserDialog() {
  /// Internal user store
  const { internalUser } = useSelector(
    (state: RootState) => state.internalUser
  );
  const isEdit = Boolean(internalUser);

  /// Old update internaluser-permission
  const [oldUser, setOldUser] = useState<InternalUserUpdate | null>(null);
  const [oldPermission, setOldPermission] =
    useState<InternalUserPermission | null>(null);
  const [oldStatus, setOldStatus] = useState<boolean | null>(null);
  const [oldInvite, setOldInvite] = useState<number>(
    EInternalStatus.NotInvited
  );

  /// Dialog hook
  const { openLoading, closeDialog } = useDialog();

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
  const onChangedAction = (type: EActionType) => {
    if (type === EActionType.Delete) {
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

  /// Set olds
  const setOld = () => {
    if (!internalUser) return;
    const updated: InternalUserUpdate = {
      id: internalUser.id!,
      email: internalUser.email,
      first_name: internalUser.first_name,
      last_name: internalUser.last_name,
      phone: internalUser.phone,
    };
    const permissions: InternalUserPermission = {
      id: internalUser.id!,
      role_id: internalUser.role_id!,
      access_regions: internalUser.regions?.map((e) => e.id!),
      permissions: internalUser.permission_sub_resources?.map((e) => e.id!),
    };
    setOldInvite(internalUser.status!);
    setOldStatus(internalUser.is_active);
    setOldPermission(permissions);
    setOldUser(updated);
  };

  /// Initialize component
  useEffect(() => {
    getPermissions();
  }, []);

  /// Initialize values
  useEffect(() => {
    if (!internalUser) return;
    setOld();
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
  const process = async (value: InternalUserProcess): Promise<boolean> => {
    const result = await openLoading(async () => {
      let result: InternalUser | null = null;

      // Create internal user
      if (!isEdit) result = await internalRepo.createInternalUser(value);
      /// Update internal user
      else {
        const updateInternal: InternalUserUpdate = {
          id: value.id!,
          first_name: value.first_name,
          last_name: value.last_name,
          email: value.email,
          phone: value.phone,
        };

        /// Update user
        const canUpdate = equalInterface(updateInternal, oldUser);
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
        const canPermission = equalInterface(oldPermission, permissions);
        if (!canPermission) {
          result = await internalRepo.updateInternalPermissions(permissions);
        }

        const status = value.is_active;
        if (status !== oldStatus) {
          result = await internalRepo.updateInternalStatus(status, value.id!);
        }

        return result;
      }
    });
    return result;
  };

  /// Send invite
  const sendInvite = async (
    status: EInternalStatus
  ): Promise<InternalUser | null> => {
    const canSend =
      (isEdit && oldInvite !== status) ||
      (!isEdit && status == EInternalStatus.Invited);
    if (!canSend) return null;
    return await internalRepo.sendInvite();
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
    result = await openLoading(async () => {
      return await sendInvite(value.status!);
    });
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
            visibility={false}
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
      />
    </>
  );
}

export default InternalUserDialog;
