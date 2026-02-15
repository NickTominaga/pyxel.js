// Auto-generated from 16_transform.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel


class App {
    constructor() {
        pyxel.init(200, 160, title="Transform");
        pyxel.load("assets/sample.pyxres");
        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_Q)) {
            pyxel.quit();

        }
    }
    draw() {
        pyxel.cls(1);

        x, y, w, h = 67, 27, 128, 128;
        let rotate = pyxel.frame_count;
        let scale = pyxel.sin(pyxel.frame_count) * 0.3 + 0.8;
        pyxel.rectb(x, y, w, h, 2);
        pyxel.bltm(x, y, 0, 0, 0, w, h, 0, rotate=rotate, scale=scale);

        x, y, w, h = 30, 79, 8, 24;
        let rotate = pyxel.frame_count * -3;
        let scale = pyxel.sin(pyxel.frame_count + 180) * 3 + 4;
        pyxel.rectb(x, y, w, h, 2);
        pyxel.blt(x, y, 0, 8, 0, w, h, 0, rotate=rotate, scale=scale);

        pyxel.dither(0.5);
        pyxel.rect(0, 0, 200, 22, 0);
        pyxel.dither(1);

        pyxel.text(9, 4, "blt(x,y,img,u,v,w,h,[colkey],[rotate],[scale])", 7);
        pyxel.text(125, 4, "[rotate]", 10);
        pyxel.text(161, 4, "[scale]", 10);

        pyxel.text(9, 12, "bltm(x,y,tm,u,v,w,h,[colkey],[rotate],[scale])", 7);
        pyxel.text(125, 12, "[rotate]", 10);
        pyxel.text(161, 12, "[scale]", 10);


    }
}
App();
