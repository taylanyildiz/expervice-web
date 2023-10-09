import { TranslationOption } from "..";
import UnitType from "./unit_type";

interface Translations {
    name?: TranslationOption;
}

interface UnitSubType {
    id?: number;
    unit_type_id?: number;
    name?: string;
    unit_type?: UnitType;
    translations?: Translations;
    created_at?: string;
    updated_at?: string;
}

export default UnitSubType;