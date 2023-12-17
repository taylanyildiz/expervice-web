export enum EInternalUserRole {
    FullAdmin = 4,
    OfficeManager = 5,
}

export enum EInternalStatus {
    NotInvited = 1,
    Invited = 2,
    Active = 3,
    Inactive = 4,
    ReSend = 5,
}

export enum EInternalUserStatus {
    NotInvited = 1,
    Invited = 2,
    Active = 3,
    Inactive = 4,
}

export enum EInternalFilterType {
    FirstName = 1,
    LastName = 2,
    Email = 3,
    PhoneNumber = 4,
}

export enum EInternalSortType {
    FirstName = 1,
    LastName = 2,
    Email = 3,
    PhoneNumber = 4,
    CreatedAt = 5,
}