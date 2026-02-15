// Auto-generated from piano_roll.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import (
    // TODO(python): EDITOR_IMAGE,
    // TODO(python): MAX_SOUND_LENGTH,
    // TODO(python): PIANO_ROLL_BACKGROUND_COLOR,
    // TODO(python): PIANO_ROLL_CURSOR_EDIT_COLOR,
    // TODO(python): PIANO_ROLL_CURSOR_PLAY_COLOR,
    // TODO(python): PIANO_ROLL_CURSOR_SELECT_COLOR,
    // TODO(python): PIANO_ROLL_NOTE_COLOR,
    // TODO(python): PIANO_ROLL_REST_COLOR,
// TODO(python): )
// TODO(import): from .widgets import Widget
// TODO(import): from .widgets.settings import WIDGET_HOLD_TIME, WIDGET_REPEAT_TIME


class PianoRoll {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): note_var
        // TODO(docstring): is_playing_var
        // TODO(docstring): help_message_var
    // TODO(docstring): """

    constructor(parent) {
        super().__init__(parent, 30, 25, 193, 123);
        this._press_x = 0;
        this._press_y = 0;

        this.field_cursor = parent.field_cursor;
        this.get_field = parent.get_field;
        this.add_pre_history = parent.add_pre_history;
        this.add_post_history = parent.add_post_history;
        this.get_field_help_message = parent.get_field_help_message;

        this.copy_var("speed_var", parent);
        this.copy_var("note_var", parent);
        this.copy_var("is_playing_var", parent);
        this.copy_var("help_message_var", parent);

        // Set event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_drag", this.__on_mouse_drag);
        this.add_event_listener("mouse_click", this.__on_mouse_click);
        this.add_event_listener("mouse_hover", this.__on_mouse_hover);
        this.add_event_listener("update", this.__on_update);
        this.add_event_listener("draw", this.__on_draw);

    }
    ScreenToView(x, y) {
        let x = min(max((x - this.x - 1) // 4, 0), MAX_SOUND_LENGTH - 1);
        let y = min(max(59 - (y - this.y - 1) // 2, -1), 59);
        return x, y;

    }
    SetNote(x, y) {
        this.add_pre_history(x, 0);
        this.field_cursor.move_to(x, 0, pyxel.btn(pyxel.KEY_SHIFT));

        let field = this.field_cursor.field;
        let field_len = len(field);
        if (x < field_len) {
            field[x] = y;
        }
        else {
            let lst = field.to_list();
            lst.extend([-1] * (x - field_len) + [y]);
            field.from_list(lst);

        }
        this.add_post_history(x, 0);

    }
    _OnMouseDown(key, x, y) {
        if (key != pyxel.MOUSE_BUTTON_LEFT || this.is_playing_var) {
            return;

        }
        x, y = this._screen_to_view(x, y);
        this._press_x = x;
        this._press_y = y;
        this.field_cursor.move_to(x, 0, pyxel.btn(pyxel.KEY_SHIFT));

    }
    _OnMouseDrag(key, x, y, dx, dy) {
        if (key != pyxel.MOUSE_BUTTON_LEFT || this.is_playing_var) {
            return;

        }
        x, y = this._screen_to_view(x, y);
        if (x > this._press_x) {
            let step = 1;
        }
        else if (x < this._press_x) {
            let step = -1;
        }
        else {
            if (y != this._press_y) {
                this._set_note(x, y);
                this._press_x = x;
                this._press_y = y;
            }
            return;

        }
        let dx = x - this._press_x;
        let dy = y - this._press_y;
        let alpha = dy / dx;
        for (const i of range(0, dx + step, step)) {
            this._set_note(this._press_x + i, round(this._press_y + alpha * i));

        }
        this._press_x = x;
        this._press_y = y;

    }
    _OnMouseClick(key, x, y) {
        if (key != pyxel.MOUSE_BUTTON_LEFT || this.is_playing_var) {
            return;

        }
        x, y = this._screen_to_view(x, y);
        this._set_note(x, y);

    }
    _OnMouseHover(x, y) {
        this.help_message_var = this.get_field_help_message();

    }
    _OnUpdate() {
        if (this.field_cursor.y > 0 || this.is_playing_var) {
            return;

        }
        if (;
            pyxel.btnp(;
                pyxel.KEY_RETURN, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): )
            || pyxel.btnp(;
                pyxel.KEY_KP_ENTER, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): )
        // TODO(python): ) and self.note_var is not None:
            this.field_cursor.insert(this.note_var);

    }
    _OnDraw() {
        // Draw frame
        pyxel.rect(this.x, this.y, this.width, this.height, 7);

        let play_pos = pyxel.play_pos(0);
        if (play_pos !== null) {
            let x = round(play_pos[1] * 120 / this.speed_var) * 4 + 31;
            pyxel.rect(x, 25, 3, 123, PIANO_ROLL_CURSOR_PLAY_COLOR);
        }
        else if (this.field_cursor.y == 0) {
            let x = this.field_cursor.x * 4 + 31;
            let w = this.field_cursor.width * 4 - 1;
            // TODO(python): col = (
                PIANO_ROLL_CURSOR_SELECT_COLOR;
                if this.field_cursor.is_selecting;
                else PIANO_ROLL_CURSOR_EDIT_COLOR;
            // TODO(python): )
            pyxel.rect(x, 25, w, 123, col);

        }
        pyxel.blt(;
            // TODO(python): self.x,
            // TODO(python): self.y,
            // TODO(python): EDITOR_IMAGE,
            // TODO(python): 0,
            // TODO(python): 7,
            // TODO(python): 193,
            // TODO(python): 72,
            // TODO(python): PIANO_ROLL_BACKGROUND_COLOR,
        // TODO(python): )
        pyxel.blt(;
            // TODO(python): self.x,
            // TODO(python): self.y + 72,
            // TODO(python): EDITOR_IMAGE,
            // TODO(python): 0,
            // TODO(python): 7,
            // TODO(python): 193,
            // TODO(python): 51,
            // TODO(python): PIANO_ROLL_BACKGROUND_COLOR,
        // TODO(python): )

        // Draw notes
        let notes = this.get_field(0);
        for (const i, note of enumerate(notes)) {
            pyxel.rect(;
                // TODO(python): i * 4 + 31,
                // TODO(python): 143 - note * 2,
                // TODO(python): 3,
                // TODO(python): 3,
                // TODO(python): PIANO_ROLL_NOTE_COLOR if note >= 0 else PIANO_ROLL_REST_COLOR,
            // TODO(python): )

        }
    }
}