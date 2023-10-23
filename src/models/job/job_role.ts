import { TranslationOption } from "..";

interface Translations {
    name?: TranslationOption;
    description?: TranslationOption;
}

interface JobRole {
    id?: number;
    name?: string;
    description?: string;
    translations?: Translations;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default JobRole;