// Auto-generated from widgets/radio_button.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import BUTTON_ENABLED_COLOR, BUTTON_PRESSED_COLOR
// TODO(import): from .widget import Widget


class RadioButton {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): value_var

    // TODO(docstring): Events:
        // TODO(docstring): change (value)
    // TODO(docstring): """

    constructor(parent, x, y, *, img, u, v, num_buttons, value, **kwargs) {
        super().__init__(parent, x, y, num_buttons * 9 - 2, 7, **kwargs);
        this._img = img;
        this._u = u;
        this._v = v;
        this._num_buttons = num_buttons;

        // Initialize value_var
        this.new_var("value_var", value);
        this.add_var_event_listener("value_var", "change", this.__on_value_change);

        // Initialize event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_drag", this.__on_mouse_drag);
        this.add_event_listener("draw", this.__on_draw);

    }
    checkValue(x, y) {
        x -= this.x;
        y -= this.y;

        let index = min(max(x // 9, 0), this._num_buttons - 1);
        let x1 = index * 9;
        let y1 = 0;
        let x2 = x1 + 6;
        let y2 = y1 + 6;

        return index if x1 <= x <= x2 && y1 <= y <= y2 else null;

    }
    _OnValueChange(value) {
        this.trigger_event("change", value);

    }
    _OnMouseDown(key, x, y) {
        if (key != pyxel.MOUSE_BUTTON_LEFT) {
            return;

        }
        let value = this.check_value(x, y);
        if (value !== null) {
            this.value_var = value;

        }
    }
    _OnMouseDrag(key, x, y, dx, dy) {
        this.__on_mouse_down(key, x, y);

    }
    _OnDraw() {
        pyxel.blt(;
            // TODO(python): self.x,
            // TODO(python): self.y,
            // TODO(python): self._img,
            // TODO(python): self._u,
            // TODO(python): self._v,
            // TODO(python): self.width,
            // TODO(python): self.height,
        // TODO(python): )

        pyxel.pal(BUTTON_ENABLED_COLOR, BUTTON_PRESSED_COLOR);
        pyxel.blt(;
            // TODO(python): self.x + self.value_var * 9,
            // TODO(python): self.y,
            // TODO(python): self._img,
            // TODO(python): self._u + self.value_var * 9,
            // TODO(python): self._v,
            // TODO(python): 7,
            // TODO(python): 7,
        // TODO(python): )
        pyxel.pal();

    }
}