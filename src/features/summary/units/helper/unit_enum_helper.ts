import TranslateHelper from "@Local/index";
import { EUnitFilterType, EUnitJobStatuses, EUnitStatuses } from "../entities/unit_enums";

export function getUnitFilterTitle(value?: EUnitFilterType): string {
    if (!value) return "";
    switch (value) {
        case EUnitFilterType.Name:
            return TranslateHelper.name();
        case EUnitFilterType.Address:
            return TranslateHelper.address();
        case EUnitFilterType.IdentityNumber:
            return TranslateHelper.identityNumber();
        case EUnitFilterType.QrCode:
            return TranslateHelper.qrCode();
        case EUnitFilterType.Customer:
            return TranslateHelper.customer();
    }
}


export function getUnitStatusTitle(value?: EUnitStatuses): string {
    if (!value) return "";
    switch (value) {
        case EUnitStatuses.All:
            return "All Statuses"; // TODO: Translations
        case EUnitStatuses.Active:
            return "Active"; // TODO: Translations
        case EUnitStatuses.Passive:
            return "Passive"; // TODO: Translations
    }
}

export function getUnitStatusValue(value?: EUnitStatuses): boolean | undefined {
    switch (value) {
        case EUnitStatuses.Active:
            return true;
        case EUnitStatuses.Passive:
            return false;
        default:
            return undefined;
    }
}

export function getUnitStatusType(value?: boolean): EUnitStatuses | undefined {
    switch (value) {
        case true:
            return EUnitStatuses.Active;
        case false:
            return EUnitStatuses.Passive;
        default:
            return EUnitStatuses.All;
    }
}

export function getUnitJobStatusTitle(value?: EUnitJobStatuses): string {
    if (!value) return "";
    switch (value) {
        case EUnitJobStatuses.All:
            return "All Statuses"; // TODO: Translations
        case EUnitJobStatuses.HasJob:
            return "Faulty Units"; // TODO: Translations
        case EUnitJobStatuses.NoJob:
            return "Non-Faulty Units"; // TODO: Translations
    }
}

export function getUnitJobStatusValue(value?: EUnitJobStatuses): boolean | undefined {
    switch (value) {
        case EUnitJobStatuses.All:
            return undefined;
        case EUnitJobStatuses.HasJob:
            return true;
        case EUnitJobStatuses.NoJob:
            return false;
    }
}

export function getUnitJobStatus(value?: boolean): EUnitJobStatuses | undefined {
    switch (value) {
        case true:
            return EUnitJobStatuses.HasJob;
        case false:
            return EUnitJobStatuses.NoJob;
        default:
            return EUnitJobStatuses.All;
    }
}