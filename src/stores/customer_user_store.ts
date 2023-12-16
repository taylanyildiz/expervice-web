import { ECustomerFilterType, ECustomerSortTypes } from "@Features/summary/users/customer-users/entities/customer_enums";
import Customer from "@Models/customer/customer";
import CustomerFilter from "@Models/customer/customer_filter";
import { ESortDirection } from "@Models/enums";
import FormCustomer from "@Models/form/form_customer";
import Unit from "@Models/units/unit";
import { createSlice } from "@reduxjs/toolkit";

/// Customer props
interface Props {
    layzLoading: boolean;
    customerFilter: CustomerFilter | null;
    customers: { rows: Customer[], count: number };
    customer: Customer | null;
    customerForms: { rows: FormCustomer[], count: 0 };
    customerUnits: { rows: Unit[], count: 0 },
    customerFilterDrawer: boolean;
}

/// Cutomer initial states
const initialState: Props = {
    layzLoading: true,
    customerFilter: {
        limit: 10,
        offset: 0,
        keyword: "",
        filter_type: ECustomerFilterType.DisplayName,
        sort_type: ECustomerSortTypes.CreatedAt,
        sort_direction: ESortDirection.Ascending,
        statuses: [],
        groups: [],
        region_ids: [],
        end_date: "",
        start_date: ""
    },
    customers: { rows: [], count: 0 },
    customer: null,
    customerForms: { rows: [], count: 0 },
    customerUnits: { rows: [], count: 0 },
    customerFilterDrawer: false,
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
            state.customerFilter = payload;
        },
        setCustomers: (state, { payload }) => {
            state.customers = payload;
        },
        setCustomer: (state, { payload }) => {
            state.customer = payload;
        },
        setCustomerForms: (state, { payload }) => {
            state.customerForms = payload ?? { rows: [], count: 0 };
        },
        setCustomerUnits: (state, { payload }) => {
            state.customerUnits = payload;
        },
        setCustomerFilterDrawer: (state, { payload }) => {
            state.customerFilterDrawer = payload;
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
    setCustomerUnits,
    setCustomerFilterDrawer,
} = customer.actions;