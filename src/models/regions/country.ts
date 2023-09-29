interface Translations {
    en?: string;
    tr?: string;
    it?: string;
    de?: string;
    fr?: string;
    pt?: string;
}


interface Country {
    id?: number;
    name?: string;
    emoji?: string;
    iso3?: string;
    iso2?: string;
    phone_code?: string;
    capital?: string;
    currency?: string;
    currency_name?: string;
    currency_symbol?: string;
    translations?: Translations;
    latitude?: number,
    longitude?: number,
    created_at?: string,
    updated_at?: string,
    deleted_at?: string,
}

export default Country;