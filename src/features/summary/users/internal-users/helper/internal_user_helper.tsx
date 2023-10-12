import { RootState } from "@Store/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InternalUserUpdate from "../entities/internal_user_update";
import InternalUserPermission from "../entities/internal_user_permission";
import { EInternalStatus } from "../entities/internal_user_enums";

export function useInternalOld() {
  const [oldInfo, setInfo] = useState<InternalUserUpdate | null>(null);
  const [oldPermissions, setPermissions] =
    useState<InternalUserPermission | null>(null);
  const [oldStatus, setStatus] = useState<boolean>(true);
  const [oldInvite, setInvite] = useState<EInternalStatus>(
    EInternalStatus.NotInvited
  );

  const { internalUser } = useSelector(
    (state: RootState) => state.internalUser
  );

  useEffect(() => {
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
    setInvite(internalUser.status!);
    setStatus(internalUser.is_active);
    setPermissions(permissions);
    setInfo(updated);
  }, [internalUser]);

  return { oldInfo, oldPermissions, oldInvite, oldStatus };
}
