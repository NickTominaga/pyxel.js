// Auto-generated from widgets/number_picker.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import INPUT_FIELD_COLOR, INPUT_TEXT_COLOR
// TODO(import): from .text_button import TextButton
// TODO(import): from .widget import Widget


class NumberPicker {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): value_var

    // TODO(docstring): Events:
        // TODO(docstring): change (value)
    // TODO(docstring): """

    constructor(parent, x, y, *, min_value, max_value, value, **kwargs) {
        this._number_len = max(len(str(min_value)), len(str(max_value)));
        let width = this._number_len * 4 + 21;
        super().__init__(parent, x, y, width, 7, **kwargs);
        this._min_value = min_value;
        this._max_value = max_value;

        // Initialize value_var
        this.new_var("value_var", value);
        this.add_var_event_listener("value_var", "set", this.__on_value_set);
        this.add_var_event_listener("value_var", "change", this.__on_value_change);

        // Initialize dec button
        this.dec_button = TextButton(self, 0, 0, text="-");
        this.dec_button.add_event_listener("press", this.__on_dec_button_press);

        // Initialize inc button
        this.inc_button = TextButton(self, this.width - 7, 0, text="+");
        this.inc_button.add_event_listener("press", this.__on_inc_button_press);

        // Set event listeners
        this.add_event_listener("draw", this.__on_draw);

    }
    _OnValueSet(value) {
        return min(max(value, this._min_value), this._max_value);

    }
    _OnValueChange(value) {
        this.dec_button.is_enabled_var = this.value_var > this._min_value;
        this.inc_button.is_enabled_var = this.value_var < this._max_value;
        this.trigger_event("change", value);

    }
    _OnDecButtonPress() {
        this.value_var -= 10 if pyxel.btn(pyxel.KEY_SHIFT) else 1;

    }
    _OnIncButtonPress() {
        this.value_var += 10 if pyxel.btn(pyxel.KEY_SHIFT) else 1;

    }
    _OnDraw() {
        pyxel.rect(this.x + 9, this.y, this.width - 18, this.height, INPUT_FIELD_COLOR);
        pyxel.text(;
            // TODO(python): self.x + 11,
            // TODO(python): self.y + 1,
            // TODO(python): ("{:>" + str(self._number_len) + "}").format(self.value_var),
            // TODO(python): INPUT_TEXT_COLOR,
        // TODO(python): )

    }
}