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
        setAccount: (state, { payload: { user, accessToken, refreshToken } }) => {
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setAccessToken: (state, { payload }) => {
            state.accessToken = payload;
        },
        setRefreshToken: (state, { payload }) => {
            state.refreshToken = payload;
        }
    }
});


export default account.reducer;
export const { setAccount, setUser, setAccessToken, setRefreshToken } = account.actions;