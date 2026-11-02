/**
 * Harmony House Music Academy - Web Audio Synthesizer & Interactive Soundboard Engine
 * Uses native Web Audio API (zero external dependencies) to synthesize instruments in real-time.
 */

class HarmonyAudioEngine {
  constructor() {
    this.ctx = null;
    this.initAudioContext();
  }

  initAudioContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  ensureContext() {
    this.initAudioContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a realistic piano note by frequency
  playPianoNote(freq = 440, duration = 1.2) {
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Multiple oscillators for rich acoustic piano harmonics
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now); // 2nd harmonic

    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, now); // 3rd harmonic

    // Piano amplitude envelope: instant hammer attack, exponential decay
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.4, now + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    osc3.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
  }

  // Play Acoustic Guitar Chord Strum
  playGuitarStrum() {
    this.ensureContext();
    if (!this.ctx) return;

    // G Major Chord frequencies: G2, B2, D3, G3, B3, G4
    const chord = [98.0, 123.47, 146.83, 196.0, 246.94, 392.0];
    chord.forEach((freq, index) => {
      setTimeout(() => {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, now);
        filter.frequency.exponentialRampToValueAtTime(300, now + 1.5);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.8);
      }, index * 40); // 40ms stagger for realistic downward strum
    });
  }

  // Play Grand Piano Triad Chord
  playPianoChord() {
    this.ensureContext();
    if (!this.ctx) return;

    // C Major Triad + 9th: C4 (261.63), E4 (329.63), G4 (392.0), D5 (587.33)
    const chord = [261.63, 329.63, 392.0, 587.33];
    chord.forEach((freq, idx) => {
      setTimeout(() => {
        this.playPianoNote(freq, 2.2);
      }, idx * 18);
    });
  }

  // Play Drum Groove (Kick, Hi-Hat, Snare)
  playDrumGroove() {
    this.ensureContext();
    if (!this.ctx) return;

    const playKick = (time) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.35);
      gain.gain.setValueAtTime(0.6, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + 0.35);
    };

    const playSnare = (time) => {
      // Noise buffer for snare snap
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
      noise.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(time);
      noise.stop(time + 0.15);
    };

    const now = this.ctx.currentTime;
    playKick(now);
    playSnare(now + 0.25);
    playKick(now + 0.5);
    playSnare(now + 0.75);
  }

  // Play Vocal Chime / Choir Resonance
  playVocalHarmony() {
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [329.63, 440.0, 523.25]; // E4, A4, C5
    notes.forEach(freq => {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Add gentle vocal vibrato
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibrato.frequency.setValueAtTime(5.5, now); // 5.5 Hz vibrato
      vibratoGain.gain.setValueAtTime(3.5, now);
      vibrato.connect(osc.frequency);
      vibrato.start(now);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.5, now);
      filter.Q.setValueAtTime(3, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);
      vibrato.stop(now + 2.5);
    });
  }

  // Play Violin Swell
  playViolinSwell() {
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440.0, now); // A4

    // Bow vibrato
    const vib = this.ctx.createOscillator();
    const vibGain = this.ctx.createGain();
    vib.frequency.setValueAtTime(6.0, now);
    vibGain.gain.setValueAtTime(6.0, now);
    vib.connect(osc.frequency);
    vib.start(now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.5); // Warm bow swell
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.2);
    vib.stop(now + 2.2);
  }

  // Play Metronome Click (High woodblock / beep for accent beat 1, low for beats 2, 3, 4)
  playMetronomeClick(accent = false) {
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(accent ? 1320 : 880, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(accent ? 0.35 : 0.2, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Play Tuning Pitch (Standard Concert Pitch A4 = 440Hz, or guitar string pitches)
  playTuningPitch(freq = 440, duration = 2.0) {
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }
}

// Global instance
window.HarmonyAudio = new HarmonyAudioEngine();
