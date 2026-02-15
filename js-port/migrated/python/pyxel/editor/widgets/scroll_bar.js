// Auto-generated from widgets/scroll_bar.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .button import Button
// TODO(import): from .settings import WIDGET_BACKGROUND_COLOR, WIDGET_PANEL_COLOR
// TODO(import): from .widget import Widget


class ScrollBar {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): value_var

    // TODO(docstring): Events:
        // TODO(docstring): change (value)
    // TODO(docstring): """

    def __init__(;
        // TODO(python): self,
        // TODO(python): parent,
        // TODO(python): x,
        // TODO(python): y,
        // TODO(python): *,
        // TODO(python): width=None,
        // TODO(python): height=None,
        // TODO(python): scroll_amount,
        // TODO(python): slider_amount,
        // TODO(python): value,
        // TODO(python): with_shadow=True,
        // TODO(python): **kwargs,
    // TODO(python): ):
        if (width === null && height === null || width !== null && height !== null) {
            // TODO(python): raise ValueError("Either width or height should be specified")

    }
        if (height !== null) {
            let width = 7;
            this._is_vertical = true;
    }
        else {
            let height = 7;
            this._is_vertical = false;

    }
        super().__init__(parent, x, y, width, height, **kwargs);
        this.scroll_amount = scroll_amount;
        this.slider_amount = slider_amount;
        this._with_shadow = with_shadow;
        this._drag_offset = 0;
        this._is_dragged = false;

        // Initialize value_var
        this.new_var("value_var", value);
        this.add_var_event_listener("value_var", "set", this.__on_value_set);
        this.add_var_event_listener("value_var", "change", this.__on_value_change);

        // Initialize dec button
        if (this._is_vertical) {
            let btn_w = 7;
            let btn_h = 6;
    }
        else {
            let btn_w = 6;
            let btn_h = 7;
    }
        this.dec_button = Button(self, 0, 0, btn_w, btn_h);
        this.dec_button.add_event_listener("press", this.__on_dec_button_press);

        // Initialize inc button
        if (this._is_vertical) {
            let inc_x = 0;
            let inc_y = height - 6;
    }
        else {
            let inc_x = width - 6;
            let inc_y = 0;
    }
        this.inc_button = Button(self, inc_x, inc_y, btn_w, btn_h);
        this.inc_button.add_event_listener("press", this.__on_inc_button_press);

        // Set event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_up", this.__on_mouse_up);
        this.add_event_listener("mouse_drag", this.__on_mouse_drag);
        this.add_event_listener("mouse_repeat", this.__on_mouse_repeat);
        this.add_event_listener("draw", this.__on_draw);

    // TODO(python): @property
    ScrollSize() {
        return (this.height if this._is_vertical else this.width) - 14;

    }
    // TODO(python): @property
    SliderSize() {
        return round(this._scroll_size * this.slider_amount / this.scroll_amount);

    }
    // TODO(python): @property
    SliderPos() {
        return round(7 + this._scroll_size * this.value_var / this.scroll_amount);

    }
    _OnValueSet(value) {
        return min(max(value, 0), this.scroll_amount);

    }
    _OnValueChange(value) {
        this.trigger_event("change", value);

    }
    _OnDecButtonPress() {
        this.value_var = max(this.value_var - 1, 0);

    }
    _OnIncButtonPress() {
        this.value_var = min(;
            this.value_var + 1, this.scroll_amount - this.slider_amount;
        // TODO(python): )

    }
    _OnMouseDown(key, x, y) {
        if (key != pyxel.MOUSE_BUTTON_LEFT) {
            return;

        }
        x -= this.x;
        y -= this.y;
        this._drag_offset = (y if this._is_vertical else x) - this._slider_pos;
        if (this._drag_offset < 0) {
            this.__on_dec_button_press();
        }
        else if (this._drag_offset >= this._slider_size) {
            this.__on_inc_button_press();
        }
        else {
            this._is_dragged = true;

        }
    }
    _OnMouseUp(key, x, y) {
        this._is_dragged = false;

    }
    _OnMouseDrag(key, x, y, dx, dy) {
        if (! this._is_dragged) {
            return;

        }
        x -= this.x;
        y -= this.y;
        let drag_pos = y if this._is_vertical else x;
        // TODO(python): value = (
            (drag_pos - this._drag_offset - 6) * this.scroll_amount / this._scroll_size;
        // TODO(python): )
        this.value_var = int(;
            min(max(value, 0), this.scroll_amount - this.slider_amount);
        // TODO(python): )

    }
    _OnMouseRepeat(key, x, y) {
        if (! this._is_dragged) {
            this.__on_mouse_down(key, x, y);

        }
    }
    _OnDraw() {
        let x = this.x;
        let y = this.y;
        let w = this.width;
        let h = this.height;
        this.draw_panel(x, y, w, h, with_shadow=this._with_shadow);
        let inc_col = 6 if this.inc_button.is_pressed_var else WIDGET_BACKGROUND_COLOR;
        let dec_col = 6 if this.dec_button.is_pressed_var else WIDGET_BACKGROUND_COLOR;

        if (this._is_vertical) {
            // Draw border
            pyxel.rect(x + 1, y + 1, w - 2, 4, dec_col);
            pyxel.rect(x + 1, y + 6, w - 2, h - 12, WIDGET_BACKGROUND_COLOR);
            pyxel.rect(x + 1, y + h - 5, w - 2, 4, inc_col);

            // Draw up arrow
            pyxel.pset(x + 3, y + 2, WIDGET_PANEL_COLOR);
            pyxel.line(x + 2, y + 3, x + w - 3, y + 3, WIDGET_PANEL_COLOR);

            // Draw down arrow
            pyxel.pset(x + 3, y + h - 3, WIDGET_PANEL_COLOR);
            pyxel.line(x + 2, y + h - 4, x + w - 3, y + h - 4, WIDGET_PANEL_COLOR);

            // Draw slider
            pyxel.rect(;
                // TODO(python): self.x + 2,
                // TODO(python): self.y + self._slider_pos,
                // TODO(python): 3,
                // TODO(python): self._slider_size,
                // TODO(python): WIDGET_PANEL_COLOR,
            // TODO(python): )
        }
        else {
            // Draw border
            pyxel.rect(x + 1, y + 1, 4, h - 2, dec_col);
            pyxel.rect(x + 6, y + 1, w - 12, h - 2, WIDGET_BACKGROUND_COLOR);
            pyxel.rect(x + w - 5, y + 1, 4, h - 2, inc_col);

            // Draw left arrow
            pyxel.pset(x + 2, y + 3, WIDGET_PANEL_COLOR);
            pyxel.line(x + 3, y + 2, x + 3, y + h - 3, WIDGET_PANEL_COLOR);

            // Draw right arrow
            pyxel.pset(x + w - 3, y + h - 4, WIDGET_PANEL_COLOR);
            pyxel.line(x + w - 4, y + 2, x + w - 4, y + h - 3, WIDGET_PANEL_COLOR);

            // Draw slider
            pyxel.rect(;
                // TODO(python): self.x + self._slider_pos,
                // TODO(python): self.y + 2,
                // TODO(python): self._slider_size,
                // TODO(python): 3,
                // TODO(python): WIDGET_PANEL_COLOR,
            // TODO(python): )

        }
    }
}