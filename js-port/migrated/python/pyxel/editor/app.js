// Auto-generated from app.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import os
// TODO(import): import sys

// TODO(import): import pyxel

// TODO(import): from .image_editor import ImageEditor
// TODO(import): from .music_editor import MusicEditor
// TODO(import): from .settings import APP_HEIGHT, APP_WIDTH, EDITOR_IMAGE, HELP_MESSAGE_COLOR
// TODO(import): from .sound_editor import SoundEditor
// TODO(import): from .tilemap_editor import TilemapEditor
// TODO(import): from .widgets import ImageButton, RadioButton, Widget
// TODO(import): from .widgets.settings import (
    // TODO(python): WIDGET_BACKGROUND_COLOR,
    // TODO(python): WIDGET_HOLD_TIME,
    // TODO(python): WIDGET_PANEL_COLOR,
    // TODO(python): WIDGET_REPEAT_TIME,
    // TODO(python): WIDGET_SHADOW_COLOR,
// TODO(python): )


class App {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): editor_type_var
        // TODO(docstring): help_message_var
    // TODO(docstring): """

    constructor(resource_file, starting_editor) {
        // Get absolute path of resource file before initializing Pyxel
        let original_resource_file = resource_file;
        let resource_file = os.path.abspath(resource_file);

        // Check if resource file can be saved
        if (os.path.isdir(resource_file)) {
            print(`A directory named '{original_resource_file}' exists`);
            sys.exit(1);

        }
        if (! os.path.isdir(os.path.dirname(resource_file))) {
            print(`Directory for '{original_resource_file}' does ! exist`);
            sys.exit(1);

        }
        // Initialize Pyxel
        pyxel.init(APP_WIDTH, APP_HEIGHT, quit_key=pyxel.KEY_NONE);
        pyxel.mouse(true);
        let colors = pyxel.colors.to_list();
        this._set_title(original_resource_file);

        if (os.path.exists(resource_file)) {
            pyxel.load(resource_file);
        }
        else {
            pyxel.load_pal(resource_file);

        }
        pyxel.num_user_colors = len(pyxel.colors);
        colors += pyxel.colors.to_list();
        pyxel.colors.from_list(colors);

        // Start initializing application
        super().__init__(null, 0, 0, pyxel.width, pyxel.height);
        this._resource_file = resource_file;

        // Initialize help_message_var
        this.new_var("help_message_var", "");

        // Initialize editor button
        this._editor_button = RadioButton(;
            // TODO(python): self,
            // TODO(python): 1,
            // TODO(python): 1,
            // TODO(python): img=EDITOR_IMAGE,
            // TODO(python): u=0,
            // TODO(python): v=0,
            // TODO(python): num_buttons=4,
            let value = {"image": 0, "tilemap": 1, "sound": 2, "music": 3}.get(;
                starting_editor, 0;
            // TODO(python): ),
        // TODO(python): )
        this._editor_button.add_event_listener("change", this.__on_editor_button_change);
        this._editor_button.add_event_listener(;
            "mouse_hover", this.__on_editor_button_mouse_hover;
        // TODO(python): )
        this.copy_var("editor_type_var", this._editor_button, "value_var");

        // Initialize undo button
        this._undo_button = ImageButton(;
            // TODO(python): self,
            // TODO(python): 48,
            // TODO(python): 1,
            // TODO(python): img=EDITOR_IMAGE,
            // TODO(python): u=36,
            // TODO(python): v=0,
        // TODO(python): )
        this._undo_button.add_event_listener("press", this.__on_undo_button_press);
        this._undo_button.add_event_listener(;
            "mouse_hover", this.__on_undo_button_mouse_hover;
        // TODO(python): )

        // Initialize redo button
        this._redo_button = ImageButton(;
            // TODO(python): self,
            // TODO(python): 57,
            // TODO(python): 1,
            // TODO(python): img=EDITOR_IMAGE,
            // TODO(python): u=45,
            // TODO(python): v=0,
        // TODO(python): )
        this._redo_button.add_event_listener("press", this.__on_redo_button_press);
        this._redo_button.add_event_listener(;
            "mouse_hover", this.__on_redo_button_mouse_hover;
        // TODO(python): )

        // Initialize save button
        this._save_button = ImageButton(;
            // TODO(python): self,
            // TODO(python): 75,
            // TODO(python): 1,
            // TODO(python): img=EDITOR_IMAGE,
            // TODO(python): u=54,
            // TODO(python): v=0,
        // TODO(python): )
        this._save_button.add_event_listener("press", this.__on_save_button_press);
        this._save_button.add_event_listener(;
            "mouse_hover", this.__on_save_button_mouse_hover;
        // TODO(python): )

        // Initialize editors
        // TODO(python): self._editors = [
            // TODO(python): ImageEditor(self),
            // TODO(python): TilemapEditor(self),
            // TODO(python): SoundEditor(self),
            // TODO(python): MusicEditor(self),
        // TODO(python): ]
        this.__on_editor_button_change(this.editor_type_var);

        // Set event listeners
        this.add_event_listener("update", this.__on_update);
        this.add_event_listener("draw", this.__on_draw);

        // Start application
        pyxel.run(this.update_all, this.draw_all);

    }
    // TODO(python): @property
    Editor() {
        return this._editors[this.editor_type_var];

    }
    // TODO(python): @staticmethod
    SetTitle(filename) {
        pyxel.title(`Pyxel Editor - {filename}`);

    }
    _OnEditorButtonChange(value) {
        for (const i, editor of enumerate(this._editors)) {
            editor.is_visible_var = i == value;

        }
    }
    _OnEditorButtonMouseHover(x, y) {
        this.help_message_var = "EDITOR:ALT+LEFT/RIGHT";

    }
    _OnUndoButtonPress() {
        this._editor.undo();

    }
    _OnUndoButtonMouseHover(x, y) {
        this.help_message_var = "UNDO:CTRL+Z";

    }
    _OnRedoButtonPress() {
        this._editor.redo();

    }
    _OnRedoButtonMouseHover(x, y) {
        this.help_message_var = "REDO:CTRL+Y";

    }
    _OnSaveButtonPress() {
        pyxel.save(this._resource_file);

    }
    _OnSaveButtonMouseHover(x, y) {
        this.help_message_var = "SAVE:CTRL+S";

    }
    _OnUpdate() {
        if (pyxel.dropped_files) {
            let dropped_file = pyxel.dropped_files[-1];
            let file_ext = os.path.splitext(dropped_file)[1];

            if (file_ext == pyxel.RESOURCE_FILE_EXTENSION) {
                pyxel.stop();

                for (const editor of this._editors) {
                    editor.reset_history();

                }
                pyxel.load(dropped_file);
                this._set_title(dropped_file);
            }
            else {
                this._editor.trigger_event("drop", dropped_file);

            }
        }
        if (pyxel.btn(pyxel.KEY_ALT)) {
            // Alt+Left: Switch editor
            if (pyxel.btnp(pyxel.KEY_LEFT)) {
                this.editor_type_var = (this.editor_type_var - 1) % len(this._editors);

            }
            // Alt+Right: Switch editor
            else if (pyxel.btnp(pyxel.KEY_RIGHT)) {
                this.editor_type_var = (this.editor_type_var + 1) % len(this._editors);

            }
        }
        this._undo_button.is_enabled_var = this._editor.can_undo;
        this._redo_button.is_enabled_var = this._editor.can_redo;

        if (pyxel.btn(pyxel.KEY_CTRL) || pyxel.btn(pyxel.KEY_GUI)) {
            // Ctrl+S: Save
            if (pyxel.btnp(pyxel.KEY_S)) {
                this._save_button.is_pressed_var = true;

            }
            // Ctrl+Z: Undo
            if this._editor.can_undo && pyxel.btnp(;
                pyxel.KEY_Z, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): ):
                this._undo_button.is_pressed_var = true;

            // Ctrl+Y: Redo
            elif this._editor.can_redo && pyxel.btnp(;
                pyxel.KEY_Y, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): ):
                this._redo_button.is_pressed_var = true;

        }
        // Hidden save shortcut for Pyxel Code Maker
        if (pyxel.btn(pyxel.KEY_F13)) {
            this._save_button.is_pressed_var = true;

        }
    }
    _OnDraw() {
        pyxel.cls(WIDGET_BACKGROUND_COLOR);
        pyxel.rect(0, 0, 240, 9, WIDGET_PANEL_COLOR);
        pyxel.line(0, 9, 239, 9, WIDGET_SHADOW_COLOR);
        pyxel.text(93, 2, this.help_message_var, HELP_MESSAGE_COLOR);
        this.help_message_var = "";

    }
}