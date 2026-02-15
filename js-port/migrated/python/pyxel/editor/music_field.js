// Auto-generated from music_field.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import (
    // TODO(python): EDITOR_IMAGE,
    // TODO(python): MUSIC_FIELD_BACKGROUND_COLOR,
    // TODO(python): MUSIC_FIELD_CURSOR_EDIT_COLOR,
    // TODO(python): MUSIC_FIELD_CURSOR_PLAY_COLOR,
    // TODO(python): MUSIC_FIELD_CURSOR_SELECT_COLOR,
    // TODO(python): MUSIC_FIELD_SOUND_NORMAL_COLOR,
    // TODO(python): MUSIC_FIELD_SOUND_SELECT_COLOR,
    // TODO(python): TEXT_LABEL_COLOR,
// TODO(python): )
// TODO(import): from .widgets import Widget


class MusicField {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): is_playing_var
        // TODO(docstring): help_message_var
    // TODO(docstring): """

    constructor(parent, x, y, ch) {
        super().__init__(parent, x, y, 218, 21);
        this._ch = ch;
        this.field_cursor = parent.field_cursor;
        this.get_field = parent.get_field;
        this.copy_var("is_playing_var", parent);
        this.copy_var("help_message_var", parent);

        // Set event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_hover", this.__on_mouse_hover);
        this.add_event_listener("draw", this.__on_draw);

    }
    // TODO(python): @property
    data() {
        return this.get_field(this._ch);

    }
    _OnMouseDown(key, x, y) {
        if (key != pyxel.MOUSE_BUTTON_LEFT || this.is_playing_var) {
            return;

        }
        x -= this.x + 21;
        y -= this.y + 2;
        if (x < 0 || y < 0 || x > 188 || y > 16 || x % 12 > 8 || y % 10 > 6) {
            return;

        }
        this.field_cursor.move_to(;
            x // 12 + (y // 10) * 16, this._ch, pyxel.btn(pyxel.KEY_SHIFT);
        // TODO(python): )

    }
    _OnMouseHover(x, y) {
        // TODO(python): self.help_message_var = (
            // TODO(python): "COPY:CTRL+A/C/X/V SHIFT:CTRL+U/D"
            if this.field_cursor.is_selecting;
            // TODO(python): else "SOUND:SOUND_BUTTON/BS/DEL"
        // TODO(python): )

    }
    _OnDraw() {
        // Draw frame
        this.draw_panel(this.x, this.y, this.width, this.height);
        pyxel.text(this.x + 5, this.y + 8, `CH{this._ch}`, TEXT_LABEL_COLOR);
        pyxel.blt(;
            // TODO(python): self.x + 20,
            // TODO(python): self.y + 1,
            // TODO(python): EDITOR_IMAGE,
            // TODO(python): 0,
            // TODO(python): 102,
            // TODO(python): 191,
            // TODO(python): 19,
            // TODO(python): MUSIC_FIELD_BACKGROUND_COLOR,
        // TODO(python): )

        // Draw cursor
        if (this.is_playing_var) {
            let play_pos = pyxel.play_pos(this._ch);
            if (play_pos === null) {
                let cursor_x = -1;
                let cursor_y = -1;
            }
            else {
                let cursor_x = play_pos[0];
                let cursor_y = this._ch;
                let cursor_width = 1;
                let cursor_col = MUSIC_FIELD_CURSOR_PLAY_COLOR;
            }
        }
        else {
            let cursor_x = this.field_cursor.x;
            let cursor_y = this.field_cursor.y;
            let cursor_width = this.field_cursor.width;
            // TODO(python): cursor_col = (
                MUSIC_FIELD_CURSOR_SELECT_COLOR;
                if this.field_cursor.is_selecting;
                else MUSIC_FIELD_CURSOR_EDIT_COLOR;
            // TODO(python): )

        }
        if (cursor_y == this._ch) {
            for (const i of range(len(this.data) + 1)) {
                if (cursor_x <= i < cursor_x + cursor_width) {
                    let x = this.x + (i % 16) * 12 + 21;
                    let y = this.y + (cursor_y - this._ch + i // 16) * 10 + 2;
                    pyxel.rect(x, y, 9, 7, cursor_col);

                }
            }
        }
        // Draw sounds
        for (const i of range(len(this.data))) {
            let x = this.x + 22 + (i % 16) * 12;
            let y = this.y + (i // 16) * 10 + 3;
            // TODO(python): col = (
                MUSIC_FIELD_SOUND_SELECT_COLOR;
                if cursor_y == this._ch && cursor_x <= i < cursor_x + cursor_width;
                else MUSIC_FIELD_SOUND_NORMAL_COLOR;
            // TODO(python): )
            // TODO(python): pyxel.text(x, y, f"{self.data[i]:0>2}", col)

        }
    }
}