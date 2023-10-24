import Job from "@Models/job/job";
import { City, CompanyGroup, Country, Creator, State } from "..";
import Customer from "../customer/customer";
import UnitLabel from "./unit_label";
import UnitSubType from "./unit_sub_type";

export const defaultValue: Unit = {
    group: undefined,
    name: "",
    imei: "",
    identity_number: "",
    qr_code: "",
    contract_start_date: "",
    contract_end_date: "",
    unit_sub_type: undefined,
    customer: undefined,
    country: undefined,
    state: undefined,
    city: undefined,
    street_address: "",
    latitude: "",
    longitude: "",
    status: true,
};

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
    status: boolean;
    unit_sub_type?: UnitSubType;
    unit_label?: UnitLabel;
    job_count?: number,
    maintenance_count?: number,
    fault_count?: number,
    job?: Job;
    customer?: Customer;
    group?: CompanyGroup;
    country?: Country;
    state?: State;
    city?: City;
    creator?: Creator;
    created_at?: string;
    updated_at?: string;
}

export default Unit;