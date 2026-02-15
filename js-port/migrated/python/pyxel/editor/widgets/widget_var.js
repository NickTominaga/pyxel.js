// Auto-generated from widgets/widget_var.py
// NOTE: Manual review required for runtime parity.

class WidgetVar {
    // TODO(docstring): """
    // TODO(docstring): Events:
        // TODO(docstring): get (value) -> value
        // TODO(docstring): set (value) -> value
        // TODO(docstring): change (value)
    // TODO(docstring): """

    constructor(value) {
        this._value = value;
        this._event_listeners = {"get": [], "set": [], "change": []};

    }
    get() {
        let value = this._value;
        for (const listener of this._event_listeners["get"]) {
            let value = listener(value);

        }
        return value;

    }
    set(value) {
        for (const listener of this._event_listeners["set"]) {
            let value = listener(value);

        }
        if (this._value == value) {
            return;

        }
        this._value = value;

        for (const listener of this._event_listeners["change"]) {
            listener(value);

        }
    }
    addEventListener(event, listener) {
        this._event_listeners[event].append(listener);

    }
    removeEventListener(event, listener) {
        this._event_listeners[event].remove(listener);

    }
}