import { TranslationOption } from "..";
import ProductionOption from "./production_option";
import ProductionPermission from "./production_permission";

interface Translation {
    name?: TranslationOption;
}

interface ProductionPlan {
    id?: number;
    product_id?: number;
    ref_code?: string;
    name?: string;
    price?: string;
    currency_code?: string;
    payment_interval?: string;
    payment_interval_count?: number;
    trial_period_days?: string;
    plan_payment_type?: string;
    recurrence_count?: string;
    status?: boolean;
    locale?: string;
    translations?: Translation;
    permission?: ProductionPermission;
    options?: ProductionOption[];
    created_at?: string;
    updated_at?: string;
}

export default ProductionPlan;