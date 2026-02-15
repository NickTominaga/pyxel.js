// Auto-generated from 06_click_game.py
// NOTE: Manual review required for runtime parity.

// title: Pyxel Bubbles
// author: ttrkaya
// desc: A Pyxel mouse click game example
// site: https://github.com/kitao/pyxel
// license: MIT
// version: 1.0

// TODO(import): import pyxel

let SCREEN_WIDTH = 256;
let SCREEN_HEIGHT = 256;

let MAX_BUBBLE_SPEED = 1.8;
let NUM_INITIAL_BUBBLES = 50;
let NUM_EXPLODE_BUBBLES = 11;


class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;


    }
}
class Bubble {
    constructor() {
        this.r = pyxel.rndf(3, 10);
        this.pos = Vec2(;
            pyxel.rndf(this.r, SCREEN_WIDTH - this.r),;
            pyxel.rndf(this.r, SCREEN_HEIGHT - this.r),;
        );
        this.vel = Vec2(;
            pyxel.rndf(-MAX_BUBBLE_SPEED, MAX_BUBBLE_SPEED),;
            pyxel.rndf(-MAX_BUBBLE_SPEED, MAX_BUBBLE_SPEED),;
        );
        this.color = pyxel.rndi(1, 15);

    }
    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (this.vel.x < 0 and this.pos.x < this.r) {
            this.vel.x *= -1;
        }
        if (this.vel.x > 0 and this.pos.x > SCREEN_WIDTH - this.r) {
            this.vel.x *= -1;
        }
        if (this.vel.y < 0 and this.pos.y < this.r) {
            this.vel.y *= -1;
        }
        if (this.vel.y > 0 and this.pos.y > SCREEN_HEIGHT - this.r) {
            this.vel.y *= -1;


        }
    }
}
class App {
    constructor() {
        pyxel.init(SCREEN_WIDTH, SCREEN_HEIGHT, title="Pyxel Bubbles", capture_scale=1);
        pyxel.mouse(True);

        this.is_exploded = False;
        this.bubbles = [Bubble() for _ in range(NUM_INITIAL_BUBBLES)];

        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_Q)) {
            pyxel.quit();

        }
        let num_bubbles = len(this.bubbles);

        if (pyxel.btnp(pyxel.MOUSE_BUTTON_LEFT)) {
            for (const i of range(num_bubbles)) {
                let bubble = this.bubbles[i];
                let dx = bubble.pos.x - pyxel.mouse_x;
                let dy = bubble.pos.y - pyxel.mouse_y;

                if (dx * dx + dy * dy < bubble.r * bubble.r) {
                    this.is_exploded = True;
                    let new_r = pyxel.sqrt(bubble.r * bubble.r / NUM_EXPLODE_BUBBLES);

                    for (const j of range(NUM_EXPLODE_BUBBLES)) {
                        let angle = 360 * j / NUM_EXPLODE_BUBBLES;

                        let new_bubble = Bubble();
                        new_bubble.r = new_r;
                        new_bubble.pos.x = bubble.pos.x + (;
                            bubble.r + new_r;
                        ) * pyxel.cos(angle);
                        new_bubble.pos.y = bubble.pos.y + (;
                            bubble.r + new_r;
                        ) * pyxel.sin(angle);
                        new_bubble.vel.x = pyxel.cos(angle) * MAX_BUBBLE_SPEED;
                        new_bubble.vel.y = pyxel.sin(angle) * MAX_BUBBLE_SPEED;
                        this.bubbles.append(new_bubble);

                    }
                    del this.bubbles[i];
                    break;

                }
            }
        }
        for (const i of range(num_bubbles - 1, -1, -1)) {
            let bi = this.bubbles[i];
            bi.update();

            for (const j of range(i - 1, -1, -1)) {
                let bj = this.bubbles[j];
                let dx = bi.pos.x - bj.pos.x;
                let dy = bi.pos.y - bj.pos.y;
                let total_r = bi.r + bj.r;

                if (dx * dx + dy * dy < total_r * total_r) {
                    let new_bubble = Bubble();
                    new_bubble.r = pyxel.sqrt(bi.r * bi.r + bj.r * bj.r);
                    new_bubble.pos.x = (bi.pos.x * bi.r + bj.pos.x * bj.r) / total_r;
                    new_bubble.pos.y = (bi.pos.y * bi.r + bj.pos.y * bj.r) / total_r;
                    new_bubble.vel.x = (bi.vel.x * bi.r + bj.vel.x * bj.r) / total_r;
                    new_bubble.vel.y = (bi.vel.y * bi.r + bj.vel.y * bj.r) / total_r;
                    this.bubbles.append(new_bubble);

                    del this.bubbles[i];
                    del this.bubbles[j];
                    num_bubbles -= 1;
                    break;

                }
            }
        }
    }
    draw() {
        pyxel.cls(0);

        for (const bubble of this.bubbles) {
            pyxel.circ(bubble.pos.x, bubble.pos.y, bubble.r, bubble.color);

        }
        if (not this.is_exploded and pyxel.frame_count % 20 < 10) {
            pyxel.text(96, 50, "CLICK ON BUBBLE", pyxel.frame_count % 15 + 1);


        }
    }
}
App();
