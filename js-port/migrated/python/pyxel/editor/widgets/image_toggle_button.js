// Auto-generated from widgets/image_toggle_button.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import BUTTON_ENABLED_COLOR
// TODO(import): from .toggle_button import ToggleButton


class ImageToggleButton {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): is_checked_var

    // TODO(docstring): Events:
        // TODO(docstring): checked
        // TODO(docstring): unchecked
    // TODO(docstring): """

    constructor(parent, x, y, *, img, u, v, is_checked, **kwargs) {
        super().__init__(parent, x, y, 7, 7, is_checked=is_checked, **kwargs);
        this._img = img;
        this._u = u;
        this._v = v;

        // Set event listeners
        this.add_event_listener("draw", this.__on_draw);

    }
    _OnDraw() {
        pyxel.pal(BUTTON_ENABLED_COLOR, this.button_color);
        pyxel.blt(;
            this.x, this.y, this._img, this._u, this._v, this.width, this.height, 0;
        // TODO(python): )
        pyxel.pal();

    }
}