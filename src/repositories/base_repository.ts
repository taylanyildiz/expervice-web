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
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            transformResponse: (e) => {
                return JSON.parse(e);
            },
            validateStatus: (_) => true,
        });

        /// Listen interceptors
        this.interceptors.request.use(this.onRequest);
        this.interceptors.response.use(this.onResponse);
    }

    /// On request listen
    private async onRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig<any>> {
        return config;
    }

    /// On reponse listen
    private async onResponse(value: AxiosResponse): Promise<AxiosResponse<any>> {
        return value;
    }
}

export default BaseRepository;