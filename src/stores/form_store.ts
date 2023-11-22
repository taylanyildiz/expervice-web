import Customer from "@Models/customer/customer";
import Form from "@Models/form/form";
import { createSlice } from "@reduxjs/toolkit";

interface Props {
    formLayzLoading: boolean;
    formTemplateLoading: boolean;
    forms: { rows: Form[], count: number };
    formFilter: { limit: number, offset: number } | null,
    formDialogStatus: boolean;
    form: Form | null;
    formId: number | null;
    formCustomers: { rows: Customer[], count: number },
    formPdfTemplate: string | null;
}

const initialState: Props = {
    formLayzLoading: true,
    formTemplateLoading: true,
    formFilter: { limit: 10, offset: 0 },
    forms: { rows: [], count: 0 },
    formDialogStatus: false,
    form: null,
    formId: null,
    formCustomers: { rows: [], count: 0 },
    formPdfTemplate: null,
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
        setFormDialogStatus: (state, { payload }) => {
            state.formDialogStatus = payload;
        },
        setForm: (state, { payload }) => {
            state.form = payload;
        },
        setFormCustomers: (state, { payload }) => {
            state.formCustomers = payload;
        },
        setFormId: (state, { payload }) => {
            state.formId = payload;
        },
        setFormPdfTemplate: (state, { payload }) => {
            state.formPdfTemplate = payload;
        },
        setFormReviewLoading: (state, { payload }) => {
            state.formTemplateLoading = payload;
        }
    },
});


export default form.reducer;
export const {
    setFormCustomers,
    setFormFilter,
    setFormLayzLoading,
    setForms,
    setFormDialogStatus,
    setForm,
    setFormId,
    setFormPdfTemplate,
    setFormReviewLoading,
} = form.actions;