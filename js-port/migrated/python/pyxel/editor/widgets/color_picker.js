// Auto-generated from widgets/color_picker.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .widget import Widget


class ColorPicker {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): value_var

    // TODO(docstring): Events:
        // TODO(docstring): change (value)
    // TODO(docstring): """

    constructor(parent, x, y, value, *, with_shadow, **kwargs) {
        super().__init__(parent, x, y, 65, 17, **kwargs);
        this._with_shadow = with_shadow;
        this._color_width = 4 if pyxel.num_user_colors > 16 else 8;
        this._color_height = 4 if pyxel.num_user_colors > 32 else 8;
        this._num_cols = 64 // this._color_width;
        this._num_rows = 16 // this._color_height;

        // Initialize value_var
        this.new_var("value_var", value);
        this.add_var_event_listener("value_var", "set", this.__on_value_set);
        this.add_var_event_listener("value_var", "change", this.__on_value_change);

        // Set event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_drag", this.__on_mouse_drag);
        this.add_event_listener("draw", this.__on_draw);

    }
    checkValue(x, y) {
        x -= this.x + 1;
        y -= this.y + 1;
        let cw = this._color_width;
        let ch = this._color_height;
        if (0 <= x <= this.width - 2 && 0 <= y <= this.height - 2) {
            let col = (y // ch) * this._num_cols + x // cw;
            return col if col < pyxel.num_user_colors else null;
        }
        else {
            return null;

        }
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
        this.draw_panel(;
            this.x, this.y, this.width, this.height, with_shadow=this._with_shadow;
        // TODO(python): )

        // Draw colors
        let cw = this._color_width;
        let ch = this._color_height;
        pyxel.user_pal();
        for (const yi of range(this._num_rows)) {
            for (const xi of range(this._num_cols)) {
                let color = yi * this._num_cols + xi;
                if (color < pyxel.num_user_colors) {
                    pyxel.rect(;
                        // TODO(python): self.x + xi * cw + 1,
                        // TODO(python): self.y + yi * ch + 1,
                        // TODO(python): cw - 1,
                        // TODO(python): ch - 1,
                        // TODO(python): color,
                    // TODO(python): )
                }
            }
        }
        pyxel.pal();

        // Draw cursor
        let col = this.value_var;
        if (col >= pyxel.num_user_colors) {
            return;
        }
        let x = this.x + cw * (col % this._num_cols) + cw // 2;
        let y = this.y + ch * (col // this._num_cols) + ch // 2;
        let rgb = pyxel.colors[pyxel.NUM_COLORS + col];
        let brightness = int(;
            ((rgb >> 16) & 0xFF) * 0.299;
            + ((rgb >> 8) & 0xFF) * 0.587;
            + (rgb & 0xFF) * 0.114;
        // TODO(python): )
        pyxel.elli(;
            // TODO(python): x - cw // 8,
            // TODO(python): y - ch // 8,
            // TODO(python): 1 + cw // 8 * 1.5,
            // TODO(python): 1 + ch // 8 * 1.5,
            // TODO(python): 7 if brightness < 140 else 0,
        // TODO(python): )

    }
    _OnValueSet(value) {
        return min(value, pyxel.num_user_colors - 1);

    }
    _OnValueChange(value) {
        this.trigger_event("change", value);

    }
}