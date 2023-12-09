import CompanyInfo from "@Models/company/company_info";
import CompanySubscription from "@Models/company/company_subscription";
import { CompanyGroup, Language } from "@Models/index";
import { createSlice } from "@reduxjs/toolkit";

/// User store props
interface Props {
    language: Language | null,
    groups: { rows: CompanyGroup[], count: number },
    company: CompanyInfo | null;
    subscription: CompanySubscription | null;
}

/// User inital states
const initialState: Props = {
    language: null,
    groups: { rows: [], count: 0 },
    company: null,
    subscription: null,
}

/// User slice
const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLanguage: (state, { payload }) => {
            state.language = payload;
            if (!payload) return;
            window.location.reload();
        },
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
export const { setLanguage, setUserGroups, setCompany, setSubscription } = user.actions;