interface CustomerUpdate {
    id?: number;
    first_name?: string;
    last_name?: string;
    display_name?: string;
    email?: string;
    phone?: string;
    cell_phone?: string;
    country_id?: number;
    state_id?: number;
    city_id?: number;
    zip_code?: string;
    street_address?: string;
}

export default CustomerUpdate;