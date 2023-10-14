import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import { setUserGroups } from "@Store/user_store";
import User from "./end-points/user";

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

}

export default UserRepository;