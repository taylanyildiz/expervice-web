import User from "@Models/user";
import { createSlice } from "@reduxjs/toolkit";

/// Account props
interface Props {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
    deviceToken: string | null;
}

/// Account initial state
const initialState: Props = {
    deviceToken: null,
};

const account = createSlice({
    name: "account",
    initialState,
    reducers: {
        setDeviceToken: (state, { payload }) => {
            state.deviceToken = payload;
        },
        setAccount: (state, { payload }) => {
            state.user = payload?.user;
            state.accessToken = payload?.access_token;
            state.refreshToken = payload?.refresh_token;
        },
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setAccessToken: (state, { payload }) => {
            state.accessToken = payload;
        },
        setRefreshToken: (state, { payload }) => {
            state.refreshToken = payload;
        },
        logout: (state) => {
            state.refreshToken = undefined;
            state.accessToken = undefined;
            state.user = undefined;
            state.deviceToken = null;
            localStorage.clear();
        }
    }
});


export default account.reducer;
export const { setDeviceToken, setAccount, setUser, setAccessToken, setRefreshToken, logout } = account.actions;