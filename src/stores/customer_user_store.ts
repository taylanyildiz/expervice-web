import Customer from "@Models/customer/customer";
import CustomerFilter from "@Models/customer/customer_filter";
import FormCustomer from "@Models/form/form_customer";
import { createSlice } from "@reduxjs/toolkit";

/// Customer props
interface Props {
    layzLoading: boolean;
    filter: CustomerFilter | null;
    customers: { rows: Customer[], count: number };
    customer: Customer | null;
    customerForms: { rows: FormCustomer[], count: 0 };
}

/// Cutomer initial states
const initialState: Props = {
    layzLoading: true,
    filter: { limit: 10, offset: 0 },
    customers: { rows: [], count: 0 },
    customer: null,
    customerForms: { rows: [], count: 0 },
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
        setCustomerForms: (state, { payload }) => {
            state.customerForms = payload ?? { rows: [], count: 0 };
        }
    }
});


export default customer.reducer;
export const {
    setLayzLoading,
    setCustomers,
    setCustomer,
    setCustomerFilter,
    setCustomerForms,
} = customer.actions;