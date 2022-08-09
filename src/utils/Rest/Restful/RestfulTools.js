function Event(name) {
    this.name = name;
    this.callbacks = [];
}
Event.prototype.registerCallback = function (callback) {
    this.callbacks.push(callback);
};

function _Reactor() {
    this.events = {};
}

_Reactor.prototype.registerEvent = function (eventName) {
    let event = new Event(eventName);
    this.events[eventName] = event;
};

_Reactor.prototype.dispatchEvent = function (eventName, eventArgs) {
    this.events[eventName].callbacks.forEach(function (callback) {
        callback(eventArgs);
    });
};

_Reactor.prototype.addEventListener = function (eventName, callback) {
    this.events[eventName].registerCallback(callback);
};

export const Reactor = new _Reactor();
Reactor.registerEvent("beforeRequest");
Reactor.registerEvent("afterRequest");
Reactor.registerEvent("onErrorRequest");

export function beforeRequest(request) {
    Reactor.dispatchEvent("beforeRequest", request);
    console.debug("Dispatching beforeRequest Event, with specs:", request);
}
export function afterRequest(response, request) {
    Reactor.dispatchEvent("afterRequest", response, request);
    console.debug("Dispatching afterRequest Event, with specs:", response, request);
}
export function onErrorRequest(response, error, request) {
    Reactor.dispatchEvent("onErrorRequest", response, error, request);
    console.debug("Dispatching onErrorRequest Event, with specs:", response, error, request);
}
