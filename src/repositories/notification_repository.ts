import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import { setNotifications } from "@Store/notification_store";
import NotificationConst from "./end-points/notification";

class NotificationRepository extends BaseRepository {
    constructor() {
        super({ tag: NotificationConst.notifications });
    }

    /**
     * Get User Notifications
     */
    public async getNotifications(): Promise<boolean> {
        const { notificationFilter: filter, notifications: { rows } } = store.getState().notification;
        const response = await this.get("/", { params: filter });
        const data = response.data?.['data']?.['notifications'];
        if (response.success) {
            store.dispatch(setNotifications({
                count: data.count,
                unread_count: data.unread_count,
                rows: [...rows, ...data.rows]
            }));
        }
        return response.success;
    }

    /**
     * Read Notifications
     */
    public async readNotifications(): Promise<boolean> {
        const { notifications } = store.getState().notification;
        const path = NotificationConst.read;
        const response = await this.put(path);
        const success = response.success;
        if (success) {
            store.dispatch(setNotifications({
                ...notifications,
                unread_count: 0,
                rows: [...notifications.rows.map((e) => ({ ...e, is_read: true }))]
            }))
        }
        return success;
    }
}

export default NotificationRepository;