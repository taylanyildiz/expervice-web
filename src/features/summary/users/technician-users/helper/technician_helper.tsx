import TechnicianUser from "@Models/technician-user/technician_user";
import { RootState, store } from "@Store/index";
import { setTechnician } from "@Store/technician_store";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { useSelector } from "react-redux";
import TechnicianDialog from "../dialogs/TechnicianDialog";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import TechnicianProcess from "../entities/technician_process";
import {
  ETechnicianFilterType,
  ETechnicianStatus,
} from "../entities/technician_enums";
import TechnicianUpdate from "../entities/technician_update";
import TechnicianGroup from "@Models/technician-user/technician_group";
import { equalInterface } from "@Utils/functions";
import TechnicianGroupUpdate from "../entities/technician_group_update";

/**
 * Technician store
 * @returns
 */
export function useTechnician() {
  const store = useSelector((state: RootState) => state.technician);
  const filter = store.filter;
  const [filterCount, setCount] = useState<number>(0);
  useEffect(() => {
    let count = 0;
    if (filter?.filter_type !== ETechnicianFilterType.FirstName) ++count;
    if (filter?.keyword && filter?.keyword?.length !== 0) ++count;
    if (filter?.region_ids && filter?.region_ids?.length !== 0) ++count;
    if (filter?.group_roles && filter?.group_roles?.length !== 0) ++count;
    if (filter?.groups && filter?.groups?.length !== 0) ++count;
    if (filter?.statuses && filter?.statuses?.length !== 0) ++count;
    setCount(count);
  }, [filter]);
  return { ...store, filterCount };
}

/**
 * Technician user dialog
 */
export function useTechnicianDialog() {
  const { openDialog } = useDialog();

  return (technician?: TechnicianUser) => {
    store.dispatch(setTechnician(technician));
    openDialog(<TechnicianDialog />, "md");
  };
}

/**
 * Technician create hook
 */
export function useTechnicianCreate(formik: FormikProps<TechnicianUser>) {
  const value = formik.values;
  const technician: TechnicianProcess = {
    first_name: value.first_name,
    last_name: value.last_name,
    email: value.email,
    phone: value.phone,
    group_id: value.group?.id,
    group_role_id: value.group_role?.id,
    is_active: value.is_active,
    send_invite: value.status === ETechnicianStatus.Invited,
    signing_authority: value.signing_authority,
  };
  return technician;
}

/**
 * Technician update hook
 */
export function useTechnicianUpdate(
  formik: FormikProps<TechnicianUser>,
  user: TechnicianUser | null
) {
  const value = formik.values;
  const [info, setInfo] = useState<TechnicianUpdate | null>(null);
  const [group, setGroup] = useState<TechnicianGroup | null | undefined>(null);
  const [activate, setActivate] = useState<boolean | null>(null);
  const [status, setStatus] = useState<ETechnicianStatus | null>(null);
  const [anyUpdate, setAnyUpdate] = useState<boolean>(false);

  useEffect(() => {
    setInfo(null);
    setGroup(null);
    setActivate(null);
    setStatus(null);
    setAnyUpdate(false);
    if (!user) return;

    const oldInfo: TechnicianUpdate = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      signing_authority: user.signing_authority,
    };
    const newInfo: TechnicianUpdate = {
      first_name: value.first_name,
      last_name: value.last_name,
      email: value.email,
      phone: value.phone,
      signing_authority: value.signing_authority,
    };

    const availableInfo = !equalInterface(oldInfo, newInfo);
    if (availableInfo) setInfo(newInfo);

    const oldGroup: TechnicianGroupUpdate = {
      group_id: user.technician_group?.group_id,
      group_role_id: user.technician_group?.group_role_id,
    };

    const newGroup: TechnicianGroupUpdate = {
      group_id: value.group?.id,
      group_role_id: value.group_role?.id,
    };

    const availableGroup = !equalInterface(oldGroup, newGroup);
    if (availableGroup) setGroup(newGroup);

    const availableActivate = value.is_active !== user?.is_active;
    if (availableActivate) {
      setActivate(value.is_active!);
    }

    const availableStatus = value.status !== user?.status;
    if (availableStatus) {
      const available = [ETechnicianStatus.Invited, ETechnicianStatus.ReSend];
      if (available.includes(value.status!)) {
        setStatus(value.status!);
      }
    }

    const available =
      availableInfo || availableGroup || availableActivate || availableStatus;

    setAnyUpdate(Boolean(user && available));
  }, [formik.values, user]);

  return { info, group, activate, status, anyUpdate };
}
