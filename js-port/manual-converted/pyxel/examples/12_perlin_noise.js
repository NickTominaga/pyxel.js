/**
 * Manual conversion from python/pyxel/examples/12_perlin_noise.py
 */
class App {
  constructor() {
    pyxel.init(64, 64, { title: 'Perlin Noise', captureScale: 4 });

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    pyxel.run(this.update, this.draw);
  }

  update() {
    if (pyxel.btnp(pyxel.KEY_Q)) {
      pyxel.quit();
    }
  }

  draw() {
    pyxel.cls(0);

    for (let y = 0; y < 64; y += 1) {
      for (let x = 0; x < 64; x += 1) {
        const n = pyxel.noise(x / 10, y / 10, pyxel.frame_count / 40);
        const col = n > 0.4 ? 7 : n > 0 ? 6 : n > -0.4 ? 12 : 0;
        pyxel.pset(x, y, col);
      }
    }
  }
}

new App();
