import ProductionPlan from "@Models/products/production_plan";

interface CompanySubscription {
    id?: number;
    company_id?: number;
    product_id?: number;
    subscription_status?: string;
    locale?: string;
    trial_days?: number;
    trial_start_date?: string;
    trial_end_date?: string;
    cancellation_date?: string;
    plan?: ProductionPlan;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default CompanySubscription;