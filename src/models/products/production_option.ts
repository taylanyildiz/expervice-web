import { TranslationOption } from "..";

interface Translation {
    name?: TranslationOption;
}

interface ProductionOption {
    id?: number;
    product_plan_id?: number;
    name?: string;
    translations?: Translation;
    created_at?: string;
    updated_at?: string;
}

export default ProductionOption;