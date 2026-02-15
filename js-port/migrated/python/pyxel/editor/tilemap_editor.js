// Auto-generated from tilemap_editor.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .canvas_panel import CanvasPanel
// TODO(import): from .editor_base import EditorBase
// TODO(import): from .image_viewer import ImageViewer
// TODO(import): from .settings import EDITOR_IMAGE, TEXT_LABEL_COLOR, TOOL_PENCIL
// TODO(import): from .tilemap_viewer import TilemapViewer
// TODO(import): from .widgets import NumberPicker, RadioButton


class TilemapEditor {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): color_var
        // TODO(docstring): tool_var
        // TODO(docstring): image_index_var
        // TODO(docstring): canvas_var
        // TODO(docstring): focus_x_var
        // TODO(docstring): focus_y_var

        // TODO(docstring): tilemap_index_var
        // TODO(docstring): tile_x_var
        // TODO(docstring): tile_y_var
        // TODO(docstring): tile_w_var
        // TODO(docstring): tile_h_var

    // TODO(docstring): Events:
        // TODO(docstring): undo (data)
        // TODO(docstring): redo (data)
        // TODO(docstring): drop (filename)
    // TODO(docstring): """

    constructor(parent) {
        super().__init__(parent);

        // Initialize canvas_var
        this.new_var("canvas_var", null);
        this.add_var_event_listener("canvas_var", "get", this.__on_canvas_get);

        // Initialize color_var
        this.new_var("color_var", (255, 255));

        // Initialize tool button
        this._tool_button = RadioButton(;
            // TODO(python): self,
            // TODO(python): 81,
            // TODO(python): 161,
            // TODO(python): img=EDITOR_IMAGE,
            // TODO(python): u=63,
            // TODO(python): v=0,
            // TODO(python): num_buttons=7,
            // TODO(python): value=TOOL_PENCIL,
        // TODO(python): )
        this.add_tool_button_help(this._tool_button);
        this.copy_var("tool_var", this._tool_button, "value_var");

        // Initialize tilemap picker
        this._tilemap_picker = NumberPicker(;
            self, 48, 161, min_value=0, max_value=pyxel.NUM_TILEMAPS - 1, value=0;
        // TODO(python): )
        this._tilemap_picker.add_event_listener(;
            "change", this.__on_tilemap_picker_change;
        // TODO(python): )
        this._tilemap_picker.add_event_listener(;
            "mouse_hover", this.__on_tilemap_picker_mouse_hover;
        // TODO(python): )
        this.add_number_picker_help(this._tilemap_picker);
        this.copy_var("tilemap_index_var", this._tilemap_picker, "value_var");

        // Initialize tilemap viewer
        this._tilemap_viewer = TilemapViewer(self);
        this.copy_var("focus_x_var", this._tilemap_viewer, "focus_x_var");
        this.copy_var("focus_y_var", this._tilemap_viewer, "focus_y_var");

        // Initialize image picker
        this._image_picker = NumberPicker(;
            // TODO(python): self,
            // TODO(python): 192,
            // TODO(python): 161,
            // TODO(python): min_value=0,
            // TODO(python): max_value=pyxel.NUM_IMAGES - 1,
            // TODO(python): value=pyxel.tilemaps[self.tilemap_index_var].imgsrc,
        // TODO(python): )
        this._image_picker.add_event_listener("change", this.__on_image_picker_change);
        this.add_number_picker_help(this._image_picker);
        this.copy_var("image_index_var", this._image_picker, "value_var");

        // Initialize image viewer
        this._image_viewer = ImageViewer(self);
        this.copy_var("tile_x_var", this._image_viewer, "focus_x_var");
        this.copy_var("tile_y_var", this._image_viewer, "focus_y_var");
        this.copy_var("tile_w_var", this._image_viewer, "focus_w_var");
        this.copy_var("tile_h_var", this._image_viewer, "focus_h_var");

        // Initialize canvas panel
        this._canvas_panel = CanvasPanel(self);

        // Set event listeners
        this.add_event_listener("undo", this.__on_undo);
        this.add_event_listener("redo", this.__on_redo);
        this.add_event_listener("drop", this.__on_drop);
        this.add_event_listener("update", this.__on_update);
        this.add_event_listener("draw", this.__on_draw);

    }
    _OnCanvasGet(value) {
        return pyxel.tilemaps[this.tilemap_index_var];

    }
    _OnTilemapPickerChange(value) {
        this.image_index_var = pyxel.tilemaps[value].imgsrc;

    }
    _OnTilemapPickerMouseHover(x, y) {
        this.help_message_var = "COPY_ALL:CTRL+SHIFT+C/X/V";

    }
    _OnImagePickerChange(value) {
        pyxel.tilemaps[this.tilemap_index_var].imgsrc = value;

    }
    _OnUndo(data) {
        this.tilemap_index_var = data["tilemap_index"];
        if ("old_data" in data) {
            pyxel.tilemaps[this.tilemap_index_var].set_slice(0, 0, data["old_data"]);
            this.image_index_var = data["old_imgsrc"];
        }
        else {
            this.focus_x_var, this.focus_y_var = data["focus_pos"];
            this.canvas_var.set_slice(;
                this.focus_x_var * 8, this.focus_y_var * 8, data["old_canvas"];
            // TODO(python): )

        }
    }
    _OnRedo(data) {
        this.tilemap_index_var = data["tilemap_index"];
        if ("new_data" in data) {
            pyxel.tilemaps[this.tilemap_index_var].set_slice(0, 0, data["new_data"]);
            this.image_index_var = data["new_imgsrc"];
        }
        else {
            this.focus_x_var, this.focus_y_var = data["focus_pos"];
            this.canvas_var.set_slice(;
                this.focus_x_var * 8, this.focus_y_var * 8, data["new_canvas"];
            // TODO(python): )

        }
    }
    _OnDrop(filename) {
        pyxel.tilemaps[this.tilemap_index_var].load(;
            this.focus_x_var * 8, this.focus_y_var * 8, filename, 0;
        // TODO(python): )

    }
    _OnUpdate() {
        this.check_tool_button_shortcuts();

    }
    _OnDraw() {
        this.draw_panel(11, 156, 136, 17);
        this.draw_panel(157, 156, 72, 17);

        pyxel.text(18, 162, "TILEMAP", TEXT_LABEL_COLOR);
        pyxel.text(18, 162, "TILEMAP", TEXT_LABEL_COLOR);
        pyxel.text(170, 162, "IMAGE", TEXT_LABEL_COLOR);

    }
}