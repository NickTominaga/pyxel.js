// Auto-generated from 18_audio_playback.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel


class App {
    constructor() {
        pyxel.init(256, 240, title="Audio Playback");
        pyxel.load_pal("assets/audio_bgm.pyxpal");

        this.images = [;
            pyxel.Image.from_image("assets/audio_bgm1.png"),;
            pyxel.Image.from_image("assets/audio_bgm2.png"),;
        ];

        pyxel.sounds[0].pcm("assets/audio_bgm1.ogg");
        pyxel.sounds[1].pcm("assets/audio_bgm2.ogg");

        // To avoid quality loss, use audio files pre-converted to 22.05kHz.
        // Change gain from the default 0.125 to adjust volume.
        pyxel.channels[0].gain = 0.8;

        this.bgm_index = 0;
        pyxel.play(0, 0, loop=True);

        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_Q)) {
            pyxel.quit();

        }
        if (pyxel.btnp(pyxel.KEY_RETURN) or pyxel.btnp(pyxel.GAMEPAD1_BUTTON_A)) {
            this.bgm_index = 1 - this.bgm_index;
            pyxel.play(0, this.bgm_index, loop=True);

        }
    }
    draw() {
        pyxel.blt(;
            0,;
            0,;
            this.images[this.bgm_index],;
            0,;
            0,;
            pyxel.width,;
            pyxel.height,;
        );

        let x = 26 - ((pyxel.frame_count // 2) % pyxel.width);
        let s = "Pyxel Audio Playback Sample - Press Enter to Toggle";
        let c = 15 if this.bgm_index == 0 else 8;
        for (const i of range(2)) {
            pyxel.text(x + i * pyxel.width, 4, s, c);


        }
    }
}
App();
