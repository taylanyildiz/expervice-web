// import logger from "@Log/logger";
import { logout, setAccessToken } from "@Store/account_store";
import { store } from "@Store/index";
import SnackCustomBar from "@Utils/snack_custom_bar";
import { Axios, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

type Function = (e: any) => void;
let isRefreshing = false;
let refreshSubscribers: { callback: Function, path: any }[] = [];

interface SuccessParams {
    success: boolean;
}

abstract class BaseRepository extends Axios {

    /// Constructor of [BaseRepository]
    constructor(props?: { baseUrl?: string, tag?: string }) {

        /// Base URL
        let url = props?.baseUrl ?? import.meta.env.VITE_API_URL;
        if (props?.tag) url += props.tag;

        /// Configuration axios
        super({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "x-access-token": store.getState().account?.accessToken,
                "x-accept-lang": store.getState().user?.language?.language_code ?? "en",
            },
            transformResponse: (e) => {
                try {
                    return JSON.parse(e);
                } catch (error) {
                    return { message: 'Something Wrong' };
                }
            },
            transformRequest: (e) => {
                if (e instanceof FormData) {
                    return e;
                }
                return JSON.stringify(e);
            },
            validateStatus: (status) => status !== 401,
        });

        // Bind the methods to the class instance
        this.onRequest = this.onRequest.bind(this);
        this.onResponse = this.onResponse.bind(this);
        this.onRejected = this.onRejected.bind(this);

        // Listen interceptors
        this.interceptors.request.use(this.onRequest);
        this.interceptors.response.use(this.onResponse, this.onRejected);
    }

    /// On request listen
    private async onRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig<any>> {
        // logger.info(
        //     "\n******************************\n" +
        //     "REQUEST INFO \n" +
        //     `TYPE     => ${config.method}\n` +
        //     `BASEURL  => ${config.baseURL}\n` +
        //     `URL      => ${config.url}\n` +
        //     `BODY     => ${JSON.stringify(config.data)}\n` +
        //     `PARAMS   => ${JSON.stringify(config.params)}\n` +
        //     "******************************\n"
        // );

        const data = config.data;
        if (data) {
            for (var [key, value] of Object.entries(data)) {
                if (typeof value !== 'boolean') {
                    if ((!value || value === '') || (Array.isArray(value) && value.length === 0)) {
                        delete config.data[key];
                    }
                }
            }
        }

        return config;
    }

    /// On reponse listen
    private async onResponse(value: AxiosResponse): Promise<AxiosResponse<any> & { success: boolean }> {
        // logger.info(
        //     "\n******************************\n" +
        //     "RESPONSE INFO \n" +
        //     `TYPE     => ${value.config.method}\n` +
        //     `STATUS   => ${value.status}\n` +
        //     `BASEURL  => ${value.config.baseURL}\n` +
        //     `URL      => ${value.config.url}\n` +
        //     `BODY     => ${JSON.stringify(value.data)}\n` +
        //     "******************************\n"
        // );

        const successCodes = [200, 201];
        const success = successCodes.includes(value.status);
        return Object.assign({}, value, { success });
    }

    /// Reponse error
    /// Only [401] Authorization Error
    private async onRejected(error: any): Promise<any> {
        const refresh_token = store.getState().account.refreshToken;
        const originalRequest = error.config;

        if (isRefreshing) {
            return new Promise((resolve) => {
                refreshSubscribers.push({
                    callback: (token: string) => {
                        originalRequest.headers['x-access-token'] = token;
                        resolve(this.request(originalRequest));
                    },
                    path: originalRequest,
                });
            });
        }
        isRefreshing = true;

        const response = await this.request({
            baseURL: import.meta.env.VITE_API_URL,
            url: "/users/token",
            method: "POST",
            data: { refresh_token },
        });
        SnackCustomBar.status(response, { display: response.status !== 200 })

        try {
            const response = await this.request({
                baseURL: import.meta.env.VITE_API_URL,
                url: "/users/token",
                method: "POST",
                data: { refresh_token },
            });
            if (response.status === 200) {
                const access_token = response.data['data']['access_token'];
                store.dispatch(setAccessToken(access_token));
                originalRequest.headers['x-access-token'] = access_token;
                refreshSubscribers.forEach(({ callback }) => callback(access_token));
                refreshSubscribers = [];
                return this.request(originalRequest);
            }
        } catch (_) {
            store.dispatch(logout());
            window.location.reload();
            return Object.assign({}, error.response, { success: false });
        } finally {
            isRefreshing = false;
        }

        store.dispatch(logout());
        return Object.assign({}, error.response, { success: false });
    }

    /**
     * Get Request
     * @param url 
     * @param config 
     * @returns 
     */
    public async get<T = any, R = AxiosResponse<T, any>, D = any>(url: string, config?: AxiosRequestConfig<D> | undefined): Promise<R & SuccessParams> {
        return await this.request({
            method: "get",
            url,
            ...config
        });
    }

    /**
     * Post Request
     * @param url 
     * @param data 
     * @param config 
     * @returns 
     */
    public async post<T = any, R = AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined): Promise<R & SuccessParams> {
        return await this.request({
            method: "post",
            url,
            data: data,
            ...config,
        });
    }

    /**
     * Update Request
     * @param url 
     * @param data 
     * @param config 
     * @returns 
     */
    public async put<T = any, R = AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined): Promise<R & SuccessParams> {
        return await this.request({
            method: "put",
            url,
            data: data,
            ...config
        });
    }

    /**
     * Delete Request
     * @param url 
     * @param config 
     * @returns 
     */
    public async delete<T = any, R = AxiosResponse<T, any>, D = any>(url: string, config?: AxiosRequestConfig<D> | undefined): Promise<R & SuccessParams> {
        return await this.request({
            method: "delete",
            url,
            ...config
        });
    }

}

export default BaseRepository;