// Auto-generated from widgets/widget.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(import): from .settings import (
    // TODO(python): WIDGET_CLICK_DIST,
    // TODO(python): WIDGET_CLICK_TIME,
    // TODO(python): WIDGET_HOLD_TIME,
    // TODO(python): WIDGET_PANEL_COLOR,
    // TODO(python): WIDGET_REPEAT_TIME,
    // TODO(python): WIDGET_SHADOW_COLOR,
// TODO(python): )
// TODO(import): from .widget_var import WidgetVar


class MouseCaptureInfo {
    let widget = null;
    let key = null;
    let time = null;
    let press_pos = null;
    let last_pos = null;


}
class Widget {
    // TODO(docstring): """
    // TODO(docstring): Variables:
        // TODO(docstring): is_visible_var
        // TODO(docstring): is_enabled_var

    // TODO(docstring): Events:
        // TODO(docstring): show
        // TODO(docstring): hide
        // TODO(docstring): enabled
        // TODO(docstring): disabled
        // TODO(docstring): mouse_down (key, x, y)
        // TODO(docstring): mouse_up (key, x, y)
        // TODO(docstring): mouse_drag (key, x, y, dx, dy)
        // TODO(docstring): mouse_repeat (key, x, y)
        // TODO(docstring): mouse_click (key, x, y)
        // TODO(docstring): mouse_hover (x, y)
        // TODO(docstring): update
        // TODO(docstring): draw
    // TODO(docstring): """

    let _mouse_capture_info = MouseCaptureInfo();

