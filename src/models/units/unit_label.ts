import { TranslationOption } from "..";

interface Translations {
    name?: TranslationOption;
    description?: TranslationOption;
}

interface UnitLabel {
    id?: number;
    name?: string;
    description?: string;
    red?: number;
    green?: number;
    blue?: number;
    hex_code?: string;
    translations?: Translations;
    created_at?: string;
    updated_at?: string;
}

export default UnitLabel;