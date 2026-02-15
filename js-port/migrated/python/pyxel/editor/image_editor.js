// Auto-generated from image_editor.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .canvas_panel import CanvasPanel
// TODO(import): from .editor_base import EditorBase
// TODO(import): from .image_viewer import ImageViewer
// TODO(import): from .settings import EDITOR_IMAGE, TEXT_LABEL_COLOR, TOOL_PENCIL
// TODO(import): from .widgets import ColorPicker, NumberPicker, RadioButton


class ImageEditor {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): color_var
        // TODO(docstring): tool_var
        // TODO(docstring): image_index_var
        // TODO(docstring): canvas_var
        // TODO(docstring): focus_x_var
        // TODO(docstring): focus_y_var
        // TODO(docstring): help_message_var

    // TODO(docstring): Events:
        // TODO(docstring): undo (data)
        // TODO(docstring): redo (data)
        // TODO(docstring): drop (filename)
    // TODO(docstring): """

    // TODO(python): _COLOR_BUTTONS = (
        // TODO(python): pyxel.KEY_1,
        // TODO(python): pyxel.KEY_2,
        // TODO(python): pyxel.KEY_3,
        // TODO(python): pyxel.KEY_4,
        // TODO(python): pyxel.KEY_5,
        // TODO(python): pyxel.KEY_6,
        // TODO(python): pyxel.KEY_7,
        // TODO(python): pyxel.KEY_8,
    // TODO(python): )

    constructor(parent) {
        super().__init__(parent);
        this.copy_var("help_message_var", parent);

        // Initialize canvas_var
        this.new_var("canvas_var", null);
        this.add_var_event_listener("canvas_var", "get", this.__on_canvas_get);

        // Initialize color picker
        this._color_picker = ColorPicker(;
            // TODO(python): self,
            // TODO(python): 11,
            // TODO(python): 156,
            // TODO(python): min(7, pyxel.num_user_colors - 1),
            // TODO(python): with_shadow=False,
        // TODO(python): )
        this._color_picker.add_event_listener(;
            "mouse_hover", this.__on_color_picker_mouse_hover;
        // TODO(python): )
        this.copy_var("color_var", this._color_picker, "value_var");

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

        // Initialize image picker
        this._image_picker = NumberPicker(;
            self, 192, 161, min_value=0, max_value=pyxel.NUM_IMAGES - 1, value=0;
        // TODO(python): )
        this._image_picker.add_event_listener(;
            "mouse_hover", this.__on_image_picker_mouse_hover;
        // TODO(python): )
        this.add_number_picker_help(this._image_picker);
        this.copy_var("image_index_var", this._image_picker, "value_var");

        // Initialize image viewer
        this._image_viewer = ImageViewer(self);
        this.copy_var("focus_x_var", this._image_viewer);
        this.copy_var("focus_y_var", this._image_viewer);

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
        return pyxel.images[this.image_index_var];

    }
    _OnColorPickerMouseHover(x, y) {
        this.help_message_var = "COLOR:1-8/SHIFT+1-8";

    }
    _OnImagePickerMouseHover(x, y) {
        this.help_message_var = "COPY_ALL:CTRL+SHIFT+C/X/V";

    }
    _OnUndo(data) {
        this.image_index_var = data["image_index"];
        if ("old_data" in data) {
            pyxel.images[this.image_index_var].set_slice(0, 0, data["old_data"]);
        }
        else {
            this.focus_x_var, this.focus_y_var = data["focus_pos"];
            this.canvas_var.set_slice(;
                this.focus_x_var * 8, this.focus_y_var * 8, data["old_canvas"];
            // TODO(python): )

        }
    }
    _OnRedo(data) {
        this.image_index_var = data["image_index"];
        if ("new_data" in data) {
            pyxel.images[this.image_index_var].set_slice(0, 0, data["new_data"]);
        }
        else {
            this.focus_x_var, this.focus_y_var = data["focus_pos"];
            this.canvas_var.set_slice(;
                this.focus_x_var * 8, this.focus_y_var * 8, data["new_canvas"];
            // TODO(python): )

        }
    }
    _OnDrop(filename) {
        let colors = pyxel.colors.to_list();
        let user_colors = colors[pyxel.NUM_COLORS :];
        pyxel.colors.from_list(user_colors);
        pyxel.images[this.image_index_var].load(;
            this.focus_x_var * 8, this.focus_y_var * 8, filename;
        // TODO(python): )
        pyxel.colors.from_list(colors);

    }
    _OnUpdate() {
        this.check_tool_button_shortcuts();

        // Check color shortcuts
        if (! pyxel.btn(pyxel.KEY_ALT)) {
            for (const btn of this._COLOR_BUTTONS) {
                if (pyxel.btnp(btn)) {
                    let col = btn - pyxel.KEY_1;
                    if (pyxel.btn(pyxel.KEY_SHIFT)) {
                        col += 8;
                    }
                    this.color_var = col;
                    break;

                }
            }
        }
    }
    _OnDraw() {
        this.draw_panel(11, 156, 136, 17);
        this.draw_panel(157, 156, 72, 17);
        pyxel.text(170, 162, "IMAGE", TEXT_LABEL_COLOR);

    }
}