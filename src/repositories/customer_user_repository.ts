
import BaseRepository from "./base_repository";
import SnackCustomBar from "@Utils/snack_custom_bar";
import { store } from "@Store/index";
import { setCustomer, setCustomers, setLayzLoading } from "@Store/customer_user_store";
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

}

export default CustomerUserRepository;