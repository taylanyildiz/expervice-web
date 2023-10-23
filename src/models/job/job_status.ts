import { TranslationOption } from "..";

interface Translations {
    name?: TranslationOption;
}

interface JobStatus {
    id?: number;
    type_id?: number;
    name?: string;
    translations?: Translations;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default JobStatus;