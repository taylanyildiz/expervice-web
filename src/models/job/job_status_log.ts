import { Creator } from "..";
import JobForm from "./job_form";
import JobImage from "./job_image";
import JobStatus from "./job_status";

interface JobStatusLog {
    id?: number;
    description?: string;
    creator?: Creator;
    status?: JobStatus;
    images?: JobImage[];
    form?: JobForm;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default JobStatusLog;