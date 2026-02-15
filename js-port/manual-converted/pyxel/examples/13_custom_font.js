/**
 * Manual conversion from python/pyxel/examples/13_custom_font.py
 */
function drawTextWithBorder(x, y, s, col, bcol, font) {
  for (let dx = -1; dx <= 1; dx += 1) {
    for (let dy = -1; dy <= 1; dy += 1) {
      if (dx !== 0 || dy !== 0) {
        pyxel.text(x + dx, y + dy, s, bcol, font);
      }
    }
  }

  pyxel.text(x, y, s, col, font);
}

pyxel.init(128, 128, { title: 'Custom Font' });
pyxel.load('assets/sample.pyxres');

const font10 = new pyxel.Font('assets/umplus_j10r.bdf');
const font12 = new pyxel.Font('assets/PixelMplus12-Regular.ttf', 12);

pyxel.cls(1);
pyxel.blt(0, 0, 1, 0, 0, 128, 128);

const s = '▲Pyxel︎▲';
const w = font10.textWidth(s);
pyxel.rect(21, 18, w, 1, 15);
pyxel.text(21, 8, s, 8, font10);

drawTextWithBorder(4, 98, '気軽に楽しく', 7, 5, font12);
drawTextWithBorder(4, 113, 'プログラミング！', 7, 5, font12);

pyxel.show();