    def __init__(;
        self, parent, x, y, width, height, *, is_visible=true, is_enabled=true;
    // TODO(python): ):
        if (parent) {
            parent._children.append(self);

    }
        this._parent = parent;
        this._children = [];
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._event_listeners = {};

        // Initialize is_visible_var
        this.new_var("is_visible_var", is_visible);
        this.add_var_event_listener("is_visible_var", "get", this.__on_is_visible_get);
        this.add_var_event_listener(;
            "is_visible_var", "change", this.__on_is_visible_change;
        // TODO(python): )

        // Initialize is_enabled_var
        this.new_var("is_enabled_var", is_enabled);
        this.add_var_event_listener("is_enabled_var", "get", this.__on_is_enabled_get);
        this.add_var_event_listener(;
            "is_enabled_var", "change", this.__on_is_enabled_change;
        // TODO(python): )

    // TODO(python): @property
    x() {
        return (this._parent.x + this._x) if this._parent else this._x;

    }
    // TODO(python): @property
    y() {
        return (this._parent.y + this._y) if this._parent else this._y;

    }
    // TODO(python): @property
    width() {
        return this._width;

    }
    // TODO(python): @property
    height() {
        return this._height;

    }
    isHit(x, y) {
        x -= this.x;
        y -= this.y;
        return 0 <= x <= this.width - 1 && 0 <= y <= this.height - 1;

    }
    setPos(x, y) {
        this._x = x;
        this._y = y;

    }
    setSize(width, height) {
        this._width = width;
        this._height = height;

    }
    addEventListener(event, listener) {
        this._event_listeners.setdefault(event, []);
        this._event_listeners[event].append(listener);

    }
    removeEventListener(event, listener) {
        this._event_listeners.setdefault(event, []);
        this._event_listeners[event].remove(listener);

    }
    triggerEvent(event, *args) {
        this._event_listeners.setdefault(event, []);
        for (const listener of this._event_listeners[event]) {
            listener(*args);

        }
    }
    updateAll() {
        let capture_widget = Widget._mouse_capture_info.widget;
        if (capture_widget) {
            capture_widget._process_capture();
        }
        else {
            this._process_input();

        }
        this._update();

    }
    ProcessInput() {
        if (! this.is_visible_var || ! this.is_enabled_var) {
            return false;

        }
        for (const widget of reversed(this._children)) {
            if (widget._process_input()) {
                return true;

            }
        }
        let x = pyxel.mouse_x;
        let y = pyxel.mouse_y;
        if (this.is_hit(x, y)) {
            if (pyxel.btnp(pyxel.MOUSE_BUTTON_LEFT)) {
                let key = pyxel.MOUSE_BUTTON_LEFT;
            }
            else if (pyxel.btnp(pyxel.MOUSE_BUTTON_RIGHT)) {
                let key = pyxel.MOUSE_BUTTON_RIGHT;
            }
            else if (pyxel.btnp(pyxel.MOUSE_BUTTON_MIDDLE)) {
                let key = pyxel.MOUSE_BUTTON_MIDDLE;
            }
            else {
                let key = null;

            }
            if (key !== null) {
                this._start_capture(key);
                this.trigger_event("mouse_down", key, x, y);

            }
            this.trigger_event("mouse_hover", x, y);
            return true;

        }
        return false;

    }
    StartCapture(key) {
        let capture_info = Widget._mouse_capture_info;
        capture_info.widget = self;
        capture_info.key = key;
        capture_info.time = pyxel.frame_count;
        capture_info.press_pos = (pyxel.mouse_x, pyxel.mouse_y);
        capture_info.last_pos = capture_info.press_pos;

    }
    EndCapture() {
        let capture_info = Widget._mouse_capture_info;
        capture_info.widget = null;
        capture_info.key = null;
        capture_info.time = null;
        capture_info.press_pos = null;
        capture_info.last_pos = null;

    }
    ProcessCapture() {
        let capture_info = Widget._mouse_capture_info;
        last_x, last_y = capture_info.last_pos;
        let x = pyxel.mouse_x;
        let y = pyxel.mouse_y;
        if (x != last_x || y != last_y) {
            this.trigger_event(;
                // TODO(python): "mouse_drag",
                // TODO(python): capture_info.key,
                // TODO(python): x,
                // TODO(python): y,
                // TODO(python): x - last_x,
                // TODO(python): y - last_y,
            // TODO(python): )
            capture_info.last_pos = (x, y);

        }
        if (this.is_hit(x, y)) {
            this.trigger_event("mouse_hover", x, y);

        }
        if pyxel.btnp(;
            capture_info.key, hold=WIDGET_HOLD_TIME, repeat=WIDGET_REPEAT_TIME;
        // TODO(python): ):
            this.trigger_event("mouse_repeat", capture_info.key, x, y);

        if (pyxel.btnr(capture_info.key)) {
            this.trigger_event("mouse_up", capture_info.key, x, y);
            press_x, press_y = capture_info.press_pos;
            if (;
                pyxel.frame_count <= capture_info.time + WIDGET_CLICK_TIME;
                && abs(x - press_x) <= WIDGET_CLICK_DIST;
                && abs(y - press_y) <= WIDGET_CLICK_DIST;
            // TODO(python): ):
                this.trigger_event("mouse_click", capture_info.key, x, y);

            this._end_capture();

        }
    }
    Update() {
        if (! this.is_visible_var) {
            return;

        }
        this.trigger_event("update");
        for (const child of this._children) {
            child._update();

        }
    }
    drawAll() {
        if (! this.is_visible_var) {
            return;

        }
        this.trigger_event("draw");
        for (const child of this._children) {
            child.draw_all();

        }
    }
    // TODO(python): @staticmethod
    drawPanel(x, y, width, height, *, with_shadow) {
        let w = width;
        let h = height;
        pyxel.line(x + 1, y, x + w - 2, y, WIDGET_PANEL_COLOR);
        pyxel.rect(x, y + 1, w, h - 2, WIDGET_PANEL_COLOR);
        pyxel.line(x + 1, y + h - 1, x + w - 2, y + h - 1, WIDGET_PANEL_COLOR);
        if (with_shadow) {
            pyxel.line(x + 2, y + h, x + w - 1, y + h, WIDGET_SHADOW_COLOR);
            pyxel.line(x + w, y + 2, x + w, y + h - 1, WIDGET_SHADOW_COLOR);
            pyxel.pset(x + w - 1, y + h - 1, WIDGET_SHADOW_COLOR);

        }
    }
    newVar(name, value) {
        let member_name = this._widget_var_name(name);
        let widget_var = WidgetVar(value);
        setattr(self, member_name, widget_var);

        getter() {
            return getattr(self, member_name).get();

        }
        setter(value) {
            getattr(self, member_name).set(value);

        }
        setattr(this.__class__, name, property(getter, setter));

    }
    copyVar(name, src_widget, src_name) {
        let member_name = this._widget_var_name(name);
        let src_member_name = this._widget_var_name(src_name || name);
        let widget_var = getattr(src_widget, src_member_name);
        setattr(self, member_name, widget_var);

        getter() {
            return getattr(self, member_name).get();

        }
        setter(value) {
            getattr(self, member_name).set(value);

        }
        setattr(this.__class__, name, property(getter, setter));

    }
    addVarEventListener(name, event, listener) {
        let member_name = this._widget_var_name(name);
        let widget_var = getattr(self, member_name);
        widget_var.add_event_listener(event, listener);

    }
    removeVarEventListener(name, event, listener) {
        let member_name = this._widget_var_name(name);
        let widget_var = getattr(self, member_name);
        widget_var.remove_event_listener(event, listener);

    }
    // TODO(python): @staticmethod
    WidgetVarName(name) {
        return "_widget_var_" + name;

    }
    _OnIsVisibleGet(value) {
        return (this._parent.is_visible_var && value) if this._parent else value;

    }
    _OnIsVisibleChange(value) {
        this._trigger_visible_event(value);

    }
    TriggerVisibleEvent(is_visible) {
        this.trigger_event("show" if is_visible else "hide");
        for (const child of this._children) {
            if (child.is_visible_var == is_visible) {
                child._trigger_visible_event(is_visible);

            }
        }
    }
    _OnIsEnabledGet(value) {
        return (this._parent.is_enabled_var && value) if this._parent else value;

    }
    _OnIsEnabledChange(value) {
        this._trigger_enabled_event(value);

    }
    TriggerEnabledEvent(is_enabled) {
        this.trigger_event("enabled" if is_enabled else "disabled");
        for (const child of this._children) {
            if (child.is_enabled_var == is_enabled) {
                child._trigger_enabled_event(is_enabled);

            }
        }
    }
}