import InternalUser from "@Models/internal-user/internal_user";
import InternalUserFilter from "@Models/internal-user/internal_user_filter";
import { createSlice } from "@reduxjs/toolkit";

/// Internal user props
interface Props {
    layzLoading: boolean,
    internalUserFilterDrawerStatus: boolean;
    filter: InternalUserFilter,
    internalUsers: { rows: InternalUser[], count: number }
    internalUser: InternalUser | null,
}

/// Internal Users Initial state
const initialState: Props = {
    layzLoading: true,
    internalUserFilterDrawerStatus: false,
    filter: { page: 0, limit: 10, offset: 0 },
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
        },
        setInternalUserFilterDrawerStatus: (state, { payload }) => {
            state.internalUserFilterDrawerStatus = payload;
        },
        setFilter: (state, { payload }) => {
            state.filter = payload;
        }
    }
});

export default internalUser.reducer;
export const {
    setInternalUsers,
    setInternalUser,
    setInternalUserLayz,
    setInternalUserFilterDrawerStatus,
    setFilter
} = internalUser.actions;

