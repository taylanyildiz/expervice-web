import { TranslationOption } from "..";
import JobType from "./job_type";

interface Translations {
    name?: TranslationOption;
}

interface JobSubType {
    id?: number;
    type_id?: number;
    name?: string;
    translations?: Translations;
    type?: JobType;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default JobSubType;