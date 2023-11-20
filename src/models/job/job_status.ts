import { TranslationOption } from "..";
import JobType from "./job_type";

interface Translations {
    name?: TranslationOption;
}

interface JobStatus {
    id?: number;
    type_id?: number;
    name?: string;
    job_type?: JobType;
    translations?: Translations;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default JobStatus;