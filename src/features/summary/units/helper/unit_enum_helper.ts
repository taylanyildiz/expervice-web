import { EUnitFilterType } from "../entities/unit_enums";

export function getUnitFilterTitle(value?: EUnitFilterType): string {
    if (!value) return "";
    switch (value) {
        case EUnitFilterType.Name:
            return "Name";
        case EUnitFilterType.Address:
            return "Address";
        case EUnitFilterType.IdentityNumber:
            return "Identitiy Number";
        case EUnitFilterType.QrCode:
            return "QR Code";
        case EUnitFilterType.Group:
            return "Group Name";
    }
}