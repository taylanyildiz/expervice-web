import { TranslationOption } from "..";

interface Translations {
    name?: TranslationOption;
    description?: TranslationOption;
}

interface JobPriority {
    id?: number;
    name?: string;
    description?: string;
    red?: string;
    green?: string;
    blue?: string;
    hex_code?: string;
    translations?: Translations;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default JobPriority;