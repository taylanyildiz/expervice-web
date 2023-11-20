import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import { setCompany, setSubscription, setUserGroups } from "@Store/user_store";
import User from "./end-points/user";
import UserPassword from "@Features/summary/profile/entities/user_password";
import SnackCustomBar from "@Utils/snack_custom_bar";
import { setUser } from "@Store/account_store";
import UserProfile from "@Features/summary/profile/entities/user_profile";
import { deleteDeviceToken } from "@Utils/firebase";

class UserRepository extends BaseRepository {
    constructor() {
        super({ tag: User.users });
    }

    /**
     * Get user groups
     */
    public async getGroups(): Promise<boolean> {
        const path = User.groups;
        const response = await this.get(path);
        if (response.success) {
            const data = response.data['data']['groups'];
            store.dispatch(setUserGroups(data));
        }
        return response.success;
    }


    public async resetPassword(props: UserPassword): Promise<boolean> {
        const path = User.password;
        const response = await this.put(path, props);
        SnackCustomBar.status(response);
        return response.success;
    }

    public async updateProfile(props: UserProfile): Promise<boolean> {
        const path = User.profile;
        const response = await this.put(path, props);
        const success = response.success;
        if (success) {
            const data = response.data['data']['user'];
            store.dispatch(setUser(data));
        }
        return success;
    }

    public async deviceToken(token: string): Promise<boolean> {
        const path = User.devices;
        const response = await this.post(path, { device_token: token });
        const success = response.success;
        return success;
    }

    public async deleteToken(): Promise<boolean> {
        const path = User.devices;
        const response = await this.delete(path);
        const success = response.success;
        if (success) {
            await deleteDeviceToken();
        }
        return success;
    }

    public async company(): Promise<boolean> {
        const path = User.company;
        const response = await this.get(path);
        const success = response.success;
        if (success) {
            const data = response.data?.['data']?.['company'];
            store.dispatch(setCompany(data));
        }
        return success;
    }

    public async subscribtion(): Promise<boolean> {
        const path = User.subscription;
        const response = await this.get(path);
        const success = response.success;
        if (success) {
            const data = response.data?.['data']?.['subscription'];
            store.dispatch(setSubscription(data));
        }
        return success;
    }

}

export default UserRepository;