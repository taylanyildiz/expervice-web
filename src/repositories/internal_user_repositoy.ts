import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import InternalUserConst from "./end-points/internal_user";
import { setInternalUser, setInternalUserLayz, setInternalUsers } from "@Store/internal_user_store";
import InternalUserProcess from "@Features/summary/users/internal-users/entities/internal_user_process";
import SnackCustomBar from "@Utils/snack_custom_bar";
import InternalUserUpdate from "@Features/summary/users/internal-users/entities/internal_user_update";
import InternalUserPermission from "@Features/summary/users/internal-users/entities/internal_user_permission";
import InternalUser from "@Models/internal-user/internal_user";
import InternalUserFilter from "@Models/internal-user/internal_user_filter";

class InternalUserRepository extends BaseRepository {
    constructor() {
        super({ tag: InternalUserConst.internalUsers });
    }

    /**
     * Get Company internal user
     */
    public async getInternalUsers(filter?: InternalUserFilter): Promise<boolean> {
        store.dispatch(setInternalUserLayz(true));
        const response = await this.get("/", { params: filter });
        store.dispatch(setInternalUserLayz(false));
        if (response.success) {
            const data = response.data['data']['internal_users'];
            store.dispatch(setInternalUsers(data));
        }
        return response.success;
    }

    /**
     * Create Internal user
     */
    public async createInternalUser(user: InternalUserProcess): Promise<InternalUser | null> {
        const { internalUsers } = store.getState().internalUser;
        let count = internalUsers.count;
        const response = await this.post("/", user);
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['internal_user'];
        store.dispatch(setInternalUsers({
            rows: [data, ...internalUsers.rows],
            count: ++count
        }));
        return data;
    }


    /**
     * Update Internal user
     */
    public async updateInternalUser(user: InternalUserUpdate): Promise<InternalUser | null> {
        const { internalUsers } = store.getState().internalUser;
        let count = internalUsers.count;
        const path = InternalUserConst.user(user.id)
        const response = await this.put(path, { ...user });
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['internal_user'];
        const values = [...internalUsers.rows];
        const index = values.findIndex(e => e.id === user.id);
        if (index !== -1) {
            values[index] = data;
            store.dispatch(setInternalUsers({ rows: values, count }))
        }
        return data;
    }

    /**
     * Update Internal user permissions
     */
    public async updateInternalPermissions(user: InternalUserPermission): Promise<InternalUser | null> {
        const { internalUsers } = store.getState().internalUser;
        let count = internalUsers.count;
        const path = InternalUserConst.permissions(user.id)
        const response = await this.put(path, { ...user });
        SnackCustomBar.status(response, { display: !response.success });
        if (!response.success) return null;
        const data = response.data['data']['internal_user'];
        const values = [...internalUsers.rows];
        const index = values.findIndex(e => e.id === user.id);
        if (index !== -1) {
            values[index] = data;
            store.dispatch(setInternalUsers({ rows: values, count }))
        }
        return data;
    }


    /**
     * Update Internal user status
     */
    public async updateInternalStatus(is_active: boolean, id: number): Promise<InternalUser | null> {
        const { internalUsers } = store.getState().internalUser;
        let count = internalUsers.count;
        const path = InternalUserConst.status(id)
        const response = await this.put(path, { is_active });
        SnackCustomBar.status(response, { display: !response.success });
        if (!response.success) return null;
        const data = response.data['data']['internal_user'];
        const values = [...internalUsers.rows];
        const index = values.findIndex(e => e.id === id);
        if (index !== -1) {
            values[index] = data;
            store.dispatch(setInternalUsers({ rows: values, count }))
        }
        return data;
    }


    /**
     * Send Invite Internal user
     */
    public async sendInvite(id: number): Promise<boolean> {
        const { internalUsers } = store.getState().internalUser;
        if (!id) return false;
        let count = internalUsers.count;
        const path = InternalUserConst.invite(id)
        const response = await this.post(path);
        SnackCustomBar.status(response, { display: !response.success });
        if (response.success) {
            const data = response.data['data']['internal_user'];
            const values = [...internalUsers.rows];
            const index = values.findIndex(e => e.id === id);
            if (index !== -1) {
                values[index] = data;
                store.dispatch(setInternalUsers({ rows: values, count }));
                store.dispatch(setInternalUser(data));
                return data;
            }
        }
        return response.success;
    }



    /**
     * Delete Internal user
     */
    public async deleteInternalUser(): Promise<boolean> {
        const { internalUsers, internalUser } = store.getState().internalUser;
        if (!internalUser) return false;
        let count = internalUsers.count;
        const response = await this.delete(`/${internalUser.id!}`);
        SnackCustomBar.status(response);
        if (!response.success) return false;
        store.dispatch(setInternalUser(null));
        const values = [...internalUsers.rows].filter(e => e.id !== internalUser.id);
        store.dispatch(setInternalUsers({ rows: values, count: --count }))
        return true;
    }

}

export default InternalUserRepository;