// Auto-generated from 14_synthesizer.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import pyxel

// TODO(python): EXTENDED_CHANNELS = [
    // TODO(python): (0.1 / 2.0, 0),  # Lead Melody
    // TODO(python): (0.1 / 2.0, 10),  # Detuned Lead Melody
    // TODO(python): (0.1, 0),  # Sub Melody
    // TODO(python): (0.1 / 3.0, 0),  # Chord Backing 1
    // TODO(python): (0.1 / 3.0, 0),  # Chord Backing 2
    // TODO(python): (0.1 / 3.0, 0),  # Chord Backing 3
    // TODO(python): (0.1, 0),  # Bass Line
    // TODO(python): (0.1, 0),  # Drums
// TODO(python): ]
// [(gain, detune), (gain, detune), ...]
// 'gain' ranges from 0.0 to 1.0.
// Ensure that the total gain during simultaneous playback does not exceed 1.0.
// 'detune' is the amount of detuning in cents (1/100 of a semitone).
// 'detune' must be set carefully according to the pitch of the notes.

// TODO(python): EXTENDED_TONES = [
    // TODO(python): (  # Sine Wave
        // TODO(python): 0,
        // TODO(python): 4,
        [15, 15, 15, 15, 15, 15, 15, 15, 15, 14, 13, 12, 11, 10, 9, 8];
        // TODO(python): + [7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // TODO(python): 0.8,
    // TODO(python): ),
    // TODO(python): (  # Sine Wave
        // TODO(python): 0,
        // TODO(python): 4,
        [8, 9, 10, 12, 13, 14, 14, 15, 15, 15, 14, 14, 13, 12, 10, 9];
        // TODO(python): + [8, 6, 5, 3, 2, 1, 1, 0, 0, 0, 1, 1, 2, 3, 5, 6],
        // TODO(python): 0.4,
    // TODO(python): ),
    // TODO(python): (  # Narrow (1:7) Pulse Wave
        // TODO(python): 0,
        // TODO(python): 4,
        // TODO(python): [15] * 4 + [0] * 28,
        // TODO(python): 0.7,
    // TODO(python): ),
    // TODO(python): (  # Saw Wave
        // TODO(python): 0,
        // TODO(python): 4,
        [15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8];
        // TODO(python): + [7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0],
        // TODO(python): 1.0,
    // TODO(python): ),
    // TODO(python): (  # Short Period Noise
        // TODO(python): 1,
        // TODO(python): 4,
        // TODO(python): [0] * 32,
        // TODO(python): 0.8,
    // TODO(python): ),
// TODO(python): ]
// [(mode, sample_bits, wavetable, gain), (mode, sample_bits, wavetable, gain), ...]
// 'mode' corresponds to:
//  0 for wavetable, 1 for short-period noise, 2 for long-period noise.
// 'wavetable' can be any length, but all are 32 elements in this example.
// 'wavetable' value range depends on 'sample_bits'. For 4 bits, the range is 0-15.

// TODO(python): WAVETABLE_EDITOR_PARAMS = [
    // TODO(python): (8, 8, 0, "Lead Melody"),
    // TODO(python): (8, 71, 1, "Sub Melody"),
    // TODO(python): (8, 134, 2, "Chord Backing"),
    // TODO(python): (8, 197, 3, "Bass Line"),
// TODO(python): ]


