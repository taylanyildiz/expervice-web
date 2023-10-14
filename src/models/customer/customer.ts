import { ECustomerStatus } from "@Features/summary/users/customer-users/entities/customer_enums";
import { City, CompanyGroup, Country, Creator, State } from "..";

export const defaultCustomer: Customer = {
    id: undefined,
    company_id: undefined,
    is_active: true,
    customer_user_id: undefined,
    group: undefined,
    group_id: undefined,
    display_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    cell_phone: "",
    street_address: "",
    zip_code: "",
    country: undefined,
    country_id: undefined,
    state: undefined,
    state_id: undefined,
    city: undefined,
    city_id: undefined,
    status: ECustomerStatus.NotInvited,
}

interface Customer {
    id?: number;
    company_id?: number;
    role_id?: number;
    customer_user_id?: number;
    group_id?: number;
    company_name?: string;
    display_name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    cell_phone?: string;
    fax?: string;
    status: number;
    is_active: boolean;
    disabled_at?: string;
    enabled_at?: string;
    invited_at?: string;
    accepted_at?: string;
    country_id?: number;
    state_id?: number;
    city_id?: number;
    street_address?: string;
    zip_code?: string;
    latitude?: string;
    longitude?: string;
    country?: Country;
    state?: State;
    city?: City;
    creator?: Creator;
    group?: CompanyGroup,
    created_at?: string;
    updated_at?: string;
}

export default Customer;