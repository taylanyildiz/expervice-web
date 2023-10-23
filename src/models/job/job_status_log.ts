import { Creator, TranslationOption } from "..";
import JobForm from "./job_form";
import JobImage from "./job_image";
import JobStatus from "./job_status";

interface Translations {
    name?: TranslationOption;
}

interface JobStatusLog {
    id?: number;
    type_id?: number;
    name?: string;
    translations?: Translations;
    creator?: Creator;
    status?: JobStatus;
    images?: JobImage[];
    form?: JobForm;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default JobStatusLog;