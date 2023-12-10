import TranslateHelper from "@Local/index";
import { EUnitFilterType } from "../entities/unit_enums";

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
        case EUnitFilterType.Group:
            return TranslateHelper.groupName();
    }
}