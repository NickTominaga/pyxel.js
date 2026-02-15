// Auto-generated from sound_field.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import (
    // TODO(python): EDITOR_IMAGE,
    // TODO(python): MAX_SOUND_LENGTH,
    // TODO(python): SOUND_FIELD_CURSOR_EDIT_COLOR,
    // TODO(python): SOUND_FIELD_CURSOR_SELECT_COLOR,
    // TODO(python): SOUND_FIELD_DATA_NORMAL_COLOR,
    // TODO(python): SOUND_FIELD_DATA_SELECT_COLOR,
    // TODO(python): TEXT_LABEL_COLOR,
// TODO(python): )
// TODO(import): from .widgets import Widget
// TODO(import): from .widgets.settings import WIDGET_HOLD_TIME, WIDGET_REPEAT_TIME

let TONE_KEY_TABLE = [pyxel.KEY_T, pyxel.KEY_S, pyxel.KEY_P, pyxel.KEY_N];
// TODO(python): EFFECT_KEY_TABLE = [
    // TODO(python): pyxel.KEY_N,
    // TODO(python): pyxel.KEY_S,
    // TODO(python): pyxel.KEY_V,
    // TODO(python): pyxel.KEY_F,
    // TODO(python): pyxel.KEY_H,
    // TODO(python): pyxel.KEY_Q,
// TODO(python): ]


class SoundField {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): is_playing_var
        // TODO(docstring): help_message_var
    // TODO(docstring): """

    constructor(parent) {
        super().__init__(parent, 30, 149, 193, 23);
        this.field_cursor = parent.field_cursor;
        this.get_field = parent.get_field;
        this.get_field_help_message = parent.get_field_help_message;
        this.copy_var("is_playing_var", parent);
        this.copy_var("help_message_var", parent);

        // Set event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_hover", this.__on_mouse_hover);
        this.add_event_listener("update", this.__on_update);
        this.add_event_listener("draw", this.__on_draw);

    }
    ScreenToView(x, y) {
        let x = min(max((x - this.x - 1) // 4, 0), MAX_SOUND_LENGTH - 1);
        let y = min(max((y - this.y) // 8, 0), 2);
        return x, y;

    }
    _OnMouseDown(key, x, y) {
        if (key != pyxel.MOUSE_BUTTON_LEFT || this.is_playing_var) {
            return;

        }
        x, y = this._screen_to_view(x, y);
        this.field_cursor.move_to(x, y + 1, pyxel.btn(pyxel.KEY_SHIFT));

    }
    _OnMouseHover(x, y) {
        this.help_message_var = this.get_field_help_message();

    }
    _OnUpdate() {
        let cursor_y = this.field_cursor.y;
        if (;
            cursor_y < 1;
            || this.is_playing_var;
            || pyxel.btn(pyxel.KEY_SHIFT);
            || pyxel.btn(pyxel.KEY_CTRL);
            || pyxel.btn(pyxel.KEY_ALT);
            || pyxel.btn(pyxel.KEY_GUI);
        // TODO(python): ):
            return;

        let value = null;
        if (cursor_y == 1) {
            for (const i of range(4)) {
                if pyxel.btnp(;
                    TONE_KEY_TABLE[i], hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
                // TODO(python): ):
                    let value = i;
                    break;

            }
        }
        else if (cursor_y == 2) {
            for (const i of range(8)) {
                let key = pyxel.KEY_0 if i == 0 else pyxel.KEY_1 + i - 1;
                if pyxel.btnp(;
                    key, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
                // TODO(python): ) or pyxel.btnp(key, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME):
                    let value = i;
                    break;

            }
        }
        else if (cursor_y == 3) {
            for (const i of range(6)) {
                if pyxel.btnp(;
                    // TODO(python): EFFECT_KEY_TABLE[i],
                    // TODO(python): hold=WIDGET_HOLD_TIME,
                    // TODO(python): repeat=WIDGET_REPEAT_TIME,
                // TODO(python): ):
                    let value = i;
                    break;

            }
        }
        if (value === null) {
            return;

        }
        this.field_cursor.insert(value);

    }
    _OnDraw() {
        // Draw field frame
        pyxel.text(this.x - 13, this.y + 1, "TON", TEXT_LABEL_COLOR);
        pyxel.text(this.x - 13, this.y + 9, "VOL", TEXT_LABEL_COLOR);
        pyxel.text(this.x - 13, this.y + 17, "EFX", TEXT_LABEL_COLOR);
        pyxel.blt(;
            // TODO(python): self.x,
            // TODO(python): self.y,
            // TODO(python): EDITOR_IMAGE,
            // TODO(python): 0,
            // TODO(python): 79,
            // TODO(python): 193,
            // TODO(python): 23,
        // TODO(python): )

        // Draw field data
        let data_str = [];
        data_str.append("".join(["TSPN"[v] for v in this.get_field(1)]));
        data_str.append("".join([str(v) for v in this.get_field(2)]));
        data_str.append("".join(["NSVFHQ"[v] for v in this.get_field(3)]));
        for (const i of range(3)) {
            pyxel.text(31, 150 + i * 8, data_str[i], SOUND_FIELD_DATA_NORMAL_COLOR);

        }
        // Draw cursor
        let cursor_y = this.field_cursor.y;
        let cursor_x = this.field_cursor.x;
        if (this.is_playing_var || cursor_y == 0) {
            return;

        }
        let x = cursor_x * 4 + 31;
        let y = cursor_y * 8 + 142;
        let w = this.field_cursor.width * 4;
        // TODO(python): col = (
            SOUND_FIELD_CURSOR_SELECT_COLOR;
            if this.field_cursor.is_selecting;
            else SOUND_FIELD_CURSOR_EDIT_COLOR;
        // TODO(python): )
        pyxel.rect(x, y - 1, w, 7, col);
        if (cursor_x < len(data_str[cursor_y - 1])) {
            pyxel.text(;
                // TODO(python): x,
                // TODO(python): y,
                // TODO(python): data_str[cursor_y - 1][cursor_x : cursor_x + self.field_cursor.width],
                // TODO(python): SOUND_FIELD_DATA_SELECT_COLOR,
            // TODO(python): )

        }
    }
}