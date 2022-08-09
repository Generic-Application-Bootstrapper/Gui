import { fetch } from "../Restless/Restless";
import { afterRequest, beforeRequest, onErrorRequest } from "./RestfulTools";

require("dotenv").config();

export const MAIN_API_NAME = "api";
export const SECONDARY_API_NAME = "api";
export const STATIC_RESOURCE_FILE = "/resource.json";

export const DEFAULT_CONFIGURATIONS = {
    basePath: process.env.REACT_APP_SERVER,
    AccessToken: "<access token>",
    UserAgent: "<custom user-agent",
    Timeout: 500_000, // set timeout to 500,000 milliseconds
    middleware: [
        {
            pre: (request) => {
                beforeRequest(request);
            },
            post: ({ fetch, url, init, response }) => {
                afterRequest(response, { fetch, url, init });
            },
            onError: ({ fetch, url, init, error, response }) => {
                onErrorRequest(response, error, { fetch, url, init });
            },
        },
    ],
    fetchApi: fetch,
};

class _ConfigurationsSupplier {
    constructor() {
        this.config = DEFAULT_CONFIGURATIONS;
    }

    set beforeRequest(fn) {
        this.config.middleware[0].pre = fn;
    }
    set afterRequest(fn) {
        this.config.middleware[0].post = ({ fetch, url, init, response }) => fn(response, { fetch, url, init });
    }
    set onError(fn) {
        this.config.middleware[0].onError = ({ fetch, url, init, error, response }) =>
            fn(response, error, { fetch, url, init });
    }
}
const ConfigurationsSupplier = new _ConfigurationsSupplier();
export default ConfigurationsSupplier;
