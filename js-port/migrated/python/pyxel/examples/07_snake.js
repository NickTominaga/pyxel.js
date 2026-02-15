// Auto-generated from 07_snake.py
// NOTE: Manual review required for runtime parity.

// title: Snake!
// author: Marcus Croucher
// desc: A Pyxel snake game example
// site: https://github.com/kitao/pyxel
// license: MIT
// version: 1.0

// TODO(import): from collections import deque, namedtuple

// TODO(import): import pyxel

let Point = namedtuple("Point", ["x", "y"]);


//############
// Constants #
//############

let COL_BACKGROUND = 3;
let COL_BODY = 11;
let COL_HEAD = 7;
let COL_DEATH = 8;
let COL_APPLE = 8;

let TEXT_DEATH = ["GAME OVER", "(Q)UIT", "(R)ESTART"];
let COL_TEXT_DEATH = 0;
let HEIGHT_DEATH = 5;

let WIDTH = 40;
let HEIGHT = 50;

let HEIGHT_SCORE = pyxel.FONT_HEIGHT;
let COL_SCORE = 6;
let COL_SCORE_BACKGROUND = 5;

let UP = Point(0, -1);
let DOWN = Point(0, 1);
let RIGHT = Point(1, 0);
let LEFT = Point(-1, 0);

let START = Point(5, 5 + HEIGHT_SCORE);


//##################
// The game itself #
//##################


class Snake {
    // TODO(docstring): """The class that sets up and runs the game."""

    constructor() {
        // TODO(docstring): """Initiate pyxel, set up initial game variables, and run."""

        pyxel.init(;
            WIDTH, HEIGHT, title="Snake!", fps=20, display_scale=12, capture_scale=6;
        // TODO(python): )
        define_sound_and_music();
        this.reset();
        pyxel.run(this.update, this.draw);

    }
    reset() {
        // TODO(docstring): """Initiate key variables (direction, snake, apple, score, etc.)"""

        this.direction = RIGHT;
        this.snake = deque();
        this.snake.append(START);
        this.death = false;
        this.score = 0;
        this.generate_apple();

        pyxel.playm(0, loop=true);

    }
    //#############
    // Game logic #
    //#############

    update() {
        // TODO(docstring): """Update logic of game.
        // TODO(docstring): Updates the snake and checks for scoring/win condition."""

        if (! this.death) {
            this.update_direction();
            this.update_snake();
            this.check_death();
            this.check_apple();

        }
        if (pyxel.btn(pyxel.KEY_Q)) {
            pyxel.quit();

        }
        if (pyxel.btnp(pyxel.KEY_R) || pyxel.btnp(pyxel.GAMEPAD1_BUTTON_START)) {
            this.reset();

        }
    }
    updateDirection() {
        // TODO(docstring): """Watch the keys and change direction."""

        if (pyxel.btn(pyxel.KEY_UP) || pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_UP)) {
            if (this.direction is ! DOWN) {
                this.direction = UP;

            }
        }
        else if (pyxel.btn(pyxel.KEY_DOWN) || pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_DOWN)) {
            if (this.direction is ! UP) {
                this.direction = DOWN;

            }
        }
        else if (pyxel.btn(pyxel.KEY_LEFT) || pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_LEFT)) {
            if (this.direction is ! RIGHT) {
                this.direction = LEFT;

            }
        }
        else if (pyxel.btn(pyxel.KEY_RIGHT) || pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_RIGHT)) {
            if (this.direction is ! LEFT) {
                this.direction = RIGHT;

            }
        }
    }
    updateSnake() {
        // TODO(docstring): """Move the snake based on the direction."""

        let old_head = this.snake[0];
        let new_head = Point(old_head.x + this.direction.x, old_head.y + this.direction.y);
        this.snake.appendleft(new_head);
        this.popped_point = this.snake.pop();

    }
    checkApple() {
        // TODO(docstring): """Check whether the snake is on an apple."""

        if (this.snake[0] == this.apple) {
            this.score += 1;
            this.snake.append(this.popped_point);
            this.generate_apple();
            pyxel.play(0, 0);

        }
    }
    generateApple() {
        // TODO(docstring): """Generate an apple randomly."""

        let snake_pixels = set(this.snake);

        this.apple = this.snake[0];
        while (this.apple in snake_pixels) {
            let x = pyxel.rndi(0, WIDTH - 1);
            let y = pyxel.rndi(HEIGHT_SCORE + 1, HEIGHT - 1);
            this.apple = Point(x, y);

        }
    }
    checkDeath() {
        // TODO(docstring): """Check whether the snake has died (out of bounds or doubled up.)"""

        let head = this.snake[0];
        if (head.x < 0 || head.y < HEIGHT_SCORE || head.x >= WIDTH || head.y >= HEIGHT) {
            this.death_event();
        }
        else if (len(this.snake) != len(set(this.snake))) {
            this.death_event();

        }
    }
    deathEvent() {
        // TODO(docstring): """Kill the game (bring up end screen)."""

        this.death = true;
        pyxel.stop();
        pyxel.play(0, 1);

    }
    //#############
    // Draw logic #
    //#############

    draw() {
        // TODO(docstring): """Draw the background, snake, score, and apple OR the end screen."""

        if (! this.death) {
            pyxel.cls(col=COL_BACKGROUND);
            this.draw_snake();
            this.draw_score();
            pyxel.pset(this.apple.x, this.apple.y, col=COL_APPLE);
        }
        else {
            this.draw_death();

        }
    }
    drawSnake() {
        // TODO(docstring): """Draw the snake with a distinct head by iterating through deque."""

        for (const i, point of enumerate(this.snake)) {
            if (i == 0) {
                let colour = COL_HEAD;
            }
            else {
                let colour = COL_BODY;
            }
            pyxel.pset(point.x, point.y, col=colour);

        }
    }
    drawScore() {
        // TODO(docstring): """Draw the score at the top."""

        let score = `{this.score:04}`;
        pyxel.rect(0, 0, WIDTH, HEIGHT_SCORE, COL_SCORE_BACKGROUND);
        pyxel.text(1, 1, score, COL_SCORE);

    }
    drawDeath() {
        // TODO(docstring): """Draw a blank screen with some text."""

        pyxel.cls(col=COL_DEATH);

        let display_text = TEXT_DEATH[:];
        // TODO(python): display_text.insert(1, f"{self.score:04}")

        for (const i, text of enumerate(display_text)) {
            let y_offset = (pyxel.FONT_HEIGHT + 2) * i;
            let text_x = this.center_text(text, WIDTH);
            pyxel.text(text_x, HEIGHT_DEATH + y_offset, text, COL_TEXT_DEATH);

        }
    }
    // TODO(python): @staticmethod
    centerText(text, page_width, char_width) {
        // TODO(docstring): """Helper function for calculating the start x value for centered text."""

        let text_width = len(text) * char_width;
        return (page_width - text_width) // 2;


    }
}
//##########################
// Music and sound effects #
//##########################


