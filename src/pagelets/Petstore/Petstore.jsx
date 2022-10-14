// import { useEffect } from "react";
import React from "react";
import { StoreApi } from "../../gen/index";
import ConfigurationsSupplier from "../../utils/Rest/Restful/DefaultConfigurations";

function Petstore() {
    let storeFront = new StoreApi(ConfigurationsSupplier.config);
    storeFront.getInventory();

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
