/**
 * Manual conversion from python/pyxel/examples/08_triangle_api.py
 */
class App {
  constructor() {
    pyxel.init(200, 150, { title: 'Pyxel Triangle API' });

    this.triangles = [[100, 24, 7, 143, 193, 143, 7]];

    pyxel.cls(13);
    pyxel.text(6, 6, 'tri(x1,y1,x2,y2,x3,y3,col)', 7);
    pyxel.text(6, 14, 'trib(x1,y1,x2,y2,x3,y3,col)', 7);

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
    if (this.triangles.length > 0) {
      const triangle = this.triangles.shift();
      this.drawTriangle(...triangle);
    }
  }

  drawTriangle(x1, y1, x2, y2, x3, y3, n) {
    if (n === 0) {
      return;
    }

    const col = n + 7;
    if (n % 2 === 0) {
      pyxel.tri(x1, y1, x2, y2, x3, y3, col);
    } else {
      pyxel.trib(x1, y1, x2, y2, x3, y3, col);
    }

    const h1 = (x1 + x2) / 2;
    const w1 = (y1 + y2) / 2;
    const h2 = (x2 + x3) / 2;
    const w2 = (y2 + y3) / 2;
    const h3 = (x3 + x1) / 2;
    const w3 = (y3 + y1) / 2;

    this.triangles.push([x1, y1, h1, w1, h3, w3, n - 1]);
    this.triangles.push([h1, w1, x2, y2, h2, w2, n - 1]);
    this.triangles.push([h3, w3, h2, w2, x3, y3, n - 1]);
  }
}

new App();
