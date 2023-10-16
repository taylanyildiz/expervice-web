import { ETechnicianStatus } from "@Features/summary/users/technician-users/entities/technician_enums";
import { CompanyGroup, Creator } from "..";
import GroupRole from "./group_role";
import TechnicianGroup from "./technician_group";

export const defaultTechnician: TechnicianUser = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    is_active: true,
    signing_authority: true,
    status: ETechnicianStatus.NotInvited,
    group: undefined,
    group_role: undefined,
}

interface TechnicianUser {
    id?: number;
    company_id?: number;
    role_id?: number;
    user_id?: number;
    technician_user_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    signing_authority: boolean;
    status: number;
    is_active: boolean;
    disabled_at?: string;
    enabled_at?: string;
    invited_at?: string;
    accepted_at?: string;
    creator?: Creator;
    technician_group?: TechnicianGroup;
    group?: CompanyGroup;
    group_role?: GroupRole;
    created_at?: string;
    deleted_at?: string;
}

export default TechnicianUser;