import TranslateHelper from "@Local/index";
import { EInternalFilterType, EInternalUserStatus } from "../entities/internal_user_enums";

export function getInternalFilterTypeTitle(
    value?: EInternalFilterType
): string {
    switch (value) {
        case EInternalFilterType.FirstName:
            return TranslateHelper.firstName();
        case EInternalFilterType.LastName:
            return TranslateHelper.lastName();
        case EInternalFilterType.Email:
            return TranslateHelper.email();
        case EInternalFilterType.PhoneNumber:
            return TranslateHelper.phone();
        default:
            return "";
    }
}

export function getInternalStatusTitle(
    value?: EInternalUserStatus
): string {
    switch (value) {
        case EInternalUserStatus.Active:
            return "Active"; // Translations
        case EInternalUserStatus.Inactive:
            return "Inactive"; // Translations
        case EInternalUserStatus.Invited:
            return "Invited"; // Translations
        case EInternalUserStatus.NotInvited:
            return "Not Invited"; // Translations
        default:
            return "";
    }
}