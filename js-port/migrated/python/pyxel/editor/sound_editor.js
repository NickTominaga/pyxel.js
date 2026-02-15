// Auto-generated from sound_editor.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .editor_base import EditorBase
// TODO(import): from .field_cursor import FieldCursor
// TODO(import): from .octave_bar import OctaveBar
// TODO(import): from .piano_keyboard import PianoKeyboard
// TODO(import): from .piano_roll import PianoRoll
// TODO(import): from .settings import EDITOR_IMAGE, MAX_SOUND_LENGTH, TEXT_LABEL_COLOR
// TODO(import): from .sound_field import SoundField
// TODO(import): from .widgets import ImageButton, ImageToggleButton, NumberPicker


class SoundEditor {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): sound_index_var
        // TODO(docstring): speed_var
        // TODO(docstring): octave_var
        // TODO(docstring): note_var
        // TODO(docstring): is_playing_var
    // TODO(docstring): """

    constructor(parent) {
        super().__init__(parent);
        this._history_data = null;
        this.copy_var("help_message_var", parent);

        // Initialize field cursor
        this.field_cursor = FieldCursor(;
            // TODO(python): self,
            // TODO(python): max_field_length=MAX_SOUND_LENGTH,
            // TODO(python): field_wrap_length=MAX_SOUND_LENGTH,
            // TODO(python): max_field_values=[59, 3, 7, 5],
            // TODO(python): get_field=self.get_field,
            // TODO(python): add_pre_history=self.add_pre_history,
            // TODO(python): add_post_history=self.add_post_history,
            // TODO(python): enable_cross_field_copy=False,
        // TODO(python): )

        // Initialize octave_var
        this.new_var("octave_var", 2);

        // Initialize is_playing_var
        this.new_var("is_playing_var", null);
        this.add_var_event_listener(;
            "is_playing_var", "get", this.__on_is_playing_var_get;
        // TODO(python): )

        // Initialize sound picker
        this._sound_picker = NumberPicker(;
            self, 45, 17, min_value=0, max_value=pyxel.NUM_SOUNDS - 1, value=0;
        // TODO(python): )
        this._sound_picker.add_event_listener("change", this.__on_sound_picker_change);
        this._sound_picker.add_event_listener(;
            "mouse_hover", this.__on_sound_picker_mouse_hover;
        // TODO(python): )
        this.add_number_picker_help(this._sound_picker);
        this.copy_var("sound_index_var", this._sound_picker, "value_var");

        // Initialize speed picker
        this._speed_picker = NumberPicker(;
            self, 105, 17, min_value=1, max_value=99, value=pyxel.sounds[0].speed;
        // TODO(python): )
        this._speed_picker.add_event_listener("change", this.__on_speed_picker_change);
        this.add_number_picker_help(this._speed_picker);
        this.copy_var("speed_var", this._speed_picker, "value_var");

        // Initialize play button
        this._play_button = ImageButton(self, 185, 17, img=EDITOR_IMAGE, u=126, v=0);
        this._play_button.add_event_listener("press", this.__on_play_button_press);
        this._play_button.add_event_listener(;
            "mouse_hover", this.__on_play_button_mouse_hover;
        // TODO(python): )

        // Initialize stop button
        this._stop_button = ImageButton(;
            self, 195, 17, img=EDITOR_IMAGE, u=135, v=0, is_enabled=false;
        // TODO(python): )
        this._stop_button.add_event_listener("press", this.__on_stop_button_press);
        this._stop_button.add_event_listener(;
            "mouse_hover", this.__on_stop_button_mouse_hover;
        // TODO(python): )

        // Initialize loop button
        this._loop_button = ImageToggleButton(;
            self, 205, 17, img=EDITOR_IMAGE, u=144, v=0, is_checked=false;
        // TODO(python): )
        this._loop_button.add_event_listener(;
            "mouse_hover", this.__on_loop_button_mouse_hover;
        // TODO(python): )
        this.copy_var("should_loop_var", this._loop_button, "is_checked_var");

        // Initialize piano keyboard
        this._piano_keyboard = PianoKeyboard(self);
        this.copy_var("note_var", this._piano_keyboard);

        // Initialize piano roll
        this._piano_roll = PianoRoll(self);

        // Initialize sound field
        this._sound_field = SoundField(self);

        // Initialize left octave bar
        this._left_octave_bar = OctaveBar(self, 12, 25);

        // Initialize right octave bar
        this._right_octave_bar = OctaveBar(self, 224, 25);

        // Set event listeners
        this.add_event_listener("undo", this.__on_undo);
        this.add_event_listener("redo", this.__on_redo);
        this.add_event_listener("hide", this.__on_hide);
        this.add_event_listener("update", this.__on_update);
        this.add_event_listener("draw", this.__on_draw);

    }
    // TODO(python): @property
    keyboardNote() {
        return this._piano_keyboard.note;

    }
    getField(index) {
        let sound = pyxel.sounds[this.sound_index_var];
        if (index == 0) {
            return sound.notes;
        }
        else if (index == 1) {
            return sound.tones;
        }
        else if (index == 2) {
            return sound.volumes;
        }
        else if (index == 3) {
            return sound.effects;
        }
        else {
            return null;

        }
    }
    addPreHistory(x, y, *, bank_copy) {
        this._history_data = data = {};
        data["sound_index"] = this.sound_index_var;
        if (bank_copy) {
            data["old_speed"] = this.speed_var;
            data["old_data"] = [this.get_field(i).to_list() for i in range(4)];
        }
        else {
            data["old_cursor_pos"] = (x, y);
            data["old_field"] = this.field_cursor.field.to_list();

        }
    }
    addPostHistory(x, y, *, bank_copy) {
        let data = this._history_data;
        if (bank_copy) {
            data["new_speed"] = this.speed_var;
            data["new_data"] = [this.get_field(i).to_list() for i in range(4)];
            if (;
                data["new_speed"] != data["old_speed"];
                || data["new_data"] != data["old_data"];
            // TODO(python): ):
                this.add_history(data);
        }
        else {
            data["new_cursor_pos"] = (x, y);
            data["new_field"] = this.field_cursor.field.to_list();
            if (data["new_field"] != data["old_field"]) {
                this.add_history(data);

            }
        }
    }
    getFieldHelpMessage() {
        if (this.field_cursor.is_selecting) {
            return "COPY:CTRL+A/C/X/V SHIFT:CTRL+U/D";

        }
        let cursor_y = this.field_cursor.y;
        if (cursor_y == 0) {
            return "NOTE:CLICK/PIANO_KEY+ENTER/BS/DEL";
        }
        else if (cursor_y == 1) {
            return "TONE:T/S/P/N/BS/DEL";
        }
        else if (cursor_y == 2) {
            return "VOLUME:0-7/BS/DEL";
        }
        else if (cursor_y == 3) {
            return "EFFECT:N/S/V/F/H/Q/BS/DEL";
        }
        else {
            return "";

        }
    }
    Play(is_partial) {
        this._sound_picker.is_enabled_var = false;
        this._speed_picker.is_enabled_var = false;
        this._play_button.is_enabled_var = false;
        this._stop_button.is_enabled_var = true;
        this._loop_button.is_enabled_var = false;

        let tick = this.field_cursor.x * this.speed_var if is_partial else 0;
        pyxel.play(;
            // TODO(python): 0,
            // TODO(python): self.sound_index_var,
            // TODO(python): sec=tick / 120,
            // TODO(python): loop=self.should_loop_var,
        // TODO(python): )

    }
    Stop() {
        this._sound_picker.is_enabled_var = true;
        this._speed_picker.is_enabled_var = true;
        this._play_button.is_enabled_var = true;
        this._stop_button.is_enabled_var = false;
        this._loop_button.is_enabled_var = true;

        pyxel.stop(0);

    }
    _OnIsPlayingVarGet(value) {
        return pyxel.play_pos(0) !== null;

    }
    _OnSoundPickerChange(value) {
        let sound = pyxel.sounds[value];
        this._speed_picker.value = sound.speed;

    }
    _OnSoundPickerMouseHover(x, y) {
        this.help_message_var = "COPY_ALL:CTRL+SHIFT+C/X/V";

    }
    _OnSpeedPickerChange(value) {
        let sound = pyxel.sounds[this.sound_index_var];
        sound.speed = value;

    }
    _OnPlayButtonPress() {
        this._play(pyxel.btn(pyxel.KEY_SHIFT));

    }
    _OnPlayButtonMouseHover(x, y) {
        this.help_message_var = "PLAY:SPACE PART-PLAY:SHIFT+SPACE";

    }
    _OnStopButtonPress() {
        this._stop();

    }
    _OnStopButtonMouseHover(x, y) {
        this.help_message_var = "STOP:SPACE";

    }
    _OnLoopButtonMouseHover(x, y) {
        this.help_message_var = "LOOP:L";

    }
    _OnUndo(data) {
        this._stop();
        this.sound_index_var = data["sound_index"];

        if ("old_data" in data) {
            pyxel.sounds[this.sound_index_var].speed = data["old_speed"];
            for (const i of range(4)) {
                this.get_field(i).from_list(data["old_data"][i]);
            }
        }
        else {
            this.field_cursor.move_to(*data["old_cursor_pos"], false);
            this.field_cursor.field.from_list(data["old_field"]);

        }
    }
    _OnRedo(data) {
        this._stop();
        this.sound_index_var = data["sound_index"];

        if ("new_data" in data) {
            pyxel.sounds[this.sound_index_var].speed = data["new_speed"];
            for (const i of range(4)) {
                this.get_field(i).from_list(data["new_data"][i]);
            }
        }
        else {
            this.field_cursor.move_to(*data["new_cursor_pos"], false);
            this.field_cursor.field.from_list(data["new_field"]);

        }
    }
    _OnHide() {
        this._stop();

    }
    _OnUpdate() {
        let sound = pyxel.sounds[this.sound_index_var];
        if (this.speed_var != sound.speed) {
            this.speed_var = sound.speed;

        }
        if (pyxel.btnp(pyxel.KEY_SPACE)) {
            if (this.is_playing_var) {
                this._stop_button.is_pressed_var = true;
                return;
            }
            else {
                this._play_button.is_pressed_var = true;

            }
        }
        if (! this._play_button.is_enabled_var && ! this.is_playing_var) {
            this._stop();

        }
        if (this._loop_button.is_enabled_var && pyxel.btnp(pyxel.KEY_L)) {
            this.should_loop_var = ! this.should_loop_var;

        }
        if (pyxel.btnp(pyxel.KEY_PAGEUP)) {
            this.octave_var = min(this.octave_var + 1, 3);
        }
        if (pyxel.btnp(pyxel.KEY_PAGEDOWN)) {
            this.octave_var = max(this.octave_var - 1, 0);

        }
        if (! this.is_playing_var) {
            this.field_cursor.process_input();

        }
    }
    _OnDraw() {
        this.draw_panel(11, 16, 218, 157);
        pyxel.text(23, 18, "SOUND", TEXT_LABEL_COLOR);
        pyxel.text(83, 18, "SPEED", TEXT_LABEL_COLOR);

    }
}