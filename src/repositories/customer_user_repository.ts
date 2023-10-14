
import BaseRepository from "./base_repository";
import SnackCustomBar from "@Utils/snack_custom_bar";
import { store } from "@Store/index";
import { setCustomers, setLayzLoading } from "@Store/customer_user_store";
import Customer from "./end-points/customer_user";
import CustomerUser from "@Models/customer/customer";
import CustomerFilter from "@Models/customer/customer_filter";
import CustomerUpdate from "@Features/summary/users/customer-users/entities/customer_update";

class CustomerUserRepository extends BaseRepository {
    constructor() {
        super({ tag: Customer.customers });
    }

    /**
     * Get company customer user
     */
    public async getCustomers(filter?: CustomerFilter): Promise<boolean> {
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
    public async updateCustomerGroup(id: number, group: number): Promise<CustomerUser | null> {
        const path = Customer.group(id);
        const response = await this.put(path, { group_id: group });
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['customer'];
        return data;
    }

    /**
     * Update customer status
     */
    public async updateCustomeStatus(id: number, status: boolean): Promise<CustomerUser | null> {
        const path = Customer.status(id);
        const response = await this.put(path, { is_active: status });
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['customer'];
        return data;
    }

    /**
     * Send customer invite
     */
    public async sendInvite(id: number): Promise<CustomerUser | null> {
        const path = Customer.invite(id);
        const response = await this.post(path);
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['customer'];
        return data;
    }

    /**
     * Delete Customer user
     */
    public async deleteCustomer(id: number): Promise<boolean> {
        const path = Customer.invite(id);
        const response = await this.post(path);
        SnackCustomBar.status(response);
        if (response.success) {
        }
        return response.success;
    }

}

export default CustomerUserRepository;