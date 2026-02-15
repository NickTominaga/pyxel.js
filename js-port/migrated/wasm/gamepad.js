// Auto-generated from gamepad.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

let BT1_W = 24;
let BT1_L = 25;
let BT1_M = 12;
let BT1_AREA_X = 0;
let BT1_AREA_W = BT1_W + BT1_L * 2 + BT1_M * 2;

let BT2_W = 32;
let BT2_H = 12;
let BT2_M = 7;
let BT2_AREA_W = BT2_W * 2 + BT2_M * 4;
let BT2_AREA_H = BT2_H + BT2_M * 2;
let BT2_AREA_X = BT1_AREA_W + 1;
let BT2_AREA_Y = BT1_AREA_W - BT2_AREA_H;

let BT3_W = 32;
let BT3_M = 5;
let BT3_I = 24;
let BT3_X = BT3_M + BT3_W + (BT3_I - BT3_W) // 2;
let BT3_AREA_X = BT2_AREA_X + BT2_AREA_W + 1;
let BT3_AREA_W = BT3_M * 2 + BT3_W * 2 + BT3_I;

let SCR_W = BT3_AREA_X + BT3_AREA_W;
let SCR_H = BT1_AREA_W;


function drawGamepadCross(x, y, color) {
    pyxel.camera(-x, -y);

    let x1 = BT1_M;
    let x2 = x1 + BT1_L;
    let x3 = x2 + BT1_W - 1;
    let x4 = x3 + BT1_L;

    let y1 = x1;
    let y2 = x2;
    let y3 = x3;
    let y4 = x4;

    pyxel.line(x2 + 2, y1, x3 - 2, y1, color);
    pyxel.line(x2 + 2, y4, x3 - 2, y4, color);
    pyxel.line(x1, y2 + 2, x1, y3 - 2, color);
    pyxel.line(x4, y2 + 2, x4, y3 - 2, color);

    pyxel.line(x1 + 2, y2, x2, y2, color);
    pyxel.line(x3, y2, x4 - 2, y2, color);
    pyxel.line(x1 + 2, y3, x2, y3, color);
    pyxel.line(x3, y3, x4 - 2, y3, color);

    pyxel.line(x2, y1 + 2, x2, y2, color);
    pyxel.line(x2, y3, x2, y4 - 2, color);
    pyxel.line(x3, y1 + 2, x3, y2, color);
    pyxel.line(x3, y3, x3, y4 - 2, color);

    pyxel.pset(x2 + 1, y1 + 1, color);
    pyxel.pset(x3 - 1, y1 + 1, color);
    pyxel.pset(x2 + 1, y4 - 1, color);
    pyxel.pset(x3 - 1, y4 - 1, color);
    pyxel.pset(x1 + 1, y2 + 1, color);
    pyxel.pset(x1 + 1, y3 - 1, color);
    pyxel.pset(x4 - 1, y2 + 1, color);
    pyxel.pset(x4 - 1, y3 - 1, color);

    pyxel.camera();


}
function drawGamepadMenu(x, y, color) {
    pyxel.camera(-x, -y);

    let x1 = BT2_M;
    let x2 = x1 + BT2_W - 1;
    let x3 = x2 + BT2_M * 2 + 1;
    let x4 = x3 + BT2_W - 1;

    let y1 = BT2_M;
    let y2 = BT2_M + BT2_H - 1;

    pyxel.line(x1 + 2, y1, x2 - 2, y1, color);
    pyxel.line(x1 + 2, y2, x2 - 2, y2, color);
    pyxel.line(x1, y1 + 2, x1, y2 - 2, color);
    pyxel.line(x2, y1 + 2, x2, y2 - 2, color);

    pyxel.pset(x1 + 1, y1 + 1, color);
    pyxel.pset(x2 - 1, y1 + 1, color);
    pyxel.pset(x1 + 1, y2 - 1, color);
    pyxel.pset(x2 - 1, y2 - 1, color);

    pyxel.line(x3 + 2, y1, x4 - 2, y1, color);
    pyxel.line(x3 + 2, y2, x4 - 2, y2, color);
    pyxel.line(x3, y1 + 2, x3, y2 - 2, color);
    pyxel.line(x4, y1 + 2, x4, y2 - 2, color);

    pyxel.pset(x3 + 1, y1 + 1, color);
    pyxel.pset(x4 - 1, y1 + 1, color);
    pyxel.pset(x3 + 1, y2 - 1, color);
    pyxel.pset(x4 - 1, y2 - 1, color);

    pyxel.camera();


}
function drawGamepadButton(x, y, color) {
    pyxel.camera(-x, -y);

    let x1 = BT3_M;
    let x2 = BT3_X;
    let x3 = x1 + BT3_W + BT3_I;

    let y1 = x1;
    let y2 = x2;
    let y3 = x3;

    pyxel.ellib(x1, y2, BT3_W, BT3_W, color);
    pyxel.ellib(x3, y2, BT3_W, BT3_W, color);
    pyxel.ellib(x2, y1, BT3_W, BT3_W, color);
    pyxel.ellib(x2, y3, BT3_W, BT3_W, color);

    pyxel.camera();


}
class App {
    constructor() {
        pyxel.init(SCR_W, SCR_H);
        this.show_guide = false;
        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_ESCAPE)) {
            pyxel.quit();

        }
        if (pyxel.btnp(pyxel.KEY_SPACE)) {
            this.show_guide = ! this.show_guide;

        }
        if (pyxel.btnp(pyxel.KEY_RETURN)) {
            let cross_image = pyxel.Image(BT1_AREA_W, BT1_AREA_W);
            cross_image.blt(0, 0, pyxel.screen, BT1_AREA_X, 0, BT1_AREA_W, BT1_AREA_W);
            cross_image.save(`gamepad_cross_{BT1_AREA_W}x{BT1_AREA_W}.png`, 1);

            let menu_image = pyxel.Image(BT2_AREA_W, BT2_AREA_H);
            menu_image.blt(;
                0, 0, pyxel.screen, BT2_AREA_X, BT2_AREA_Y, BT2_AREA_W, BT2_AREA_W;
            // TODO(python): )
            menu_image.save(`gamepad_menu_{BT2_AREA_W}x{BT2_AREA_H}.png`, 1);

            let button_image = pyxel.Image(BT3_AREA_W, BT3_AREA_W);
            button_image.blt(0, 0, pyxel.screen, BT3_AREA_X, 0, BT3_AREA_W, BT3_AREA_W);
            button_image.save(`gamepad_button_{BT3_AREA_W}x{BT3_AREA_W}.png`, 1);

        }
    }
    draw() {
        pyxel.cls(0);

        for (const i of range(-1, 2)) {
            for (const j of range(-1, 2)) {
                draw_gamepad_cross(BT1_AREA_X + j, i, 1);
                draw_gamepad_menu(;
                    // TODO(python): BT2_AREA_X + j,
                    // TODO(python): BT2_AREA_Y + i,
                    // TODO(python): 1,
                // TODO(python): )
                draw_gamepad_button(BT3_AREA_X + j, i, 1);

            }
        }
        draw_gamepad_cross(BT1_AREA_X, 0, 12);
        draw_gamepad_menu(BT2_AREA_X, BT2_AREA_Y, 12);
        draw_gamepad_button(BT3_AREA_X, 0, 12);

        pyxel.rect(BT2_AREA_X - 1, 0, 1, SCR_H, 3);
        pyxel.rect(;
            // TODO(python): BT2_AREA_X,
            // TODO(python): BT2_AREA_Y - 1,
            // TODO(python): BT2_AREA_W,
            // TODO(python): 1,
            // TODO(python): 3,
        // TODO(python): )
        pyxel.rect(BT3_AREA_X - 1, 0, 1, SCR_H, 3);

        if (this.show_guide) {
            pyxel.camera(-BT1_AREA_X, 0);

            pyxel.rectb(0, BT1_M + BT1_L, BT1_M, BT1_W, 8);
            pyxel.rectb(BT1_M + BT1_L * 2 + BT1_W, BT1_M + BT1_L, BT1_M, BT1_W, 8);
            pyxel.rectb(BT1_M + BT1_L, 0, BT1_W, BT1_M, 8);
            pyxel.rectb(BT1_M + BT1_L, BT1_M + BT1_L * 2 + BT1_W, BT1_W, BT1_M, 8);

            pyxel.rectb(0, 0, BT1_M + BT1_L, BT1_M + BT1_L, 9);
            pyxel.rectb(BT1_M + BT1_L + BT1_W, 0, BT1_M + BT1_L, BT1_M + BT1_L, 9);
            pyxel.rectb(0, BT1_M + BT1_L + BT1_W, BT1_M + BT1_L, BT1_M + BT1_L, 9);
            pyxel.rectb(;
                // TODO(python): BT1_M + BT1_L + BT1_W,
                // TODO(python): BT1_M + BT1_L + BT1_W,
                // TODO(python): BT1_M + BT1_L,
                // TODO(python): BT1_M + BT1_L,
                // TODO(python): 9,
            // TODO(python): )

            pyxel.camera(-BT2_AREA_X, -BT2_AREA_Y);

            pyxel.rectb(0, BT2_M, BT2_M, BT2_H, 8);
            pyxel.rectb(BT2_M + BT2_W, BT2_M, BT2_M, BT2_H, 8);
            pyxel.rectb(BT2_M, 0, BT2_W, BT2_M, 8);
            pyxel.rectb(BT2_M, BT2_M + BT2_H, BT2_W, BT2_M, 8);

            pyxel.rectb(BT2_M * 2 + BT2_W, BT2_M, BT2_M, BT2_H, 8);
            pyxel.rectb(BT2_M * 3 + BT2_W * 2, BT2_M, BT2_M, BT2_H, 8);
            pyxel.rectb(BT2_M * 3 + BT2_W, 0, BT2_W, BT2_M, 8);
            pyxel.rectb(BT2_M * 3 + BT2_W, BT2_M + BT2_H, BT2_W, BT2_M, 8);

            pyxel.camera(-BT3_AREA_X, 0);

            pyxel.rectb(0, BT3_X, BT3_M, BT3_W, 8);
            pyxel.rectb(BT3_M + BT3_W * 2 + BT3_I, BT3_X, BT3_M, BT3_W, 8);
            pyxel.rectb(BT3_X, 0, BT3_W, BT3_M, 8);
            pyxel.rectb(BT3_X, BT3_M + BT3_W * 2 + BT3_I, BT3_W, BT3_M, 8);

            pyxel.rectb(0, 0, BT3_X, BT3_X, 9);
            pyxel.rectb(BT3_X + BT3_W, 0, BT3_X, BT3_X, 9);
            pyxel.rectb(0, BT3_X + BT3_W, BT3_X, BT3_X, 9);
            pyxel.rectb(BT3_X + BT3_W, BT3_X + BT3_W, BT3_X, BT3_X, 9);

            pyxel.camera();


        }
    }
}
App();
