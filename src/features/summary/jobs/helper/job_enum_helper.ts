import { EFormStatuses, EJobStatuses } from "../entities/job_enums";

export function getJobFormStatusTitle(value?: number | null) {
    if (!value) return "";
    switch (value) {
        case EFormStatuses.Ready:
            return "Form Ready To Send Customer To Sign";
        case EFormStatuses.PendingSignature:
            return "Pending Customer Signature";
        case EFormStatuses.PendingConfirmed:
            return "Pending Confirm Customer Signature";
        case EFormStatuses.Approved:
            return "Approved Customer Signature";
        case EFormStatuses.Rejected:
            return "Rejected Customer Signature";
    }
}

export function notAvailableJobStatuses(): EJobStatuses[] {
    const statuses = [
        EJobStatuses.FaultCanceled,
        EJobStatuses.FaultDone,
        EJobStatuses.MaintenanceCanceled,
        EJobStatuses.MaintenanceDone,
    ];
    return statuses;
}

export function isAvailableJobStatus(status?: number): boolean {
    if (!status) return true;
    return !notAvailableJobStatuses().includes(status);
}