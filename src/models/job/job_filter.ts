interface JobFilter {
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
    start_date?: string;
    end_date?: string;
}