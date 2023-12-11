import TranslationOption from "./translation_option";

export type LangType = "en" | "tr";

interface Translations {
    name?: TranslationOption,
}

interface Language {
    id?: number;
    name?: string;
    native?: string;
    language_code?: LangType;
    country_code?: string;
    emoji?: string;
    translations?: Translations;
}

export default Language;