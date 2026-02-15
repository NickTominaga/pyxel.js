// Auto-generated from mml-studio/mml_studio.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel
// TODO(import): from js import window  # type: ignore

let NUM_CHANNELS = 4;


function jsVar(name, default) {
    return getattr(window, name) if hasattr(window, name) else default;


}
class App {
    constructor() {
        pyxel.init(100, 20, title="Pyxel MML Studio", quit_key=pyxel.KEY_NONE);

        this.default_gain = pyxel.channels[0].gain;

        for (const i of range(NUM_CHANNELS)) {
            pyxel.sounds[i].mml(js_var(`js_ch{i + 1}_mml`, ""));

        }
        if (js_var("js_play", false)) {
            this.start_playback();

        }
        pyxel.run(this.update, this.draw);

    }
    startPlayback() {
        this.loop_enabled = js_var("js_loop", false);

        pyxel.stop();
        for (const i of range(NUM_CHANNELS)) {
            pyxel.play(i, i, loop=this.loop_enabled);

        }
    }
    update() {
        if (js_var("js_stop", false)) {
            pyxel.stop();

        }
        let is_playing = any(pyxel.play_pos(i) !== null for i in range(NUM_CHANNELS));
        if (is_playing && this.loop_enabled != js_var("js_loop", false)) {
            this.start_playback();

        }
        let solo_enabled = any(;
            js_var(`js_solo{i + 1}`, false) for i in range(NUM_CHANNELS);
        // TODO(python): )
        for (const i of range(NUM_CHANNELS)) {
            pyxel.channels[i].gain = (;
                this.default_gain;
                if ! solo_enabled || js_var(`js_solo{i + 1}`, false);
                else 0.0;
            // TODO(python): )

        }
        for (const i of range(NUM_CHANNELS)) {
            if (js_var(`js_mute{i + 1}`, false)) {
                pyxel.channels[i].gain = 0.0;

            }
        }
    }
    draw() {
        pyxel.cls(1);

        pyxel.rectb(0, -1, pyxel.width, pyxel.height + 2, 5);

        for (const i of range(NUM_CHANNELS)) {
            let total_sec = pyxel.sounds[i].total_sec();
            (_, play_sec) = pyxel.play_pos(i) || (null, null);

            if (play_sec === null) {
                continue;

            }
            if (total_sec === null) {
                let play_sec = play_sec % 5;
                let total_sec = 5;
            }
            else if (total_sec == 0) {
                continue;

            }
            let x = pyxel.width * play_sec / total_sec;
            let y = i * 5 + 2;
            if (pyxel.channels[i].gain > 0) {
                pyxel.circb(x, y, 2, i + 8);
            }
            else {
                pyxel.rect(x - 1, y - 1, 3, 3, 5);


            }
        }
    }
}
App();
