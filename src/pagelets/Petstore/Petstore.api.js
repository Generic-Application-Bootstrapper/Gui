import { ANY, MockResponse } from "../../utils/Rest/Restless/RestlessTools";

export const PET_STORE_API = {
    "/store/inventory": {
        get: [
            {
                params: ANY,
                body: ANY,
                response: new MockResponse([]),
            },
        ],
    },
};