function defineSoundAndMusic() {
    // TODO(docstring): """Define sound and music."""

    // Sound effects
    pyxel.sounds[0].set(;
        let notes = "c3e3g3c4c4", tones="s", volumes="4", effects=("n" * 4 + "f"), speed=7;
    // TODO(python): )
    pyxel.sounds[1].set(;
        // TODO(python): notes="f3 b2 f2 b1  f1 f1 f1 f1",
        // TODO(python): tones="p",
        // TODO(python): volumes=("4" * 4 + "4321"),
        // TODO(python): effects=("n" * 7 + "f"),
        // TODO(python): speed=9,
    // TODO(python): )

    // TODO(python): melody1 = (
        "c3 c3 c3 d3 e3 r e3 r";
        + ("r" * 8);
        + "e3 e3 e3 f3 d3 r c3 r";
        + ("r" * 8);
        + "c3 c3 c3 d3 e3 r e3 r";
        + ("r" * 8);
        + "b2 b2 b2 f3 d3 r c3 r";
        + ("r" * 8);
    // TODO(python): )
    // TODO(python): melody2 = (
        "rrrr e3e3e3e3 d3d3c3c3 b2b2c3c3";
        + "a2a2a2a2 c3c3c3c3 d3d3d3d3 e3e3e3e3";
        + "rrrr e3e3e3e3 d3d3c3c3 b2b2c3c3";
        + "a2a2a2a2 g2g2g2g2 c3c3c3c3 g2g2a2a2";
        + "rrrr e3e3e3e3 d3d3c3c3 b2b2c3c3";
        + "a2a2a2a2 c3c3c3c3 d3d3d3d3 e3e3e3e3";
        + "f3f3f3a3 a3a3a3a3 g3g3g3b3 b3b3b3b3";
        + "b3b3b3b4 rrrr e3d3c3g3 a2g2e2d2";
    // TODO(python): )

    // Music
    pyxel.sounds[2].set(;
        // TODO(python): notes=melody1 * 2 + melody2 * 2,
        // TODO(python): tones="s",
        // TODO(python): volumes=("3"),
        // TODO(python): effects=("nnnsffff"),
        // TODO(python): speed=20,
    // TODO(python): )

    // TODO(python): harmony1 = (
        "a1 a1 a1 b1  f1 f1 c2 c2  c2 c2 c2 c2  g1 g1 b1 b1" * 3;
        + "f1 f1 f1 f1 f1 f1 f1 f1 g1 g1 g1 g1 g1 g1 g1 g1";
    // TODO(python): )
    // TODO(python): harmony2 = (
        ("f1" * 8 + "g1" * 8 + "a1" * 8 + ("c2" * 7 + "d2")) * 3 + "f1" * 16 + "g1" * 16;
    // TODO(python): )

    pyxel.sounds[3].set(;
        let notes = harmony1 * 2 + harmony2 * 2, tones="t", volumes="5", effects="f", speed=20;
    // TODO(python): )
    pyxel.sounds[4].set(;
        // TODO(python): notes=("f0 r a4 r  f0 f0 a4 r  f0 r a4 r  f0 f0 a4 f0"),
        // TODO(python): tones="n",
        // TODO(python): volumes="6622 6622 6622 6426",
        // TODO(python): effects="f",
        // TODO(python): speed=20,
    // TODO(python): )

    pyxel.musics[0].set([], [2], [3], [4]);


}
Snake();
