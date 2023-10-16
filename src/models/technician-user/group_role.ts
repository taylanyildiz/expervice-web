import { TranslationOption } from "..";

interface Translations {
    name?: TranslationOption;
    description?: TranslationOption;
}

interface GroupRole {
    id?: number;
    name?: string;
    description?: string;
    translations?: Translations;
    created_at?: string;
    updated_at?: string;
    deleted_at?: String;
}

export default GroupRole;