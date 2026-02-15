// Auto-generated from 12_perlin_noise.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel


class App {
    constructor() {
        pyxel.init(64, 64, title="Perlin Noise", capture_scale=4);
        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_Q)) {
            pyxel.quit();

        }
    }
    draw() {
        pyxel.cls(0);

        for (const y of range(64)) {
            for (const x of range(64)) {
                let n = pyxel.noise(;
                    x / 10,;
                    y / 10,;
                    pyxel.frame_count / 40,;
                );
                let col = 7 if n > 0.4 else 6 if n > 0 else 12 if n > -0.4 else 0;
                pyxel.pset(x, y, col);


            }
        }
    }
}
App();
