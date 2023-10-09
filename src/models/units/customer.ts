interface Customer {
    id: number;
    company_id: number;
    role_id: number;
    customer_user_id: number;
    group_id: number;
    company_name: string;
    display_name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    cell_phone: string;
    fax: string;
    status: number; // TODO:
    is_active: boolean;
    disabled_at: string;
    enabled_at: string;
    invited_at: string;
    accepted_at: string;
    country_id: number;
    state_id: number;
    city_id: number;
    street_address: string;
    zip_code: string;
    latitude: string;
    longitude: string;
    created_at: string;
    updated_at: string;
}

export default Customer;