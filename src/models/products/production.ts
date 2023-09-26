import { TranslationOption } from "..";
import ProductionPlan from "./production_plan";

interface Translation {
    name?: TranslationOption;
    description?: TranslationOption;
}

interface Production {
    id?: number;
    ref_code?: string;
    name?: string;
    description?: string;
    locale?: string;
    translation?: Translation;
    plans?: ProductionPlan[];
    created_at?: string;
    updated_at?: string;
}

export default Production;