import { ECustomerFilterType } from "@Models/customer/customer_enums";

/**
 * Get string of filter type
 * @param type 
 * @returns 
 */
export function getCustomerFilterTitle(type: ECustomerFilterType): string {
    switch (type) {
        case ECustomerFilterType.DisplayName:
            return "Display Name";
        case ECustomerFilterType.FirstName:
            return "First Name";
        case ECustomerFilterType.LastName:
            return "Last Name";
        case ECustomerFilterType.CellPhone:
            return "Cell Phone";
        case ECustomerFilterType.CompanyName:
            return "Company Name";
        case ECustomerFilterType.Email:
            return "Email";
        case ECustomerFilterType.Phone:
            return "Phone";
        default:
            return "";
    }
}