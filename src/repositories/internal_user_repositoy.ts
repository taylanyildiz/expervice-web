import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import InternalUserConst from "./end-points/internal_user";
import { setInternalUser, setInternalUserLayz, setInternalUsers } from "@Store/internal_user_store";
import InternalUserProcess from "@Features/summary/users/internal-users/entities/internal_user_process";
import SnackCustomBar from "@Utils/snack_custom_bar";
import InternalUserUpdate from "@Features/summary/users/internal-users/entities/internal_user_update";
import InternalUserPermission from "@Features/summary/users/internal-users/entities/internal_user_permission";
import InternalUser from "@Models/internal-user/internal_user";

class InternalUserRepository extends BaseRepository {
    constructor() {
        super({ tag: InternalUserConst.internalUsers });
    }

    /**
     * Get Company internal user
     */
    public async getInternalUsers(): Promise<boolean> {
        const { filter } = store.getState().internalUser;
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
        const response = await this.post("/", user);
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['internal_user'];
        return data;
    }


    /**
     * Update Internal user
     */
    public async updateInternalUser(user: InternalUserUpdate): Promise<InternalUser | null> {
        const path = InternalUserConst.user(user.id)
        const response = await this.put(path, { ...user });
        SnackCustomBar.status(response);
        if (!response.success) return null;
        const data = response.data['data']['internal_user'];
        return data;
    }

    /**
     * Update Internal user permissions
     */
    public async updateInternalPermissions(user: InternalUserPermission): Promise<InternalUser | null> {
        const { internalUser } = store.getState().internalUser;
        const path = InternalUserConst.permissions(internalUser!.id!)
        const response = await this.put(path, { ...user });
        SnackCustomBar.status(response, { display: !response.success });
        if (!response.success) return null;
        const data = response.data['data']['internal_user'];
        return data;
    }


    /**
     * Update Internal user status
     */
    public async updateInternalStatus(is_active: boolean): Promise<InternalUser | null> {
        const { internalUser } = store.getState().internalUser;
        const path = InternalUserConst.status(internalUser!.id!)
        const response = await this.put(path, { is_active });
        SnackCustomBar.status(response, { display: !response.success });
        if (!response.success) return null;
        const data = response.data['data']['internal_user'];
        return data;
    }


    /**
     * Send Invite Internal user
     */
    public async sendInvite(): Promise<InternalUser | null> {
        const { internalUser } = store.getState().internalUser;
        const path = InternalUserConst.invite(internalUser!.id!)
        const response = await this.post(path);
        SnackCustomBar.status(response, { display: !response.success });
        if (!response.success) return null;
        const data = response.data['data']['internal_user'];
        return data;
    }



    /**
     * Delete Internal user
     */
    public async deleteInternalUser(): Promise<boolean> {
        const { internalUser } = store.getState().internalUser;
        if (!internalUser) return false;
        const response = await this.delete(`/${internalUser.id!}`);
        SnackCustomBar.status(response);
        if (!response.success) return false;
        store.dispatch(setInternalUser(null));
        return true;
    }

}

export default InternalUserRepository;