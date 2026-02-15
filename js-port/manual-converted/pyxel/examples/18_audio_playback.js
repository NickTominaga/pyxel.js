/**
 * Manual conversion from python/pyxel/examples/18_audio_playback.py
 */
class App {
  constructor() {
    pyxel.init(256, 240, { title: 'Audio Playback' });
    pyxel.loadPal('assets/audio_bgm.pyxpal');

    this.images = [
      pyxel.Image.fromImage('assets/audio_bgm1.png'),
      pyxel.Image.fromImage('assets/audio_bgm2.png')
    ];

    pyxel.sounds[0].pcm('assets/audio_bgm1.ogg');
    pyxel.sounds[1].pcm('assets/audio_bgm2.ogg');

    // To avoid quality loss, use audio files pre-converted to 22.05kHz.
    // Change gain from the default 0.125 to adjust volume.
    pyxel.channels[0].gain = 0.8;

    this.bgmIndex = 0;
    pyxel.play(0, 0, { loop: true });

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    pyxel.run(this.update, this.draw);
  }

  update() {
    if (pyxel.btnp(pyxel.KEY_Q)) {
      pyxel.quit();
    }

    if (pyxel.btnp(pyxel.KEY_RETURN) || pyxel.btnp(pyxel.GAMEPAD1_BUTTON_A)) {
      this.bgmIndex = 1 - this.bgmIndex;
      pyxel.play(0, this.bgmIndex, { loop: true });
    }
  }

  draw() {
    pyxel.blt(0, 0, this.images[this.bgmIndex], 0, 0, pyxel.width, pyxel.height);

    const x = 26 - (Math.floor(pyxel.frame_count / 2) % pyxel.width);
    const s = 'Pyxel Audio Playback Sample - Press Enter to Toggle';
    const c = this.bgmIndex === 0 ? 15 : 8;
    for (let i = 0; i < 2; i += 1) {
      pyxel.text(x + i * pyxel.width, 4, s, c);
    }
  }
}

new App();
