import { EUnitFilterType } from "@Features/summary/units/entities/unit_enums";
import { ESortDirection } from "@Models/enums";

interface UnitFilter {
    limit?: number | null;
    offset?: number | null;
    keyword?: string;
    filter_type?: EUnitFilterType;
    has_job?: boolean;
    region_ids?: number[];
    groups?: number[];
    sort_direction?: ESortDirection;
    sort_type?: number;
    unit_types?: number[];
    unit_sub_types?: number[];
    unit_labels?: number[];
    job_sub_types?: number[];
    job_statuses?: number[];
    status?: boolean;
    contract_start_date?: string;
    contract_end_date?: string;
    start_date?: string;
    end_date?: string;
}

export default UnitFilter;