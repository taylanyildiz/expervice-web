import { City, Country, State } from "@Models/index";

interface RegisterPrimaryContact {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    password?: string;
    company_name?: string;
    company_web_site?: string;
    company_fax?: string;
    company_phone?: string;
    country?: Country;
    state?: State;
    city?: City;
    street_address?: string;
    zip_code?: string;
}

export default RegisterPrimaryContact;