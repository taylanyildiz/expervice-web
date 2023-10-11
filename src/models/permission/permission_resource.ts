import { TranslationOption } from "..";
import PermissionSubResource from "./permission_sub_resource";

interface Translations {
    name?: TranslationOption;
}

interface PermissionResource {
    id?: number;
    role_type_id?: number;
    name?: string;
    translations?: Translations;
    sub_resources?: PermissionSubResource[];
    created_at?: string;
    updated_at?: string;
}

export default PermissionResource;