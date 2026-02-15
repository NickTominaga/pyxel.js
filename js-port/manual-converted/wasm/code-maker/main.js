/**
 * Manual conversion from wasm/code-maker/main.py
 */
class App {
  constructor() {
    pyxel.init(160, 120);
    pyxel.load('my_resource.pyxres');
    this.x = 0;

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    pyxel.run(this.update, this.draw);
  }

  update() {
    this.x += 1;
    if (this.x >= pyxel.width) {
      this.x = -8;
    }
  }

  draw() {
    pyxel.cls(0);
    pyxel.blt(this.x, 60, 0, 0, 0, 8, 8, 2);
    pyxel.text(48, 53, 'Pyxel Code Maker', pyxel.rndi(1, 15));
  }
}

new App();
