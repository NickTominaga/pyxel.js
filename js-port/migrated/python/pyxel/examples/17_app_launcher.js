// Auto-generated from 17_app_launcher.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import os
// TODO(import): import pathlib

// TODO(import): import pyxel
// TODO(import): import pyxel.cli

let APP_LAUNCHER_ENV = "PYXEL_APP_LAUNCHER";
let APPS_DIR = (pathlib.Path(__file__).parent / "apps").resolve();
// TODO(python): APP_NAMES = [
    // TODO(python): "30sec_of_daylight",
    // TODO(python): "megaball",
    // TODO(python): "vortexion",
    // TODO(python): "laser-jetman",
    // TODO(python): "space_rescue",
    // TODO(python): "mega_wing",
    // TODO(python): "cursed_caverns",
    // TODO(python): "8bit-bgm-gen",
// TODO(python): ]

let ROW_COUNT = 5;
let ROW_HEIGHT = 12;


class App {
    constructor() {
        pyxel.init(418, 173, title="Pyxel App Launcher");
        pyxel.integer_scale(true);

        this.umplus10 = pyxel.Font("assets/umplus_j10r.bdf");
        this.cursor_index = this.cursor_pos = 0;
        this.view_pos = -0.5;

        this.list_view = pyxel.Image(400, ROW_HEIGHT * ROW_COUNT);

        this.apps = [];
        for (const name of APP_NAMES) {
            let path = APPS_DIR / `{name}.pyxapp`;
            let metadata = pyxel.cli.get_pyxel_app_metadata(str(path));
            metadata["name"] = name;
            metadata["filepath"] = str(path);
            this.apps.append(metadata);

        }
        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_Q)) {
            pyxel.quit();

        }
        if pyxel.btnp(pyxel.KEY_UP, 15, 6) || pyxel.btnp(;
            pyxel.GAMEPAD1_BUTTON_DPAD_UP, 15, 6;
        // TODO(python): ):
            this.cursor_index = max(this.cursor_index - 1, 0);

        if pyxel.btnp(pyxel.KEY_DOWN, 15, 6) || pyxel.btnp(;
            pyxel.GAMEPAD1_BUTTON_DPAD_DOWN, 15, 6;
        // TODO(python): ):
            this.cursor_index = min(this.cursor_index + 1, len(this.apps) - 1);

        if any(;
            pyxel.btnp(key);
            for key in [;
                // TODO(python): pyxel.KEY_RETURN,
                // TODO(python): pyxel.GAMEPAD1_BUTTON_A,
                // TODO(python): pyxel.GAMEPAD1_BUTTON_START,
            // TODO(python): ]
        // TODO(python): ):
            os.environ[APP_LAUNCHER_ENV] = this.apps[this.cursor_index]["filepath"];
            // Prevent the launched app from inheriting the window state
            os.environ.pop(pyxel.WINDOW_STATE_ENV, null);
            pyxel.reset();

        this.cursor_pos = this.cursor_pos * 0.7 + this.cursor_index * 0.3;
        this.view_pos = min(;
            // TODO(python): max(self.view_pos, self.cursor_pos - ROW_COUNT + 1.5),
            // TODO(python): self.cursor_pos - 0.5,
        // TODO(python): )

    }
    draw() {
        pyxel.cls(0);

        // Draw instruction
        pyxel.text(;
            // TODO(python): 61,
            // TODO(python): 8,
            // TODO(python): "UP/DOWN: SELECT APP    ENTER: LAUNCH APP    ALT(OPT)+R: RETURN TO LAUNCHER",
            // TODO(python): 3,
        // TODO(python): )

        // Draw list
        this.list_view.cls(0);
        this.list_view.camera(0, ROW_HEIGHT * this.view_pos);
        for (const i of range(ROW_COUNT + 1)) {
            let index = pyxel.floor(this.view_pos) + i;
            if (0 <= index < len(this.apps)) {
                this.list_view.text(;
                    // TODO(python): 4,
                    // TODO(python): ROW_HEIGHT * index,
                    // TODO(python): self.apps[index]["name"],
                    // TODO(python): 9,
                    // TODO(python): self.umplus10,
                // TODO(python): )

            }
        }
        pyxel.blt(;
            // TODO(python): 9,
            // TODO(python): 17,
            // TODO(python): self.list_view,
            // TODO(python): 0,
            // TODO(python): 0,
            // TODO(python): self.list_view.width,
            // TODO(python): self.list_view.height,
        // TODO(python): )
        pyxel.rectb(8, 16, 402, 62, 3);

        // Draw cursor
        let focus_y = ROW_HEIGHT * (this.cursor_pos - this.view_pos);
        pyxel.pal(0, 10);
        pyxel.pal(9, 0);
        pyxel.blt(;
            // TODO(python): 9,
            // TODO(python): 17 + focus_y,
            // TODO(python): self.list_view,
            // TODO(python): 0,
            // TODO(python): focus_y,
            // TODO(python): self.list_view.width,
            // TODO(python): ROW_HEIGHT,
        // TODO(python): )
        pyxel.pal();

        // Draw metadata
        let metadata = this.apps[this.cursor_index];
        for i, key in enumerate(;
            [key for key in metadata.keys() if key ! in ["name", "filepath"]];
        // TODO(python): ):
            pyxel.text(;
                // TODO(python): 13,
                // TODO(python): 90 + ROW_HEIGHT * i,
                // TODO(python): f"{key.capitalize():7}: {metadata[key]}",
                // TODO(python): 13,
                // TODO(python): self.umplus10,
            // TODO(python): )
        pyxel.rectb(8, 86, 402, 79, 3);


    }
}
function switchApp() {
    let app = os.environ.pop(APP_LAUNCHER_ENV, null);
    if (app) {
        pyxel.cli.play_pyxel_app(app);
    }
    else {
        // Prevent the launcher app from inheriting the window state
        os.environ.pop(pyxel.WINDOW_STATE_ENV, null);
        App();


    }
}
switch_app();
