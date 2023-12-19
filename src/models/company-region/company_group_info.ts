import Unit from "@Models/units/unit";

export interface CompanyGroupJobInfo {
    type_id?: number;
    date?: string;
    count?: number;
}

export interface CompanyGroupUnitsInfo {
    unit?: Unit;
    count?: number;
}

interface CompanyGroupInfo {
    id?: number;
    company_id?: number;
    region_id?: number;
    name?: string;
    unit_count?: number;
    job_count?: number;
    technician_count: number;
    created_at?: string;
    updated_at?: string;
}

export default CompanyGroupInfo;