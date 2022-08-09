// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const oldError = global.console.error;

global.console = {
    ...console,
    debug: jest.fn(),
    warn: () => {
        console.trace("Warning log called in testing");
        throw new Error("");
    },
    error: (msg, e) => {
        oldError("Error occurred lower in the stack. This could be from the test or from the source code", msg);
        console.trace(e);
        throw new Error(e);
    },
};

global.restless = true;
