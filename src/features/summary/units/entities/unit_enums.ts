export enum EUnitFilterType {
    Name = 1,
    IdentityNumber = 2,
    Address = 3,
    QrCode = 4,
    Customer = 5,
}

export enum EUnitSortTypes {
    Name = 1,
    IdentityNumber = 2,
    ContractStartDate = 3,
    ContractEndDate = 4,
    Country = 5,
    State = 6,
    City = 7,
    Address = 8,
    CreatedAt = 9,
};

export enum EUnitStatuses {
    All = 1,
    Active = 2,
    Passive = 3,
}

export enum EUnitJobStatuses {
    All = 1,
    HasJob = 2,
    NoJob = 3,
}