interface Weather {
    temp_c?: number;
    text?: string;
    icon?: string;
    date?: string;
}

interface CompanyRegionWeather {
    current?: Weather;
    forecast?: Weather[];
}

export default CompanyRegionWeather;