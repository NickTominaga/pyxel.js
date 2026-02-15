// Auto-generated from 09_shooter.py
// NOTE: Manual review required for runtime parity.

// title: Pyxel Shooter
// author: Takashi Kitao
// desc: A Pyxel shoot'em up game example
// site: https://github.com/kitao/pyxel
// license: MIT
// version: 1.0

// TODO(import): import pyxel

let SCENE_TITLE = 0;
let SCENE_PLAY = 1;
let SCENE_GAMEOVER = 2;

let NUM_STARS = 100;
let STAR_COLOR_HIGH = 12;
let STAR_COLOR_LOW = 5;

let PLAYER_WIDTH = 8;
let PLAYER_HEIGHT = 8;
let PLAYER_SPEED = 2;

let BULLET_WIDTH = 2;
let BULLET_HEIGHT = 8;
let BULLET_COLOR = 11;
let BULLET_SPEED = 4;

let ENEMY_WIDTH = 8;
let ENEMY_HEIGHT = 8;
let ENEMY_SPEED = 1.5;

let BLAST_START_RADIUS = 1;
let BLAST_END_RADIUS = 8;
let BLAST_COLOR_IN = 7;
let BLAST_COLOR_OUT = 10;

let enemies = [];
let bullets = [];
let blasts = [];


