// Auto-generated from 10_platformer.py
// NOTE: Manual review required for runtime parity.

// title: Pyxel Platformer
// author: Takashi Kitao
// desc: A Pyxel platformer example
// site: https://github.com/kitao/pyxel
// license: MIT
// version: 1.0

// TODO(import): import pyxel

let TRANSPARENT_COLOR = 2;
let SCROLL_BORDER_X = 80;
let TILE_FLOOR = (1, 0);
let TILE_SPAWN1 = (0, 1);
let TILE_SPAWN2 = (1, 1);
let TILE_SPAWN3 = (2, 1);
let WALL_TILE_X = 4;
let WALL_TILES = [(u, v) for u in range(WALL_TILE_X, 32) for v in range(32)];
let WALL_TILES_WITH_FLOOR = WALL_TILES + [TILE_FLOOR];

let scroll_x = 0;
let player = null;
let enemies = [];


function getTile(tile_x, tile_y) {
    return pyxel.tilemaps[0].pget(tile_x, tile_y);


}
function isWall(x, y) {
    let tile = get_tile(x // 8, y // 8);
    return tile == TILE_FLOOR || tile[0] >= WALL_TILE_X;


}
function spawnEnemy(left_x, right_x) {
    let left_x = pyxel.ceil(left_x / 8);
    let right_x = pyxel.floor(right_x / 8);

    for (const x of range(left_x, right_x + 1)) {
        for (const y of range(16)) {
            let tile = get_tile(x, y);
            if (tile == TILE_SPAWN1) {
                enemies.append(Enemy1(x * 8, y * 8));
            }
            else if (tile == TILE_SPAWN2) {
                enemies.append(Enemy2(x * 8, y * 8));
            }
            else if (tile == TILE_SPAWN3) {
                enemies.append(Enemy3(x * 8, y * 8));


            }
        }
    }
}
function cleanupEntities(entities) {
    for (const i of range(len(entities) - 1, -1, -1)) {
        if (! entities[i].is_alive) {
            // TODO(python): del entities[i]


        }
    }
}
function pushBack(x, y, dx, dy) {
    let walls = WALL_TILES_WITH_FLOOR if dy > 0 else WALL_TILES;
    dx, dy = pyxel.tilemaps[0].collide(x, y, 8, 8, dx, dy, walls);
    return x + dx, y + dy;


}
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.direction = 1;
        this.is_falling = false;

    }
    update() {
        // TODO(python): global scroll_x
        let last_y = this.y;

        if (pyxel.btn(pyxel.KEY_LEFT) || pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_LEFT)) {
            this.dx = -2;
            this.direction = -1;
        }
        if (pyxel.btn(pyxel.KEY_RIGHT) || pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_RIGHT)) {
            this.dx = 2;
            this.direction = 1;

        }
        this.dy = min(this.dy + 1, 3);

        if (pyxel.btnp(pyxel.KEY_SPACE) || pyxel.btnp(pyxel.GAMEPAD1_BUTTON_A)) {
            this.dy = -6;
            pyxel.play(3, 8);

        }
        this.x, this.y = push_back(this.x, this.y, this.dx, this.dy);

        if (this.x < scroll_x) {
            this.x = scroll_x;
        }
        if (this.y < 0) {
            this.y = 0;

        }
        this.dx = int(this.dx * 0.8);
        this.is_falling = this.y > last_y;

        if (this.x > scroll_x + SCROLL_BORDER_X) {
            let last_scroll_x = scroll_x;
            let scroll_x = min(this.x - SCROLL_BORDER_X, 240 * 8);
            spawn_enemy(last_scroll_x + 128, scroll_x + 127);

        }
        if (this.y >= pyxel.height) {
            game_over();

        }
    }
    draw() {
        let u = (2 if this.is_falling else pyxel.frame_count // 3 % 2) * 8;
        let w = 8 if this.direction > 0 else -8;
        pyxel.blt(this.x, this.y, 0, u, 16, w, 8, TRANSPARENT_COLOR);


    }
}
class Enemy1 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.direction = -1;
        this.is_alive = true;

    }
    update() {
        this.dx = this.direction;
        this.dy = min(this.dy + 1, 3);

        if (this.direction < 0 && is_wall(this.x - 1, this.y + 4)) {
            this.direction = 1;
        }
        else if (this.direction > 0 && is_wall(this.x + 8, this.y + 4)) {
            this.direction = -1;

        }
        this.x, this.y = push_back(this.x, this.y, this.dx, this.dy);

    }
    draw() {
        let u = pyxel.frame_count // 4 % 2 * 8;
        let w = 8 if this.direction > 0 else -8;
        pyxel.blt(this.x, this.y, 0, u, 24, w, 8, TRANSPARENT_COLOR);


    }
}
class Enemy2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.direction = 1;
        this.is_alive = true;

    }
    update() {
        this.dx = this.direction;
        this.dy = min(this.dy + 1, 3);

        if (is_wall(this.x, this.y + 8) || is_wall(this.x + 7, this.y + 8)) {
            if this.direction < 0 && (;
                is_wall(this.x - 1, this.y + 4) || ! is_wall(this.x - 1, this.y + 8);
            // TODO(python): ):
                this.direction = 1;
            elif this.direction > 0 && (;
                is_wall(this.x + 8, this.y + 4) || ! is_wall(this.x + 7, this.y + 8);
            // TODO(python): ):
                this.direction = -1;

        }
        this.x, this.y = push_back(this.x, this.y, this.dx, this.dy);

    }
    draw() {
        let u = pyxel.frame_count // 4 % 2 * 8 + 16;
        let w = 8 if this.direction > 0 else -8;
        pyxel.blt(this.x, this.y, 0, u, 24, w, 8, TRANSPARENT_COLOR);


    }
}
class Enemy3 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.time_to_fire = 0;
        this.is_alive = true;

    }
    update() {
        this.time_to_fire -= 1;

        if (this.time_to_fire <= 0) {
            let dx = player.x - this.x;
            let dy = player.y - this.y;
            let sq_dist = dx * dx + dy * dy;

            if (sq_dist < 60**2) {
                let dist = pyxel.sqrt(sq_dist);
                enemies.append(Enemy3Bullet(this.x, this.y, dx / dist, dy / dist));
                this.time_to_fire = 60;

            }
        }
    }
    draw() {
        let u = pyxel.frame_count // 8 % 2 * 8;
        pyxel.blt(this.x, this.y, 0, u, 32, 8, 8, TRANSPARENT_COLOR);


    }
}
class Enemy3Bullet {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.is_alive = true;

    }
    update() {
        this.x += this.dx;
        this.y += this.dy;

    }
    draw() {
        let u = pyxel.frame_count // 2 % 2 * 8 + 16;
        pyxel.blt(this.x, this.y, 0, u, 32, 8, 8, TRANSPARENT_COLOR);


    }
}
class App {
    constructor() {
        pyxel.init(128, 128, title="Pyxel Platformer");
        pyxel.load("assets/platformer.pyxres");

        // Change enemy spawn tiles invisible
        pyxel.images[0].rect(0, 8, 24, 8, TRANSPARENT_COLOR);

        // TODO(python): global player
        let player = Player(0, 0);
        spawn_enemy(0, 127);

        pyxel.playm(0, loop=true);
        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btn(pyxel.KEY_Q)) {
            pyxel.quit();

        }
        player.update();

        for (const enemy of enemies) {
            if (abs(player.x - enemy.x) < 6 && abs(player.y - enemy.y) < 6) {
                game_over();
                return;

            }
            enemy.update();

            if (enemy.x < scroll_x - 8 || enemy.x > scroll_x + 160 || enemy.y > 160) {
                enemy.is_alive = false;

            }
        }
        cleanup_entities(enemies);

    }
    draw() {
        pyxel.cls(0);

        // Draw level
        pyxel.camera();
        pyxel.bltm(0, 0, 0, (scroll_x // 4) % 128, 128, 128, 128);
        pyxel.bltm(0, 0, 0, scroll_x, 0, 128, 128, TRANSPARENT_COLOR);

        // Draw characters
        pyxel.camera(scroll_x, 0);
        player.draw();
        for (const enemy of enemies) {
            enemy.draw();


        }
    }
}
function gameOver() {
    // TODO(python): global scroll_x, enemies

    let scroll_x = 0;
    player.x = 0;
    player.y = 0;
    player.dx = 0;
    player.dy = 0;

    let enemies = [];
    spawn_enemy(0, 127);

    pyxel.play(3, 9);


}
App();
