/**
 * Manual conversion from python/pyxel/examples/01_hello_pyxel.py
 *
 * Expected runtime: a JS environment exposing `pyxel` global API
 * compatible with Pyxel wasm bindings.
 */
class App {
  constructor() {
    pyxel.init(160, 120, { title: 'Hello Pyxel' });
    pyxel.images[0].load(0, 0, 'assets/pyxel_logo_38x16.png');

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
    pyxel.text(55, 41, 'Hello, Pyxel!', pyxel.frame_count % 16);
    pyxel.blt(61, 66, 0, 0, 0, 38, 16);
  }
}

new App();
