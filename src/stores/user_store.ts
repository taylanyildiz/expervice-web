import CompanyInfo from "@Models/company/company_info";
import CompanySubscription from "@Models/company/company_subscription";
import { CompanyGroup } from "@Models/index";
import { createSlice } from "@reduxjs/toolkit";

/// User store props
interface Props {
    groups: { rows: CompanyGroup[], count: number },
    company: CompanyInfo | null;
    subscription: CompanySubscription | null;
}

/// User inital states
const initialState: Props = {
    groups: { rows: [], count: 0 },
    company: null,
    subscription: null,
}

/// User slice
const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserGroups: (state, { payload }) => {
            state.groups = payload;
        },
        setCompany: (state, { payload }) => {
            state.company = payload;
        },
        setSubscription: (state, { payload }) => {
            state.subscription = payload;
        },
    }
});

export default user.reducer;
export const { setUserGroups, setCompany, setSubscription } = user.actions;