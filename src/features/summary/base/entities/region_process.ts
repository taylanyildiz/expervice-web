interface RegionProcess {
    id?: number | null;
    name: string;
    country_id: number;
    state_id: number;
    city_id: number;
    street_address: string;
    zip_code: string;
}

export default RegionProcess;