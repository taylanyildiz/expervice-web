import { TranslationOption } from ".";

interface Translations {
    name?: TranslationOption,
}
interface UnsubscriptionReason {
    id?: number;
    type?: string;
    name?: string;
    translations: Translations,
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
};

export default UnsubscriptionReason;