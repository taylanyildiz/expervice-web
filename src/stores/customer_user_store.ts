import Customer from "@Models/customer/customer";
import { createSlice } from "@reduxjs/toolkit";

/// Customer props
interface Props {
    layzLoading: boolean,
    customers: { rows: Customer[], count: number },
    customer: Customer | null;
}

/// Cutomer initial states
const initialState: Props = {
    layzLoading: true,
    customers: { rows: [], count: 0 },
    customer: null,
}

/// Customer slice
const customer = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setLayzLoading: (state, { payload }) => {
            state.layzLoading = payload;
        },
        setCustomers: (state, { payload }) => {
            state.customers = payload;
        },
        setCustomer: (state, { payload }) => {
            state.customer = payload;
        }
    }
});


export default customer.reducer;
export const {
    setLayzLoading,
    setCustomers,
    setCustomer,
} = customer.actions;