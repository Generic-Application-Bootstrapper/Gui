import _ from "lodash";
import { fetch } from "../Restless/Restless";
import { afterRequest, beforeRequest } from "./RestfulTools";
import { MAIN_API_NAME, SECONDARY_API_NAME, STATIC_RESOURCE_FILE } from "./DefaultConfigurations";

function _fetchBuilder(domain, url, configs) {
    let params = "";
    if (_.has(configs, "params")) {
        const urlSearchParameters = new URLSearchParams(_.get(configs, "params", "")).toString();
        params = "?" + urlSearchParameters;
    }
    return new URL(`${domain}${url}${params}`);
}

class _Restful {
    constructor(staticResourceFile = STATIC_RESOURCE_FILE) {
        this.resourcesUnresolved = fetch(staticResourceFile);
    }

    async _resolveResources() {
        const resources = await this.resourcesUnresolved;
        const resourcesObj = await resources.json();

        this.mainApi = resourcesObj[MAIN_API_NAME];
        this.secondaryApi = resourcesObj[SECONDARY_API_NAME];

        if (_.isNil(this.mainApi)) {
            throw new Error("No API layer stored");
        }
    }

    async _getApi(api = MAIN_API_NAME) {
        if (_.isNil(api)) {
            await this._resolveResources();
        }
        return api == MAIN_API_NAME ? this.mainApi : this.secondaryApi;
    }

    async delete(urlPath, configs, api) {
        const domain = await _getApi(api);
        let urlFull = _fetchBuilder(domain, urlPath, configs);
        let requestObj = { urlFull, urlPath, configs, api };
        beforeRequest(requestObj);

        const response = await fetch(urlFull, { method: "DELETE", ...configs });
        let responseObj = { ...response, data: response.json() };
        afterRequest(responseObj, requestObj);

        return responseObj;
    }

    async get(urlPath, configs, api) {
        const domain = await _getApi(api);
        let urlFull = _fetchBuilder(domain, urlPath, configs);
        let requestObj = { urlFull, urlPath, configs, api };
        beforeRequest(requestObj);

        const response = await fetch(urlFull, { method: "GET", ...configs });
        let responseObj = { ...response, data: response.json() };
        afterRequest(responseObj, requestObj);

        return responseObj;
    }

    async post(urlPath, data, configs, api) {
        const domain = await _getApi(api);
        let urlFull = _fetchBuilder(domain, urlPath, configs);
        let requestObj = { urlFull, urlPath, data, configs, api };
        beforeRequest(requestObj);

        const response = await fetch(urlFull, { method: "POST", ...configs, body: JSON.stringify(data) });
        let responseObj = { ...response, data: response.json() };
        afterRequest(responseObj, requestObj);

        return responseObj;
    }
}

const Restful = new _Restful();
export default Restful;
