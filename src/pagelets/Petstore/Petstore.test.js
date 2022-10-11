import React from "react";
import render from "react-test-renderer";
import Petstore from "./Petstore";
import ConfigurationsSupplier from "../../utils/Rest/Restful/DefaultConfigurations";

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((initialState) => [initialState, setState]);

describe("Pet Store Pagelet", () => {
    it("Should get Store Inventory", () => {
        ConfigurationsSupplier.afterRequest = (response) => {
            expect(response.json()).toEqual([]);
        };

        render(Petstore());
    });
});
