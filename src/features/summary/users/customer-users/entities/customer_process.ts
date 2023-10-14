interface CustomerProcess {
    display_name?: string;
    group_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    cell_phone?: string;
    is_active: boolean;
    country_id?: number;
    state_id?: number;
    city_id?: number;
    street_address?: string;
    zip_code?: string;
    send_invite: boolean;
}