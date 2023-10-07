import logger from "@Log/logger";
import { setAccessToken } from "@Store/account_store";
import { store } from "@Store/index";
import { Axios, AxiosResponse, InternalAxiosRequestConfig } from "axios";

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
    private async onResponse(value: AxiosResponse): Promise<AxiosResponse<any>> {
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


        return value;
    }
}

export default BaseRepository;