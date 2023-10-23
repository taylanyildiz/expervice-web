interface JobForm {
    id: number;
    company_id: number;
    user_id: number;
    job_id: number;
    unit_id: number;
    job_status_log_id: number;
    form_name: string;
    job_type: string;
    unit_type: string;
    unit_name: string;
    unit_identity_number: string;
    unit_status: boolean;
    notes: String;
    reported_at: string;
    started_at: string;
    fixed_at: string;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export default JobForm;