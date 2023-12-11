import TranslateHelper from "@Local/index";
import { EFormStatuses, EJobStatuses } from "../entities/job_enums";

export function getJobFormStatusTitle(value?: number | null) {
    if (!value) return "";
    switch (value) {
        case EFormStatuses.Ready:
            return TranslateHelper.formReadyToSendCustomerToSign();
        case EFormStatuses.PendingSignature:
            return TranslateHelper.pendingCustomerSignature();
        case EFormStatuses.PendingConfirmed:
            return TranslateHelper.pendingConfirmSignature();
        case EFormStatuses.Approved:
            return TranslateHelper.approvedCustomerSignature();
        case EFormStatuses.Rejected:
            return TranslateHelper.rejectedCustomerSignature();
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