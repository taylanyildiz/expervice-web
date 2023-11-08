import Form from "@Models/form/form";
import FormCustomer from "@Models/form/form_customer";
import { createSlice } from "@reduxjs/toolkit";

interface Props {
    formLayzLoading: boolean;
    forms: { rows: Form[], count: number };
    formFilter: { limit: number, offset: number } | null,
    form: Form | null;
    formId: number | null;
    formCustomers: { rows: FormCustomer[], count: number },
}

const initialState: Props = {
    formLayzLoading: true,
    formFilter: { limit: 10, offset: 0 },
    forms: { rows: [], count: 0 },
    form: null,
    formId: null,
    formCustomers: { rows: [], count: 0 },
}

const form = createSlice({
    initialState,
    name: "form",
    reducers: {
        setFormLayzLoading: (state, { payload }) => {
            state.formLayzLoading = payload;
        },
        setFormFilter: (state, { payload }) => {
            state.formFilter = payload;
        },
        setForms: (state, { payload }) => {
            state.forms = payload;
        },
        setForm: (state, { payload }) => {
            state.form = payload;
        },
        setFormCustomer: (state, { payload }) => {
            state.formCustomers = payload;
        },
        setFormId: (state, { payload }) => {
            state.formId = payload;
        }
    },
});


export default form.reducer;
export const {
    setForm,
    setFormCustomer,
    setFormFilter,
    setFormLayzLoading,
    setForms,
    setFormId,
} = form.actions;