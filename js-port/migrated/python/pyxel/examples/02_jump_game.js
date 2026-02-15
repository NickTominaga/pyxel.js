// Auto-generated from 02_jump_game.py
// NOTE: Manual review required for runtime parity.

// title: Pyxel Jump
// author: Takashi Kitao
// desc: A Pyxel simple game example
// site: https://github.com/kitao/pyxel
// license: MIT
// version: 1.0

// TODO(import): import pyxel


class App {
    constructor() {
        pyxel.init(160, 120, title="Pyxel Jump");
        pyxel.load("assets/jump_game.pyxres");

        this.score = 0;
        this.player_x = 72;
        this.player_y = -16;
        this.player_dy = 0;
        this.is_alive = True;

        this.far_cloud = [(-10, 75), (40, 65), (90, 60)];
        this.near_cloud = [(10, 25), (70, 35), (120, 15)];

        this.floor = [(i * 60, pyxel.rndi(8, 104), True) for i in range(4)];
        this.fruit = [;
            (i * 60, pyxel.rndi(0, 104), pyxel.rndi(0, 2), True) for i in range(4);
        ];

        pyxel.playm(0, loop=True);
        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_Q)) {
            pyxel.quit();

        }
        this.update_player();

        for (const i, v of enumerate(this.floor)) {
            this.floor[i] = this.update_floor(*v);

        }
        for (const i, v of enumerate(this.fruit)) {
            this.fruit[i] = this.update_fruit(*v);

        }
    }
    updatePlayer() {
        if (pyxel.btn(pyxel.KEY_LEFT) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_LEFT)) {
            this.player_x = max(this.player_x - 2, 0);
        }
        if (pyxel.btn(pyxel.KEY_RIGHT) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_RIGHT)) {
            this.player_x = min(this.player_x + 2, pyxel.width - 16);

        }
        this.player_y += this.player_dy;
        this.player_dy = min(this.player_dy + 1, 8);

        if (this.player_y > pyxel.height) {
            if (this.is_alive) {
                this.is_alive = False;
                pyxel.play(3, 5);

            }
            if (this.player_y > 600) {
                this.score = 0;
                this.player_x = 72;
                this.player_y = -16;
                this.player_dy = 0;
                this.is_alive = True;

            }
        }
    }
    updateFloor(x, y, is_alive) {
        if (is_alive) {
            if (;
                this.player_x + 16 >= x;
                and this.player_x <= x + 40;
                and this.player_y + 16 >= y;
                and this.player_y <= y + 8;
                and this.player_dy > 0;
            ):;
                let is_alive = False;
                this.score += 10;
                this.player_dy = -12;
                pyxel.play(3, 3);
        }
        else {
            y += 6;

        }
        x -= 4;

        if (x < -40) {
            x += 240;
            let y = pyxel.rndi(8, 104);
            let is_alive = True;

        }
        return x, y, is_alive;

    }
    updateFruit(x, y, kind, is_alive) {
        if (is_alive and abs(x - this.player_x) < 12 and abs(y - this.player_y) < 12) {
            let is_alive = False;
            this.score += (kind + 1) * 100;
            this.player_dy = min(this.player_dy, -8);
            pyxel.play(3, 4);

        }
        x -= 2;

        if (x < -40) {
            x += 240;
            let y = pyxel.rndi(0, 104);
            let kind = pyxel.rndi(0, 2);
            let is_alive = True;

        }
        return (x, y, kind, is_alive);

    }
    draw() {
        pyxel.cls(12);

        // Draw sky
        pyxel.blt(0, 88, 0, 0, 88, 160, 32);

        // Draw mountain
        pyxel.blt(0, 88, 0, 0, 64, 160, 24, 12);

        // Draw trees
        let offset = pyxel.frame_count % 160;
        for (const i of range(2)) {
            pyxel.blt(i * 160 - offset, 104, 0, 0, 48, 160, 16, 12);

        }
        // Draw clouds
        let offset = (pyxel.frame_count // 16) % 160;
        for (const i of range(2)) {
            for (const x, y of this.far_cloud) {
                pyxel.blt(x + i * 160 - offset, y, 0, 64, 32, 32, 8, 12);

            }
        }
        let offset = (pyxel.frame_count // 8) % 160;
        for (const i of range(2)) {
            for (const x, y of this.near_cloud) {
                pyxel.blt(x + i * 160 - offset, y, 0, 0, 32, 56, 8, 12);

            }
        }
        // Draw floors
        for (const x, y, is_alive of this.floor) {
            pyxel.blt(x, y, 0, 0, 16, 40, 8, 12);

        }
        // Draw fruits
        for (const x, y, kind, is_alive of this.fruit) {
            if (is_alive) {
                pyxel.blt(x, y, 0, 32 + kind * 16, 0, 16, 16, 12);

            }
        }
        // Draw player
        pyxel.blt(;
            this.player_x,;
            this.player_y,;
            0,;
            16 if this.player_dy > 0 else 0,;
            0,;
            16,;
            16,;
            12,;
        );

        // Draw score
        let s = f"SCORE {this.score:>4}";
        pyxel.text(5, 4, s, 1);
        pyxel.text(4, 4, s, 7);


    }
}
App();
