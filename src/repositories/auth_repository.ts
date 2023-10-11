import AuthActivation from "@Models/auth_activation";
import BaseRepository from "./base_repository";
import Auth from "./end-points/auth";
import { store } from "@Store/index";
import { setAccount } from "@Store/account_store";
import UserLogin from "@Features/auth/login/entities/user_login";
import SnackCustomBar from "@Utils/snack_custom_bar";
import { RegisterAccount } from "@Features/auth/register/entities";

class AuthRepository extends BaseRepository {
    constructor() {
        super({ tag: Auth.auth });
    }

    /// Login
    public async login(user: UserLogin): Promise<boolean> {
        const path = Auth.login;
        const response = await this.post(path, user);
        if (response.success) store.dispatch(setAccount(response.data['data']));
        SnackCustomBar.status(response);
        return response.success;
    }

    /// Register
    public async register(account: RegisterAccount): Promise<boolean> {
        const path = Auth.register;
        const response = await this.post(path, account);
        const statusCode = response.status;
        SnackCustomBar.status(response);
        return statusCode === 200;
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

    /**
     * Forgot password
     * send activation code
     */
    public async forgotPassword(props: { email: string }): Promise<boolean> {
        const path = Auth.forgotPassword;
        const response = await this.post(path, props);
        const statusCode = response.status;
        SnackCustomBar.status(response);
        return statusCode === 200;
    }

    /**
     * Check reset-code
     */
    public async checkResetCode(props: { email: string, code: string }): Promise<any> {
        const path = Auth.forgotPasswordCheck;
        const response = await this.post(path, props);
        const statusCode = response.status;
        SnackCustomBar.status(response);
        return statusCode === 200;
    }

    /**
     * Check reset-code
     */
    public async resetPassword(props: { email: string, password: string, code: string }): Promise<any> {
        const path = Auth.forgotPassword;
        const response = await this.put(path, props);
        const statusCode = response.status;
        SnackCustomBar.status(response);
        return statusCode === 200;
    }

}

export default AuthRepository;