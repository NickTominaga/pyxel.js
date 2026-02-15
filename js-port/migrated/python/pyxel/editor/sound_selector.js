// Auto-generated from sound_selector.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import EDITOR_IMAGE
// TODO(import): from .widgets import Widget
// TODO(import): from .widgets.settings import BUTTON_ENABLED_COLOR, BUTTON_PRESSED_COLOR


class SoundSelector {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): is_playing_var
        // TODO(docstring): help_message_var
    // TODO(docstring): """

    constructor(parent) {
        super().__init__(parent, 11, 129, 218, 44);
        this._pressed_sound = null;
        this._preview_sound = null;
        this._last_preview_sound = null;
        this.field_cursor = parent.field_cursor;
        this.copy_var("is_playing_var", parent);
        this.copy_var("help_message_var", parent);

        // Set event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_up", this.__on_mouse_up);
        this.add_event_listener("mouse_repeat", this.__on_mouse_down);
        this.add_event_listener("mouse_hover", this.__on_mouse_hover);
        this.add_event_listener("update", this.__on_update);
        this.add_event_listener("draw", this.__on_draw);

    }
    HitSoundButton(x, y) {
        x -= this.x + 6;
        y -= this.y + 5;
        if (x < 0 || y < 0 || x > 205 || y > 33 || x % 13 > 10 || y % 9 > 6) {
            return null;
        }
        return (y // 9) * 16 + x // 13;

    }
    _OnMouseDown(key, x, y) {
        if (key != pyxel.MOUSE_BUTTON_LEFT || this.is_playing_var) {
            return;

        }
        this._pressed_sound = this._hit_sound_button(x, y);
        if (this._pressed_sound !== null) {
            this.field_cursor.insert(this._pressed_sound);

        }
    }
    _OnMouseUp(key, x, y) {
        if (key == pyxel.MOUSE_BUTTON_LEFT) {
            this._pressed_sound = null;

        }
    }
    _OnMouseHover(x, y) {
        this.help_message_var = "PREVIEW:HOVER INSERT:CLICK";

    }
    _OnUpdate() {
        if (this.is_playing_var) {
            return;

        }
        let mx = pyxel.mouse_x;
        let my = pyxel.mouse_y;
        if (this.is_hit(mx, my)) {
            this._preview_sound = this._hit_sound_button(mx, my);
            if (;
                this._preview_sound !== null;
                && this._preview_sound != this._last_preview_sound;
            // TODO(python): ):
                pyxel.play(0, this._preview_sound, loop=true);
        }
        else {
            this._preview_sound = null;

        }
        if (this._preview_sound === null && pyxel.play_pos(0) !== null) {
            pyxel.stop(0);

        }
        this._last_preview_sound = this._preview_sound;

    }
    _OnDraw() {
        this.draw_panel(this.x, this.y, this.width, this.height);
        pyxel.blt(this.x + 6, this.y + 5, EDITOR_IMAGE, 0, 121, 206, 34);

        for (const i of range(pyxel.NUM_SOUNDS)) {
            if (pyxel.sounds[i].notes) {
                this._draw_sound_button(i, BUTTON_ENABLED_COLOR);

            }
        }
        if (this._pressed_sound !== null) {
            this._draw_sound_button(this._pressed_sound, BUTTON_PRESSED_COLOR);

        }
    }
    DrawSoundButton(snd, col) {
        pyxel.pal(13, col);
        let x = (snd % 16) * 13;
        let y = (snd // 16) * 9;
        pyxel.blt(;
            // TODO(python): self.x + x + 6,
            // TODO(python): self.y + y + 5,
            // TODO(python): EDITOR_IMAGE,
            // TODO(python): x,
            // TODO(python): y + 121,
            // TODO(python): 11,
            // TODO(python): 7,
        // TODO(python): )
        pyxel.pal();

    }
}