// Auto-generated from editor_base.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import (
    // TODO(python): TOOL_BUCKET,
    // TODO(python): TOOL_CIRC,
    // TODO(python): TOOL_CIRCB,
    // TODO(python): TOOL_PENCIL,
    // TODO(python): TOOL_RECT,
    // TODO(python): TOOL_RECTB,
    // TODO(python): TOOL_SELECT,
// TODO(python): )
// TODO(import): from .widgets import Widget


class EditorBase {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): help_message_var

    // TODO(docstring): Events:
        // TODO(docstring): undo (data)
        // TODO(docstring): redo (data)
        // TODO(docstring): drop (filename)
    // TODO(docstring): """

    constructor(parent) {
        super().__init__(parent, 0, 0, 0, 0, is_visible=false);
        this._history_list = [];
        this._history_index = 0;
        this.copy_var("help_message_var", parent);

    }
    // TODO(python): @property
    canUndo() {
        return this._history_index > 0;

    }
    // TODO(python): @property
    canRedo() {
        return this._history_index < len(this._history_list);

    }
    undo() {
        if (! this.can_undo) {
            return;

        }
        this._history_index -= 1;
        this.trigger_event("undo", this._history_list[this._history_index]);

    }
    redo() {
        if (! this.can_redo) {
            return;

        }
        this.trigger_event("redo", this._history_list[this._history_index]);
        this._history_index += 1;

    }
    addHistory(data) {
        this._history_list = this._history_list[: this._history_index];
        this._history_list.append(data);
        this._history_index += 1;

    }
    resetHistory() {
        this._history_list = [];
        this._history_index = 0;

    }
    addNumberPickerHelp(number_picker) {
        number_picker.dec_button.add_event_listener(;
            "mouse_hover", this.__on_number_picker_dec_mouse_hover;
        // TODO(python): )
        number_picker.inc_button.add_event_listener(;
            "mouse_hover", this.__on_number_picker_inc_mouse_hover;
        // TODO(python): )

    }
    _OnNumberPickerDecMouseHover(x, y) {
        this.help_message_var = "-10:SHIFT+CLICK";

    }
    _OnNumberPickerIncMouseHover(x, y) {
        this.help_message_var = "+10:SHIFT+CLICK";

    }
    checkToolButtonShortcuts() {
        if (;
            pyxel.btn(pyxel.KEY_CTRL);
            || pyxel.btn(pyxel.KEY_ALT);
            || pyxel.btn(pyxel.KEY_GUI);
        // TODO(python): ):
            return;

        if (pyxel.btnp(pyxel.KEY_S)) {
            this.tool_var = TOOL_SELECT;
        }
        else if (pyxel.btnp(pyxel.KEY_P)) {
            this.tool_var = TOOL_PENCIL;
        }
        else if (pyxel.btnp(pyxel.KEY_R)) {
            this.tool_var = TOOL_RECT if pyxel.btn(pyxel.KEY_SHIFT) else TOOL_RECTB;
        }
        else if (pyxel.btnp(pyxel.KEY_C)) {
            this.tool_var = TOOL_CIRC if pyxel.btn(pyxel.KEY_SHIFT) else TOOL_CIRCB;
        }
        else if (pyxel.btnp(pyxel.KEY_B)) {
            this.tool_var = TOOL_BUCKET;

        }
    }
    addToolButtonHelp(tool_button) {
        tool_button.add_event_listener("mouse_hover", this.__on_tool_button_mouse_hover);

    }
    _OnToolButtonMouseHover(x, y) {
        let value = this._tool_button.check_value(x, y);

        if (value == TOOL_SELECT) {
            let s = "SELECT:S";
        }
        else if (value == TOOL_PENCIL) {
            let s = "PENCIL:P";
        }
        else if (value == TOOL_RECTB) {
            let s = "RECTANGLE:R";
        }
        else if (value == TOOL_RECT) {
            let s = "FILLED-RECT:SHIFT+R";
        }
        else if (value == TOOL_CIRCB) {
            let s = "CIRCLE:C";
        }
        else if (value == TOOL_CIRC) {
            let s = "FILLED-CIRC:SHIFT+C";
        }
        else if (value == TOOL_BUCKET) {
            let s = "BUCKET:B";
        }
        else {
            let s = "";

        }
        this.help_message_var = s;

    }
}