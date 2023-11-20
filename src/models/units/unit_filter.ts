interface UnitFilter {
    limit?: number | null;
    offset?: number | null;
    keyword?: string;
    filter_type?: number;
    has_job?: boolean;
    region_ids: number[];
}

export default UnitFilter;