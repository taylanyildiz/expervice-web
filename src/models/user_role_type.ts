import { TranslationOption, UserRole } from ".";

interface Translations {
    role_type?: TranslationOption;
}

interface UserRoleType {
    id?: number;
    role_type?: string;
    translations?: Translations;
    type_roles?: UserRole[],
}

export default UserRoleType;