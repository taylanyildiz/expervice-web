import { TranslationOption } from "..";
import UnitSubType from "./unit_sub_type";

interface Translations {
    name?: TranslationOption;
}

interface UnitType {
    id?: number;
    unit_type_id?: number;
    name?: string;
    unit_sub_types?: UnitSubType[];
    translations?: Translations;
    created_at?: string;
    updated_at?: string;
}

export default UnitType;