// Auto-generated from image_viewer.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import PANEL_FOCUS_BORDER_COLOR, PANEL_FOCUS_COLOR
// TODO(import): from .widgets import ScrollBar, Widget


class ImageViewer {
    constructor(parent) {
        // TODO(docstring): """
        // TODO(docstring): Variables:
            // TODO(docstring): image_index_var
            // TODO(docstring): tilemap_index_var
            // TODO(docstring): focus_x_var
            // TODO(docstring): focus_y_var
            // TODO(docstring): viewport_x_var
            // TODO(docstring): viewport_y_var
            // TODO(docstring): help_message_var
        // TODO(docstring): """

        if (hasattr(parent, "tilemap_index_var")) {
            let y = 80;
            let height = 66;
            let slider_amount = 8;
            this._is_tilemap_mode = true;
            this.copy_var("tilemap_index_var", parent);
        }
        else {
            let y = 16;
            let height = 130;
            let slider_amount = 16;
            this._is_tilemap_mode = false;

        }
        super().__init__(parent, 157, y, 66, height);
        this._press_x = 0;
        this._press_y = 0;
        this._drag_offset_x = 0;
        this._drag_offset_y = 0;
        this.copy_var("image_index_var", parent);
        this.copy_var("help_message_var", parent);

        // Initialize focus_x_var
        this.new_var("focus_x_var", 0);
        this.add_var_event_listener("focus_x_var", "set", this.__on_focus_x_set);
        this.add_var_event_listener("focus_x_var", "change", this.__on_focus_x_change);

        // Initialize focus_y_var
        this.new_var("focus_y_var", 0);
        this.add_var_event_listener("focus_y_var", "set", this.__on_focus_y_set);
        this.add_var_event_listener("focus_y_var", "change", this.__on_focus_y_change);

        // Initialize focus_w_var
        this.new_var("focus_w_var", 1 if this._is_tilemap_mode else 2);

        // Initialize focus_h_var
        this.new_var("focus_h_var", 1 if this._is_tilemap_mode else 2);

        // Initialize horizontal scroll bar
        this._h_scroll_bar = ScrollBar(;
            // TODO(python): self,
            // TODO(python): 0,
            // TODO(python): height - 1,
            // TODO(python): width=66,
            // TODO(python): scroll_amount=32,
            // TODO(python): slider_amount=8,
            // TODO(python): value=0,
        // TODO(python): )
        this.copy_var("viewport_x_var", this._h_scroll_bar, "value_var");

        // Initialize vertical scroll bar
        this._v_scroll_bar = ScrollBar(;
            // TODO(python): self,
            // TODO(python): 65,
            // TODO(python): 0,
            // TODO(python): height=height,
            // TODO(python): scroll_amount=32,
            // TODO(python): slider_amount=slider_amount,
            // TODO(python): value=0,
        // TODO(python): )
        this.copy_var("viewport_y_var", this._v_scroll_bar, "value_var");

        // Set event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_drag", this.__on_mouse_drag);
        this.add_event_listener("mouse_hover", this.__on_mouse_hover);
        this.add_event_listener("draw", this.__on_draw);

    }
    ScreenToFocus(x, y) {
        let x = min(max(this.viewport_x_var + (x - this.x - 1) // 8, 0), 31);
        let y = min(max(this.viewport_y_var + (y - this.y - 1) // 8, 0), 31);
        return x, y;

    }
    _OnFocusXSet(value) {
        return min(max(value, 0), 32 - this.focus_w_var);

    }
    _OnFocusXChange(value) {
        let fx = this.focus_x_var;
        let fw = this.focus_w_var;
        let vx = this.viewport_x_var;
        let vw = 8;
        this.viewport_x_var += min(fx - vx, 0) + max(fx + fw - vx - vw, 0);

    }
    _OnFocusYSet(value) {
        return min(max(value, 0), 32 - this.focus_h_var);

    }
    _OnFocusYChange(value) {
        let fy = this.focus_y_var;
        let fh = this.focus_h_var;
        let vy = this.viewport_y_var;
        let vh = 8 if this._is_tilemap_mode else 16;
        this.viewport_y_var += min(fy - vy, 0) + max(fy + fh - vy - vh, 0);

    }
    _OnMouseDown(key, x, y) {
        if (key == pyxel.MOUSE_BUTTON_LEFT) {
            this.focus_x_var, this.focus_y_var = this._screen_to_focus(x, y);
            this._press_x = this.focus_x_var;
            this._press_y = this.focus_y_var;
        }
        else if (key == pyxel.MOUSE_BUTTON_RIGHT) {
            this._drag_offset_x = 0;
            this._drag_offset_y = 0;

        }
    }
    _OnMouseDrag(key, x, y, dx, dy) {
        if (key == pyxel.MOUSE_BUTTON_LEFT) {
            if (this._is_tilemap_mode) {
                let last_focus_x = this.focus_x_var;
                let last_focus_y = this.focus_y_var;
                this._focus_x_var, this._focus_y_var = this._screen_to_focus(x, y);
                this.focus_w_var = min(abs(this._focus_x_var - this._press_x) + 1, 8);
                this.focus_h_var = min(abs(this._focus_y_var - this._press_y) + 1, 8);
                this.focus_x_var = min(this._focus_x_var, last_focus_x);
                this.focus_y_var = min(this._focus_y_var, last_focus_y);
            }
            else {
                this.__on_mouse_down(key, x, y);
            }
        }
        else if (key == pyxel.MOUSE_BUTTON_RIGHT) {
            this._drag_offset_x -= dx;
            this._drag_offset_y -= dy;
            if (abs(this._drag_offset_x) >= 8) {
                let offset = this._drag_offset_x // 8;
                this.viewport_x_var += offset;
                this._drag_offset_x -= offset * 8;
            }
            if (abs(this._drag_offset_y) >= 8) {
                let offset = this._drag_offset_y // 8;
                this.viewport_y_var += offset;
                this._drag_offset_y -= offset * 8;

            }
        }
    }
    _OnMouseHover(x, y) {
        x, y = this._screen_to_focus(x, y);
        // TODO(python): self.help_message_var = (
            // TODO(python): f"TILE:SHIFT+CURSOR ({x},{y})"
            if this._is_tilemap_mode;
            // TODO(python): else f"TARGET:CURSOR ({x * 8},{y * 8})"
        // TODO(python): )

    }
    _OnDraw() {
        this.draw_panel(this.x, this.y, this.width, this.height);

        // Draw image
        pyxel.user_pal();
        pyxel.blt(;
            // TODO(python): self.x + 1,
            // TODO(python): self.y + 1,
            // TODO(python): self.image_index_var,
            // TODO(python): self.viewport_x_var * 8,
            // TODO(python): self.viewport_y_var * 8,
            // TODO(python): self.width - 2,
            // TODO(python): self.height - 2,
        // TODO(python): )
        pyxel.pal();

        // Draw focus
        let x = this.x + (this.focus_x_var - this.viewport_x_var) * 8 + 1;
        let y = this.y + (this.focus_y_var - this.viewport_y_var) * 8 + 1;
        let w = this.focus_w_var * 8;
        let h = this.focus_h_var * 8;
        pyxel.clip(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
        pyxel.rectb(x, y, w, h, PANEL_FOCUS_COLOR);
        pyxel.rectb(x + 1, y + 1, w - 2, h - 2, PANEL_FOCUS_BORDER_COLOR);
        pyxel.rectb(x - 1, y - 1, w + 2, h + 2, PANEL_FOCUS_BORDER_COLOR);
        pyxel.clip();

    }
}