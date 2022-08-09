import { ANY, MockResponse } from "../Restless/RestlessTools";

export const RESTFUL_API = {
    "/resource.json": {
        get: [
            {
                params: ANY,
                body: ANY,
                response: new MockResponse({
                    api: "http://localhost:8080",
                }),
            },
        ],
    },
};
