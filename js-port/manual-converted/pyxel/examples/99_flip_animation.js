/**
 * Manual conversion from python/pyxel/examples/99_flip_animation.py
 *
 * Python sample uses `pyxel.flip()` in a while-loop (non-web platforms only).
 * This JS port runs equivalent animation via `pyxel.run(update, draw)`.
 */
class App {
  constructor() {
    pyxel.init(128, 128, { title: 'Flip Animation' });
    this.phase = 0.0;

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    pyxel.run(this.update, this.draw);
  }

  update() {
    if (pyxel.btnp(pyxel.KEY_Q)) {
      pyxel.quit();
    }
    this.phase += 360 / 30;
  }

  draw() {
    pyxel.cls(1);

    for (let x = 0; x < 128; x += 4) {
      for (let y = 0; y < 128; y += 4) {
        const dist = pyxel.sqrt((x - 64) ** 2 + (y - 64) ** 2);
        const offsetX = pyxel.sin(dist * 20 + this.phase) * 2.5;
        const offsetY = pyxel.sin(offsetX * 25) * 2.5;
        const color = Math.floor((15 - dist * 0.2) % 16);
        pyxel.circ(x + offsetX, y + offsetY, 1, color);
      }
    }
  }
}

new App();
