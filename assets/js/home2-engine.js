/**
 * Harmony House Music Academy - Home 2 (Premium Conservatory)
 * Bespoke Interactive Animations & Sound Engines
 * Strict Two-Color Scheme: Deep Purple (#6C4CE3) & Warm Orange (#FF9F43)
 */

class HarmonyHome2Engine {
  constructor() {
    this.audioCtx = null;
    this.metronomeInterval = null;
    this.metronomeState = {
      isPlaying: false,
      bpm: 108,
      beat: 0,
      timeSignature: 4,
      tapTimes: []
    };
    this.init();
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  init() {
    this.initMetronome();
    this.initGradedSyllabusTabs();
    this.initSoundproofPodSelector();
  }

  // 1. BESPOKE LIVE MECHANICAL METRONOME & BPM ENGINE
  initMetronome() {
    const playBtn = document.getElementById('metronome-play-btn');
    const playIcon = document.getElementById('metronome-play-icon');
    const playLabel = document.getElementById('metronome-play-label');
    const bpmSlider = document.getElementById('metronome-bpm-slider');
    const bpmDisplay = document.getElementById('metronome-bpm-display');
    const tempoNameDisplay = document.getElementById('metronome-tempo-name');
    const pendulum = document.getElementById('metronome-pendulum');
    const pendulumWeight = document.getElementById('metronome-weight');
    const tapBtn = document.getElementById('metronome-tap-btn');
    const tempoPresets = document.querySelectorAll('[data-tempo-preset]');
    const beatDots = document.querySelectorAll('.metronome-beat-dot');

    if (!playBtn || !bpmSlider) return;

    const getTempoName = (bpm) => {
      if (bpm < 60) return 'Largo (Broad & Slow)';
      if (bpm < 76) return 'Adagio (At Ease)';
      if (bpm < 108) return 'Andante (Walking Pace)';
      if (bpm < 120) return 'Moderato (Moderate)';
      if (bpm < 168) return 'Allegro (Fast & Bright)';
      return 'Presto (Virtuoso Rapid)';
    };

    const updateTempoDisplay = (bpm) => {
      this.metronomeState.bpm = bpm;
      if (bpmDisplay) bpmDisplay.textContent = bpm;
      if (tempoNameDisplay) tempoNameDisplay.textContent = getTempoName(bpm);
      if (bpmSlider) bpmSlider.value = bpm;

      // Update active highlight on tempo presets
      tempoPresets.forEach(p => {
        const pBpm = parseInt(p.getAttribute('data-tempo-preset'), 10);
        if (pBpm === bpm) {
          p.classList.add('border-[#6C4CE3]', 'text-[#6C4CE3]', 'font-bold');
          p.classList.remove('border-charcoal-700', 'text-gray-300');
        } else {
          p.classList.remove('border-[#6C4CE3]', 'text-[#6C4CE3]', 'font-bold');
          p.classList.add('border-charcoal-700', 'text-gray-300');
        }
      });

      // Adjust physical weight position on pendulum (lower weight = faster tempo)
      if (pendulumWeight) {
        const weightY = 120 - ((bpm - 40) / (220 - 40)) * 80;
        pendulumWeight.style.transform = `translateY(${weightY}px)`;
      }

      // Update CSS pendulum animation speed
      if (pendulum) {
        const periodSec = 60 / bpm;
        pendulum.style.setProperty('--metronome-tempo', `${periodSec}s`);
      }
    };

    const playClickTone = (isFirstBeat) => {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // First beat of measure is a high-accent bell, others are crisp clicks
      osc.frequency.setValueAtTime(isFirstBeat ? 1320 : 880, ctx.currentTime);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (isFirstBeat ? 0.08 : 0.04));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    };

    const tick = () => {
      this.metronomeState.beat = (this.metronomeState.beat % this.metronomeState.timeSignature) + 1;
      const isFirst = this.metronomeState.beat === 1;

      playClickTone(isFirst);

      // Flash beat LED indicators
      beatDots.forEach((dot, index) => {
        if (index === this.metronomeState.beat - 1) {
          dot.classList.add(isFirst ? 'bg-[#FF9F43]' : 'bg-[#6C4CE3]', 'scale-125');
          dot.classList.remove('bg-gray-300', 'dark:bg-charcoal-700');
        } else {
          dot.classList.remove('bg-[#FF9F43]', 'bg-[#6C4CE3]', 'scale-125');
          dot.classList.add('bg-gray-300', 'dark:bg-charcoal-700');
        }
      });
    };

    const startMetronome = () => {
      this.getAudioContext();
      this.metronomeState.isPlaying = true;
      this.metronomeState.beat = 0;

      if (pendulum) {
        pendulum.classList.add('metronome-pendulum-running');
      }
      if (playIcon) playIcon.setAttribute('data-lucide', 'square');
      if (playLabel) playLabel.textContent = 'Halt Metronome';
      if (playBtn) {
        playBtn.classList.remove('bg-[#6C4CE3]');
        playBtn.classList.add('bg-[#FF9F43]', 'text-charcoal-950');
      }
      if (window.lucide) window.lucide.createIcons();

      const intervalMs = (60 / this.metronomeState.bpm) * 1000;
      tick();
      this.metronomeInterval = setInterval(tick, intervalMs);
    };

    const stopMetronome = () => {
      this.metronomeState.isPlaying = false;
      clearInterval(this.metronomeInterval);
      this.metronomeInterval = null;

      if (pendulum) {
        pendulum.classList.remove('metronome-pendulum-running');
      }
      if (playIcon) playIcon.setAttribute('data-lucide', 'play');
      if (playLabel) playLabel.textContent = 'Start Metronome';
      if (playBtn) {
        playBtn.classList.add('bg-[#6C4CE3]');
        playBtn.classList.remove('bg-[#FF9F43]', 'text-charcoal-950');
      }
      beatDots.forEach(dot => {
        dot.classList.remove('bg-[#FF9F43]', 'bg-[#6C4CE3]', 'scale-125');
        dot.classList.add('bg-gray-300', 'dark:bg-charcoal-700');
      });
      if (window.lucide) window.lucide.createIcons();
    };

    playBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.metronomeState.isPlaying) {
        stopMetronome();
      } else {
        startMetronome();
      }
    });

    bpmSlider.addEventListener('input', (e) => {
      const newBpm = parseInt(e.target.value, 10);
      updateTempoDisplay(newBpm);
      if (this.metronomeState.isPlaying) {
        clearInterval(this.metronomeInterval);
        const intervalMs = (60 / newBpm) * 1000;
        this.metronomeInterval = setInterval(tick, intervalMs);
      }
    });

    tempoPresets.forEach(preset => {
      preset.addEventListener('click', () => {
        const targetBpm = parseInt(preset.getAttribute('data-tempo-preset'), 10);
        updateTempoDisplay(targetBpm);
        if (this.metronomeState.isPlaying) {
          clearInterval(this.metronomeInterval);
          this.metronomeInterval = setInterval(tick, (60 / targetBpm) * 1000);
        }
      });
    });

    // Tap Tempo Detector
    if (tapBtn) {
      tapBtn.addEventListener('click', () => {
        const now = Date.now();
        this.metronomeState.tapTimes.push(now);

        // Keep last 4 taps within 3 seconds
        this.metronomeState.tapTimes = this.metronomeState.tapTimes.filter(t => now - t < 3000);

        if (this.metronomeState.tapTimes.length >= 2) {
          const intervals = [];
          for (let i = 1; i < this.metronomeState.tapTimes.length; i++) {
            intervals.push(this.metronomeState.tapTimes[i] - this.metronomeState.tapTimes[i - 1]);
          }
          const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
          const calculatedBpm = Math.min(220, Math.max(40, Math.round(60000 / avgInterval)));
          updateTempoDisplay(calculatedBpm);
          if (this.metronomeState.isPlaying) {
            clearInterval(this.metronomeInterval);
            this.metronomeInterval = setInterval(tick, (60 / calculatedBpm) * 1000);
          }
        }

        tapBtn.classList.add('scale-90');
        setTimeout(() => tapBtn.classList.remove('scale-90'), 100);
      });
    }

    // Initialize Default Tempo
    updateTempoDisplay(108);
  }

  // 2. TRINITY & ABRSM GRADED BENCHMARK TABS
  initGradedSyllabusTabs() {
    const tabBtns = document.querySelectorAll('[data-grade-tab]');
    const tabPanels = document.querySelectorAll('[data-grade-panel]');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-grade-tab');

        tabBtns.forEach(b => {
          const isActive = b.getAttribute('data-grade-tab') === target;
          if (isActive) {
            b.classList.add('bg-[#6C4CE3]', 'text-white', 'shadow-md');
            b.classList.remove('text-gray-600', 'dark:text-gray-300');
          } else {
            b.classList.remove('bg-[#6C4CE3]', 'text-white', 'shadow-md');
            b.classList.add('text-gray-600', 'dark:text-gray-300');
          }
        });

        tabPanels.forEach(panel => {
          panel.classList.toggle('hidden', panel.getAttribute('data-grade-panel') !== target);
        });
      });
    });
  }

  // 4. ACOUSTIC SOUNDPROOF POD SELECTOR
  initSoundproofPodSelector() {
    const podBtns = document.querySelectorAll('[data-conservatory-pod]');
    const podImg = document.getElementById('pod-feature-img');
    const podName = document.getElementById('pod-feature-name');
    const podDb = document.getElementById('pod-feature-db');
    const podAcoustic = document.getElementById('pod-feature-acoustic');
    const podGear = document.getElementById('pod-feature-gear');

    const POD_DATA = {
      piano: {
        name: 'The Steinway Concert Chamber (Studio 1A)',
        image: 'assets/images/conservatory-piano.jpg',
        db: '-42 dB Sound Isolation',
        acoustic: 'Diffusion cloud ceiling tuned for 1.4s natural reverb',
        gear: 'Steinway Model D Concert Grand (88-Keys, Hamburg Spec)'
      },
      guitar: {
        name: 'The Vintage Archtop Lounge (Studio 2A)',
        image: 'assets/images/conservatory-guitar.jpg',
        db: '-38 dB Sound Isolation',
        acoustic: 'Bass traps tuned to 60-120 Hz resonance control',
        gear: 'Heritage Custom Archtop, Fender 65 Deluxe Tube Reverb'
      },
      drums: {
        name: 'The Bonham Percussion Vault (Studio 3A)',
        image: 'assets/images/conservatory-drums.jpg',
        db: '-48 dB Multi-Leaf Isolation Cage',
        acoustic: 'Floating floor with neoprene decouplers',
        gear: 'Dark Walnut Exotic Shells, Zildjian K-Custom Cymbals'
      },
      violin: {
        name: 'The Stradivari Strings Atelier (Studio 4A)',
        image: 'assets/images/conservatory-violin.jpg',
        db: '-36 dB High-Frequency Damping',
        acoustic: 'Solid cedar acoustic panels for violin timbre purity',
        gear: 'German Pernambuco Bows, Pirastro Evah Pirazzi Strings'
      }
    };

    if (!podBtns.length) return;

    podBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-conservatory-pod');
        const data = POD_DATA[key];
        if (!data) return;

        podBtns.forEach(b => {
          const isActive = b.getAttribute('data-conservatory-pod') === key;
          b.classList.toggle('border-[#FF9F43]', isActive);
          b.classList.toggle('bg-[#FF9F43]/10', isActive);
          b.classList.toggle('border-gray-200', !isActive);
          b.classList.toggle('dark:border-charcoal-700', !isActive);
        });

        if (podImg) {
          podImg.classList.add('opacity-40');
          setTimeout(() => {
            podImg.src = data.image;
            podImg.classList.remove('opacity-40');
          }, 120);
        }
        if (podName) podName.textContent = data.name;
        if (podDb) podDb.textContent = data.db;
        if (podAcoustic) podAcoustic.textContent = data.acoustic;
        if (podGear) podGear.textContent = data.gear;
      });
    });
  }
}

// Auto Boot Home 2 Engine
document.addEventListener('DOMContentLoaded', () => {
  window.HarmonyHome2 = new HarmonyHome2Engine();
});

