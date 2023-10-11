import { City, Country, Creator, State } from "..";

interface CompanyRegion {
    id?: number;
    company_id?: number;
    name?: string;
    country_id?: string;
    state_id?: string;
    street_address?: string;
    zip_code?: string;
    creator?: Creator;
    country?: Country;
    state?: State;
    city?: City;
    created_at?: string;
    updated_at?: string;
}

export default CompanyRegion;