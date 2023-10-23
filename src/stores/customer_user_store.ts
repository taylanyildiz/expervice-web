import Customer from "@Models/customer/customer";
import CustomerFilter from "@Models/customer/customer_filter";
import { createSlice } from "@reduxjs/toolkit";

/// Customer props
interface Props {
    layzLoading: boolean;
    filter: CustomerFilter | null;
    customers: { rows: Customer[], count: number };
    customer: Customer | null;
}

/// Cutomer initial states
const initialState: Props = {
    layzLoading: true,
    filter: { limit: 10, offset: 0 },
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
        setCustomerFilter: (state, { payload }) => {
            state.filter = payload;
        },
        setCustomers: (state, { payload }) => {
            state.customers = payload;
        },
        setCustomer: (state, { payload }) => {
            state.customer = payload;
        },
    }
});


export default customer.reducer;
export const {
    setLayzLoading,
    setCustomers,
    setCustomer,
    setCustomerFilter,
} = customer.actions;