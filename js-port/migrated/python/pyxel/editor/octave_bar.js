// Auto-generated from octave_bar.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import OCTAVE_BAR_BACKGROUND_COLOR, OCTAVE_BAR_COLOR
// TODO(import): from .widgets import Widget


class OctaveBar {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): octave_var
        // TODO(docstring): help_message_var
    // TODO(docstring): """

    constructor(parent, x, y) {
        super().__init__(parent, x, y, 4, 123);
        this.field_cursor = parent.field_cursor;
        this.copy_var("octave_var", parent);
        this.copy_var("help_message_var", parent);

        // Set event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_drag", this.__on_mouse_drag);
        this.add_event_listener("mouse_hover", this.__on_mouse_hover);
        this.add_event_listener("draw", this.__on_draw);

    }
    _OnMouseDown(key, x, y) {
        if (key != pyxel.MOUSE_BUTTON_LEFT) {
            return;

        }
        if (this.field_cursor.y > 0) {
            this.field_cursor.move_to(this.field_cursor.x, 0, false);

        }
        this.octave_var = min(max(3 - ((y - this.y - 12) // 24), 0), 3);

    }
    _OnMouseDrag(key, x, y, dx, dy) {
        this.__on_mouse_down(key, x, y);

    }
    _OnMouseHover(x, y) {
        this.help_message_var = "OCTAVE:PAGEUP/PAGEDOWN";

    }
    _OnDraw() {
        let x = this.x + 1;
        let y = this.y + 1 + (3 - this.octave_var) * 24;

        pyxel.rect(this.x, this.y, this.width, this.height, OCTAVE_BAR_BACKGROUND_COLOR);
        pyxel.rect(x, y, 2, 47, OCTAVE_BAR_COLOR);

    }
}