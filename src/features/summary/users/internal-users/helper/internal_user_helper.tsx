import { RootState, store } from "@Store/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormikProps } from "formik";
import InternalUser from "@Models/internal-user/internal_user";
import InternalUserProcess from "../entities/internal_user_process";
import InternalUserUpdate from "../entities/internal_user_update";
import InternalUserPermission from "../entities/internal_user_permission";
import { equalInterface } from "@Utils/functions";
import { EInternalStatus } from "../entities/internal_user_enums";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { setInternalUser } from "@Store/internal_user_store";
import InternalUserDialog from "../dialogs/InternalUserDialog";

/**
 * Internal store hook
 * @returns
 */
export function useInternal() {
  return useSelector((state: RootState) => state.internalUser);
}

/**
 * Internal user create hook
 */
export function useInternalCreate(formik: FormikProps<InternalUser>) {
  const [internal, setInternal] = useState<InternalUserProcess | null>(null);
  useEffect(() => {
    const value = formik.values;
    const internal: InternalUserProcess = {
      id: value.id,
      first_name: value.first_name!,
      last_name: value.last_name!,
      email: value.email,
      phone: value.phone,
      access_regions: value.regions?.map((e) => e.id!),
      permissions: value.permission_sub_resources?.map((e) => e.id!),
      is_active: value.is_active,
      role_id: value.role_id!,
      send_invite: value.status === EInternalStatus.Invited,
    };
    setInternal(internal);
  }, [formik.values]);

  return internal;
}

/**
 * Internal user update hook
 */
export function useInternalUpdate(
  user: InternalUser | null,
  formik: FormikProps<InternalUser>
) {
  const [info, setInfo] = useState<InternalUserUpdate | null>(null);
  const [permission, setPermission] = useState<InternalUserPermission | null>(
    null
  );
  const [activate, setActivate] = useState<boolean | null>(null);
  const [status, setStatus] = useState<EInternalStatus | null>(null);
  const [anyUpdate, setAnyUpdate] = useState<boolean>(false);

  useEffect(() => {
    const value = { ...formik.values };

    const oldInfo: InternalUserUpdate = {
      id: value.id!,
      first_name: value.first_name,
      last_name: value.last_name,
      email: value.email,
      phone: value.phone,
    };
    const newInfo: InternalUserUpdate = {
      id: user?.id!,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone: user?.phone,
    };

    const availalbeInfo = !equalInterface(oldInfo, newInfo);
    if (availalbeInfo) {
      setInfo(newInfo);
    }

    const oldPermission: InternalUserPermission = {
      role_id: value.role_id!,
      access_regions: value.regions?.map((e) => e.id!),
      permissions: value.permission_sub_resources?.map((e) => e.id!),
    };
    const newPermission = {
      role_id: user?.role_id!,
      access_regions: user?.regions?.map((e) => e.id!),
      permissions: user?.permission_sub_resources?.map((e) => e.id!),
    };

    const availalbePermission = !equalInterface(oldPermission, newPermission);
    if (availalbePermission) {
      setPermission(newPermission);
    }

    const availableActivate = value.is_active !== user?.is_active;
    if (availableActivate) {
      setActivate(value.is_active!);
    }

    const availableStatus = value.status !== user?.status;
    if (availableStatus) {
      const available = [EInternalStatus.Invited, EInternalStatus.ReSend];
      if (available.includes(value.status!)) {
        setStatus(value.status!);
      }
    }

    const available =
      availalbeInfo ||
      availalbePermission ||
      availableActivate ||
      availableStatus;

    setAnyUpdate(Boolean(user && available));
  }, [user, formik.values]);

  return { info, permission, activate, status, anyUpdate };
}

/**
 * Internal user dialog
 */
export function useInternalDialog() {
  const { openDialog } = useDialog();

  return (internal?: InternalUser) => {
    store.dispatch(setInternalUser(internal));
    openDialog(<InternalUserDialog />, "md");
  };
}
