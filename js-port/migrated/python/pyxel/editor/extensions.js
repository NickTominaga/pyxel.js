// Auto-generated from extensions.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel


function UserPal() {
    for (const i of range(len(pyxel.colors))) {
        pyxel.pal(i, pyxel.NUM_COLORS + i);


    }
}
function Rect2(x1, y1, x2, y2, val) {
    x1, x2 = (x1, x2) if x1 < x2 else (x2, x1);
    y1, y2 = (y1, y2) if y1 < y2 else (y2, y1);
    this.rect(x1, y1, x2 - x1 + 1, y2 - y1 + 1, val);


}
function Rectb2(x1, y1, x2, y2, val) {
    x1, x2 = (x1, x2) if x1 < x2 else (x2, x1);
    y1, y2 = (y1, y2) if y1 < y2 else (y2, y1);
    this.rectb(x1, y1, x2 - x1 + 1, y2 - y1 + 1, val);


}
function Elli2(x1, y1, x2, y2, val) {
    x1, x2 = (x1, x2) if x1 < x2 else (x2, x1);
    y1, y2 = (y1, y2) if y1 < y2 else (y2, y1);
    this.elli(x1, y1, x2 - x1 + 1, y2 - y1 + 1, val);


}
function Ellib2(x1, y1, x2, y2, val) {
    x1, x2 = (x1, x2) if x1 < x2 else (x2, x1);
    y1, y2 = (y1, y2) if y1 < y2 else (y2, y1);
    this.ellib(x1, y1, x2 - x1 + 1, y2 - y1 + 1, val);


}
function GetSlice(x, y, width, height) {
    let data = [[0] * width for _ in range(height)];

    for (const yi of range(height)) {
        for (const xi of range(width)) {
            data[yi][xi] = this.pget(x + xi, y + yi);

        }
    }
    return data;


}
function SetSlice(x, y, slice) {
    let width = len(slice[0]);
    let height = len(slice);

    for (const yi of range(height)) {
        for (const xi of range(width)) {
            this.pset(x + xi, y + yi, slice[yi][xi]);


        }
    }
}
pyxel.user_pal = _user_pal;

pyxel.Image.rect2 = pyxel.Tilemap.rect2 = _rect2;
pyxel.Image.rectb2 = pyxel.Tilemap.rectb2 = _rectb2;
pyxel.Image.elli2 = pyxel.Tilemap.elli2 = _elli2;
pyxel.Image.ellib2 = pyxel.Tilemap.ellib2 = _ellib2;
pyxel.Image.get_slice = pyxel.Tilemap.get_slice = _get_slice;
pyxel.Image.set_slice = pyxel.Tilemap.set_slice = _set_slice;
