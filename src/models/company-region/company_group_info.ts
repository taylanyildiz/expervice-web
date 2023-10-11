
interface CompanyGroupJobInfo {
    type_id?: number;
    date?: string;
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
    jobs: CompanyGroupJobInfo[];
    created_at?: string;
    updated_at?: string;
}

export default CompanyGroupInfo;