export enum EJobType {
    Fault = 1,
    Maintenance = 2,
}

export enum EJobSubType {
    Fault = 1,
    Maintenance1Month = 2,
    Maintenance6Month = 3,
}


export enum EJobStatuses {
    // Faults
    FaultCreated = 1,
    FaultTaken = 2,
    FaultDeparted = 3,
    FaultStarted = 4,
    FaultDone = 5,
    FaultPutOnHold = 6,
    FaultCanceled = 7,
    // Maintenance
    MaintenanceCreated = 8,
    MaintenanceTaken = 9,
    MaintenanceDeparted = 10,
    MaintenanceStarted = 11,
    MaintenanceDone = 12,
    MaintenancePutOnHold = 13,
    MaintenanceCanceled = 14,
}

export enum EFaultStatuses {
    Created = 1,
    Taken = 2,
    Departed = 3,
    Started = 4,
    Done = 5,
    PutOnHold = 6,
    Canceled = 7,
};


export enum EMaintenanceStatuses {
    Created = 8,
    Taken = 9,
    Departed = 10,
    Started = 11,
    Done = 12,
    PutOnHold = 13,
    Canceled = 14,
};

export enum EJobRoles {
    Supervisor = 1,
    Concurrent = 2,
    Asigned = 3,
};


export enum EJobPriorites {
    Highest = 1,
    Critical = 2,
    Alarming = 3,
    Lowest = 4,
};

export enum EFormStatuses {
    Ready = 1,
    PendingSignature = 2, // Customer signature waiting
    PendingConfirmed = 3, // Company confirmed
    Approved = 4,
    Rejected = 5,
};

export enum EJobFilterType {
    UnitName = 1,
    QRCode = 2,
    IdentityNumber = 3,
}

export enum EJobSortTypes {
    UnitName = 1,
    QRCode = 2,
    IdentityNumber = 3,
    GroupName = 4,
    Priority = 5,
    Status = 6,
    CreatedAt = 7,
};