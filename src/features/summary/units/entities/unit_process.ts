interface UnitProcess {
    customer_id?: number;
    status?: boolean;
    unit_label_id?: number;
    unit_sub_type_id?: number;
    name?: string;
    identitiy_number?: string;
    imei?: string;
    qr_code?: string;
    contract_start_date?: string;
    contract_end_date?: string;
    country_id?: number;
    state_id?: number;
    city_id?: number;
    street_address?: string;
    zip_code?: string;
    latitude?: string;
    longitude?: string;
}

export default UnitProcess;