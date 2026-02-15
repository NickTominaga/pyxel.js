// Auto-generated from widgets/text_button.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .button import Button
// TODO(import): from .settings import BUTTON_TEXT_COLOR


class TextButton {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): is_pressed_var

    // TODO(docstring): Events:
        // TODO(docstring): press
    // TODO(docstring): """

    constructor(parent, x, y, *, text, **kwargs) {
        super().__init__(;
            // TODO(python): parent,
            // TODO(python): x,
            // TODO(python): y,
            // TODO(python): len(text) * pyxel.FONT_WIDTH + 3,
            // TODO(python): pyxel.FONT_HEIGHT + 1,
            // TODO(python): **kwargs,
        // TODO(python): )
        this._text = text;

        // Set event listeners
        this.add_event_listener("draw", this.__on_draw);

    }
    _OnDraw() {
        let x = this.x;
        let y = this.y;
        let w = this.width;
        let h = this.height;
        let col = this.button_color;

        pyxel.line(x + 1, y, x + w - 2, y, col);
        pyxel.rect(x, y + 1, w, h - 2, col);
        pyxel.line(x + 1, y + h - 1, x + w - 2, y + h - 1, col);
        pyxel.text(x + 2, y + 1, this._text, BUTTON_TEXT_COLOR);

    }
}