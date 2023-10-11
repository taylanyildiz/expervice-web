import { TranslationOption } from "..";
import PermissionResource from "./permission_resource";
import RolePermission from "./role_permission";

interface Translations {
    name?: TranslationOption;
}

interface PermissionSubResource {
    id?: number;
    permission_resource_id?: number;
    role_type_id?: number;
    name?: string;
    translations?: Translations;
    permission_resource?: PermissionResource;
    role_permissions?: RolePermission[],
    created_at?: string;
    updated_at?: string;
}

export default PermissionSubResource;