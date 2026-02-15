/**
 * Manual conversion from python/pyxel/examples/16_transform.py
 */
class App {
  constructor() {
    pyxel.init(200, 160, { title: 'Transform' });
    pyxel.load('assets/sample.pyxres');

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
    pyxel.cls(1);

    let x = 67;
    let y = 27;
    let w = 128;
    let h = 128;
    let rotate = pyxel.frame_count;
    let scale = pyxel.sin(pyxel.frame_count) * 0.3 + 0.8;
    pyxel.rectb(x, y, w, h, 2);
    pyxel.bltm(x, y, 0, 0, 0, w, h, 0, { rotate, scale });

    x = 30;
    y = 79;
    w = 8;
    h = 24;
    rotate = pyxel.frame_count * -3;
    scale = pyxel.sin(pyxel.frame_count + 180) * 3 + 4;
    pyxel.rectb(x, y, w, h, 2);
    pyxel.blt(x, y, 0, 8, 0, w, h, 0, { rotate, scale });

    pyxel.dither(0.5);
    pyxel.rect(0, 0, 200, 22, 0);
    pyxel.dither(1);

    pyxel.text(9, 4, 'blt(x,y,img,u,v,w,h,[colkey],[rotate],[scale])', 7);
    pyxel.text(125, 4, '[rotate]', 10);
    pyxel.text(161, 4, '[scale]', 10);

    pyxel.text(9, 12, 'bltm(x,y,tm,u,v,w,h,[colkey],[rotate],[scale])', 7);
    pyxel.text(125, 12, '[rotate]', 10);
    pyxel.text(161, 12, '[scale]', 10);
  }
}

new App();
