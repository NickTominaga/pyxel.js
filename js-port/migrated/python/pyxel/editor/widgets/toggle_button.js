// Auto-generated from widgets/toggle_button.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import BUTTON_DISABLED_COLOR, BUTTON_ENABLED_COLOR, BUTTON_PRESSED_COLOR
// TODO(import): from .widget import Widget


class ToggleButton {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): is_checked_var

    // TODO(docstring): Events:
        // TODO(docstring): checked
        // TODO(docstring): unchecked
    // TODO(docstring): """

    constructor(parent, x, y, width, height, *, is_checked, **kwargs) {
        super().__init__(parent, x, y, width, height, **kwargs);

        // Initialize is_checked_var
        this.new_var("is_checked_var", is_checked);
        this.add_var_event_listener(;
            "is_checked_var", "change", this.__on_is_checked_change;
        // TODO(python): )

        // Initialize event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);

    }
    // TODO(python): @property
    buttonColor() {
        if (! this.is_enabled_var) {
            return BUTTON_DISABLED_COLOR;
        }
        else if (this.is_checked_var) {
            return BUTTON_PRESSED_COLOR;
        }
        else {
            return BUTTON_ENABLED_COLOR;

        }
    }
    _OnIsCheckedChange(value) {
        this.trigger_event("checked" if value else "unchecked");

    }
    _OnMouseDown(key, x, y) {
        if (key == pyxel.MOUSE_BUTTON_LEFT) {
            this.is_checked_var = ! this.is_checked_var;

        }
    }
}