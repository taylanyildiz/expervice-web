import { ETechnicianUserStatus } from "@Features/summary/users/technician-users/entities/technician_enums";
import { ESortDirection } from "@Models/enums";

interface TechnicianFilter {
    page?: number;
    limit?: number;
    offset?: number;
    keyword?: string;
    filter_type?: number;
    sort_type?: number;
    sort_direction?: ESortDirection;
    region_ids?: number[];
    groups?: number[];
    group_roles?: number[];
    statuses?: ETechnicianUserStatus[],
    start_date?: string;
    end_date?: string;
}

export default TechnicianFilter;