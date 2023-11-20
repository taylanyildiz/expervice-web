import { createSlice } from "@reduxjs/toolkit"
import Notification from "@Models/notification/notification"

interface Props {
    notificationFilter: { limit: number, offset: number },
    notifications: { count: number, unread_count: number, rows: Notification[] }
}


const initialState: Props = {
    notificationFilter: { limit: 10, offset: 0 },
    notifications: { count: 0, unread_count: 0, rows: [] },
};


const notification = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotifications: (state, { payload }) => {
            state.notifications = payload;
        },
        setNotificationFilter: (state, { payload }) => {
            state.notificationFilter = payload;
        }
    }
});

export default notification.reducer;
export const {
    setNotificationFilter,
    setNotifications,
} = notification.actions;