interface RegisterAccount {
    first_name: string;
    last_name: string;
    email: string;
    phone_code: string;
    phone_number: string;
    password: string;
    company_name: string;
    company_web_site?: string;
    company_phone?: string;
    company_fax?: string;
    country_id: number;
    state_id: number;
    city_id: number;
    street_address: string;
    zip_code: string;
    plan_id: number;
    card_holder_name: string;
    card_number: string;
    expire_year: string;
    expire_month: string;
    cvc: string;
}

export default RegisterAccount;