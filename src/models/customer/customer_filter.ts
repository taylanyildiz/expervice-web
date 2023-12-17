import { ECustomerFilterType, ECustomerSortTypes, ECustomerUserStatus } from "@Features/summary/users/customer-users/entities/customer_enums";
import { ESortDirection } from "@Models/enums";

interface CustomerFilter {
    limit?: number;
    offset?: number;
    keyword?: string;
    sort_direction?: ESortDirection;
    sort_type?: ECustomerSortTypes;
    filter_type?: ECustomerFilterType;
    statuses?: ECustomerUserStatus[];
    groups?: number[];
    region_ids?: number[];
    start_date?: string;
    end_date?: string;
}

export default CustomerFilter;