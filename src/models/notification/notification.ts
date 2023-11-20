import { TranslationOption } from "..";

interface Translations {
    title?: TranslationOption;
    body?: TranslationOption;
}

interface Notification {
    id?: number;
    user_id?: number;
    is_read?: boolean;
    detail?: NotificationDetail;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

interface NotificationDetail {
    id?: number;
    notification_type?: number;
    title?: string;
    body?: string;
    data?: NotificationData,
    translations?: Translations;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

interface NotificationData {
    notification_type?: string;
    job_status_id?: string;
    unit_id?: string;
    job_id?: string;
    user_id?: string;
}

export default Notification;