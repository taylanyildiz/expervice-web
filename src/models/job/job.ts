import Unit from "@Models/units/unit";
import { Creator } from "..";
import JobStatusLog from "./job_status_log";
import JobStatus from "./job_status";
import JobTechnician from "./job_technician";
import JobSubType from "./job_sub_type";
import JobPriority from "./job_priority";

interface Job {
    id?: number;
    company_id?: number;
    unit_id?: number;
    user_id?: number;
    type_id?: number;
    sub_type_id?: number;
    priority_id?: number;
    status_id?: number;
    unit?: Unit;
    creator?: Creator;
    description?: string;
    job_statuses?: JobStatusLog[];
    status?: JobStatus;
    priority?: JobPriority;
    sub_type?: JobSubType;
    job_technicians: JobTechnician[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default Job;