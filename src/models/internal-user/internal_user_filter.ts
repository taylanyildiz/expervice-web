import { EInternalFilterType, EInternalSortType, EInternalUserStatus } from "@Features/summary/users/internal-users/entities/internal_user_enums";
import { ESortDirection } from "@Models/enums";

interface InternalUserFilter {
    page?: 0,
    offset?: number,
    limit?: number,
    role_ids?: number[],
    statuses?: EInternalUserStatus[],
    sort_direction?: ESortDirection,
    sort_type?: EInternalSortType,
    filter_type?: EInternalFilterType,
    keyword?: string,
    start_date?: string;
    end_date?: string;
}

export default InternalUserFilter;