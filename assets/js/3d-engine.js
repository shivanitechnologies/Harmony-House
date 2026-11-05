/**
 * Harmony House 3D Music Academy - Interactive 3D UI & Audio-Visual Engine
 * Strict Two-Color Scheme: Deep Purple (#6C4CE3) & Warm Orange (#FF9F43)
 * Pure lightweight vanilla JS (Zero external dependencies)
 */

class Harmony3DEngine {
  constructor() {
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.init();
  }

  init() {
    this.initMouseTracker();
    this.initCardTilt();
    this.init3DSoundwaveCanvas();
    this.init3DParallaxHero();
    this.initVinylControls();
    this.init2027HoloStage();
  }

  // Interactive 3D Vinyl Player Controls
  initVinylControls() {
    const vinylTriggers = document.querySelectorAll('[data-action="toggle-vinyl"], .vinyl-disc-3d');
    vinylTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const disc = document.querySelector('.vinyl-disc-3d');
        const arm = document.querySelector('.turntable-arm-3d');
        const statusText = document.getElementById('vinyl-status-text');
        if (!disc) return;

        const isPlaying = disc.classList.toggle('playing');
        if (arm) arm.classList.toggle('playing', isPlaying);

        if (statusText) {
          statusText.textContent = isPlaying ? 'Now Spinning: Trinity Classical Etude' : 'Turntable Paused';
        }

        // Synthesize acoustic tone when vinyl spins
        if (isPlaying && window.HarmonyAudio) {
          window.HarmonyAudio.playGuitarStrum();
          setTimeout(() => {
            if (disc.classList.contains('playing')) {
              window.HarmonyAudio.playPianoChord();
            }
          }, 1200);
        }
      });
    });
  }

  initMouseTracker() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    });
  }

  // Interactive 3D Card Tilt on hover
  initCardTilt() {
    const tiltCards = document.querySelectorAll('[data-tilt], .card-3d, .music-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    });
  }

  // 3D Parallax Depth for Hero Showcase
  init3DParallaxHero() {
    const heroShowcase = document.getElementById('hero-3d-showcase');
    if (!heroShowcase) return;

    const layers = heroShowcase.querySelectorAll('[data-depth]');
    
    const animate = () => {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

      layers.forEach(layer => {
        const depth = parseFloat(layer.getAttribute('data-depth') || '20');
        const moveX = this.mouse.x * depth;
        const moveY = this.mouse.y * depth;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, ${depth * 1.5}px)`;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  // Real-time 3D Projected Audio Particle Wave
  init3DSoundwaveCanvas() {
    const canvas = document.getElementById('hero-3d-soundwave-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.offsetWidth || 800);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 300);

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || 800;
      height = canvas.height = canvas.parentElement.offsetHeight || 300;
    });

    const rows = 14;
    const cols = 28;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.035;

      const fov = 350;
      const cameraY = -60;
      const cameraZ = -180;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        let firstPoint = true;

        for (let c = 0; c < cols; c++) {
          // 3D Grid coordinates
          const x3d = (c - cols / 2) * 28;
          const z3d = r * 30 + 120;
          
          // Audio frequency mathematical simulation (sine waves in 3D space)
          const distFromCenter = Math.sqrt(x3d * x3d + (z3d - 250) * (z3d - 250));
          const wave = Math.sin(distFromCenter * 0.04 - step) * Math.cos(x3d * 0.02 + step * 0.5);
          const y3d = wave * 28;

          // 3D to 2D Perspective Projection
          const scale = fov / (fov + z3d - cameraZ);
          const x2d = width / 2 + x3d * scale;
          const y2d = height / 2 + (y3d - cameraY) * scale;

          if (firstPoint) {
            ctx.moveTo(x2d, y2d);
            firstPoint = false;
          } else {
            ctx.lineTo(x2d, y2d);
          }

          // Draw Glowing 3D Particle Nodes (Alternating Purple & Warm Orange)
          if (c % 2 === 0) {
            const isOrange = (r + c) % 4 === 0;
            ctx.fillStyle = isOrange ? '#FF9F43' : '#6C4CE3';
            ctx.shadowColor = isOrange ? 'rgba(255, 159, 67, 0.6)' : 'rgba(108, 76, 227, 0.6)';
            ctx.shadowBlur = 6 * scale;

            ctx.beginPath();
            ctx.arc(x2d, y2d, Math.max(1, 2.5 * scale), 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        // Connecting lattice wireframe in subtle brand opacity
        ctx.strokeStyle = r % 2 === 0 ? 'rgba(108, 76, 227, 0.18)' : 'rgba(255, 159, 67, 0.14)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      requestAnimationFrame(render);
    };

    render();
  }

  // 2027 Holographic 3D Interactive Stage for Guitar, Drums, Violin & Keyboard
  init2027HoloStage() {
    const stage = document.getElementById('holo-instrument-stage');
    const instrumentImg = document.getElementById('holo-3d-instrument-img');
    const sessionStatus = document.getElementById('holo-session-status');
    const studioBadge = document.getElementById('holo-studio-badge');
    const instrumentTitle = document.getElementById('holo-instrument-title');
    const frequencyBadge = document.getElementById('holo-freq-badge');
    const rippleContainer = document.getElementById('holo-ripple-container');
    const particleContainer = document.getElementById('holo-particle-container');

    const INSTRUMENTS = {
      guitar: {
        title: "Acoustic & Electric Guitar",
        studio: "Studio 1A • Trinity Acoustic Suite",
        status: "Live Guitar Session",
        freq: "196 Hz G3 Peak Resonance",
        image: "assets/images/guitar-3d.jpg",
        scale: "scale-100",
        notes: ["♪", "♫", "♩", "♬"]
      },
      drums: {
        title: "Rhythm & Acoustic Drumkit",
        studio: "Studio 3A • Soundproof Percussion Vault",
        status: "Live Drum Session",
        freq: "60 Hz Sub Kick • 2.4 kHz Snare",
        image: "assets/images/drums-3d.jpg",
        scale: "scale-100",
        notes: ["🥁", "💥", "♫", "♩"]
      },
      violin: {
        title: "Classical & Concert Violin",
        studio: "Studio 4C • Chamber Rehearsal Room",
        status: "Live Violin Masterclass",
        freq: "440 Hz A4 Concert Pitch",
        image: "assets/images/violin-3d.jpg",
        scale: "scale-100",
        notes: ["𝄞", "♪", "♫", "♬"]
      },
      keyboard: {
        title: "Yamaha Grand Piano & Keys",
        studio: "Studio 2B • Concert Hall Acoustic",
        status: "Live Piano Session",
        freq: "88-Key Hammer Weighted Action",
        image: "assets/images/piano-3d.jpg",
        scale: "scale-100",
        notes: ["🎹", "♪", "♫", "♭"]
      }
    };

    const spawnParticles = (instrumentKey) => {
      if (!particleContainer) return;
      particleContainer.innerHTML = '';
      const notes = INSTRUMENTS[instrumentKey]?.notes || ["♪", "♫"];
      for (let i = 0; i < 6; i++) {
        const span = document.createElement('span');
        span.className = 'note-particle text-[#FF9F43] dark:text-[#FFAE5C] text-lg select-none';
        span.textContent = notes[i % notes.length];
        span.style.left = `${15 + Math.random() * 70}%`;
        span.style.bottom = `${20 + Math.random() * 40}%`;
        span.style.animationDelay = `${Math.random() * 1.5}s`;
        particleContainer.appendChild(span);
      }
    };

    const triggerRipple = () => {
      if (!rippleContainer) return;
      rippleContainer.innerHTML = `
        <div class="resonance-ring w-48 h-48 border-2 border-[#FF9F43]/60 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div class="resonance-ring w-48 h-48 border-2 border-[#6C4CE3]/60 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div class="resonance-ring w-48 h-48 border border-[#FF9F43]/40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      `;
    };

    const setInstrument = (key) => {
      const data = INSTRUMENTS[key];
      if (!data) return;

      if (instrumentImg) {
        instrumentImg.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
          instrumentImg.src = data.image;
          instrumentImg.className = `w-full h-full object-cover rounded-2xl filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ${data.scale}`;
          instrumentImg.classList.remove('opacity-0', 'scale-95');
        }, 150);
      }

      if (sessionStatus) sessionStatus.textContent = data.status;
      if (studioBadge) studioBadge.textContent = data.studio;
      if (instrumentTitle) instrumentTitle.textContent = data.title;
      if (frequencyBadge) frequencyBadge.textContent = data.freq;

      spawnParticles(key);
      triggerRipple();

      // Trigger Web Audio tone
      if (window.HarmonyAudio) {
        if (key === 'guitar') window.HarmonyAudio.playGuitarStrum();
        else if (key === 'drums') window.HarmonyAudio.playDrumGroove();
        else if (key === 'violin') window.HarmonyAudio.playViolinSwell();
        else if (key === 'keyboard') window.HarmonyAudio.playPianoChord();
      }

      // Update button highlights
      document.querySelectorAll('[data-holo-inst]').forEach(btn => {
        const isCurrent = btn.getAttribute('data-holo-inst') === key;
        btn.classList.toggle('bg-[#6C4CE3]', isCurrent);
        btn.classList.toggle('text-white', isCurrent);
        btn.classList.toggle('font-bold', isCurrent);
        btn.classList.toggle('shadow-lg', isCurrent);
        btn.classList.toggle('bg-white/10', !isCurrent);
        btn.classList.toggle('text-gray-300', !isCurrent);
      });
    };

    document.querySelectorAll('[data-holo-inst]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.getAttribute('data-holo-inst');
        setInstrument(key);
      });
    });

    // Tap directly on 3D instrument to play audio & trigger ripples
    if (stage) {
      stage.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        const activeBtn = document.querySelector('[data-holo-inst].bg-\\[\\#6C4CE3\\]');
        const currentKey = activeBtn ? activeBtn.getAttribute('data-holo-inst') : 'guitar';
        triggerRipple();
        if (window.HarmonyAudio) {
          if (currentKey === 'guitar') window.HarmonyAudio.playGuitarStrum();
          else if (currentKey === 'drums') window.HarmonyAudio.playDrumGroove();
          else if (currentKey === 'violin') window.HarmonyAudio.playViolinSwell();
          else if (currentKey === 'keyboard') window.HarmonyAudio.playPianoChord();
        }
      });
    }

    // Default load Guitar
    spawnParticles('guitar');
    triggerRipple();
  }
}

// Auto Initialize 3D Engine on load
document.addEventListener('DOMContentLoaded', () => {
  window.Harmony3D = new Harmony3DEngine();
});
