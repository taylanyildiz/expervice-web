import TranslateHelper from "@Local/index";
import { ECustomerFilterType } from "@Models/customer/customer_enums";

/**
 * Get string of filter type
 * @param type 
 * @returns 
 */
export function getCustomerFilterTitle(type: ECustomerFilterType): string {
    switch (type) {
        case ECustomerFilterType.DisplayName:
            return TranslateHelper.displayName();
        case ECustomerFilterType.FirstName:
            return TranslateHelper.firstName();
        case ECustomerFilterType.LastName:
            return TranslateHelper.lastName();
        case ECustomerFilterType.CellPhone:
            return TranslateHelper.cellPhone();
        case ECustomerFilterType.CompanyName:
            return TranslateHelper.businessName();
        case ECustomerFilterType.Email:
            return TranslateHelper.email();
        case ECustomerFilterType.Phone:
            return TranslateHelper.phone();
        default:
            return "";
    }
}