// Auto-generated from field_cursor.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .widgets.settings import WIDGET_HOLD_TIME, WIDGET_REPEAT_TIME


class FieldCursor {
    def __init__(;
        // TODO(python): self,
        // TODO(python): parent,
        // TODO(python): *,
        // TODO(python): max_field_length,
        // TODO(python): field_wrap_length,
        // TODO(python): max_field_values,
        // TODO(python): get_field,
        // TODO(python): add_pre_history,
        // TODO(python): add_post_history,
        // TODO(python): enable_cross_field_copy,
    // TODO(python): ):
        this.parent = parent;
        this._max_field_length = max_field_length;
        // TODO(python): self._field_wrap_length = (
            field_wrap_length;
            if field_wrap_length < max_field_length;
            else max_field_length + 1;
        // TODO(python): )
        this._max_field_values = max_field_values;
        this._get_field = get_field;
        this._add_pre_history = add_pre_history;
        this._add_post_history = add_post_history;
        this._enable_cross_field_copy = enable_cross_field_copy;
        this._cursor_x = 0;
        this._cursor_y = 0;
        this._select_x = null;
        this._field_buffer = null;
        this._bank_buffer = null;

    // TODO(python): @property
    x() {
        return (;
            min(this._adjusted_cursor_x, this._adjusted_select_x);
            if this.is_selecting;
            else this._adjusted_cursor_x;
        // TODO(python): )

    }
    // TODO(python): @property
    y() {
        return this._cursor_y;

    }
    // TODO(python): @property
    width() {
        if (this.is_selecting) {
            let width = abs(this._adjusted_cursor_x - this._adjusted_select_x) + 1;
            return min(width, len(this.field) - this.x);
        }
        else {
            return 1;

        }
    }
    // TODO(python): @property
    field() {
        return this._get_field(this._cursor_y);

    }
    // TODO(python): @property
    isSelecting() {
        return this._select_x !== null && len(this.field) > 0;

    }
    // TODO(python): @property
    MaxCursorX() {
        return max(min(len(this.field), this._max_field_length - 1), 0);

    }
    // TODO(python): @property
    MaxSelectX() {
        return max(min(len(this.field) - 1, this._max_field_length - 1), 0);

    }
    // TODO(python): @property
    MaxY() {
        let y = 0;
        while (this._get_field(y + 1) !== null) {
            y += 1;
        }
        return y;

    }
    // TODO(python): @property
    AdjustedCursorX() {
        return min(this._cursor_x, this._max_cursor_x);

    }
    // TODO(python): @property
    AdjustedSelectX() {
        return min(this._select_x, this._max_select_x);

    }
    moveTo(x, y, with_select_key) {
        let y = max(min(y, this._max_y), 0);
        if (this._cursor_y != y) {
            this._cursor_x = max(min(x, this._max_cursor_x), 0);
            this._cursor_y = y;
            this._select_x = null;
        }
        else if (with_select_key) {
            if (this.is_selecting) {
                this._cursor_x = max(min(x, this._max_select_x), 0);
            }
            else {
                this._select_x = max(;
                    min(this._adjusted_cursor_x, this._max_select_x), 0;
                // TODO(python): )
                this._cursor_x = max(min(x, this._max_select_x), 0);
            }
        }
        else {
            this._cursor_x = max(min(x, this._max_cursor_x), 0);
            this._select_x = null;

        }
    }
    moveLeft(with_select_key) {
        if (with_select_key) {
            if (this.is_selecting) {
                this._cursor_x = max(this._adjusted_cursor_x - 1, 0);
            }
            else if (len(this.field) > 0) {
                this._cursor_x = this._select_x = min(;
                    // TODO(python): self._adjusted_cursor_x, self._max_select_x
                // TODO(python): )
            }
        }
        else {
            this._cursor_x = max(this._adjusted_cursor_x - 1, 0);
            this._select_x = null;

        }
    }
    moveRight(with_select_key) {
        if (with_select_key) {
            if (this.is_selecting) {
                this._cursor_x = min(this._adjusted_cursor_x + 1, this._max_select_x);
            }
            else if (this._adjusted_cursor_x <= this._max_select_x) {
                this._cursor_x = this._select_x = min(;
                    // TODO(python): self._adjusted_cursor_x, self._max_select_x
                // TODO(python): )
            }
        }
        else {
            this._cursor_x = min(this._adjusted_cursor_x + 1, this._max_cursor_x);
            this._select_x = null;

        }
    }
    moveUp(with_select_key) {
        if (this._adjusted_cursor_x >= this._field_wrap_length) {
            if (! with_select_key) {
                this._select_x = null;
            }
            else if (! this.is_selecting) {
                this._select_x = this._adjusted_cursor_x;
            }
            this._cursor_x -= this._field_wrap_length;
        }
        else if (this._cursor_y > 0) {
            this._cursor_y -= 1;
            // TODO(python): self._cursor_x = (
                this._field_wrap_length * (len(this.field) // this._field_wrap_length);
                + this._cursor_x % this._field_wrap_length;
            // TODO(python): )
            this._select_x = null;

        }
    }
    moveDown(with_select_key) {
        if (;
            this._adjusted_cursor_x // this._field_wrap_length;
            < len(this.field) // this._field_wrap_length;
        // TODO(python): ):
            if (! with_select_key) {
                this._select_x = null;
        }
            else if (! this.is_selecting) {
                this._select_x = this._adjusted_cursor_x;
        }
            this._cursor_x += this._field_wrap_length;
        else if (this._cursor_y < this._max_y) {
            this._cursor_y += 1;
            this._cursor_x %= this._field_wrap_length;
            this._select_x = null;

        }
    }
    insert(value) {
        this._add_pre_history(this.x, this.y);
        let lst = this.field.to_list();
        let x = this.x;
        if (this.is_selecting) {
            // TODO(python): lst[x : x + self.width] = []
        }
        if (! isinstance(value, list)) {
            let value = [value];
        }
        // TODO(python): lst[x:x] = value
        // TODO(python): self.field.from_list(lst[: self._max_field_length])
        this.move_to(x + len(value), this.y, false);
        this._add_post_history(this.x, this.y);

    }
    backspace() {
        if (! this.is_selecting && this.x == 0) {
            return;

        }
        this._add_pre_history(this.x, this.y);
        let lst = this.field.to_list();
        if (this.is_selecting) {
            let x = this.x;
            let width = this.width;
        }
        else {
            let x = this.x - 1;
            let width = 1;
        }
        // TODO(python): lst[x : x + width] = []
        this.field.from_list(lst);
        this.move_to(x, this.y, false);
        this._add_post_history(this.x, this.y);

    }
    delete() {
        if (this.x >= len(this.field)) {
            return;

        }
        this._add_pre_history(this.x, this.y);
        let lst = this.field.to_list();
        let x = this.x;
        let width = this.width;
        // TODO(python): lst[x : x + width] = []
        this.field.from_list(lst);
        this.move_to(x, this.y, false);
        this._add_post_history(this.x, this.y);

    }
    selectAll() {
        if (len(this.field) == 0) {
            return;
        }
        this._cursor_x = 0;
        this._select_x = len(this.field) - 1;

    }
    copy() {
        let lst = this.field.to_list();
        this._field_buffer = (this.y, lst[this.x : this.x + this.width]);

    }
    cut() {
        this.copy();
        this.delete();

    }
    paste() {
        if (this._field_buffer === null) {
            return;
        }
        (y, field) = this._field_buffer;
        if (! this._enable_cross_field_copy && this.y != y) {
            return;
        }
        this.insert(field);

    }
    shift(offset) {
        this._add_pre_history(this.x, this.y);
        let lst = this.field.to_list();
        for (const i of range(this.x, this.x + this.width)) {
            if (i < len(lst)) {
                let value = lst[i];
                if (value >= 0) {
                    lst[i] = min(max(value + offset, 0), this._max_field_values[this.y]);
                }
            }
            else {
                lst.append(0);
            }
        }
        this.field.from_list(lst);
        this._add_post_history(this.x, this.y);

    }
    processInput() {
        if (pyxel.btn(pyxel.KEY_ALT)) {
            return;

        }
        // Copy/cut/paste bank
        if pyxel.btn(pyxel.KEY_SHIFT) && (;
            pyxel.btn(pyxel.KEY_CTRL) || pyxel.btn(pyxel.KEY_GUI);
        // TODO(python): ):
            // Ctrl+Shift+C/Ctrl+Shift+X: Copy bank
            if (pyxel.btnp(pyxel.KEY_C) || pyxel.btnp(pyxel.KEY_X)) {
                this._bank_buffer = {};
                if (hasattr(this.parent, "speed_var")) {
                    this._bank_buffer["speed"] = this.parent.speed_var;
                }
                for (const i of range(this._max_y + 1)) {
                    this._bank_buffer[i] = this._get_field(i).to_list();

                }
        }
            // Ctrl+Shift+X: Cut bank
            if (pyxel.btnp(pyxel.KEY_X)) {
                this._add_pre_history(bank_copy=true);
                for (const i of range(this._max_y + 1)) {
                    this._get_field(i).from_list([]);
                }
                this._add_post_history(bank_copy=true);

        }
            // Ctrl+Shift+V: Paste bank
            if (pyxel.btnp(pyxel.KEY_V) && this._bank_buffer !== null) {
                this._add_pre_history(bank_copy=true);
                if (hasattr(this.parent, "speed_var")) {
                    this.parent.speed_var = this._bank_buffer["speed"];
                }
                for (const i of range(this._max_y + 1)) {
                    this._get_field(i).from_list(this._bank_buffer[i]);
                }
                this._add_post_history(bank_copy=true);
        }
            return;

        // Copy/cut/paste/shift field
        if ! pyxel.btn(pyxel.KEY_SHIFT) && (;
            pyxel.btn(pyxel.KEY_CTRL) || pyxel.btn(pyxel.KEY_GUI);
        // TODO(python): ):
            // Ctrl+A: Select all
            if (pyxel.btnp(pyxel.KEY_A)) {
                this.select_all();

        }
            // Ctrl+C: Copy
            if (pyxel.btnp(pyxel.KEY_C)) {
                this.copy();

        }
            // Ctrl+X: Cut
            if (pyxel.btnp(pyxel.KEY_X)) {
                this.cut();

        }
            // Ctrl+V: Paste
            if (pyxel.btnp(pyxel.KEY_V)) {
                this.paste();

        }
            // Ctrl+U: Shift up
            if pyxel.btnp(;
                pyxel.KEY_U, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): ):
                this.shift(1);

            // Ctrl+D: Shift down
            if pyxel.btnp(;
                pyxel.KEY_D, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
            // TODO(python): ):
                this.shift(-1);
            return;

        let with_select_key = pyxel.btn(pyxel.KEY_SHIFT);
        if (pyxel.btnp(pyxel.KEY_LEFT, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME)) {
            this.move_left(with_select_key);
        }
        if pyxel.btnp(;
            pyxel.KEY_RIGHT, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
        // TODO(python): ):
            this.move_right(with_select_key);
        if (pyxel.btnp(pyxel.KEY_UP, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME)) {
            this.move_up(with_select_key);
        }
        if (pyxel.btnp(pyxel.KEY_DOWN, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME)) {
            this.move_down(with_select_key);
        }
        if pyxel.btnp(;
            pyxel.KEY_BACKSPACE, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
        // TODO(python): ):
            this.backspace();
        if pyxel.btnp(;
            pyxel.KEY_DELETE, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
        // TODO(python): ):
            this.delete();

    }
}