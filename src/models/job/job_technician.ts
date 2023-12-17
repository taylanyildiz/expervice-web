import TechnicianUser from "@Models/technician-user/technician_user";
import JobRole from "./job_role";
import Job from "./job";

interface JobTechnician {
    id?: number;
    technician_user_id?: number;
    role_id?: number;
    job_id?: number;
    job_role?: JobRole;
    technician_user?: TechnicianUser;
    job?: Job,
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default JobTechnician;