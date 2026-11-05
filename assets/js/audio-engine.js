/**
 * Harmony House Music Academy - Web Audio Synthesizer & Interactive Soundboard Engine
 * Uses native Web Audio API (zero external dependencies) to synthesize instruments in real-time.
 * Features:
 * - Master Audio Routing & Real-time Analyser for Visualizer Oscilloscope
 * - Pluckable 6-String Acoustic Guitar & Preset Chords (G, C, D, Em, Am)
 * - 88-Key Calibrated Grand Piano & Solfege Notes (C4-D5)
 * - 6-Pad Studio MPC Drum Machine & Live Jam Looper (Rock & Funk Beats)
 * - Concert Violin with Dual Modes: Arco (Bowed with Vibrato) & Pizzicato (Plucked)
 */

class HarmonyAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.analyser = null;
    this.drumLoopTimer = null;
    this.isDrumLooping = false;
    this.currentLoopStyle = null;
    this.visualizerCanvas = null;
    this.visualizerCtx = null;
    this.visualizerAnimId = null;
    this.initAudioContext();
  }

  initAudioContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      
      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

      // Real-time Analyser for Visualizer Oscilloscope
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
  }

  ensureContext() {
    this.initAudioContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  getDestination() {
    this.ensureContext();
    return this.masterGain || (this.ctx ? this.ctx.destination : null);
  }

  /* =========================================================================
     1. REAL-TIME OSCILLOSCOPE & AUDIO SPECTRUM VISUALIZER
     ========================================================================= */
  attachVisualizer(canvasElement) {
    if (!canvasElement) return;
    this.visualizerCanvas = canvasElement;
    this.visualizerCtx = canvasElement.getContext('2d');
    if (!this.visualizerCtx) return;

    if (this.visualizerAnimId) {
      cancelAnimationFrame(this.visualizerAnimId);
    }

    const render = () => {
      this.visualizerAnimId = requestAnimationFrame(render);
      const canvas = this.visualizerCanvas;
      const ctx = this.visualizerCtx;
      if (!canvas || !ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // If analyser is ready, get real audio wave data
      if (this.analyser) {
        const bufferLength = this.analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteTimeDomainData(dataArray);

        // Check if there is actual sound activity
        let maxDev = 0;
        for (let i = 0; i < bufferLength; i++) {
          const dev = Math.abs(dataArray[i] - 128);
          if (dev > maxDev) maxDev = dev;
        }

        const isSilent = maxDev < 4;

        ctx.lineWidth = isSilent ? 1.5 : 2.5;
        // Gradient stroke from Brand Purple #6C4CE3 to Warm Amber #FF9F43
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#6C4CE3');
        gradient.addColorStop(0.5, '#FF9F43');
        gradient.addColorStop(1, '#6C4CE3');

        ctx.strokeStyle = gradient;
        ctx.shadowColor = isSilent ? 'rgba(108, 76, 227, 0.2)' : 'rgba(255, 159, 67, 0.7)';
        ctx.shadowBlur = isSilent ? 4 : 12;

        ctx.beginPath();
        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          let v = dataArray[i] / 128.0; // 0 to 2
          if (isSilent) {
            // Idle organic breathing wave
            const t = Date.now() * 0.003;
            v = 1.0 + Math.sin(t + i * 0.05) * 0.06;
          }
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    render();
  }

  /* =========================================================================
     2. PIANO & KEYBOARD SYNTHESIZER
     ========================================================================= */
  // Play a realistic piano note by frequency
  playPianoNote(freq = 440, duration = 1.2) {
    this.ensureContext();
    if (!this.ctx) return;

    const dest = this.getDestination();
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
    gainNode.connect(dest);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
  }

  // Play Grand Piano Triad Chord
  playPianoChord(chordName = 'C') {
    this.ensureContext();
    if (!this.ctx) return;

    const chords = {
      C: [261.63, 329.63, 392.0, 523.25], // C4, E4, G4, C5
      F: [261.63, 349.23, 440.0, 523.25], // C4, F4, A4, C5
      G7: [246.94, 293.66, 392.0, 493.88], // B3, D4, G4, B4
      Am: [220.0, 261.63, 329.63, 440.0]  // A3, C4, E4, A4
    };

    const notes = chords[chordName] || chords['C'];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playPianoNote(freq, 2.2);
      }, idx * 35);
    });
  }

  /* =========================================================================
     3. ACOUSTIC GUITAR: 6-STRING PLUCK & CHORD STRUMMER
     ========================================================================= */
  // Pluck a single guitar string
  playGuitarPluck(stringNum = 1, freq = 329.63) {
    this.ensureContext();
    if (!this.ctx) return;

    const dest = this.getDestination();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Sawtooth simulates wound or bronze acoustic guitar string
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    // Warm body resonance lowpass filter
    filter.type = 'lowpass';
    const initCutoff = Math.max(1200, freq * 5);
    filter.frequency.setValueAtTime(initCutoff, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(160, freq * 1.5), now + 1.8);
    filter.Q.setValueAtTime(2.5, now);

    // Pluck attack & decay envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    osc.start(now);
    osc.stop(now + 2.0);
  }

  // Play Acoustic Guitar Chord Strum (G, C, D, Em, Am)
  playGuitarChord(chordName = 'G') {
    this.ensureContext();
    if (!this.ctx) return;

    const CHORD_FREQS = {
      G: [98.0, 123.47, 146.83, 196.0, 246.94, 392.0], // E, A, D, G, B, e
      C: [130.81, 164.81, 196.0, 261.63, 329.63],
      D: [146.83, 220.0, 293.66, 369.99],
      Em: [82.41, 123.47, 164.81, 196.0, 246.94, 329.63],
      Am: [110.0, 164.81, 220.0, 261.63, 329.63]
    };

    const chord = CHORD_FREQS[chordName] || CHORD_FREQS['G'];
    chord.forEach((freq, index) => {
      setTimeout(() => {
        this.playGuitarPluck(index + 1, freq);
      }, index * 38); // 38ms realistic downward strum stagger
    });
  }

  // Backward compatible method
  playGuitarStrum() {
    this.playGuitarChord('G');
  }

  /* =========================================================================
     4. STUDIO MPC DRUM MACHINE (Kick, Snare, Hi-Hats, Crash, Tom)
     ========================================================================= */
  playDrumHit(pad = 'kick') {
    this.ensureContext();
    if (!this.ctx) return;

    const dest = this.getDestination();
    const now = this.ctx.currentTime;

    switch (pad) {
      case 'kick': {
        // Sub Punch Kick
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(38, now + 0.3);
        gain.gain.setValueAtTime(0.75, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.32);
        break;
      }

      case 'snare': {
        // Body tone (180Hz) + Snappy white noise wire
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);
        oscGain.gain.setValueAtTime(0.4, now);
        oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.connect(oscGain);
        oscGain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.12);

        // Noise snap
        const bufferSize = this.ctx.sampleRate * 0.18;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, now);
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.5, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(dest);
        noise.start(now);
        noise.stop(now + 0.18);
        break;
      }

      case 'hihat-closed': {
        // Crisp highpass metallic click
        const bufferSize = this.ctx.sampleRate * 0.06;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(7500, now);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        noise.start(now);
        noise.stop(now + 0.06);
        break;
      }

      case 'hihat-open': {
        // Open sizzling hi-hat wash
        const bufferSize = this.ctx.sampleRate * 0.35;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(6500, now);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        noise.start(now);
        noise.stop(now + 0.35);
        break;
      }

      case 'crash': {
        // Explosive brass splash cymbal with long decay
        const bufferSize = this.ctx.sampleRate * 1.5;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(5000, now);
        filter.Q.setValueAtTime(1.2, now);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        noise.start(now);
        noise.stop(now + 1.5);
        break;
      }

      case 'tom': {
        // Resonant acoustic tom-tom pitch drop
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(75, now + 0.35);
        gain.gain.setValueAtTime(0.55, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      }
    }
  }

  // Play a full Drum Groove pattern
  playDrumGroove() {
    this.ensureContext();
    if (!this.ctx) return;

    this.playDrumHit('kick');
    setTimeout(() => this.playDrumHit('hihat-closed'), 125);
    setTimeout(() => this.playDrumHit('snare'), 250);
    setTimeout(() => this.playDrumHit('hihat-closed'), 375);
    setTimeout(() => this.playDrumHit('kick'), 500);
    setTimeout(() => this.playDrumHit('kick'), 625);
    setTimeout(() => this.playDrumHit('snare'), 750);
    setTimeout(() => this.playDrumHit('hihat-open'), 875);
  }

  // Live Beat Looper: Starts or stops recurring drum pattern for jamming
  toggleDrumLoop(style = 'rock', onBeatCallback = null) {
    if (this.isDrumLooping) {
      this.stopDrumLoop();
      return false;
    }

    this.ensureContext();
    this.isDrumLooping = true;
    this.currentLoopStyle = style;

    const bpm = style === 'funk' ? 110 : 100;
    const stepInterval = (60 / bpm / 4) * 1000; // 16th note steps in ms
    let currentStep = 0;

    // 16-step grid
    this.drumLoopTimer = setInterval(() => {
      const step = currentStep % 16;

      // Rock Beat Grid:
      // Kick on 0, 8, 10
      // Snare on 4, 12
      // Hi-Hat on even steps
      if (step === 0 || step === 8 || step === 10) this.playDrumHit('kick');
      if (step === 4 || step === 12) this.playDrumHit('snare');
      if (step % 2 === 0) {
        if (step === 14) this.playDrumHit('hihat-open');
        else this.playDrumHit('hihat-closed');
      }

      if (onBeatCallback) onBeatCallback(step);
      currentStep++;
    }, stepInterval);

    return true;
  }

  stopDrumLoop() {
    if (this.drumLoopTimer) {
      clearInterval(this.drumLoopTimer);
      this.drumLoopTimer = null;
    }
    this.isDrumLooping = false;
  }

  /* =========================================================================
     5. CONCERT VIOLIN (Arco Bow Swell vs. Pizzicato Pluck)
     ========================================================================= */
  playViolinNote(freq = 440.0, mode = 'arco') {
    this.ensureContext();
    if (!this.ctx) return;

    const dest = this.getDestination();
    const now = this.ctx.currentTime;

    if (mode === 'pizzicato') {
      // Crisp acoustic pluck
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 4, now);
      filter.frequency.exponentialRampToValueAtTime(freq, now + 0.6);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.38, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 0.7);
    } else {
      // Arco (Bowed): Rich Sawtooth + 5.8Hz Vibrato LFO + Warm Formant Swell
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      // Acoustic vibrato
      const vib = this.ctx.createOscillator();
      const vibGain = this.ctx.createGain();
      vib.frequency.setValueAtTime(5.8, now); // 5.8 Hz natural hand vibrato
      vibGain.gain.setValueAtTime(freq * 0.015, now);
      vib.connect(osc.frequency);
      vib.start(now);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 2.2, now);
      filter.Q.setValueAtTime(2.0, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.25); // Gentle horsehair attack
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 2.0);
      vib.stop(now + 2.0);
    }
  }

  // Play continuous violin bow stroke
  playViolinBowStroke(intensity = 1.0) {
    this.playViolinNote(440.0, 'arco');
  }

  // Backward compatible
  playViolinSwell() {
    this.playViolinNote(440.0, 'arco');
  }

  /* =========================================================================
     6. VOCAL HARMONY & UTILITIES
     ========================================================================= */
  playVocalHarmony() {
    this.ensureContext();
    if (!this.ctx) return;

    const dest = this.getDestination();
    const notes = [329.63, 440.0, 523.25]; // E4, A4, C5
    notes.forEach(freq => {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibrato.frequency.setValueAtTime(5.5, now);
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
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 2.5);
      vibrato.stop(now + 2.5);
    });
  }

  playMetronomeClick(accent = false) {
    this.ensureContext();
    if (!this.ctx) return;
    const dest = this.getDestination();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(accent ? 1320 : 880, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(accent ? 0.35 : 0.2, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  playTuningPitch(freq = 440, duration = 2.0) {
    this.ensureContext();
    if (!this.ctx) return;
    const dest = this.getDestination();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(now);
    osc.stop(now + duration);
  }
}

// Global instance
window.HarmonyAudio = new HarmonyAudioEngine();
