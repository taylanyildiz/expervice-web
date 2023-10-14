import { CompanyGroup } from "@Models/index";
import { createSlice } from "@reduxjs/toolkit";

/// User store props
interface Props {
    groups: { rows: CompanyGroup[], count: number },
}

/// User inital states
const initialState: Props = {
    groups: { rows: [], count: 0 },
}

/// User slice
const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserGroups: (state, { payload }) => {
            state.groups = payload;
        }
    }
});

export default user.reducer;
export const { setUserGroups } = user.actions;