function extendAudio() {
    let channels = [];
    for (const gain, detune of EXTENDED_CHANNELS) {
        let channel = pyxel.Channel();
        channel.gain = gain;
        channel.detune = detune;
        channels.append(channel);
    }
    pyxel.channels.from_list(channels);

    let tones = [];
    for (const mode, sample_bits, wavetable, gain of EXTENDED_TONES) {
        let tone = pyxel.Tone();
        tone.mode = mode;
        tone.sample_bits = sample_bits;
        tone.wavetable.from_list(wavetable);
        tone.gain = gain;
        tones.append(tone);
    }
    pyxel.tones.from_list(tones);


}
function setupMusic() {
    pyxel.sounds[0].set(;
        // TODO(python): "b-2b-2b-2b-2a-2a-2a-2a-2 g2g2e-2e-2c2c2f2f2 f2f2g2g2f2f2e2e2 e2e2c2c2c2c2rr",
        // TODO(python): "0",
        // TODO(python): "5",
        // TODO(python): "vvvfnnnf nfnfnfvv vfnfnfvv vfvvvfvv",
        // TODO(python): 16,
    // TODO(python): )
    pyxel.sounds[1].set(;
        // TODO(python): "rrb-1b-1c2c2e-2e-2 f2f2f2f2e-2e-2f2f2 g2g2b-2b-2c3c3f2f2 f2f2e-2e-2e-2e-2f2f2",
        // TODO(python): "0",
        // TODO(python): "5",
        // TODO(python): "vfnfnfvf vfnfnfnf nfnfnfvv vfnnnfnf",
        // TODO(python): 16,
    // TODO(python): )

    pyxel.sounds[2].set(;
        // TODO(python): "rrc3c3e-3e-3g3g3 f3f3f3g3g3g3g3g3 rrb-3b-3a-3a-3f3f3 a-3a-3a-3g3g3g3g3g3",
        // TODO(python): "1",
        // TODO(python): "3",
        // TODO(python): "vvvvvvvv",
        // TODO(python): 32,
    // TODO(python): )
    pyxel.sounds[3].set(;
        // TODO(python): "rrc3c3e-3e-3g3g3 f3f3f3g3g3g3g3g3 rrb-3b-3a-3a-3f3f3 a-3a-3a-3g3g3g3g3g3",
        // TODO(python): "1",
        // TODO(python): "3",
        // TODO(python): "vvvvvvvf",
        // TODO(python): 32,
    // TODO(python): )

    pyxel.sounds[4].set("a-2a-2ra-2 a-2a-2ra-2", "2", "5", "f", 32);
    pyxel.sounds[5].set("g2g2rg2 g2g2rg2", "2", "5", "f", 32);

    pyxel.sounds[6].set("c3c3rc3 b-2b-2rb-2", "2", "5", "f", 32);
    pyxel.sounds[7].set("b-2b-2rb-2 c3c3rc3", "2", "5", "f", 32);

    pyxel.sounds[8].set(;
        // TODO(python): "e-3e-3re-3 d3d3rd3 d3d3rd3 e3e3re3",
        // TODO(python): "2",
        // TODO(python): "5",
        // TODO(python): "f",
        // TODO(python): 32,
    // TODO(python): )
    pyxel.sounds[9].set(;
        // TODO(python): "e-3e-3re-3 d3d3rd3 d3d3rd3 e-3e-3re-3",
        // TODO(python): "2",
        // TODO(python): "5",
        // TODO(python): "f",
        // TODO(python): 32,
    // TODO(python): )

    pyxel.sounds[10].set("a-0rra-0 b-0rrb-0", "3", "5", "f", 32);
    pyxel.sounds[11].set("g0rrg0 c1rrc1", "3", "5", "f", 32);

    pyxel.sounds[12].set("g1rrrd2rrr" * 2, "4", "50006000" * 3 + "50506000", "f", 16);
    pyxel.sounds[13].set(;
        "g1rrrd2rrr g1rd2rd2rrr", "4", "50006000" * 3 + "50506000", "f", 16;
    // TODO(python): )

    pyxel.musics[0].set(;
        [0, 1], [0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13];
    // TODO(python): )


}
class WavetableEditor {
    constructor(x, y, tone, desc) {
        this.x = x;
        this.y = y;
        this.tone = tone;
        this.desc = desc;
        this.target = null;
        this.last_col = 0;

    }
    update() {
        let col = (pyxel.mouse_x - this.x - 1) // 5;
        let row = 15 - (pyxel.mouse_y - this.y - 8) // 3;

        if (pyxel.btnp(pyxel.MOUSE_BUTTON_LEFT) && 0 <= row <= 15) {
            if (0 <= col <= 31) {
                this.target = "wave";
            }
            else if (167 <= pyxel.mouse_x - this.x <= 174) {
                this.target = "gain";

            }
        }
        if (pyxel.btnr(pyxel.MOUSE_BUTTON_LEFT)) {
            this.target = null;

        }
        if (this.target == "wave") {
            for (const x of range(min(this.last_col, col), max(this.last_col, col) + 1)) {
                pyxel.tones[this.tone].wavetable[int(pyxel.clamp(x, 0, 31))] = int(;
                    pyxel.clamp(row, 0, 15);
                // TODO(python): )
            }
        }
        else if (this.target == "gain") {
            pyxel.tones[this.tone].gain = pyxel.clamp(row, 0, 15) / 15;

        }
        this.last_col = col;

    }
    draw() {
        // TODO(python): pyxel.text(self.x, self.y, f"TONE:{self.tone} {self.desc}", 12)

        this.draw_panel(this.x, this.y + 7, 162, 50);
        pyxel.line(this.x + 1, this.y + 32, this.x + 161, this.y + 32, 15);
        pyxel.line(this.x + 81, this.y + 8, this.x + 81, this.y + 56, 15);

        for (const i of range(32)) {
            let amp = pyxel.tones[this.tone].wavetable[i];
            for (const j of range(amp, 8) if amp < 8 else range(8, amp + 1)) {
                this.draw_rect(this.x + i * 5 + 2, this.y + 54 - j * 3);

            }
        }
        this.draw_panel(this.x + 167, this.y + 7, 7, 50);
        for (const i of range(int(pyxel.tones[this.tone].gain * 16))) {
            this.draw_rect(this.x + 169, this.y + 54 - i * 3);

        }
    }
    // TODO(python): @classmethod
    drawPanel(cls, x, y, w, h) {
        pyxel.rectb(x, y, w + 1, h + 1, 5);
        pyxel.rectb(x, y, w, h, 4);
        pyxel.rect(x + 1, y + 1, w - 1, h - 1, 9);

    }
    drawRect(cls, x, y) {
        pyxel.rect(x, y, 4, 2, 1);


    }
}
class App {
    constructor() {
        pyxel.init(191, 264, title="Synthesizer");
        extend_audio();
        setup_music();

        // TODO(python): self.wavetable_editors = [
            WavetableEditor(*param) for param in WAVETABLE_EDITOR_PARAMS;
        // TODO(python): ]

        pyxel.mouse(true);
        pyxel.playm(0, loop=true);
        pyxel.run(this.update, this.draw);

    }
    update() {
        if (pyxel.btnp(pyxel.KEY_Q)) {
            pyxel.quit();

        }
        for (const wavetable_editor of this.wavetable_editors) {
            wavetable_editor.update();

        }
    }
    draw() {
        pyxel.cls(1);

        for (const wavetable_editor of this.wavetable_editors) {
            wavetable_editor.draw();


        }
    }
}
App();
