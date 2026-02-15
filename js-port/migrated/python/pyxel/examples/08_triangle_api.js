// Auto-generated from 08_triangle_api.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel


class App {
    constructor() {
        pyxel.init(200, 150, title="Pyxel Triangle API");

        this.triangles = [(100, 24, 7, 143, 193, 143, 7)];

        pyxel.cls(13);
        pyxel.text(6, 6, "tri(x1,y1,x2,y2,x3,y3,col)", 7);
        pyxel.text(6, 14, "trib(x1,y1,x2,y2,x3,y3,col)", 7);

        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_Q)) {
            pyxel.quit();

        }
    }
    draw() {
        if (this.triangles) {
            let triangle = this.triangles.pop(0);
            this.draw_triangle(*triangle);

        }
    }
    drawTriangle(x1, y1, x2, y2, x3, y3, n) {
        if (n == 0) {
            return;

        }
        let col = n + 7;
        if (n % 2 == 0) {
            pyxel.tri(x1, y1, x2, y2, x3, y3, col);
        }
        else {
            pyxel.trib(x1, y1, x2, y2, x3, y3, col);

        }
        let h1 = (x1 + x2) / 2;
        let w1 = (y1 + y2) / 2;
        let h2 = (x2 + x3) / 2;
        let w2 = (y2 + y3) / 2;
        let h3 = (x3 + x1) / 2;
        let w3 = (y3 + y1) / 2;

        this.triangles.append((x1, y1, h1, w1, h3, w3, n - 1));
        this.triangles.append((h1, w1, x2, y2, h2, w2, n - 1));
        this.triangles.append((h3, w3, h2, w2, x3, y3, n - 1));


    }
}
App();
