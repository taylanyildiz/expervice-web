import AuthActivation from "@Models/auth_activation";
import BaseRepository from "./base_repository";
import Auth from "./end-points/auth";
import { store } from "@Utils/hooks";
import { setAccount } from "@Utils/hooks/account_hooks";

class AuthRepository extends BaseRepository {
    constructor() {
        super({ tag: Auth.auth });
    }


    /**
     * Register Activation
     */
    public async activation(props: AuthActivation): Promise<boolean | string> {
        const path = Auth.activation;
        const response = await this.post(path, props);
        const statusCode = response.status;
        if (statusCode === 200) {
            const data = response.data;
            store.dispatch(setAccount(data))
        }
        const error = JSON.stringify(response.data?.error);
        const message = response.data?.['message'] ?? error;
        return statusCode === 200 ? true : message;
    }

}

export default AuthRepository;