function updateEntities(entities) {
    for (const entity of entities) {
        entity.update();


    }
}
function drawEntities(entities) {
    for (const entity of entities) {
        entity.draw();


    }
}
function cleanupEntities(entities) {
    for (const i of range(len(entities) - 1, -1, -1)) {
        if (not entities[i].is_alive) {
            del entities[i];


        }
    }
}
function loadBgm(msc, filename, snd1, snd2, snd3) {
    // TODO(import): import json

    with open(filename, "rt") as file:;
        let bgm = json.loads(file.read());
        pyxel.sounds[snd1].set(*bgm[0]);
        pyxel.sounds[snd2].set(*bgm[1]);
        pyxel.sounds[snd3].set(*bgm[2]);
        pyxel.musics[msc].set([snd1], [snd2], [snd3]);


}
class Background {
    constructor() {
        this.stars = [];
        for (const i of range(NUM_STARS)) {
            this.stars.append(;
                (;
                    pyxel.rndi(0, pyxel.width - 1),;
                    pyxel.rndi(0, pyxel.height - 1),;
                    pyxel.rndf(1, 2.5),;
                );
            );

        }
    }
    update() {
        for (const i, (x, y, speed) of enumerate(this.stars)) {
            y += speed;
            if (y >= pyxel.height) {
                y -= pyxel.height;
            }
            this.stars[i] = (x, y, speed);

        }
    }
    draw() {
        for (const x, y, speed of this.stars) {
            pyxel.pset(x, y, STAR_COLOR_HIGH if speed > 1.8 else STAR_COLOR_LOW);


        }
    }
}
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = PLAYER_WIDTH;
        this.h = PLAYER_HEIGHT;
        this.is_alive = True;

    }
    update() {
        if (pyxel.btn(pyxel.KEY_LEFT) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_LEFT)) {
            this.x -= PLAYER_SPEED;
        }
        if (pyxel.btn(pyxel.KEY_RIGHT) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_RIGHT)) {
            this.x += PLAYER_SPEED;
        }
        if (pyxel.btn(pyxel.KEY_UP) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_UP)) {
            this.y -= PLAYER_SPEED;
        }
        if (pyxel.btn(pyxel.KEY_DOWN) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_DOWN)) {
            this.y += PLAYER_SPEED;

        }
        this.x = max(this.x, 0);
        this.x = min(this.x, pyxel.width - this.w);
        this.y = max(this.y, 0);
        this.y = min(this.y, pyxel.height - this.h);

        if (pyxel.btnp(pyxel.KEY_SPACE) or pyxel.btnp(pyxel.GAMEPAD1_BUTTON_A)) {
            Bullet(;
                this.x + (PLAYER_WIDTH - BULLET_WIDTH) / 2, this.y - BULLET_HEIGHT / 2;
            );
            pyxel.play(3, 0);

        }
    }
    draw() {
        pyxel.blt(this.x, this.y, 0, 0, 0, this.w, this.h, 0);


    }
}
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = BULLET_WIDTH;
        this.h = BULLET_HEIGHT;
        this.is_alive = True;
        bullets.append(self);

    }
    update() {
        this.y -= BULLET_SPEED;
        if (this.y + this.h - 1 < 0) {
            this.is_alive = False;

        }
    }
    draw() {
        pyxel.rect(this.x, this.y, this.w, this.h, BULLET_COLOR);


    }
}
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = ENEMY_WIDTH;
        this.h = ENEMY_HEIGHT;
        this.dir = 1;
        this.timer_offset = pyxel.rndi(0, 59);
        this.is_alive = True;
        enemies.append(self);

    }
    update() {
        if ((pyxel.frame_count + this.timer_offset) % 60 < 30) {
            this.x += ENEMY_SPEED;
            this.dir = 1;
        }
        else {
            this.x -= ENEMY_SPEED;
            this.dir = -1;

        }
        this.y += ENEMY_SPEED;

        if (this.y > pyxel.height - 1) {
            this.is_alive = False;

        }
    }
    draw() {
        pyxel.blt(this.x, this.y, 0, 8, 0, this.w * this.dir, this.h, 0);


    }
}
class Blast {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = BLAST_START_RADIUS;
        this.is_alive = True;
        blasts.append(self);

    }
    update() {
        this.radius += 1;
        if (this.radius > BLAST_END_RADIUS) {
            this.is_alive = False;

        }
    }
    draw() {
        pyxel.circ(this.x, this.y, this.radius, BLAST_COLOR_IN);
        pyxel.circb(this.x, this.y, this.radius, BLAST_COLOR_OUT);


    }
}
class App {
    constructor() {
        pyxel.init(120, 160, title="Pyxel Shooter");

        this.init_image();
        this.init_sound();

        this.scene = SCENE_TITLE;
        this.score = 0;
        this.background = Background();
        this.player = Player(pyxel.width / 2, pyxel.height - 20);

        pyxel.playm(0, loop=True);
        pyxel.run(this.update, this.draw);

    }
    initImage() {
        // Set player image
        pyxel.images[0].set(;
            0,;
            0,;
            [;
                "00c00c00",;
                "0c7007c0",;
                "0c7007c0",;
                "c703b07c",;
                "77033077",;
                "785cc587",;
                "85c77c58",;
                "0c0880c0",;
            ],;
        );

        // Set enemy image
        pyxel.images[0].set(;
            8,;
            0,;
            [;
                "00088000",;
                "00ee1200",;
                "08e2b180",;
                "02882820",;
                "00222200",;
                "00012280",;
                "08208008",;
                "80008000",;
            ],;
        );

    }
    initSound() {
        // Set sound effects
        pyxel.sounds[0].set("a3a2c1a1", "p", "7", "s", 5);
        pyxel.sounds[1].set("a3a2c2c2", "n", "7742", "s", 10);

        // Set title music
        let a1 = "T128 Q96 @2 @ENV1{127,6,96} O4 L16 @VIB1{36,18,25} K-2";
        let a2 = "D8.C8.D4G8AB->CD C8.<F2R FFGA B-8.A8.B-4.GGAB-";
        let a3 = "RR>CC<B->C8 D8.D8CD8.<";

        let b1 = "T128 Q90 @0 V96 O3 L16";
        let b2 = "FFR4 FFR4 <F4> E-E-R4 E-E-R4 <E-4> D-D-R4 D-D-R4 <D-4> E-E-R4 E-E-R4 EEE8";

        let c1 = "T128 Q50 @3 L16 @ENV1{48,8,0} @ENV2{127,6,0}";
        let c2 = "[@ENV1 O7 FFR4 FFR4 @ENV2 O3 G4]3 @ENV1 O7 FFR4 FFR4 FF @ENV2 O3 G8";

        pyxel.sounds[2].mml(a1 + a2 + a3);
        pyxel.sounds[3].mml(b1 + b2);
        pyxel.sounds[4].mml(c1 + c2);
        pyxel.musics[0].set([2], [3], [4]);

        // Set play music
        let a1 = "T150 Q96 @1 @ENV1{127,12,64} O4 L16";
        let a4 = "RR>CC<B->C8 D8.D8C<A8G&1";

        let b1 = "T150 Q96 @1 @ENV1{112,12,56} @ENV2{64,8,0} O4 L16 @ENV1 ";
        let b2 = "<B-8.A8.B-4>D8DDGB- A8.<A2R AA>CF G8.F8.G4.E-E-FG";
        let b3 = "RRAAGA8 A8.A8GA8.";
        let b4 = "RRAAGA8 A8.A8GD8 Q100 C&4.<B4. @3 O7 @ENV2 FFFF";

        let c1 = "T150 Q100 @0 V96 O3 L16 @GLI1{400,4} @GLI0 ";
        let c2 = "[<G.R32>DG]4 [<F.R32>CF]4 [<E-.R32B->E-]4";
        let c3 = "Q80 <F8FF>F<F8 F+8RF+8>F+<F+8.>";
        let c4 = "Q80 @GLI0 <F8FF>F<F8F+8RF+8>F+<F+8 Q100 G8R>DG<[G.R32>DG<]2 @GLI1 Q50 >>CC<F8>";

        pyxel.sounds[5].mml(a1 + a2 + a3 + a2 + a4);
        pyxel.sounds[6].mml(b1 + b2 + b3 + b2 + b4);
        pyxel.sounds[7].mml(c1 + c2 + c3 + c2 + c4);
        pyxel.musics[1].set([5], [6], [7]);

        // You can also use 8bit BGM generator for music:
        //   load_bgm(0, "assets/bgm_title.json", 2, 3, 4)
        //   load_bgm(1, "assets/bgm_play.json", 5, 6, 7)

    }
    update() {
        if (pyxel.btn(pyxel.KEY_Q)) {
            pyxel.quit();

        }
        this.background.update();

        if (this.scene == SCENE_TITLE) {
            this.update_title_scene();
        }
        else if (this.scene == SCENE_PLAY) {
            this.update_play_scene();
        }
        else if (this.scene == SCENE_GAMEOVER) {
            this.update_gameover_scene();

        }
    }
    updateTitleScene() {
        if (pyxel.btnp(pyxel.KEY_RETURN) or pyxel.btnp(pyxel.GAMEPAD1_BUTTON_START)) {
            this.scene = SCENE_PLAY;
            pyxel.playm(1, loop=True);

        }
    }
    updatePlayScene() {
        if (pyxel.frame_count % 6 == 0) {
            Enemy(pyxel.rndi(0, pyxel.width - ENEMY_WIDTH), 0);

        }
        for (const enemy of enemies) {
            for (const bullet of bullets) {
                if (;
                    enemy.x + enemy.w > bullet.x;
                    and bullet.x + bullet.w > enemy.x;
                    and enemy.y + enemy.h > bullet.y;
                    and bullet.y + bullet.h > enemy.y;
                ):;
                    enemy.is_alive = False;
                    bullet.is_alive = False;
                    blasts.append(;
                        Blast(enemy.x + ENEMY_WIDTH / 2, enemy.y + ENEMY_HEIGHT / 2);
                    );
                    pyxel.play(2, 1, resume=True);
                    this.score += 10;

            }
        }
        for (const enemy of enemies) {
            if (;
                this.player.x + this.player.w > enemy.x;
                and enemy.x + enemy.w > this.player.x;
                and this.player.y + this.player.h > enemy.y;
                and enemy.y + enemy.h > this.player.y;
            ):;
                enemy.is_alive = False;
                blasts.append(;
                    Blast(;
                        this.player.x + PLAYER_WIDTH / 2,;
                        this.player.y + PLAYER_HEIGHT / 2,;
                    );
                );
                pyxel.stop();
                pyxel.play(3, 1);
                this.scene = SCENE_GAMEOVER;

        }
        this.player.update();

        update_entities(bullets);
        update_entities(enemies);
        update_entities(blasts);

        cleanup_entities(enemies);
        cleanup_entities(bullets);
        cleanup_entities(blasts);

    }
    updateGameoverScene() {
        update_entities(bullets);
        update_entities(enemies);
        update_entities(blasts);

        cleanup_entities(enemies);
        cleanup_entities(bullets);
        cleanup_entities(blasts);

        if (pyxel.btnp(pyxel.KEY_RETURN) or pyxel.btnp(pyxel.GAMEPAD1_BUTTON_START)) {
            this.scene = SCENE_PLAY;
            this.player.x = pyxel.width / 2;
            this.player.y = pyxel.height - 20;
            this.score = 0;

            enemies.clear();
            bullets.clear();
            blasts.clear();

            pyxel.playm(1, loop=True);

        }
    }
    draw() {
        pyxel.cls(0);
        this.background.draw();

        if (this.scene == SCENE_TITLE) {
            this.draw_title_scene();
        }
        else if (this.scene == SCENE_PLAY) {
            this.draw_play_scene();
        }
        else if (this.scene == SCENE_GAMEOVER) {
            this.draw_gameover_scene();

        }
        pyxel.text(39, 4, f"SCORE {this.score:5}", 7);

    }
    drawTitleScene() {
        pyxel.text(35, 66, "Pyxel Shooter", pyxel.frame_count % 16);
        pyxel.text(31, 126, "- PRESS ENTER -", 13);

    }
    drawPlayScene() {
        this.player.draw();

        draw_entities(bullets);
        draw_entities(enemies);
        draw_entities(blasts);

    }
    drawGameoverScene() {
        draw_entities(bullets);
        draw_entities(enemies);
        draw_entities(blasts);

        pyxel.text(43, 66, "GAME OVER", 8);
        pyxel.text(31, 126, "- PRESS ENTER -", 13);


    }
}
App();
