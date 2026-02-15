// Auto-generated from 17_app_launcher.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import os
// TODO(import): import pathlib

// TODO(import): import pyxel
// TODO(import): import pyxel.cli

let APP_LAUNCHER_ENV = "PYXEL_APP_LAUNCHER";
let APPS_DIR = (pathlib.Path(__file__).parent / "apps").resolve();
let APP_NAMES = [;
    "30sec_of_daylight",;
    "megaball",;
    "vortexion",;
    "laser-jetman",;
    "space_rescue",;
    "mega_wing",;
    "cursed_caverns",;
    "8bit-bgm-gen",;
];

let ROW_COUNT = 5;
let ROW_HEIGHT = 12;


class App {
    constructor() {
        pyxel.init(418, 173, title="Pyxel App Launcher");
        pyxel.integer_scale(True);

        this.umplus10 = pyxel.Font("assets/umplus_j10r.bdf");
        this.cursor_index = this.cursor_pos = 0;
        this.view_pos = -0.5;

        this.list_view = pyxel.Image(400, ROW_HEIGHT * ROW_COUNT);

        this.apps = [];
        for (const name of APP_NAMES) {
            let path = APPS_DIR / f"{name}.pyxapp";
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
        if pyxel.btnp(pyxel.KEY_UP, 15, 6) or pyxel.btnp(;
            pyxel.GAMEPAD1_BUTTON_DPAD_UP, 15, 6;
        ):;
            this.cursor_index = max(this.cursor_index - 1, 0);

        if pyxel.btnp(pyxel.KEY_DOWN, 15, 6) or pyxel.btnp(;
            pyxel.GAMEPAD1_BUTTON_DPAD_DOWN, 15, 6;
        ):;
            this.cursor_index = min(this.cursor_index + 1, len(this.apps) - 1);

        if any(;
            pyxel.btnp(key);
            for key in [;
                pyxel.KEY_RETURN,;
                pyxel.GAMEPAD1_BUTTON_A,;
                pyxel.GAMEPAD1_BUTTON_START,;
            ];
        ):;
            os.environ[APP_LAUNCHER_ENV] = this.apps[this.cursor_index]["filepath"];
            // Prevent the launched app from inheriting the window state
            os.environ.pop(pyxel.WINDOW_STATE_ENV, None);
            pyxel.reset();

        this.cursor_pos = this.cursor_pos * 0.7 + this.cursor_index * 0.3;
        this.view_pos = min(;
            max(this.view_pos, this.cursor_pos - ROW_COUNT + 1.5),;
            this.cursor_pos - 0.5,;
        );

    }
    draw() {
        pyxel.cls(0);

        // Draw instruction
        pyxel.text(;
            61,;
            8,;
            "UP/DOWN: SELECT APP    ENTER: LAUNCH APP    ALT(OPT)+R: RETURN TO LAUNCHER",;
            3,;
        );

        // Draw list
        this.list_view.cls(0);
        this.list_view.camera(0, ROW_HEIGHT * this.view_pos);
        for (const i of range(ROW_COUNT + 1)) {
            let index = pyxel.floor(this.view_pos) + i;
            if (0 <= index < len(this.apps)) {
                this.list_view.text(;
                    4,;
                    ROW_HEIGHT * index,;
                    this.apps[index]["name"],;
                    9,;
                    this.umplus10,;
                );

            }
        }
        pyxel.blt(;
            9,;
            17,;
            this.list_view,;
            0,;
            0,;
            this.list_view.width,;
            this.list_view.height,;
        );
        pyxel.rectb(8, 16, 402, 62, 3);

        // Draw cursor
        let focus_y = ROW_HEIGHT * (this.cursor_pos - this.view_pos);
        pyxel.pal(0, 10);
        pyxel.pal(9, 0);
        pyxel.blt(;
            9,;
            17 + focus_y,;
            this.list_view,;
            0,;
            focus_y,;
            this.list_view.width,;
            ROW_HEIGHT,;
        );
        pyxel.pal();

        // Draw metadata
        let metadata = this.apps[this.cursor_index];
        for i, key in enumerate(;
            [key for key in metadata.keys() if key not in ["name", "filepath"]];
        ):;
            pyxel.text(;
                13,;
                90 + ROW_HEIGHT * i,;
                f"{key.capitalize():7}: {metadata[key]}",;
                13,;
                this.umplus10,;
            );
        pyxel.rectb(8, 86, 402, 79, 3);


    }
}
function switchApp() {
    let app = os.environ.pop(APP_LAUNCHER_ENV, None);
    if (app) {
        pyxel.cli.play_pyxel_app(app);
    }
    else {
        // Prevent the launcher app from inheriting the window state
        os.environ.pop(pyxel.WINDOW_STATE_ENV, None);
        App();


    }
}
switch_app();
