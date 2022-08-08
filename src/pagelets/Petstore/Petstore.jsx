import { StoreApi } from "../../gen/index.ts";
import { DEFAULT_CONFIGURATIONS } from "../../utils/Rest/Restful/DefaultConfigurations";

function Petstore() {
    console.log(StoreApi);
    let x = new StoreApi(DEFAULT_CONFIGURATIONS);
    console.log(x);
    x.getInventory();
    return (
        <div className="Petstore">
            <header className="Petstore-header">
                <p>Petstore</p>
            </header>
            <p>Petstore</p>
        </div>
    );
}

export default Petstore;
