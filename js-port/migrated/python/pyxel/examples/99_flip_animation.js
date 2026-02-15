// Auto-generated from 99_flip_animation.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

let phase = 0.0;

pyxel.init(128, 128, title="Flip Animation");

while (true) {
    if (pyxel.btnp(pyxel.KEY_Q)) {
        pyxel.quit();

    }
    pyxel.cls(1);

    for (const x of range(0, 128, 4)) {
        for (const y of range(0, 128, 4)) {
            let dist = pyxel.sqrt((x - 64) ** 2 + (y - 64) ** 2);
            let offset_x = pyxel.sin(dist * 20 + phase) * 2.5;
            let offset_y = pyxel.sin(offset_x * 25) * 2.5;
            let color = int((15 - dist * 0.2) % 16);
            pyxel.circ(x + offset_x, y + offset_y, 1, color);

        }
    }
    phase += 360 / 30;

    pyxel.flip();
    // Please note that flip function only works on non-Web platforms

}