// Auto-generated from 01_hello_pyxel.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel


class App {
    constructor() {
        pyxel.init(160, 120, title="Hello Pyxel");
        pyxel.images[0].load(0, 0, "assets/pyxel_logo_38x16.png");
        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_Q)) {
            pyxel.quit();

        }
    }
    draw() {
        pyxel.cls(0);
        pyxel.text(55, 41, "Hello, Pyxel!", pyxel.frame_count % 16);
        pyxel.blt(61, 66, 0, 0, 0, 38, 16);


    }
}
App();
