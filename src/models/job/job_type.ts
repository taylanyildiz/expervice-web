import { TranslationOption } from "..";
import JobSubType from "./job_sub_type";

interface Translations {
    name?: TranslationOption;
}

interface JobType {
    id?: string;
    name?: string;
    translations?: Translations;
    sub_types?: JobSubType[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string
}

export default JobType;