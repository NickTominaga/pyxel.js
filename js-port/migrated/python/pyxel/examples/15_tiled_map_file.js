// Auto-generated from 15_tiled_map_file.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

let HUMAN_IMAGE = (368, 8, 16, 16);
let CAR_IMAGES = [;
    (240, 272, 32, 24),;
    (240, 240, 32, 24),;
    (336, 264, 32, 16),;
    (336, 280, 32, 16),;
    (288, 240, 32, 24),;
];


class App {
    constructor() {
        pyxel.init(464, 256, title="Tiled Map File");

        pyxel.images[0] = pyxel.Image.from_image(;
            "assets/urban_rpg.png", include_colors=True;
        );
        // This example loads a PNG file as the tileset image, but you can also use
        // Pyxel's image bank as the tileset image in the usual way. Images from the
        // image bank can be saved to the desktop with the shortcut
        // Shift+Alt(Option)+1/2/3, and loading those images into Tiled allows them to
        // be used as a tileset image.

        for (const i of range(3)) {
            pyxel.tilemaps[i] = pyxel.Tilemap.from_tmx("assets/urban_rpg.tmx", i);
        }
        // Tiled Map Files (.tmx) can be created with Tiled, a 2D level editor. In Tiled,
        // the tile layout format must be in CSV format, and the tileset image needs to
        // be of the `Embed in map` type, and the tile size must be 8x8.

        this.player = (160, 80, 1, 0)  # (x, y, u, v);
        this.cars = [  # (x, y, dx, image);
            (128, 104, -2, 0),;
            (288, 104, -2, 1),;
            (416, 112, -2, 2),;
            (32, 144, 2, 3),;
            (64, 136, 2, 4),;
            (96, 136, 2, 4),;
        ];

        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_Q)) {
            pyxel.quit();

        }
        // Update player
        x, y, u, v = this.player;
        dx, dy = 0, 0;

        if (pyxel.btn(pyxel.KEY_UP) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_UP)) {
            let dy = -1;
            u, v = 2, 1;
        }
        if (pyxel.btn(pyxel.KEY_DOWN) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_DOWN)) {
            let dy = 1;
            u, v = 1, 1;
        }
        if (pyxel.btn(pyxel.KEY_LEFT) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_LEFT)) {
            let dx = -1;
            u, v = 0, 1;
        }
        if (pyxel.btn(pyxel.KEY_RIGHT) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_RIGHT)) {
            let dx = 1;
            u, v = 3, 1;

        }
        if (v == 1) {
            v += [-1, 0, -1, 1][pyxel.frame_count // 5 % 4];

        }
        dx, dy = pyxel.tilemaps[2].collide(x, y, 16, 16, dx, dy, [(2, 0)]);
        let x = pyxel.clamp(x + dx, 0, pyxel.width - 16);
        let y = pyxel.clamp(y + dy, 0, pyxel.height - 16);
        this.player = (x, y, u, v);

        // Update cars
        for (const i, car of enumerate(this.cars)) {
            x, y, dx, image = car;
            x += dx;

            if (x <= -32) {
                let x = pyxel.tilemaps[0].width * 8;
            }
            else if (x >= pyxel.tilemaps[0].width * 8) {
                let x = -32;

            }
            this.cars[i] = (x, y, dx, image);

        }
    }
    draw() {
        pyxel.cls(1);
        pyxel.bltm(0, 0, 0, 0, 0, pyxel.width, pyxel.height, 0);

        // Draw player
        x, y, u, v = this.player;
        pyxel.blt(;
            x,;
            y - 1,;
            0,;
            HUMAN_IMAGE[0] + u * 16,;
            HUMAN_IMAGE[1] + v * 16,;
            HUMAN_IMAGE[2],;
            HUMAN_IMAGE[3],;
            0,;
        );

        // Draw cars
        for (const car of this.cars) {
            x, y, _, image = car;
            u, v, w, h = CAR_IMAGES[image];
            pyxel.blt(x, y, 0, u, v, w, h, 0);

        }
        pyxel.bltm(0, 0, 1, 0, 0, pyxel.width, pyxel.height, 0);


    }
}
App();
