/**
 * Manual conversion from python/pyxel/examples/05_color_palette.py
 */
function drawPalette(x, y, col) {
  const rgb = pyxel.colors[col];
  const hex = `#${rgb.toString(16).toUpperCase().padStart(6, '0')}`;
  const dec = `${rgb >> 16},${(rgb >> 8) & 0xff},${rgb & 0xff}`;

  pyxel.rect(x, y, 13, 13, col);
  pyxel.text(x + 16, y + 1, hex, 7);
  pyxel.text(x + 16, y + 8, dec, 7);
  pyxel.text(x + 5 - Math.floor(col / 10) * 2, y + 4, `${col}`, col < 6 ? 7 : 0);

  if (col === 0) {
    pyxel.rectb(x, y, 13, 13, 13);
  }
}

pyxel.init(255, 81, { title: 'Pyxel Color Palette' });
pyxel.cls(0);

for (let i = 0; i < 16; i += 1) {
  drawPalette(2 + (i % 4) * 64, 4 + Math.floor(i / 4) * 20, i);
}

pyxel.show();
