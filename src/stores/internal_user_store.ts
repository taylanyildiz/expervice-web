import InternalUser from "@Models/internal-user/internal_user";
import { createSlice } from "@reduxjs/toolkit";

/// Internal user props
interface Props {
    layzLoading: boolean,
    internalUsers: { rows: InternalUser[], count: number }
    internalUser: InternalUser | null,
}

/// Internal Users Initial state
const initialState: Props = {
    layzLoading: true,
    internalUsers: { rows: [], count: 0 },
    internalUser: null,
}

/// Internal user slice
const internalUser = createSlice({
    name: "internalUser",
    initialState,
    reducers: {
        setInternalUsers: (state, { payload }) => {
            state.internalUsers = payload;
        },
        setInternalUser: (state, { payload }) => {
            state.internalUser = payload;
        },
        setInternalUserLayz: (state, { payload }) => {
            state.layzLoading = payload;
        }
    }
});

export default internalUser.reducer;
export const { setInternalUsers, setInternalUser, setInternalUserLayz } = internalUser.actions;

