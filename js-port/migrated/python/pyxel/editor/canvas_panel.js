// Auto-generated from canvas_panel.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import (
    // TODO(python): PANEL_SELECT_BORDER_COLOR,
    // TODO(python): PANEL_SELECT_FRAME_COLOR,
    // TODO(python): TOOL_BUCKET,
    // TODO(python): TOOL_CIRC,
    // TODO(python): TOOL_CIRCB,
    // TODO(python): TOOL_PENCIL,
    // TODO(python): TOOL_RECT,
    // TODO(python): TOOL_RECTB,
    // TODO(python): TOOL_SELECT,
// TODO(python): )
// TODO(import): from .widgets import ScrollBar, Widget
// TODO(import): from .widgets.settings import WIDGET_HOLD_TIME, WIDGET_PANEL_COLOR, WIDGET_REPEAT_TIME


class CanvasPanel {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): color_var
        // TODO(docstring): tool_var
        // TODO(docstring): image_index_var
        // TODO(docstring): canvas_var
        // TODO(docstring): focus_x_var
        // TODO(docstring): focus_y_var
        // TODO(docstring): help_message_var

        // TODO(docstring): tilemap_index_var
        // TODO(docstring): tile_x_var
        // TODO(docstring): tile_y_var
        // TODO(docstring): tile_w_var
        // TODO(docstring): tile_h_var
    // TODO(docstring): """

    constructor(parent) {
        super().__init__(parent, 11, 16, 130, 130);

        if (hasattr(parent, "tilemap_index_var")) {
            this._is_tilemap_mode = true;
            this.copy_var("tilemap_index_var", parent);
            this.copy_var("tile_x_var", parent);
            this.copy_var("tile_y_var", parent);
            this.copy_var("tile_w_var", parent);
            this.copy_var("tile_h_var", parent);
        }
        else {
            this._is_tilemap_mode = false;

        }
        this._history_data = null;
        this._press_x = 0;
        this._press_y = 0;
        this._last_x = 0;
        this._last_y = 0;
        this._drag_offset_x = 0;
        this._drag_offset_y = 0;
        this._select_x1 = 0;
        this._select_y1 = 0;
        this._select_x2 = 0;
        this._select_y2 = 0;
        this._canvas_buffer = null;
        this._bank_buffer = null;
        this._is_dragged = false;
        this._is_assist_mode = false;
        // TODO(python): self._edit_canvas = (
            pyxel.Tilemap(16, 16, 0) if this._is_tilemap_mode else pyxel.Image(16, 16);
        // TODO(python): )
        this.add_history = parent.add_history;
        this.copy_var("color_var", parent);
        this.copy_var("tool_var", parent);
        this.copy_var("image_index_var", parent);
        this.copy_var("canvas_var", parent);
        this.copy_var("focus_x_var", parent);
        this.copy_var("focus_y_var", parent);
        this.copy_var("help_message_var", parent);

        // Initialize horizontal scroll bar
        this._h_scroll_bar = ScrollBar(;
            // TODO(python): self,
            // TODO(python): 0,
            // TODO(python): 129,
            // TODO(python): width=130,
            // TODO(python): scroll_amount=32,
            // TODO(python): slider_amount=2,
            // TODO(python): value=0,
        // TODO(python): )
        this._h_scroll_bar.add_event_listener("change", this.__on_h_scroll_bar_change);
        this.add_var_event_listener("focus_x_var", "change", this.__on_focus_x_change);

        // Initialize vertical scroll bar
        this._v_scroll_bar = ScrollBar(;
            // TODO(python): self,
            // TODO(python): 129,
            // TODO(python): 0,
            // TODO(python): height=130,
            // TODO(python): scroll_amount=32,
            // TODO(python): slider_amount=2,
            // TODO(python): value=0,
        // TODO(python): )
        this._v_scroll_bar.add_event_listener("change", this.__on_v_scroll_bar_change);
        this.add_var_event_listener("focus_y_var", "change", this.__on_focus_y_change);

        // Initialize event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_up", this.__on_mouse_up);
        this.add_event_listener("mouse_drag", this.__on_mouse_drag);
        this.add_event_listener("mouse_hover", this.__on_mouse_hover);
        this.add_event_listener("update", this.__on_update);
        this.add_event_listener("draw", this.__on_draw);

    }
    ScreenToFocus(x, y) {
        let x = min(max((x - this.x - 1) // 8, 0), 15);
        let y = min(max((y - this.y - 1) // 8, 0), 15);
        return x, y;

    }
    AddPreHistory(*, bank_copy) {
        this._history_data = data = {};

        if (bank_copy) {
            if (this._is_tilemap_mode) {
                data["tilemap_index"] = this.tilemap_index_var;
                data["old_imgsrc"] = this.canvas_var.imgsrc;
            }
            else {
                data["image_index"] = this.image_index_var;
            }
            data["old_data"] = this.canvas_var.get_slice(0, 0, 256, 256);
        }
        else {
            if (this._is_tilemap_mode) {
                data["tilemap_index"] = this.tilemap_index_var;
            }
            else {
                data["image_index"] = this.image_index_var;

            }
            data["focus_pos"] = (this.focus_x_var, this.focus_y_var);
            data["old_canvas"] = this.canvas_var.get_slice(;
                this.focus_x_var * 8, this.focus_y_var * 8, 16, 16;
            // TODO(python): )

        }
    }
    AddPostHistory(*, bank_copy) {
        let data = this._history_data;

        if (bank_copy) {
            data["new_data"] = this.canvas_var.get_slice(0, 0, 256, 256);
            if (this._is_tilemap_mode) {
                data["new_imgsrc"] = this.canvas_var.imgsrc;

            }
            if (;
                data["new_data"] != data["old_data"];
                || data["new_imgsrc"] != data["old_imgsrc"];
            // TODO(python): ):
                this.add_history(data);
        }
        else {
            data["new_canvas"] = this.canvas_var.get_slice(;
                this.focus_x_var * 8, this.focus_y_var * 8, 16, 16;
            // TODO(python): )

            if (data["new_canvas"] != data["old_canvas"]) {
                this.add_history(data);

            }
        }
    }
    ResetEditCanvas() {
        this._edit_canvas.blt(;
            // TODO(python): 0,
            // TODO(python): 0,
            // TODO(python): self.canvas_var,
            // TODO(python): self.focus_x_var * 8,
            // TODO(python): self.focus_y_var * 8,
            // TODO(python): 16,
            // TODO(python): 16,
        // TODO(python): )
        if (this._is_tilemap_mode) {
            this._edit_canvas.imgsrc = this.canvas_var.imgsrc;

        }
    }
    FinishEditCanvas() {
        if (! this._is_tilemap_mode) {
            return;

        }
        for (const y of range(16)) {
            for (const x of range(16)) {
                if (this._edit_canvas.pget(x, y) != (255, 255)) {
                    continue;
                }
                // TODO(python): tile = (
                    // TODO(python): self.tile_x_var + (x - self._press_x) % self.tile_w_var,
                    // TODO(python): self.tile_y_var + (y - self._press_y) % self.tile_h_var,
                // TODO(python): )
                this._edit_canvas.pset(x, y, tile);

            }
        }
    }
    _OnHScrollBarChange(value) {
        this.focus_x_var = value;

    }
    _OnVScrollBarChange(value) {
        this.focus_y_var = value;

    }
    _OnFocusXChange(value) {
        this._h_scroll_bar.value_var = value;

    }
    _OnFocusYChange(value) {
        this._v_scroll_bar.value_var = value;

    }
    _OnMouseDown(key, x, y) {
        if (key == pyxel.MOUSE_BUTTON_RIGHT) {
            let x = this.focus_x_var * 8 + (x - this.x) // 8;
            let y = this.focus_y_var * 8 + (y - this.y) // 8;
            if (this._is_tilemap_mode) {
                (this.tile_x_var, this.tile_y_var) = this.canvas_var.pget(x, y);
            }
            else {
                this.color_var = this.canvas_var.pget(x, y);
            }
            return;
        }
        else if (key != pyxel.MOUSE_BUTTON_LEFT) {
            return;

        }
        x, y = this._screen_to_focus(x, y);
        this._press_x = this._last_x = x;
        this._press_y = this._last_y = y;
        this._is_dragged = true;
        this._is_assist_mode = false;

        if (this.tool_var == TOOL_SELECT) {
            this._reset_edit_canvas();
            this._select_x1 = this._select_x2 = x;
            this._select_y1 = this._select_y2 = y;
        }
        else if (this.tool_var >= TOOL_PENCIL && this.tool_var <= TOOL_CIRC) {
            this._reset_edit_canvas();
            this._edit_canvas.pset(x, y, this.color_var);
            this._finish_edit_canvas();
        }
        else if (this.tool_var == TOOL_BUCKET) {
            this._add_pre_history();
            this._reset_edit_canvas();
            this._edit_canvas.fill(x, y, this.color_var);
            this._finish_edit_canvas();
            this.canvas_var.blt(;
                // TODO(python): self.focus_x_var * 8,
                // TODO(python): self.focus_y_var * 8,
                // TODO(python): self._edit_canvas,
                // TODO(python): 0,
                // TODO(python): 0,
                // TODO(python): 16,
                // TODO(python): 16,
            // TODO(python): )
            this._add_post_history();

        }
    }
    _OnMouseUp(key, x, y) {
        if (key != pyxel.MOUSE_BUTTON_LEFT) {
            return;

        }
        this._is_dragged = false;
        if (TOOL_PENCIL <= this.tool_var <= TOOL_CIRC) {
            this._add_pre_history();
            this.canvas_var.blt(;
                // TODO(python): self.focus_x_var * 8,
                // TODO(python): self.focus_y_var * 8,
                // TODO(python): self._edit_canvas,
                // TODO(python): 0,
                // TODO(python): 0,
                // TODO(python): 16,
                // TODO(python): 16,
            // TODO(python): )
            this._add_post_history();

        }
    }
    _OnMouseDrag(key, x, y, dx, dy) {
        if (key == pyxel.MOUSE_BUTTON_LEFT) {
            let x1 = this._press_x;
            let y1 = this._press_y;
            let x2 = (x - this.x - 1) // 8;
            let y2 = (y - this.y - 1) // 8;

            if (TOOL_RECTB <= this.tool_var <= TOOL_CIRC && this._is_assist_mode) {
                let dx = x2 - x1;
                let dy = y2 - y1;
                if (abs(dx) > abs(dy)) {
                    let y2 = y1 + abs(dx) * (1 if dy > 0 else -1);
                }
                else {
                    let x2 = x1 + abs(dy) * (1 if dx > 0 else -1);

                }
            }
            if (this.tool_var == TOOL_SELECT) {
                let x2 = min(max(x2, 0), 15);
                let y2 = min(max(y2, 0), 15);
                this._select_x1, this._select_x2 = (x1, x2) if x1 < x2 else (x2, x1);
                this._select_y1, this._select_y2 = (y1, y2) if y1 < y2 else (y2, y1);

            }
            else if (this.tool_var == TOOL_PENCIL) {
                if (this._is_assist_mode) {
                    this._reset_edit_canvas();
                    this._edit_canvas.line(x1, y1, x2, y2, this.color_var);
                    this._finish_edit_canvas();
                }
                else {
                    this._edit_canvas.line(;
                        // TODO(python): self._last_x, self._last_y, x2, y2, self.color_var
                    // TODO(python): )
                    this._finish_edit_canvas();

                }
            }
            else if (this.tool_var == TOOL_RECTB) {
                this._reset_edit_canvas();
                this._edit_canvas.rectb2(;
                    // TODO(python): x1,
                    // TODO(python): y1,
                    // TODO(python): x2,
                    // TODO(python): y2,
                    // TODO(python): self.color_var,
                // TODO(python): )
                this._finish_edit_canvas();

            }
            else if (this.tool_var == TOOL_RECT) {
                this._reset_edit_canvas();
                this._edit_canvas.rect2(;
                    // TODO(python): x1,
                    // TODO(python): y1,
                    // TODO(python): x2,
                    // TODO(python): y2,
                    // TODO(python): self.color_var,
                // TODO(python): )
                this._finish_edit_canvas();

            }
            else if (this.tool_var == TOOL_CIRCB) {
                this._reset_edit_canvas();
                this._edit_canvas.ellib2(x1, y1, x2, y2, this.color_var);
                this._finish_edit_canvas();

            }
            else if (this.tool_var == TOOL_CIRC) {
                this._reset_edit_canvas();
                this._edit_canvas.elli2(x1, y1, x2, y2, this.color_var);
                this._finish_edit_canvas();

            }
            this._last_x = x2;
            this._last_y = y2;

        }
        else if (key == pyxel.MOUSE_BUTTON_RIGHT) {
            this._drag_offset_x -= dx;
            this._drag_offset_y -= dy;

            if (abs(this._drag_offset_x) >= 16) {
                let offset = this._drag_offset_x // 16;
                this.focus_x_var += offset;
                this._drag_offset_x -= offset * 16;
            }
            if (abs(this._drag_offset_y) >= 16) {
                let offset = this._drag_offset_y // 16;
                this.focus_y_var += offset;
                this._drag_offset_y -= offset * 16;

            }
        }
    }
    _OnMouseHover(x, y) {
        if (this.tool_var == TOOL_SELECT) {
            let s = "COPY:CTRL+C/X/V FLIP:H/V";
        }
        else if (this._is_dragged) {
            let s = "ASSIST:SHIFT";
        }
        else {
            let s = "PICK:R-CLICK VIEW:R-DRAG";

        }
        x, y = this._screen_to_focus(x, y);
        x += this.focus_x_var * 8;
        y += this.focus_y_var * 8;
        this.help_message_var = s + ` ({x},{y})`;

    }
    _OnUpdate() {
        if (this._is_dragged && ! this._is_assist_mode && pyxel.btn(pyxel.KEY_SHIFT)) {
            this._is_assist_mode = true;
            this.__on_mouse_drag(;
                pyxel.MOUSE_BUTTON_LEFT, pyxel.mouse_x, pyxel.mouse_y, 0, 0;
            // TODO(python): )

        }
        // Copy/cut/paste bank
        if pyxel.btn(pyxel.KEY_SHIFT) && (;
            pyxel.btn(pyxel.KEY_CTRL) || pyxel.btn(pyxel.KEY_GUI);
        // TODO(python): ):
            // Ctrl+Shift+C/Ctrl+Shift+X: Copy bank
            if (pyxel.btnp(pyxel.KEY_C) || pyxel.btnp(pyxel.KEY_X)) {
                this._bank_buffer = {};
                if (this._is_tilemap_mode) {
                    let tilemap = pyxel.tilemaps[this.tilemap_index_var];
                    this._bank_buffer["data"] = tilemap.get_slice(0, 0, 256, 256);
                    this._bank_buffer["imgsrc"] = tilemap.imgsrc;
                }
                else {
                    this._bank_buffer["data"] = pyxel.images[;
                        this.image_index_var;
                    ].get_slice(0, 0, 256, 256);

                }
        }
            // Ctrl+Shift+X: Cut bank
            if (pyxel.btnp(pyxel.KEY_X)) {
                this._add_pre_history(bank_copy=true);
                if (this._is_tilemap_mode) {
                    pyxel.tilemaps[this.tilemap_index_var].rect(0, 0, 256, 256, 0);
                }
                else {
                    pyxel.images[this.image_index_var].rect(0, 0, 256, 256, 0);
                }
                this._add_post_history(bank_copy=true);

        }
            // Ctrl+Shift+V: Paste bank
            if (pyxel.btnp(pyxel.KEY_V) && this._bank_buffer !== null) {
                this._add_pre_history(bank_copy=true);
                if (this._is_tilemap_mode) {
                    pyxel.tilemaps[this.tilemap_index_var].set_slice(;
                        0, 0, this._bank_buffer["data"];
                    // TODO(python): )
                    this.image_index_var = this._bank_buffer["imgsrc"];
                }
                else {
                    pyxel.images[this.image_index_var].set_slice(;
                        0, 0, this._bank_buffer["data"];
                    // TODO(python): )
                }
                this._add_post_history(bank_copy=true);

        }
        // Copy/cut/paste canvas
        if (;
            this.tool_var = = TOOL_SELECT;
            && ! pyxel.btn(pyxel.KEY_SHIFT);
            && (pyxel.btn(pyxel.KEY_CTRL) || pyxel.btn(pyxel.KEY_GUI));
        // TODO(python): ):
            // Ctrl+A: Select all
            if (pyxel.btnp(pyxel.KEY_A)) {
                this._select_x1 = this._select_y1 = 0;
                this._select_x2 = this._select_y2 = 15;

        }
            // Ctrl+C: Copy
            if (pyxel.btnp(pyxel.KEY_C)) {
                this._canvas_buffer = this.canvas_var.get_slice(;
                    // TODO(python): self.focus_x_var * 8 + self._select_x1,
                    // TODO(python): self.focus_y_var * 8 + self._select_y1,
                    // TODO(python): self._select_x2 - self._select_x1 + 1,
                    // TODO(python): self._select_y2 - self._select_y1 + 1,
                // TODO(python): )

        }
            // Ctrl+X: Cut
            if (pyxel.btnp(pyxel.KEY_X)) {
                let x = this.focus_x_var * 8 + this._select_x1;
                let y = this.focus_y_var * 8 + this._select_y1;
                let w = this._select_x2 - this._select_x1 + 1;
                let h = this._select_y2 - this._select_y1 + 1;
                this._canvas_buffer = this.canvas_var.get_slice(x, y, w, h);
                this._add_pre_history();
                this.canvas_var.rect(x, y, w, h, (0, 0) if this._is_tilemap_mode else 0);
                this._add_post_history();

        }
            // Ctrl+V: Paste
            if (this._canvas_buffer !== null && pyxel.btnp(pyxel.KEY_V)) {
                this._add_pre_history();
                let width = len(this._canvas_buffer[0]);
                let height = len(this._canvas_buffer);
                width -= max(this._select_x1 + width - 16, 0);
                height -= max(this._select_y1 + height - 16, 0);
                this.canvas_var.set_slice(;
                    // TODO(python): self.focus_x_var * 8 + self._select_x1,
                    // TODO(python): self.focus_y_var * 8 + self._select_y1,
                    // TODO(python): self._canvas_buffer,
                // TODO(python): )
                this._add_post_history();

        }
        // Selection tool operations
        if this.tool_var == TOOL_SELECT && ! (;
            pyxel.btn(pyxel.KEY_CTRL) || pyxel.btn(pyxel.KEY_GUI);
        // TODO(python): ):
            // H: Flip horizontal
            if (pyxel.btnp(pyxel.KEY_H)) {
                let x = this.focus_x_var * 8 + this._select_x1;
                let y = this.focus_y_var * 8 + this._select_y1;
                let w = this._select_x2 - this._select_x1 + 1;
                let h = this._select_y2 - this._select_y1 + 1;
                this._add_pre_history();
                this.canvas_var.blt(x, y, this.canvas_var, x, y, -w, h);
                this._add_post_history();

        }
            // V: Flip vertical
            if (pyxel.btnp(pyxel.KEY_V)) {
                let x = this.focus_x_var * 8 + this._select_x1;
                let y = this.focus_y_var * 8 + this._select_y1;
                let w = this._select_x2 - this._select_x1 + 1;
                let h = this._select_y2 - this._select_y1 + 1;
                this._add_pre_history();
                this.canvas_var.blt(x, y, this.canvas_var, x, y, w, -h);
                this._add_post_history();

        }
        // Move tile focus
        if (this._is_tilemap_mode && pyxel.btn(pyxel.KEY_SHIFT)) {
            if pyxel.btnp(;
                pyxel.KEY_LEFT, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): ):
                this.tile_x_var -= 1;
            if pyxel.btnp(;
                pyxel.KEY_RIGHT, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): ):
                this.tile_x_var += 1;
            if pyxel.btnp(;
                pyxel.KEY_UP, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): ):
                this.tile_y_var -= 1;
            if pyxel.btnp(;
                pyxel.KEY_DOWN, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): ):
                this.tile_y_var += 1;

        }
        // Move target focus
        if ! (;
            pyxel.btn(pyxel.KEY_SHIFT);
            || pyxel.btn(pyxel.KEY_CTRL);
            || pyxel.btn(pyxel.KEY_ALT);
            || pyxel.btn(pyxel.KEY_GUI);
        // TODO(python): ):
            if pyxel.btnp(;
                pyxel.KEY_LEFT, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): ):
                this.focus_x_var -= 1;
            if pyxel.btnp(;
                pyxel.KEY_RIGHT, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): ):
                this.focus_x_var += 1;
            if pyxel.btnp(;
                pyxel.KEY_UP, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): ):
                this.focus_y_var -= 1;
            if pyxel.btnp(;
                pyxel.KEY_DOWN, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): ):
                this.focus_y_var += 1;

    }
    _OnDraw() {
        this.draw_panel(this.x, this.y, this.width, this.height);

        // Draw edit panel
        canvas, offset_x, offset_y = (;
            (this._edit_canvas, 0, 0);
            if this._is_dragged;
            else (this.canvas_var, this.focus_x_var * 8, this.focus_y_var * 8);
        // TODO(python): )

        if (this._is_tilemap_mode) {
            pyxel.user_pal();
            pyxel.bltm(;
                // TODO(python): self.x + 1,
                // TODO(python): self.y + 1,
                // TODO(python): canvas,
                // TODO(python): offset_x * 8,
                // TODO(python): offset_y * 8,
                // TODO(python): 128,
                // TODO(python): 128,
            // TODO(python): )
            pyxel.pal();
        }
        else {
            pyxel.user_pal();
            for (const yi of range(16)) {
                for (const xi of range(16)) {
                    pyxel.rect(;
                        // TODO(python): self.x + xi * 8 + 1,
                        // TODO(python): self.y + yi * 8 + 1,
                        // TODO(python): 8,
                        // TODO(python): 8,
                        // TODO(python): canvas.pget(offset_x + xi, offset_y + yi),
                    // TODO(python): )
                }
            }
            pyxel.pal();

        }
        pyxel.line(;
            this.x + 1, this.y + 64, this.x + 128, this.y + 64, WIDGET_PANEL_COLOR;
        // TODO(python): )
        pyxel.line(;
            this.x + 64, this.y + 1, this.x + 64, this.y + 128, WIDGET_PANEL_COLOR;
        // TODO(python): )

        // Draw selection area
        if (this.tool_var == TOOL_SELECT && this._select_x1 >= 0) {
            let x = this._select_x1 * 8 + 12;
            let y = this._select_y1 * 8 + 17;
            let w = this._select_x2 * 8 - x + 20;
            let h = this._select_y2 * 8 - y + 25;
            pyxel.clip(this.x + 1, this.y + 1, 128, 128);
            pyxel.rectb(x, y, w, h, PANEL_SELECT_FRAME_COLOR);
            pyxel.rectb(x + 1, y + 1, w - 2, h - 2, PANEL_SELECT_BORDER_COLOR);
            pyxel.rectb(x - 1, y - 1, w + 2, h + 2, PANEL_SELECT_BORDER_COLOR);
            pyxel.clip();

        }
    }
}