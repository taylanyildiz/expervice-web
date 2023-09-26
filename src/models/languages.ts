import TranslationOption from "./translation_option";

interface Translations {
    name?: TranslationOption,
}

interface Language {
    id?: number;
    name?: string;
    native?: string;
    language_code?: string;
    country_code?: string;
    emoji?: string;
    translations?: Translations;
}

export default Language;