import ProductionPlan from "@Models/products/production_plan";
import { createSlice } from "@reduxjs/toolkit";

/// Auth props
interface Props {
    plan: ProductionPlan | undefined | null;
}

/// Initial states
const initialState: Props = {
    plan: undefined,
};


/// Authentication slice
const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthPlan: (state, { payload }) => {
            state.plan = payload;
        }
    },
});

export default auth.reducer;
export const { setAuthPlan } = auth.actions;