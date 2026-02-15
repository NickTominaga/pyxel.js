// Auto-generated from tilemap_viewer.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import PANEL_FOCUS_BORDER_COLOR, PANEL_FOCUS_COLOR
// TODO(import): from .widgets import Widget


class TilemapViewer {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): tilemap_index_var
        // TODO(docstring): focus_x_var
        // TODO(docstring): focus_y_var
        // TODO(docstring): help_message_var
    // TODO(docstring): """

    constructor(parent) {
        super().__init__(parent, 157, 16, 66, 65);
        this._tilemap_image = pyxel.Image(64, 63);
        this.copy_var("tilemap_index_var", parent);
        this.copy_var("help_message_var", parent);

        // Initialize focus_x_var
        this.new_var("focus_x_var", 0);
        this.add_var_event_listener("focus_x_var", "set", this.__on_focus_x_set);

        // Initialize focus_y_var
        this.new_var("focus_y_var", 0);
        this.add_var_event_listener("focus_y_var", "set", this.__on_focus_y_set);

        // Set event listeners
        this.add_event_listener("mouse_down", this.__on_mouse_down);
        this.add_event_listener("mouse_drag", this.__on_mouse_drag);
        this.add_event_listener("mouse_hover", this.__on_mouse_hover);
        this.add_event_listener("update", this.__on_update);
        this.add_event_listener("draw", this.__on_draw);

    }
    ScreenToFocus(x, y) {
        let x = min(max((x - this.x - 1) // 2, 0), 31);
        let y = min(max((y - this.y - 1) // 2, 0), 31);
        return x, y;

    }
    _OnFocusXSet(value) {
        return min(max(value, 0), 30);

    }
    _OnFocusYSet(value) {
        return min(max(value, 0), 30);

    }
    _OnMouseDown(key, x, y) {
        if (key == pyxel.MOUSE_BUTTON_LEFT) {
            this.focus_x_var, this.focus_y_var = this._screen_to_focus(x, y);

        }
    }
    _OnMouseDrag(key, x, y, dx, dy) {
        this.__on_mouse_down(key, x, y);

    }
    _OnMouseHover(x, y) {
        x, y = this._screen_to_focus(x, y);
        this.help_message_var = `TARGET:CURSOR ({x * 8},{y * 8})`;

    }
    _OnUpdate() {
        let tilemap = pyxel.tilemaps[this.tilemap_index_var];
        let image = pyxel.images[tilemap.imgsrc];
        let start_y = pyxel.frame_count % 8 * 8;

        for (const y of range(start_y, start_y + 8)) {
            for (const x of range(64)) {
                let tile = tilemap.pget(x * 4 + 1, y * 4 + 1);
                let col = image.pget(tile[0] * 8 + 3, tile[1] * 8 + 3);
                this._tilemap_image.pset(x, y, col);

            }
        }
    }
    _OnDraw() {
        this.draw_panel(this.x, this.y, this.width, this.height);

        // Draw tilemap
        pyxel.user_pal();
        pyxel.blt(;
            // TODO(python): self.x + 1,
            // TODO(python): self.y + 1,
            // TODO(python): self._tilemap_image,
            // TODO(python): 0,
            // TODO(python): 0,
            // TODO(python): self._tilemap_image.width,
            // TODO(python): self._tilemap_image.height,
        // TODO(python): )
        pyxel.pal();

        // Draw focus
        let x = this.x + this.focus_x_var * 2 + 1;
        let y = this.y + this.focus_y_var * 2 + 1;
        pyxel.clip(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
        pyxel.rectb(x, y, 4, 4, PANEL_FOCUS_COLOR);
        pyxel.rectb(x - 1, y - 1, 6, 6, PANEL_FOCUS_BORDER_COLOR);
        pyxel.clip();

    }
}