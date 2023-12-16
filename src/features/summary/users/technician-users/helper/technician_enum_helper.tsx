import TranslateHelper from "@Local/index";
import {
  ETechnicianFilterType,
  ETechnicianUserStatus,
} from "../entities/technician_enums";

export function getTechnicianFilterTypeTitle(
  value?: ETechnicianFilterType
): string {
  switch (value) {
    case ETechnicianFilterType.FirstName:
      return TranslateHelper.firstName();
    case ETechnicianFilterType.LastName:
      return TranslateHelper.lastName();
    case ETechnicianFilterType.Email:
      return TranslateHelper.email();
    case ETechnicianFilterType.PhoneNumber:
      return TranslateHelper.phone();
    default:
      return "";
  }
}

export function getTechnicianStatusTitle(
  value?: ETechnicianUserStatus
): string {
  switch (value) {
    case ETechnicianUserStatus.Active:
      return "Active"; // Translations
    case ETechnicianUserStatus.Inactive:
      return "Inactive"; // Translations
    case ETechnicianUserStatus.Invited:
      return "Invited"; // Translations
    case ETechnicianUserStatus.NotInvited:
      return "Not Invited"; // Translations
    default:
      return "";
  }
}
