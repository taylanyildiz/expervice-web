import { ECustomDate } from "@Models/enums";

export default interface JobFilter {
    page?: number;
    limit?: number;
    offset?: number;
    keyword?: string;
    filter_type?: number;
    sort_type?: number;
    sort_direction?: number;
    priorities?: number[];
    statuses?: number[];
    type_ids?: number[];
    sub_type_ids?: number[];
    groups?: number[];
    region_ids?: number[];
    dateType?: ECustomDate;
    start_date?: Date;
    end_date?: Date;
}