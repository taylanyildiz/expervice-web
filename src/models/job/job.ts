import Unit from "@Models/units/unit";
import { Creator } from "..";
import JobStatusLog from "./job_status_log";
import JobStatus from "./job_status";
import JobTechnician from "./job_technician";

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
    job_statuses?: JobStatusLog[];
    job_status?: JobStatus;
    job_technicians?: JobTechnician[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default Job;