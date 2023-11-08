import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import Formconst from "./end-points/form";
import { setForm, setFormLayzLoading, setForms } from "@Store/form_store";
import SnackCustomBar from "@Utils/snack_custom_bar";

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
    public async formPdfTemplate(): Promise<string | null> {
        const path = Formconst.template();
        const data = {};
        const response = await this.post(path, data);
        return response.data?.['data']?.['pdf'];
    }
}

export default FormRepository;