import { City, CompanyGroup, Country, State } from "..";
import Customer from "../customer/customer";
import UnitLabel from "./unit_label";
import UnitSubType from "./unit_sub_type";

interface Unit {
    id?: number;
    company_id?: number;
    user_id?: number;
    group_id?: number;
    unit_label_id?: number;
    unit_sub_type_id?: number;
    name?: string;
    imei?: string;
    identity_number?: string;
    qr_code?: string;
    contract_start_date?: string;
    contract_end_date?: string;
    country_id?: number;
    state_id?: number;
    city_id?: number;
    street_address?: string;
    latitude?: string;
    longitude?: string;
    status?: boolean;
    unit_sub_type?: UnitSubType;
    unit_label?: UnitLabel;
    job?: any;
    customer?: Customer;
    group?: CompanyGroup;
    country?: Country;
    state?: State;
    city?: City;
    created_at?: string;
    updated_at?: string;
}

export default Unit;