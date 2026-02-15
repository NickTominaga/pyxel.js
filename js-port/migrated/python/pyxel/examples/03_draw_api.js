// Auto-generated from 03_draw_api.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel


class App {
    constructor() {
        pyxel.init(200, 150, title="Pyxel Draw API");
        pyxel.mouse(true);

        pyxel.images[0].load(0, 0, "assets/cat_16x16.png");
        pyxel.images[1].load(0, 0, "assets/tileset_24x32.png");

        pyxel.tilemaps[0].set(;
            // TODO(python): 0,
            // TODO(python): 0,
            // TODO(python): [
                // TODO(python): "0201 0000 0200 0400 0100 0000 0003 0103 0203 0000 0002",
                // TODO(python): "0202 0300 0001 0101 0201 0300 0000 0100 0200 0300 0003",
            // TODO(python): ],
        // TODO(python): )
        pyxel.tilemaps[0].imgsrc = 1;

        this.pal_test_is_enabled = false;
        this.clip_test_is_enabled = false;

        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_Q)) {
            pyxel.quit();

        }
        this.pal_test_is_enabled = (pyxel.frame_count // 30) % 10 >= 5;
        this.clip_test_is_enabled = pyxel.btn(pyxel.KEY_SPACE);

    }
    draw() {
        this.test_pal1();
        this.test_cls(6, 6);
        this.test_clip();
        this.test_pset(6, 20);
        this.test_line(106, 6);
        this.test_rect(6, 38);
        this.test_rectb(106, 38);
        this.test_circ(6, 61);
        this.test_circb(106, 61);
        this.test_blt(6, 88);
        this.test_bltm(106, 88);
        this.test_text(6, 124);
        this.test_pal2(106, 124);

    }
    testPal1() {
        if (this.pal_test_is_enabled) {
            pyxel.pal(5, 2);
            pyxel.pal(12, 7);
            pyxel.pal(7, 10);

        }
    }
    testPal2(x, y) {
        pyxel.text(x, y, "pal(col1,col2)", 12);
        pyxel.pal();

    }
    testCls(x, y) {
        pyxel.cls(5);
        pyxel.text(x, y, "cls(col)", 7);

    }
    testClip() {
        pyxel.clip();

        if (! this.clip_test_is_enabled) {
            return;

        }
        let x = pyxel.sin(pyxel.frame_count * 1.14) * 39 + 40;
        let y = pyxel.sin(pyxel.frame_count * 1.71) * 29 + 30;
        let w = 120;
        let h = 90;

        pyxel.text(x, y - 8, "clip(x,y,w,h)", 14);
        pyxel.rectb(x - 1, y - 1, w + 2, h + 2, 14);

        pyxel.clip(x, y, w, h);

    }
    testPset(x, y) {
        pyxel.text(x, y, "pset(x,y,col)", 7);

        x += 4;
        y += 10;
        for (const i of range(16)) {
            pyxel.pset(x + i * 2, y, i);

        }
    }
    testLine(x, y) {
        pyxel.text(x, y, "line(x1,y1,x2,y2,col)", 7);

        x += 4;
        y += 9;
        let col = 5;

        for (const i of range(3)) {
            pyxel.line(x, y + i * 8, x + 48, y + i * 8, col);
            col += 1;

        }
        for (const i of range(4)) {
            pyxel.line(x + i * 16, y, x + i * 16, y + 16, col);
            col += 1;

        }
        for (const i of range(4)) {
            pyxel.line(x + i * 16, y, x + (3 - i) * 16, y + 16, col);
            col += 1;

        }
    }
    testRect(x, y) {
        pyxel.text(x, y, "rect(x,y,w,h,col)", 7);

        x += 4;
        y += 16;
        for (const i of range(8)) {
            pyxel.rect(x + i * 8, y - i, i + 1, i + 1, i + 8);

        }
    }
    testRectb(x, y) {
        pyxel.text(x, y, "rectb(x,y,w,h,col)", 7);

        x += 4;
        y += 16;
        for (const i of range(8)) {
            pyxel.rectb(x + i * 8, y - i, i + 1, i + 1, i + 8);

        }
    }
    testCirc(x, y) {
        pyxel.text(x, y, "circ(x,y,r,col)", 7);

        x += 4;
        y += 15;
        for (const i of range(8)) {
            pyxel.circ(x + i * 8, y, i, i + 8);

        }
    }
    testCircb(x, y) {
        pyxel.text(x, y, "circb(x,y,r,col)", 7);

        x += 4;
        y += 15;
        for (const i of range(8)) {
            pyxel.circb(x + i * 8, y, i, i + 8);

        }
    }
    testBlt(x, y) {
        pyxel.text(x, y, "blt(x,y,img,u,v,\n    w,h,[colkey])", 7);

        y += 15;
        let offset = pyxel.sin(pyxel.frame_count * 5.73) * 2;

        pyxel.blt(x, y, 0, 0, 0, 16, 16);
        pyxel.blt(x + offset + 19, y, 0, 0, 0, 16, 16, 13);
        pyxel.blt(x + 38, y, 0, 0, 0, -16, 16, 13);
        pyxel.blt(x + 57, y, 0, 0, 0, 16, -16, 13);
        pyxel.blt(x + 76, y, 0, 0, 0, -16, -16, 13);

    }
    testBltm(x, y) {
        pyxel.text(x, y, "bltm(x,y,tm,u,v,\n     w,h,[colkey])", 7);

        y += 15;
        pyxel.bltm(x, y, 0, 0, 0, 88, 16, 2);

    }
    testText(x, y) {
        pyxel.text(x, y, "text(x,y,s,col)", 7);

        x += 4;
        y += 8;
        // TODO(python): s = (
            `Elapsed frame count is {pyxel.frame_count}\n`;
            `Current mouse position is ({pyxel.mouse_x},{pyxel.mouse_y})`;
        // TODO(python): )
        pyxel.text(x + 1, y, s, 1);
        pyxel.text(x, y, s, 9);


    }
}
App();
