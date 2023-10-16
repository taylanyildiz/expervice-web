import { CompanyGroup } from "..";
import GroupRole from "./group_role";

interface TechnicianGroup {
    id?: number;
    technician_user_id?: number;
    group_id?: number;
    region_id?: number;
    group_role_id?: number;
    group_role?: GroupRole;
    group?: CompanyGroup;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default TechnicianGroup;