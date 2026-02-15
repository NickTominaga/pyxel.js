// Auto-generated from 11_offscreen.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

let BORDER_OFFSETS = [(-1, 0), (1, 0), (0, -1), (0, 1)];
let BG_COLOR = 5;


function psetWithBorder(image, x, y, col, bcol) {
    for (const x_offset, y_offset of BORDER_OFFSETS) {
        image.pset(x + x_offset, y + y_offset, bcol);

    }
    image.pset(x, y, col);


}
function lineWithBorder(image, x1, y1, x2, y2, col, bcol) {
    for (const x_offset, y_offset of BORDER_OFFSETS) {
        image.line(;
            // TODO(python): x1 + x_offset,
            // TODO(python): y1 + y_offset,
            // TODO(python): x2 + x_offset,
            // TODO(python): y2 + y_offset,
            // TODO(python): bcol,
        // TODO(python): )

    }
    image.line(x1, y1, x2, y2, col);


}
function textWithBorder(image, x, y, s, col, bcol) {
    for (const x_offset, y_offset of BORDER_OFFSETS) {
        image.text(x + x_offset, y + y_offset, s, bcol);

    }
    image.text(x, y, s, col);


}
function scaleImage(image, scale) {
    let scaled_width = image.width * scale;
    let scaled_height = image.height * scale;
    let scaled_image = pyxel.Image(scaled_width, scaled_height);

    for (const y of range(scaled_height)) {
        for (const x of range(scaled_width)) {
            let color = image.pget(x // scale, y // scale);
            scaled_image.pset(x, y, color);

        }
    }
    return scaled_image;


}
function makeBltFigure() {
    let figure = pyxel.Image(pyxel.width, pyxel.height);
    figure.cls(BG_COLOR);

    let image1 = pyxel.Image(32, 24);
    image1.blt(0, 0, 0, 0, 0, 32, 24);
    let image1 = scale_image(image1, 3);

    let image2 = pyxel.Image(32, 24);
    image2.blt(0, 0, 0, 0, 32, 32, 24);
    let image2 = scale_image(image2, 3);

    let col = 7;
    let bcol = 0;

    function drawWAndH(x, y) {
        pset_with_border(figure, x + 47, y + 23, col, bcol);
        line_with_border(figure, x + 47, y + 47, x + 70, y + 47, col, bcol);
        text_with_border(figure, x + 58, y + 44, "w", col, bcol);
        line_with_border(figure, x + 71, y + 23, x + 71, y + 46, col, bcol);
        text_with_border(figure, x + 70, y + 33, "h", col, bcol);

    }
    let x = 10;
    let y = 12;
    figure.blt(x, y, image1, 0, 0, image1.width, image1.height);
    text_with_border(figure, x + 1, y - 7, "Screen", col, bcol);
    text_with_border(figure, x + 38, y + 16, "(x,y)", col, bcol);
    draw_w_and_h(x, y);

    let x = 116;
    figure.blt(x, y, image2, 0, 0, image2.width, image2.height);
    text_with_border(figure, x + 1, y - 7, "Image Bank", col, bcol);
    text_with_border(figure, x + 38, y + 16, "(u,v)", col, bcol);
    draw_w_and_h(x, y);

    return figure;


}
function makeBltmFigure() {
    let figure = pyxel.Image(pyxel.width, pyxel.height);
    figure.cls(BG_COLOR);

    let image1 = pyxel.Image(32, 24);
    image1.blt(0, 0, 0, 0, 64, 32, 24);
    let image1 = scale_image(image1, 3);

    let image2 = pyxel.Image(32, 24);
    image2.blt(0, 0, 0, 0, 96, 32, 24);
    let image2 = scale_image(image2, 3);

    let x = 10;
    let y = 12;
    let col = 7;
    let bcol = 0;
    text_with_border(figure, x + 1, y - 7, "Tilemap", col, bcol);
    figure.blt(x, y, image1, 0, 0, image1.width, image1.height);

    let col = 8;
    let bcol = 7;
    text_with_border(figure, x + 3, y + 10, "(0,0) (0,0) (1,0) (0,2)", col, bcol);
    text_with_border(figure, x + 3, y + 34, "(3,2) (0,0) (0,0) (1,2)", col, bcol);
    text_with_border(figure, x + 3, y + 58, "(3,2) (2,2) (0,0) (0,2)", col, bcol);

    let x = 116;
    let col = 7;
    let bcol = 0;
    text_with_border(figure, x + 1, y - 7, "Image Bank (imgsrc)", col, bcol);
    figure.blt(x, y, image2, 0, 0, image2.width, image2.height);

    return figure;


}
class App {
    constructor() {
        pyxel.init(223, 92, title="Offscreen Rendering");
        pyxel.load("assets/offscreen.pyxres");

        this.blt_figure = make_blt_figure();
        this.bltm_figure = make_bltm_figure();

        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_Q)) {
            pyxel.quit();

        }
    }
    draw() {
        // TODO(python): figure = (
            this.blt_figure if (pyxel.frame_count // 120) % 2 == 0 else this.bltm_figure;
        // TODO(python): )
        pyxel.blt(0, 0, figure, 0, 0, figure.width, figure.height);


    }
}
App();
