import { City, Country, State } from "..";

interface CompanyAddress {
    id?: number;
    company_id?: number;
    country_id?: number;
    state_id?: number;
    city_id?: number;
    street_address?: string;
    zip_code?: string;
    country?: Country;
    state?: State;
    city?: City;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default CompanyAddress;