import logger from "@Log/logger";
import { setAccessToken } from "@Store/account_store";
import { store } from "@Store/index";
import { Axios, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

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
                "x-access-token": store.getState().account.accessToken,
            },
            transformResponse: (e) => {
                return JSON.parse(e);
            },
            transformRequest: (e) => {
                return JSON.stringify(e);
            },
            validateStatus: (_) => true,
        });

        // Bind the methods to the class instance
        this.onRequest = this.onRequest.bind(this);
        this.onResponse = this.onResponse.bind(this);

        // Listen interceptors
        this.interceptors.request.use(this.onRequest);
        this.interceptors.response.use(this.onResponse);
    }

    /// On request listen
    private async onRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig<any>> {
        logger.info(
            "\n******************************\n" +
            "REQUEST INFO \n" +
            `TYPE     => ${config.method}\n` +
            `BASEURL  => ${config.baseURL}\n` +
            `URL      => ${config.url}\n` +
            `BODY     => ${JSON.stringify(config.data)}\n` +
            `PARAMS   => ${JSON.stringify(config.params)}\n` +
            "******************************\n"
        );

        const data = config.data;
        if (data) {
            for (var [key, value] of Object.entries(data)) {
                if (!value) {
                    delete config.data[key];
                }
            }
        }

        return config;
    }

    /// On reponse listen
    private async onResponse(value: AxiosResponse): Promise<AxiosResponse<any> & { success: boolean }> {
        logger.info(
            "\n******************************\n" +
            "RESPONSE INFO \n" +
            `TYPE     => ${value.config.method}\n` +
            `STATUS   => ${value.status}\n` +
            `BASEURL  => ${value.config.baseURL}\n` +
            `URL      => ${value.config.url}\n` +
            `BODY     => ${JSON.stringify(value.data)}\n` +
            "******************************\n"
        );

        /// Refresh token
        if (value.status === 401) {
            const refresh_token = store.getState().account.refreshToken;
            const response = await this.request({
                baseURL: import.meta.env.VITE_API_URL,
                url: "/users/token",
                method: "POST",
                data: { refresh_token },
            });
            if (response.status === 200) {
                const access_token = response.data['data']['access_token'];
                store.dispatch(setAccessToken(access_token));
                value = await this.request({
                    method: value.config.method,
                    data: value.config.data,
                    params: value.config.params,
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                        "x-access-token": access_token,
                    },
                });
            }
        }


        const successCodes = [200, 201];
        const success = successCodes.includes(value.status);
        return Object.assign({}, value, { success });
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