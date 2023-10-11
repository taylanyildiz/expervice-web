import { TranslationOption } from ".";
import UserRoleType from "./user_role_type";

interface Translations {
    role?: TranslationOption;
    description?: TranslationOption;
}

interface UserRole {
    id?: number;
    role_type_id?: number;
    role?: string;
    description?: string;
    translations?: Translations;
    role_type?: UserRoleType;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default UserRole;