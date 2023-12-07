import { ESortDirection } from "@Models/enums";
import { ECustomerFilterType, ECustomerSortType } from "./customer_enums";

interface CustomerFilter {
    limit?: number;
    offset?: number;
    keyword?: string;
    sort_direction?: ESortDirection;
    sort_type?: ECustomerSortType;
    filter_type?: ECustomerFilterType;
    start_date?: Date;
    end_date?: Date;
}

export default CustomerFilter;