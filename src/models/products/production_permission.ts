import { TranslationOption } from "..";

interface Translation {
    name?: TranslationOption;
    description?: TranslationOption;
}

interface ProductionPermission {
    id?: number;
    product_plan_id?: number;
    name?: string;
    description?: string;
    max_storage?: number;
    max_users?: number;
    max_units?: number;
    max_jobs?: number;
    max_form?: number;
    messaging?: boolean;
    export_exel?: boolean;
    translations?: Translation;
    created_at?: string;
    updated_at?: string;
}

export default ProductionPermission;