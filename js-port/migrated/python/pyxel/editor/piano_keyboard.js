// Auto-generated from piano_keyboard.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import EDITOR_IMAGE, PIANO_KEYBOARD_PLAY_COLOR, PIANO_KEYBOARD_REST_COLOR
// TODO(import): from .widgets import Widget

// TODO(python): key_table = [
    // TODO(python): pyxel.KEY_Z,
    // TODO(python): pyxel.KEY_S,
    // TODO(python): pyxel.KEY_X,
    // TODO(python): pyxel.KEY_D,
    // TODO(python): pyxel.KEY_C,
    // TODO(python): pyxel.KEY_V,
    // TODO(python): pyxel.KEY_G,
    // TODO(python): pyxel.KEY_B,
    // TODO(python): pyxel.KEY_H,
    // TODO(python): pyxel.KEY_N,
    // TODO(python): pyxel.KEY_J,
    // TODO(python): pyxel.KEY_M,
    // TODO(python): pyxel.KEY_Q,
    // TODO(python): pyxel.KEY_2,
    // TODO(python): pyxel.KEY_W,
    // TODO(python): pyxel.KEY_3,
    // TODO(python): pyxel.KEY_E,
    // TODO(python): pyxel.KEY_R,
    // TODO(python): pyxel.KEY_5,
    // TODO(python): pyxel.KEY_T,
    // TODO(python): pyxel.KEY_6,
    // TODO(python): pyxel.KEY_Y,
    // TODO(python): pyxel.KEY_7,
    // TODO(python): pyxel.KEY_U,
// TODO(python): ]


class PianoKeyboard {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): note_var
        // TODO(docstring): octave_var
        // TODO(docstring): is_playing_var
        // TODO(docstring): help_message_var
    // TODO(docstring): """

    constructor(parent) {
        super().__init__(parent, 17, 25, 12, 123);
        this._preview_sound = pyxel.Sound();
        this._preview_sound.set("g2", "p", "3", "n", 30);
        this._preview_tone = 0;
        this._mouse_note = null;
        this.field_cursor = parent.field_cursor;
        this.get_field = parent.get_field;
        this.copy_var("speed_var", parent);
        this.copy_var("octave_var", parent);
        this.copy_var("is_playing_var", parent);
        this.copy_var("help_message_var", parent);

        // Initialize note_var
        this.new_var("note_var", null);

        // Set event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_up", this.__on_mouse_up);
        this.add_event_listener("mouse_drag", this.__on_mouse_drag);
        this.add_event_listener("mouse_hover", this.__on_mouse_hover);
        this.add_event_listener("update", this.__on_update);
        this.add_event_listener("draw", this.__on_draw);

    }
    ScreenToNote(x, y) {
        x -= this.x;
        y -= this.y;
        let octave = (4 - y // 24) * 12;
        y %= 24;
        if (octave > 59) {
            return 59;
        }
        if (octave < 0) {
            return -1;
        }
        if (x <= 6) {
            if (2 <= y <= 4) {
                return octave + 10;
            }
            else if (6 <= y <= 8) {
                return octave + 8;
            }
            else if (10 <= y <= 12) {
                return octave + 6;
            }
            else if (16 <= y <= 18) {
                return octave + 3;
            }
            else if (20 <= y <= 22) {
                return octave + 1;
            }
        }
        if (y <= 2) {
            return octave + 11;
        }
        else if (y <= 6) {
            return octave + 9;
        }
        else if (y <= 10) {
            return octave + 7;
        }
        else if (y <= 13) {
            return octave + 5;
        }
        else if (y <= 16) {
            return octave + 4;
        }
        else if (y <= 20) {
            return octave + 2;
        }
        else {
            return octave;

        }
    }
    _OnMouseDown(key, x, y) {
        if (key != pyxel.MOUSE_BUTTON_LEFT) {
            return;
        }
        if (this.field_cursor.y > 0) {
            this.field_cursor.move_to(this.field_cursor.x, 0, false);
        }
        this._mouse_note = this._screen_to_note(x, y);

    }
    _OnMouseUp(key, x, y) {
        this._mouse_note = null;

    }
    _OnMouseDrag(key, x, y, dx, dy) {
        this.__on_mouse_down(key, x, y);

    }
    _OnMouseHover(x, y) {
        this.help_message_var = "NOTE:Z/S/X..Q/2/W..A+ENTER TONE:1";

    }
    _OnUpdate() {
        if (;
            this.field_cursor.y > 0;
            || this.is_playing_var;
            || pyxel.btn(pyxel.KEY_SHIFT);
            || pyxel.btn(pyxel.KEY_CTRL);
            || pyxel.btn(pyxel.KEY_ALT);
            || pyxel.btn(pyxel.KEY_GUI);
        // TODO(python): ):
            return;

        if (pyxel.btnp(pyxel.KEY_1)) {
            this._preview_tone = (this._preview_tone + 1) % 4;

        }
        this.note_var = this._mouse_note;

        for (const i, key of enumerate(key_table)) {
            if (pyxel.btn(key)) {
                this.note_var = this.octave_var * 12 + i;
                break;

            }
        }
        if (pyxel.btn(pyxel.KEY_A)) {
            this.note_var = -1;

        }
        if (this.note_var !== null) {
            this._preview_sound.notes[0] = this.note_var;
            this._preview_sound.tones[0] = this._preview_tone;
            pyxel.play(1, this._preview_sound);
        }
        else {
            pyxel.stop(1);

        }
    }
    _OnDraw() {
        pyxel.blt(;
            // TODO(python): self.x,
            // TODO(python): self.y,
            // TODO(python): EDITOR_IMAGE,
            // TODO(python): 208,
            // TODO(python): 0,
            // TODO(python): 12,
            // TODO(python): 123,
        // TODO(python): )

        let play_pos = pyxel.play_pos(0);
        let notes = this.get_field(0);

        if (play_pos !== null && ! notes) {
            let note = notes[round(play_pos[1] * 120 / this.speed_var)];
        }
        else if (play_pos === null && this.note_var !== null) {
            let note = this.note_var;
        }
        else {
            return;

        }
        let key = note % 12;
        let x = this.x;
        let y = this.y + (59 - note) * 2;

        if (note == -1) {
            pyxel.rect(x, y + 1, 12, 2, PIANO_KEYBOARD_REST_COLOR);
        }
        else if (key == 0 || key == 5) {
            pyxel.rect(x, y + 1, 7, 1, PIANO_KEYBOARD_PLAY_COLOR);
            pyxel.rect(x + 7, y, 5, 2, PIANO_KEYBOARD_PLAY_COLOR);
        }
        else if (key == 4 || key == 11) {
            pyxel.rect(x, y + 1, 7, 1, PIANO_KEYBOARD_PLAY_COLOR);
            pyxel.rect(x + 7, y + 1, 5, 2, PIANO_KEYBOARD_PLAY_COLOR);
        }
        else if (key == 2 || key == 7 || key == 9) {
            pyxel.rect(x, y + 1, 7, 1, PIANO_KEYBOARD_PLAY_COLOR);
            pyxel.rect(x + 7, y, 5, 3, PIANO_KEYBOARD_PLAY_COLOR);
        }
        else {
            pyxel.rect(x, y + 1, 6, 1, PIANO_KEYBOARD_PLAY_COLOR);

        }
    }
}