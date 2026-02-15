// Auto-generated from widgets/image_button.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .button import Button
// TODO(import): from .settings import BUTTON_ENABLED_COLOR


class ImageButton {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): is_pressed_var

    // TODO(docstring): Events:
        // TODO(docstring): press
    // TODO(docstring): """

    constructor(parent, x, y, *, img, u, v, **kwargs) {
        super().__init__(parent, x, y, 7, 7, **kwargs);
        this._img = img;
        this._u = u;
        this._v = v;

        // Set event listeners
        this.add_event_listener("draw", this.__on_draw);

    }
    _OnDraw() {
        pyxel.pal(BUTTON_ENABLED_COLOR, this.button_color);
        pyxel.blt(;
            // TODO(python): self.x,
            // TODO(python): self.y,
            // TODO(python): self._img,
            // TODO(python): self._u,
            // TODO(python): self._v,
            // TODO(python): self.width,
            // TODO(python): self.height,
            // TODO(python): 0,
        // TODO(python): )
        pyxel.pal();

    }
}