import { store } from "@Store/index";
import BaseRepository from "./base_repository";
import InternalUser from "./end-points/internal_user";
import { setInternalUserLayz, setInternalUsers } from "@Store/internal_user_store";

class InternalUserRepository extends BaseRepository {
    constructor() {
        super({ tag: InternalUser.internalUsers });
    }

    /**
     * Get Company internal user
     */
    public async getInternalUsers(): Promise<boolean> {
        store.dispatch(setInternalUserLayz(true));
        const response = await this.get("/");
        store.dispatch(setInternalUserLayz(false));
        if (response.success) {
            const data = response.data['data']['internal_users'];
            store.dispatch(setInternalUsers(data));
        }
        return response.success;
    }

}

export default InternalUserRepository;