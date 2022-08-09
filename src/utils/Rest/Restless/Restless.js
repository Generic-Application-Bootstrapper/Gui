import _ from "lodash";
import RestlessMapper from "./RestlessMapper";
import "isomorphic-fetch";
import { ANY } from "./RestlessTools";

let fetch;

function showError(msg, path, method, providedParams, providedBody) {
    throw new Error(`${msg}, with the following specs:\n
    Provided URL path: ${path}\n
    Provided Method: ${method}\n
    Provuded Request Parameters: ${providedParams}\n
    Provuded Request Body ${providedBody}\n`);
}

if (localStorage.getItem("MockRest") || (typeof global !== "undefined" && _.get(global, "restless"))) {
    console.debug("Restless Mocking");
    global.fetch = (url, options) => {
        let urlObj;
        let path;
        let providedParams = {};
        try {
            urlObj = new URL(url);
            path = urlObj.pathname;
            _.forEach(Array.from(urlObj.searchParams), (keyvalue) => {
                providedParams[keyvalue[0]] = keyvalue[1];
            });
        } catch (e) {
            urlObj = url;
            path = String(url);
        }

        const providedBody = _.get(options, "body");
        const method = _.toLower(_.get(options, "method", "get"));
        if (_.isNil(method)) {
            showError("No match on method type", path, method, providedParams, providedBody);
        }

        const endpoint = _.get(RestlessMapper, `["${path}"].${method}`);
        if (_.isNil(endpoint)) {
            showError("No match on endpoint", path, method, providedParams, providedBody);
        }

        const scenerios = _.filter(endpoint, ({ params, body }) => {
            const paramsParityLen = _.chain(providedParams)
                .filter(
                    (field, key) =>
                        (_.includes(_.keys(params), key) && String(params[key]) == field) || params[key] === ANY,
                )
                .size()
                .value();

            const bodyParityLen = _.chain(providedBody)
                .filter(
                    (field, key) => (_.includes(_.keys(body), key) && String(body[key]) == field) || body[key] === ANY,
                )
                .size()
                .value();

            if (params !== ANY && paramsParityLen !== _.size(providedParams)) {
                return false;
            } else if (body !== ANY && bodyParityLen !== _.size(providedBody)) {
                return false;
            }
            return true;
        });

        if (_.isEmpty(scenerios)) {
            showError("No Mock APIs found");
        } else if (_.isEmpty(scenerios)) {
            showError("Multiple Mock APIs found");
        }

        const scenerio = _.head(scenerios);
        return new Promise((resolve) => {
            if (_.isFunction(scenerio.response)) {
                resolve(
                    scenerio.response({
                        url,
                        path,
                        params: providedParams,
                        body: providedBody,
                        scenerio,
                        method,
                    }),
                );
            } else {
                resolve(scenerio.response);
            }
        });
    };
    fetch = global.fetch;
} else {
    fetch = window.fetch;
}

export { fetch };
