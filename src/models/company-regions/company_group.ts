import { CompanyRegion, Creator } from "..";

interface CompanyGroup {
    id?: number;
    company_id?: number;
    region_id?: number;
    name?: string;
    creator?: Creator;
    region?: CompanyRegion;
    created_at?: string;
    updated_at?: string;
}

export default CompanyGroup;