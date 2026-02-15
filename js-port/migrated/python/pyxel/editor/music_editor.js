// Auto-generated from music_editor.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .editor_base import EditorBase
// TODO(import): from .field_cursor import FieldCursor
// TODO(import): from .music_field import MusicField
// TODO(import): from .settings import EDITOR_IMAGE, MAX_MUSIC_LENGTH, TEXT_LABEL_COLOR
// TODO(import): from .sound_selector import SoundSelector
// TODO(import): from .widgets import ImageButton, ImageToggleButton, NumberPicker


class MusicEditor {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): music_index_var
        // TODO(docstring): should_loop_var
        // TODO(docstring): is_playing_var
        // TODO(docstring): help_message_var
    // TODO(docstring): """

    constructor(parent) {
        super().__init__(parent);
        this.copy_var("help_message_var", parent);

        // Initialize is_playing_var
        this.new_var("is_playing_var", false);

        // Initialize field cursor
        this.field_cursor = FieldCursor(;
            // TODO(python): self,
            // TODO(python): max_field_length=MAX_MUSIC_LENGTH,
            // TODO(python): field_wrap_length=16,
            // TODO(python): max_field_values=[pyxel.NUM_SOUNDS - 1] * 4,
            // TODO(python): get_field=self.get_field,
            // TODO(python): add_pre_history=self.add_pre_history,
            // TODO(python): add_post_history=self.add_post_history,
            // TODO(python): enable_cross_field_copy=True,
        // TODO(python): )

        // Initialize music picker
        this._music_picker = NumberPicker(;
            self, 45, 17, min_value=0, max_value=pyxel.NUM_MUSICS - 1, value=0;
        // TODO(python): )
        this._music_picker.add_event_listener(;
            "mouse_hover", this.__on_music_picker_mouse_hover;
        // TODO(python): )
        this.add_number_picker_help(this._music_picker);
        this.copy_var("music_index_var", this._music_picker, "value_var");

        // Initialize play button
        this._play_button = ImageButton(;
            // TODO(python): self,
            // TODO(python): 185,
            // TODO(python): 17,
            // TODO(python): img=EDITOR_IMAGE,
            // TODO(python): u=126,
            // TODO(python): v=0,
        // TODO(python): )
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

        // Initialize music field
        this._music_field = [MusicField(self, 11, 29 + i * 25, i) for i in range(4)];

        // Initialize sound selector
        this._sound_selector = SoundSelector(self);

        // Set event listeners
        this.add_event_listener("undo", this.__on_undo);
        this.add_event_listener("redo", this.__on_redo);
        this.add_event_listener("hide", this.__on_hide);
        this.add_event_listener("update", this.__on_update);
        this.add_event_listener("draw", this.__on_draw);

    }
    getField(index) {
        if (index >= pyxel.NUM_CHANNELS) {
            return;

        }
        let music = pyxel.musics[this.music_index_var];
        let seqs_len = len(music.seqs);

        if (seqs_len < pyxel.NUM_CHANNELS) {
            let seqs = music.seqs.to_list();
            seqs.extend([[] for _ in range(pyxel.NUM_CHANNELS - seqs_len)]);
            music.seqs.from_list(seqs);
        }
        else if (seqs_len > pyxel.NUM_CHANNELS) {
            let seqs = music.seqs.to_list();
            // TODO(python): del seqs[pyxel.NUM_CHANNELS :]
            music.seqs.from_list(seqs);

        }
        return music.seqs[index];

    }
    addPreHistory(x, y, *, bank_copy) {
        this._history_data = data = {};
        data["music_index"] = this.music_index_var;

        if (bank_copy) {
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
            data["new_data"] = [this.get_field(i).to_list() for i in range(4)];
            if (data["new_data"] != data["old_data"]) {
                this.add_history(data);
            }
        }
        else {
            data["new_cursor_pos"] = (x, y);
            data["new_field"] = this.field_cursor.field.to_list();
            if (data["new_field"] != data["old_field"]) {
                this.add_history(data);

            }
        }
    }
    Play(is_partial) {
        this.is_playing_var = true;
        this._music_picker.is_enabled_var = false;
        this._play_button.is_enabled_var = false;
        this._stop_button.is_enabled_var = true;
        this._loop_button.is_enabled_var = false;

        let tick = 0;
        if (is_partial) {
            for (const i of range(this.field_cursor.x)) {
                let music = pyxel.musics[this.music_index_var];
                let sound = pyxel.sounds[music.seqs[this.field_cursor.y][i]];
                tick += len(sound.notes) * sound.speed;

            }
        }
        pyxel.playm(this.music_index_var, sec=tick / 120, loop=this.should_loop_var);

    }
    Stop() {
        this.is_playing_var = false;
        this._music_picker.is_enabled_var = true;
        this._play_button.is_enabled_var = true;
        this._stop_button.is_enabled_var = false;
        this._loop_button.is_enabled_var = true;

        pyxel.stop();

    }
    _OnMusicPickerMouseHover(x, y) {
        this.help_message_var = "COPY_ALL:CTRL+SHIFT+C/X/V";

    }
    _OnPlayButtonPress() {
        this._play(pyxel.btn(pyxel.KEY_SHIFT));

    }
    _OnStopButtonPress() {
        this._stop();

    }
    _OnPlayButtonMouseHover(x, y) {
        this.help_message_var = "PLAY:SPACE PART-PLAY:SHIFT+SPACE";

    }
    _OnStopButtonMouseHover(x, y) {
        this.help_message_var = "STOP:SPACE";

    }
    _OnLoopButtonMouseHover(x, y) {
        this.help_message_var = "LOOP:L";

    }
    _OnUndo(data) {
        this._stop();
        this.music_index_var = data["music_index"];

        if ("old_data" in data) {
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
        this.music_index_var = data["music_index"];

        if ("new_data" in data) {
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
        if (this.is_playing_var) {
            this.is_playing_var = null;
            for (const i of range(pyxel.NUM_CHANNELS)) {
                if (pyxel.play_pos(i) !== null) {
                    this.is_playing_var = true;
                    break;

                }
            }
        }
        if (pyxel.btnp(pyxel.KEY_SPACE)) {
            if (this.is_playing_var) {
                this._stop_button.is_pressed_var = true;
            }
            else {
                this._play_button.is_pressed_var = true;

            }
        }
        if (this.is_playing_var) {
            return;

        }
        if (! this._play_button.is_enabled_var) {
            this._stop();

        }
        if (this._loop_button.is_enabled_var && pyxel.btnp(pyxel.KEY_L)) {
            this.should_loop_var = ! this.should_loop_var;

        }
        if (! this.is_playing_var) {
            this.field_cursor.process_input();

        }
    }
    _OnDraw() {
        this.draw_panel(11, 16, 218, 9);
        pyxel.text(23, 18, "MUSIC", TEXT_LABEL_COLOR);

    }
}