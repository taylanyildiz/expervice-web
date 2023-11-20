
import BaseRepository from "./base_repository";
import SnackCustomBar from "@Utils/snack_custom_bar";
import { store } from "@Store/index";
import { setCustomer, setCustomerForms, setCustomerUnits, setCustomers, setLayzLoading } from "@Store/customer_user_store";
import Customer from "./end-points/customer_user";
import CustomerUser from "@Models/customer/customer";
import CustomerUpdate from "@Features/summary/users/customer-users/entities/customer_update";

class CustomerUserRepository extends BaseRepository {
    constructor() {
        super({ tag: Customer.customers });
    }

    /**
     * Get company customer user
     */
    public async getCustomers(): Promise<boolean> {
        const { filter } = store.getState().customer;
        store.dispatch(setLayzLoading(true));
        const response = await this.get("/", { params: filter });
        if (response.success) {
            const data = response.data['data']['customers'];
            store.dispatch(setCustomers(data));
        }
        store.dispatch(setLayzLoading(false));
        return response.success;
    }

    /**
     * Create customer user
     */
    public async createCustomer(customer: CustomerProcess): Promise<CustomerUser | null> {
        const response = await this.post("/", { ...customer });
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['customer'];
        return data;
    }

    /**
     * Update customer user
     */
    public async updateCustomer(customer: CustomerUpdate): Promise<CustomerUser | null> {
        const path = Customer.customer(customer.id!);
        const response = await this.put(path, { ...customer });
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['customer'];
        return data;
    }

    /**
     * Update customer group
     */
    public async updateCustomerGroup(group: number): Promise<CustomerUser | null> {
        const { customer } = store.getState().customer;
        const path = Customer.group(customer!.id!);
        const response = await this.put(path, { group_id: group });
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['customer'];
        return data;
    }

    /**
     * Update customer status
     */
    public async updateCustomeStatus(status: boolean): Promise<CustomerUser | null> {
        const { customer } = store.getState().customer;
        const path = Customer.status(customer!.id!);
        const response = await this.put(path, { is_active: status });
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['customer'];
        return data;
    }

    /**
     * Send customer invite
     */
    public async sendInvite(): Promise<CustomerUser | null> {
        const { customer } = store.getState().customer;
        const path = Customer.invite(customer!.id!);
        const response = await this.post(path);
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['customer'];
        return data;
    }

    /**
     * Delete Customer user
     */
    public async deleteCustomer(): Promise<boolean> {
        const { customer } = store.getState().customer;
        const path = Customer.invite(customer!.id!);
        const response = await this.post(path);
        SnackCustomBar.status(response);
        if (response.success) {
            store.dispatch(setCustomer(null));
        }
        return response.success;
    }

    /**
     * Delete Customer Form
     */
    public async deleteForm(id: number): Promise<boolean> {
        const path = Customer.form(id);
        const response = await this.delete(path);
        const success = response.success;
        SnackCustomBar.status(response);
        return success;
    }

    /**
     * Get Customer Form
     */
    public async getForm(id: number): Promise<boolean> {
        const path = Customer.form(id);
        const response = await this.get(path);
        const success = response.success;
        SnackCustomBar.status(response, { display: !success });
        return success;
    }

    /**
     * Get Customer Form as PDF
     */
    public async getFormPDF(id: number): Promise<string | null> {
        const path = Customer.formPdf(id);
        const response = await this.get(path);
        const success = response.success;
        SnackCustomBar.status(response, { display: !success });
        return response.data?.['data']?.['pdf'];
    }

    /**
     * Get Customer Forms
     */
    public async getForms(id: number, filter?: { limit: number, offset: number }): Promise<boolean> {
        const path = Customer.forms(id);
        const response = await this.get(path, { params: filter });
        const success = response.success;
        SnackCustomBar.status(response, { display: !success });
        const data = response.data?.['data']?.['forms'];
        store.dispatch(setCustomerForms(data));
        return success;
    }

    /**
     * Create Customer Form
     */
    public async createForm(form: any): Promise<boolean> {
        const path = Customer.customerForm(form.customer_id, form.form_id);
        const response = await this.post(path, form);
        const success = response.success;
        SnackCustomBar.status(response);
        // const data = response.data?.['data']?.['customer_form'];
        return success;
    }

    /**
     * Get Customer units
     */
    public async getUnits(id: number, filter: { limit: number, offset: number }): Promise<boolean> {
        const path = Customer.units(id);
        const response = await this.get(path, { params: filter });
        const success = response.success;
        if (success) {
            const data = response.data['data']['units'];
            store.dispatch(setCustomerUnits(data))
        }
        return success;
    }

}

export default CustomerUserRepository;