import PermissionSubResource from "./permission_sub_resource";

interface RolePermission {
    id?: number;
    permission_sub_resource_id?: number;
    role_id?: number;
    is_selected?: boolean;
    can_changeable?: boolean;
    permission_sub_resource?: PermissionSubResource;
    created_at?: string;
    updated_at?: string;
}

export default RolePermission;