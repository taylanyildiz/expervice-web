
export enum ERegionFilterType {
    Name = 1,
    Address = 2,
    ZipCode = 3,
}

export enum ERegionSortType {
    Name = 1,
    Country = 2,
    State = 3,
    City = 4,
    Address = 5,
    Zipcode = 5,
    CreatedAt = 8,
}

interface CompanyRegionFilter {
    limit?: number;
    offset?: number;
    filter_type?: ERegionFilterType;
    sort_type?: ERegionSortType;
    keyword?: string;
    sortDirection?: "asc" | "desc"
    start_date?: Date,
    end_date?: Date,
}

export default CompanyRegionFilter;