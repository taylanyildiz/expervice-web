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
        const filter = store.getState().notification.notificationFilter;
        const response = await this.get("/", { params: filter });
        const data = response.data?.['data']?.['notifications'];
        store.dispatch(setNotifications(data));
        return response.success;
    }

    /**
     * Read Notifications
     */
    public async readNotifications(): Promise<boolean> {
        const path = NotificationConst.read;
        const response = await this.put(path);
        return response.success;
    }
}

export default NotificationRepository;