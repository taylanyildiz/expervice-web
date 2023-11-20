import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import Formconst from "./end-points/form";
import { setForm, setFormCustomers, setFormLayzLoading, setFormPdfTemplate, setForms } from "@Store/form_store";
import SnackCustomBar from "@Utils/snack_custom_bar";
import FormTemplateProcess from "@Features/summary/forms/entities/form_template_process";
import FormProcess from "@Features/summary/forms/entities/form_process";
import Form from "@Models/form/form";
import FormField from "@Features/summary/forms/entities/form_field";

class FormRepository extends BaseRepository {
    constructor() {
        super({ tag: Formconst.forms });
    }


    /**
     * Get Company forms
     */
    public async getForms(): Promise<boolean> {
        const path = "/";
        const filter = store.getState().form.formFilter;
        store.dispatch(setFormLayzLoading(true));
        const response = await this.get(path, { params: filter });
        store.dispatch(setFormLayzLoading(false));
        const success = response.success;
        if (success) {
            const data = response.data['data']['forms'];
            store.dispatch(setForms(data));
        }
        return success;
    }

    /**
     * Get Form PDF
     */
    public async formPdf(id: number): Promise<string | null> {
        const path = Formconst.pdf(id);
        const response = await this.get(path);
        const sucess = response.success;
        SnackCustomBar.status(response, { display: !sucess });
        const data = response.data?.['data']?.['pdf'];
        return data;
    }

    /**
     * Get Form PDF
     */
    public async getForm(id: number): Promise<boolean> {
        const path = Formconst.form(id);
        const response = await this.get(path);
        const sucess = response.success;
        if (sucess) {
            const data = response.data['data']['form'];
            store.dispatch(setForm(data));
        }
        return sucess;
    }

    /**
     * Form Template
     */
    public async formPdfTemplate(form: FormTemplateProcess): Promise<boolean> {
        const path = Formconst.template();
        const response = await this.post(path, form);
        const success = response.success;
        const data = response.data?.['data']?.['pdf'];
        store.dispatch(setFormPdfTemplate(data));
        return success;
    }

    /**
     * Form Template
     */
    public async formCustomers(id: number, filter?: { limit: number, offset: number }): Promise<boolean> {
        const path = Formconst.customers(id);
        const response = await this.get(path, { params: filter });
        const success = response.success;
        const data = response.data?.['data']?.['customers'];
        store.dispatch(setFormCustomers(data));
        return success;
    }

    /**
     * Create form
     */
    public async createForm(form: FormProcess): Promise<Form | null> {
        const path = "/";
        const response = await this.post(path, form);
        SnackCustomBar.status(response);
        const data = response.data?.['data']?.['form'];
        return data;
    }

    /**
     * Update form
     */
    public async updateForm(id: number, name: string): Promise<boolean> {
        const path = Formconst.form(id);
        const response = await this.put(path, { name });
        return response.success;
    }

    /**
     * Add field to form
     */
    public async addFields(id: number, fields: FormField[]): Promise<Form | null> {
        const path = Formconst.fields(id);
        const response = await this.post(path, { fields });
        const data = response.data?.['data']?.['form'];
        return data;
    }

    /**
     * Delete field from form
     */
    public async deleteField(id: number, field: number): Promise<boolean> {
        const path = Formconst.field(id, field);
        const response = await this.delete(path);
        return response.success;
    }

    /**
     * Update field from form
     */
    public async updateField(id: number, field: FormField): Promise<boolean> {
        const path = Formconst.field(id, field.id!);
        const response = await this.put(path, field);
        return response.success;
    }
}

export default FormRepository;