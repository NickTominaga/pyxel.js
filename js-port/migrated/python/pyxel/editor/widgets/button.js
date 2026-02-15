// Auto-generated from widgets/button.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import (
    // TODO(python): BUTTON_DISABLED_COLOR,
    // TODO(python): BUTTON_ENABLED_COLOR,
    // TODO(python): BUTTON_PRESSED_COLOR,
    // TODO(python): BUTTON_PRESSING_TIME,
// TODO(python): )
// TODO(import): from .widget import Widget


class Button {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): is_pressed_var

    // TODO(docstring): Events:
        // TODO(docstring): press
    // TODO(docstring): """

    constructor(parent, x, y, width, height, **kwargs) {
        super().__init__(parent, x, y, width, height, **kwargs);
        this._pressing_time = 0;

        // Initialize is_pressed_var
        this.new_var("is_pressed_var", null);
        this.add_var_event_listener("is_pressed_var", "get", this.__on_is_pressed_get);
        this.add_var_event_listener("is_pressed_var", "set", this.__on_is_pressed_set);

        // Set event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_repeat", this.__on_mouse_down);
        this.add_event_listener("mouse_up", this.__on_mouse_up);
        this.add_event_listener("update", this.__on_update);

    }
    // TODO(python): @property
    buttonColor() {
        if (! this.is_enabled_var) {
            return BUTTON_DISABLED_COLOR;
        }
        else if (this.is_pressed_var) {
            return BUTTON_PRESSED_COLOR;
        }
        else {
            return BUTTON_ENABLED_COLOR;

        }
    }
    _OnIsPressedGet(value) {
        return this._pressing_time > 0;

    }
    _OnIsPressedSet(value) {
        if (value) {
            this._pressing_time = BUTTON_PRESSING_TIME + 1;
            this.trigger_event("press");
        }
        else {
            this._pressing_time = 0;
        }
        return null;

    }
    _OnMouseDown(key, x, y) {
        if (key == pyxel.MOUSE_BUTTON_LEFT) {
            this.is_pressed_var = true;

        }
    }
    _OnMouseUp(key, x, y) {
        if (key == pyxel.MOUSE_BUTTON_LEFT) {
            this.is_pressed_var = false;

        }
    }
    _OnUpdate() {
        if (this._pressing_time > 0) {
            this._pressing_time -= 1;

        }
    }
}