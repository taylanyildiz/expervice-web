import PermissionSubResource from "@Models/permission/permission_sub_resource";
import { CompanyRegion, Creator, User, UserRole } from "..";

interface InternalUser {
    id?: number;
    company_id?: number;
    user_id?: number;
    internal_user_id?: number;
    role_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    status?: number;
    is_active: boolean;
    disabled_at?: string;
    enabled_at?: string;
    invited_at?: string;
    accepted_at?: string;
    internal_user?: User;
    role?: UserRole;
    creator?: Creator;
    regions?: CompanyRegion[] | null;
    permission_sub_resources?: PermissionSubResource[] | null;
    created_at?: string;
    updated_at?: string;
}

export default InternalUser;