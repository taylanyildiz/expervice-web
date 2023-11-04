import User from "@Models/user";
import { createSlice } from "@reduxjs/toolkit";

/// Account props
interface Props {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
}

/// Account initial state
const initialState: Props = {};

const account = createSlice({
    name: "account",
    initialState,
    reducers: {
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
        }
    }
});


export default account.reducer;
export const { setAccount, setUser, setAccessToken, setRefreshToken, logout } = account.actions;