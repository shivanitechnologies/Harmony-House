/**
 * Harmony House Music Academy - Core UI, Interactive Features & Audio Engine Integration
 */

// Initialize Tailwind CSS Configuration dynamically if tailwind object exists
if (window.tailwind) {
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // Strict Two-Color Brand Identity:
          // Primary: Deep Purple (#6C4CE3)
          // Secondary: Warm Orange (#FF9F43)
          brandpurple: {
            50: '#F5F3FF',
            100: '#EDE9FE',
            200: '#DDD6FE',
            300: '#C4B5FD',
            400: '#987AF0',
            500: '#6C4CE3', // Primary Brand Deep Purple
            600: '#5A38D4',
            700: '#4B29B8',
            800: '#3D2094',
            900: '#2E1771',
            950: '#1A0B45',
          },
          brandorange: {
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            400: '#FB923C',
            500: '#FF9F43', // Secondary Brand Warm Orange
            600: '#F58022',
            700: '#D6620E',
            800: '#AA4A0A',
            900: '#7C3408',
          },
          // Backward-compatible alias mappings to strict two colors
          coral: {
            50: '#F5F3FF',
            100: '#EDE9FE',
            200: '#DDD6FE',
            300: '#C4B5FD',
            400: '#987AF0',
            500: '#6C4CE3', // Maps directly to Deep Purple!
            600: '#5A38D4',
            700: '#4B29B8',
            800: '#3D2094',
            900: '#2E1771',
          },
          sage: {
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            400: '#FB923C',
            500: '#FF9F43', // Maps directly to Warm Orange!
            600: '#F58022',
            700: '#D6620E',
            800: '#AA4A0A',
            900: '#7C3408',
          },
          amberbrand: {
            400: '#FDBA74',
            500: '#FF9F43', // Maps directly to Warm Orange!
            600: '#F58022',
          },
          charcoal: {
            700: '#22242B',
            750: '#1B1C22',
            800: '#16171B',
            850: '#111215',
            900: '#0C0D0F',
            950: '#08080A',
          }
        },
        fontFamily: {
          serif: ['"Playfair Display"', 'Georgia', 'serif'],
          sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        }
      }
    }
  };
}

// State Management: Theme & Direction & Interactive Elements
const HarmonyApp = {
  init() {
    this.initTheme();
    this.initDirection();
    this.initGlobalModals();
    this.initLucide();
    this.initMobileNav();
    this.initModals();
    this.initFacultyFilters();
    this.initFeeCycleToggle();
    this.initBlogSearch();
    this.initBlogCommentForm();
    this.initQuickSearch();
    this.initAccordions();
    this.initContactForms();
    this.initPremiumSelect();
    this.initSoundboard();
    this.initPlayablePiano();
    this.initInstrumentTestLab();
    this.initMusicalMatcher();
    this.initPracticeMetronome();
    this.initRecitalCards();
  },

  initTheme() {
    const savedTheme = localStorage.getItem('harmony_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
    });
  },

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('harmony_theme', isDark ? 'dark' : 'light');
    this.initLucide();
  },

  initDirection() {
    const savedDir = localStorage.getItem('harmony_dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);

    document.querySelectorAll('[data-action="toggle-rtl"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleDirection();
      });
    });
  },

  toggleDirection() {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = current === 'ltr' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('harmony_dir', newDir);
  },

  initLucide() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-drawer');
    const closeBtn = document.getElementById('mobile-menu-close');
    const backdrop = document.getElementById('mobile-menu-backdrop');

    if (!mobileMenu) return;

    const openMenu = () => {
      mobileMenu.classList.remove('hidden', 'translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      if (backdrop) {
        backdrop.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
        backdrop.classList.add('opacity-100', 'pointer-events-auto');
      }
      document.body.classList.add('overflow-hidden');
    };

    const closeMenu = () => {
      mobileMenu.classList.remove('translate-x-0');
      mobileMenu.classList.add('translate-x-full');
      if (backdrop) {
        backdrop.classList.remove('opacity-100', 'pointer-events-auto');
        backdrop.classList.add('opacity-0', 'pointer-events-none');
      }
      document.body.classList.remove('overflow-hidden');
      setTimeout(() => {
        if (!mobileMenu.classList.contains('translate-x-0')) {
          mobileMenu.classList.add('hidden');
          if (backdrop) backdrop.classList.add('hidden');
        }
      }, 300);
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = mobileMenu.classList.contains('translate-x-0');
        if (isOpen) closeMenu();
        else openMenu();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
      });
    }

    // Auto-close on any link tap inside drawer
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('translate-x-0')) {
        closeMenu();
      }
    });

    // Auto-close on resize if viewport expands to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1280 && mobileMenu.classList.contains('translate-x-0')) {
        closeMenu();
      }
    });
  },

  // Soundboard Trigger & Live Hero Instrument Photo Switcher
  initSoundboard() {
    const HERO_INSTRUMENTS = {
      guitar: {
        image: 'assets/images/guitar-3d.jpg',
        alt: '3D Cinematic Acoustic Dreadnought Guitar',
        badge: 'Studio 1A &bull; Acoustic &amp; Classical',
        title: 'Acoustic &amp; Classical Guitar',
        session: 'Live Guitar Session',
        rating: '4.9 / 5.0'
      },
      piano: {
        image: 'assets/images/piano-3d.jpg',
        alt: '3D Cinematic Concert Grand Piano',
        badge: 'Studio 2B &bull; Grand Keys &amp; Classical',
        title: 'Yamaha Grand Piano Studio',
        session: 'Live Piano Session',
        rating: '5.0 / 5.0'
      },
      drums: {
        image: 'assets/images/drums-3d.jpg',
        alt: '3D Cinematic Stage Acoustic Drumkit',
        badge: 'Studio 3A &bull; Rhythm &amp; Percussion',
        title: 'Acoustic Drumkit Studio',
        session: 'Live Drum Session',
        rating: '4.9 / 5.0'
      },
      violin: {
        image: 'assets/images/violin-3d.jpg',
        alt: '3D Cinematic Stradivarius Concert Violin',
        badge: 'Studio 4C &bull; Chamber &amp; Strings',
        title: 'Violin &amp; String Ensemble',
        session: 'Live Violin Session',
        rating: '4.8 / 5.0'
      }
    };

    // Pre-cache all 4 photos for instantaneous switching
    try {
      Object.values(HERO_INSTRUMENTS).forEach(item => {
        const imgPreload = new Image();
        imgPreload.src = item.image;
      });
    } catch (err) {}

    document.querySelectorAll('[data-sound]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const soundType = btn.getAttribute('data-sound');

        // Dynamic Photo Switcher for Hero Showcase
        const heroImg = document.getElementById('hero-instrument-image');
        const heroBadge = document.getElementById('hero-studio-badge');
        const heroTitle = document.getElementById('hero-instrument-title');
        const heroSession = document.getElementById('hero-session-status');
        const heroRating = document.getElementById('hero-rating-value');
        const isHeroBtn = btn.classList.contains('hero-tone-btn');

        if (HERO_INSTRUMENTS[soundType]) {
          const inst = HERO_INSTRUMENTS[soundType];
          
          if (heroImg) {
            heroImg.classList.add('opacity-30');
            setTimeout(() => {
              heroImg.src = inst.image;
              heroImg.alt = inst.alt;
              heroImg.classList.remove('opacity-30');
            }, 120);
          }
          if (heroBadge) heroBadge.innerHTML = inst.badge;
          if (heroTitle) heroTitle.innerHTML = inst.title;
          if (heroSession) heroSession.textContent = inst.session;
          if (heroRating) heroRating.textContent = inst.rating;

          // Update active button state in hero toneboard
          if (isHeroBtn) {
            document.querySelectorAll('.hero-tone-btn').forEach(b => {
              b.classList.remove('bg-[#6C4CE3]', 'font-bold', 'shadow-md', 'shadow-[#6C4CE3]/30');
              b.classList.add('bg-white/10', 'font-semibold', 'border', 'border-white/10');
            });
            btn.classList.remove('bg-white/10', 'border', 'border-white/10');
            btn.classList.add('bg-[#6C4CE3]', 'font-bold', 'shadow-md', 'shadow-[#6C4CE3]/30');
          }
        }

        // Active visual bounce
        btn.classList.add('scale-95');
        setTimeout(() => btn.classList.remove('scale-95'), 180);

        // Sync 2027 Holo Stage if present
        const holoKey = soundType === 'piano' ? 'keyboard' : soundType;
        const matchingHoloBtn = document.querySelector(`[data-holo-inst="${holoKey}"]`);
        if (matchingHoloBtn && !matchingHoloBtn.classList.contains('bg-[#6C4CE3]')) {
          matchingHoloBtn.click();
        }

        // Sync Live Instrument Bench Tab if present
        const matchingBenchTab = document.querySelector(`[data-bench-tab="${soundType}"]`);
        if (matchingBenchTab && !matchingBenchTab.classList.contains('bg-[#6C4CE3]')) {
          matchingBenchTab.click();
        }

        // Synthesize instrument tone in real time
        if (window.HarmonyAudio) {
          if (soundType === 'guitar') window.HarmonyAudio.playGuitarStrum();
          else if (soundType === 'piano') window.HarmonyAudio.playPianoChord();
          else if (soundType === 'drums') window.HarmonyAudio.playDrumGroove();
          else if (soundType === 'vocals') window.HarmonyAudio.playVocalHarmony();
          else if (soundType === 'violin') window.HarmonyAudio.playViolinSwell();
        }
      });
    });
  },

  // Interactive Playable Mini Piano Keyboard
  initPlayablePiano() {
    document.querySelectorAll('[data-piano-key]').forEach(key => {
      const playKey = () => {
        const freq = parseFloat(key.getAttribute('data-piano-key'));
        if (window.HarmonyAudio && freq) {
          window.HarmonyAudio.playPianoNote(freq, 1.2);
        }
        key.classList.add('active');
        setTimeout(() => key.classList.remove('active'), 150);
      };

      key.addEventListener('mousedown', playKey);
      key.addEventListener('touchstart', (e) => {
        e.preventDefault();
        playKey();
      });
    });
  },

  // 2027 Interactive Virtual Instrument Studio Test Bench
  initInstrumentTestLab() {
    const labContainers = document.querySelectorAll('.studio-workbench-enclosure');
    if (!labContainers.length) return;

    // Attach Oscilloscope Visualizer to canvas if available
    const canvas = document.getElementById('studio-visualizer-canvas');
    if (canvas && window.HarmonyAudio && typeof window.HarmonyAudio.attachVisualizer === 'function') {
      window.HarmonyAudio.attachVisualizer(canvas);
    }

    // Telemetry display elements
    const noteDisplay = document.getElementById('studio-telemetry-note');
    const freqDisplay = document.getElementById('studio-telemetry-freq');
    const statusDisplay = document.getElementById('studio-telemetry-status');
    const trialCtaBtn = document.getElementById('studio-trial-cta-btn');
    const syllabusLink = document.getElementById('studio-syllabus-link');

    let currentInstrument = 'guitar';
    let currentViolinMode = 'arco';

    const setTelemetry = (note, freq, status) => {
      if (noteDisplay) noteDisplay.textContent = note;
      if (freqDisplay) freqDisplay.textContent = freq;
      if (statusDisplay) {
        statusDisplay.innerHTML = `<span class="w-2 h-2 rounded-full bg-[#FF9F43] animate-ping"></span> Live Signal Active`;
        clearTimeout(statusDisplay._timer);
        statusDisplay._timer = setTimeout(() => {
          statusDisplay.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active 440 Hz`;
        }, 1800);
      }
    };

    const updateInstrumentView = (instKey) => {
      currentInstrument = instKey;

      // Update switcher buttons
      document.querySelectorAll('[data-bench-tab]').forEach(tab => {
        const isSelected = tab.getAttribute('data-bench-tab') === instKey;
        const dot = tab.querySelector('.bench-card-dot');
        const status = tab.querySelector('.bench-card-status');
        const badge = tab.querySelector('.bench-card-badge');

        if (isSelected) {
          tab.classList.remove('bg-white/5', 'text-gray-300', 'border-white/10');
          tab.classList.add('bg-[#6C4CE3]', 'text-white', 'border-2', 'border-[#FF9F43]', 'shadow-xl', 'shadow-[#6C4CE3]/40');
          if (dot) {
            dot.className = 'bench-card-dot w-2 h-2 rounded-full bg-[#FF9F43] animate-pulse';
          }
          if (status) {
            status.classList.remove('text-gray-400');
            status.classList.add('text-orange-200');
            const spans = status.querySelectorAll('span');
            if (spans.length >= 2) {
              spans[1].className = 'text-[#FF9F43] font-bold';
              spans[1].textContent = '• Active';
            }
          }
          if (badge) {
            badge.className = 'bench-card-badge px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-white/20 text-white';
          }
        } else {
          tab.classList.add('bg-white/5', 'text-gray-300', 'border', 'border-white/10');
          tab.classList.remove('bg-[#6C4CE3]', 'text-white', 'border-2', 'border-[#FF9F43]', 'shadow-xl', 'shadow-[#6C4CE3]/40');
          if (dot) {
            dot.className = 'bench-card-dot w-2 h-2 rounded-full bg-gray-500';
          }
          if (status) {
            status.classList.remove('text-orange-200');
            status.classList.add('text-gray-400');
            const spans = status.querySelectorAll('span');
            if (spans.length >= 2) {
              spans[1].className = '';
              spans[1].textContent = 'Tap to Play';
            }
          }
          if (badge) {
            badge.className = 'bench-card-badge px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-white/10 text-gray-300';
          }
        }
      });

      // Show/hide boards
      document.querySelectorAll('[data-bench-board]').forEach(board => {
        if (board.getAttribute('data-bench-board') === instKey) {
          board.classList.remove('hidden');
        } else {
          board.classList.add('hidden');
        }
      });

      // Update CTA details
      const titles = {
        guitar: { name: 'Acoustic Guitar', course: 'course-guitar', pitch: 'G3 • 196.0 Hz' },
        piano: { name: 'Grand Piano', course: 'course-piano', pitch: 'C4 • 261.6 Hz' },
        drums: { name: 'Acoustic Drums', course: 'course-drums', pitch: 'Kick • 45.0 Hz' },
        violin: { name: 'Concert Violin', course: 'course-violin', pitch: 'A4 • 440.0 Hz' }
      };

      const meta = titles[instKey] || titles.guitar;
      if (trialCtaBtn) {
        trialCtaBtn.innerHTML = `<span>Book Free 30-Min Trial on ${meta.name}</span> <i data-lucide="arrow-right" class="w-4 h-4 ml-1"></i>`;
      }
      if (syllabusLink) {
        syllabusLink.href = `course-details.html?course=${meta.course}`;
        syllabusLink.innerHTML = `View ${meta.name} Syllabus &amp; Trinity Grade Levels &rarr;`;
      }
      setTelemetry(`${meta.name} Mode`, meta.pitch, 'Active');
      HarmonyApp.initLucide();
    };

    // Tab buttons
    document.querySelectorAll('[data-bench-tab]').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const inst = tab.getAttribute('data-bench-tab');
        updateInstrumentView(inst);
      });
    });

    // 1. Guitar Strings
    const pluckString = (strEl) => {
      const stringNum = parseInt(strEl.getAttribute('data-guitar-string') || '1');
      const freq = parseFloat(strEl.getAttribute('data-freq') || '329.63');
      const noteName = strEl.getAttribute('data-note') || 'E4';
      
      if (window.HarmonyAudio && typeof window.HarmonyAudio.playGuitarPluck === 'function') {
        window.HarmonyAudio.playGuitarPluck(stringNum, freq);
      }
      setTelemetry(`Guitar String ${stringNum} (${noteName})`, `${freq.toFixed(1)} Hz`, 'Plucked');

      const wire = strEl.querySelector('.guitar-string-wire');
      if (wire) {
        wire.classList.add('wire-plucking');
        setTimeout(() => wire.classList.remove('wire-plucking'), 400);
      }
    };

    document.querySelectorAll('[data-guitar-string]').forEach(strEl => {
      strEl.addEventListener('click', () => pluckString(strEl));
      strEl.addEventListener('mouseenter', (e) => {
        if (e.buttons === 1) pluckString(strEl); // strumming on drag
      });
    });

    // Guitar Preset Chords
    document.querySelectorAll('[data-guitar-chord]').forEach(btn => {
      btn.addEventListener('click', () => {
        const chord = btn.getAttribute('data-guitar-chord');
        if (window.HarmonyAudio && typeof window.HarmonyAudio.playGuitarChord === 'function') {
          window.HarmonyAudio.playGuitarChord(chord);
        }
        setTelemetry(`Guitar Chord: ${chord} Major`, 'Multi-String Strum', 'Resonating');
        
        // Animate all string wires in stagger
        document.querySelectorAll('[data-guitar-string]').forEach((s, idx) => {
          setTimeout(() => {
            const wire = s.querySelector('.guitar-string-wire');
            if (wire) {
              wire.classList.add('wire-plucking');
              setTimeout(() => wire.classList.remove('wire-plucking'), 400);
            }
          }, idx * 40);
        });
      });
    });

    // 2. Piano Keys (White & Black)
    const playStudioPianoKey = (keyEl) => {
      const freq = parseFloat(keyEl.getAttribute('data-studio-key') || '440');
      const noteName = keyEl.getAttribute('data-note-name') || 'A4';
      if (window.HarmonyAudio) {
        window.HarmonyAudio.playPianoNote(freq, 1.4);
      }
      setTelemetry(`Piano Note: ${noteName}`, `${freq.toFixed(1)} Hz`, 'Key Pressed');
      keyEl.classList.add('key-active');
      setTimeout(() => keyEl.classList.remove('key-active'), 160);
    };

    document.querySelectorAll('[data-studio-key]').forEach(keyEl => {
      keyEl.addEventListener('mousedown', () => playStudioPianoKey(keyEl));
      keyEl.addEventListener('touchstart', (e) => {
        e.preventDefault();
        playStudioPianoKey(keyEl);
      });
    });

    // Piano Preset Chords
    document.querySelectorAll('[data-piano-chord]').forEach(btn => {
      btn.addEventListener('click', () => {
        const chord = btn.getAttribute('data-piano-chord');
        if (window.HarmonyAudio && typeof window.HarmonyAudio.playPianoChord === 'function') {
          window.HarmonyAudio.playPianoChord(chord);
        }
        setTelemetry(`Piano Chord: ${chord}`, 'Harmonic Triad', 'Sustained');
      });
    });

    // 3. Drums MPC Pads
    const hitDrumPad = (padEl) => {
      const padType = padEl.getAttribute('data-drum-pad') || 'kick';
      const padName = padEl.getAttribute('data-drum-name') || 'Kick';
      if (window.HarmonyAudio && typeof window.HarmonyAudio.playDrumHit === 'function') {
        window.HarmonyAudio.playDrumHit(padType);
      }
      setTelemetry(`Drum: ${padName}`, 'Acoustic Transient', 'Beat Struck');
      padEl.classList.add('pad-struck');
      setTimeout(() => padEl.classList.remove('pad-struck'), 200);
    };

    document.querySelectorAll('[data-drum-pad]').forEach(padEl => {
      padEl.addEventListener('mousedown', () => hitDrumPad(padEl));
      padEl.addEventListener('touchstart', (e) => {
        e.preventDefault();
        hitDrumPad(padEl);
      });
    });

    // Drum Beat Looper Toggle Button
    const drumLoopBtn = document.getElementById('btn-drum-loop-toggle');
    const drumBpmLed = document.getElementById('drum-bpm-led');
    if (drumLoopBtn) {
      drumLoopBtn.addEventListener('click', () => {
        if (!window.HarmonyAudio || typeof window.HarmonyAudio.toggleDrumLoop !== 'function') return;
        const isPlaying = window.HarmonyAudio.toggleDrumLoop('rock', (step) => {
          if (drumBpmLed) {
            drumBpmLed.classList.add('bg-[#FF9F43]', 'scale-125');
            setTimeout(() => drumBpmLed.classList.remove('bg-[#FF9F43]', 'scale-125'), 100);
          }
        });

        if (isPlaying) {
          drumLoopBtn.innerHTML = `<i data-lucide="square" class="w-3.5 h-3.5"></i> <span>Stop Drum Loop</span>`;
          drumLoopBtn.classList.remove('bg-white/10');
          drumLoopBtn.classList.add('bg-red-500', 'text-white', 'animate-pulse');
          setTelemetry('Drum Loop: Rock 4/4', '100 BPM Steady Pocket', 'Looping');
        } else {
          drumLoopBtn.innerHTML = `<i data-lucide="play" class="w-3.5 h-3.5"></i> <span>Jam With 100 BPM Rock Beat</span>`;
          drumLoopBtn.classList.add('bg-white/10');
          drumLoopBtn.classList.remove('bg-red-500', 'text-white', 'animate-pulse');
          setTelemetry('Drum Loop Stopped', 'Standby', 'Ready');
        }
        HarmonyApp.initLucide();
      });
    }

    // 4. Violin Strings & Bow
    const playViolinString = (strEl) => {
      const freq = parseFloat(strEl.getAttribute('data-violin-freq') || '440');
      const note = strEl.getAttribute('data-violin-note') || 'A4';
      if (window.HarmonyAudio && typeof window.HarmonyAudio.playViolinNote === 'function') {
        window.HarmonyAudio.playViolinNote(freq, currentViolinMode);
      }
      setTelemetry(`Violin ${currentViolinMode === 'arco' ? 'Bow' : 'Pizzicato'}: ${note}`, `${freq.toFixed(1)} Hz`, 'Vibrato Core');
      strEl.classList.add('border-[#FF9F43]', 'bg-white/10');
      setTimeout(() => strEl.classList.remove('border-[#FF9F43]', 'bg-white/10'), 250);
    };

    document.querySelectorAll('[data-violin-freq]').forEach(strEl => {
      strEl.addEventListener('click', () => playViolinString(strEl));
    });

    // Violin Mode Switcher (Arco vs Pizzicato)
    document.querySelectorAll('[data-violin-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentViolinMode = btn.getAttribute('data-violin-mode');
        document.querySelectorAll('[data-violin-mode]').forEach(b => {
          if (b === btn) {
            b.classList.add('bg-[#FF9F43]', 'text-charcoal-950', 'font-bold');
            b.classList.remove('bg-white/10', 'text-white');
          } else {
            b.classList.remove('bg-[#FF9F43]', 'text-charcoal-950', 'font-bold');
            b.classList.add('bg-white/10', 'text-white');
          }
        });
        setTelemetry(`Violin Mode Changed`, currentViolinMode === 'arco' ? 'Arco (Bowed with Vibrato)' : 'Pizzicato (Acoustic Pluck)', 'Configured');
      });
    });

    // Violin Bow Drag Track
    const bowTrack = document.getElementById('violin-bow-simulator');
    if (bowTrack) {
      let lastBowTime = 0;
      const triggerBow = () => {
        const now = Date.now();
        if (now - lastBowTime > 300) {
          lastBowTime = now;
          if (window.HarmonyAudio && typeof window.HarmonyAudio.playViolinBowStroke === 'function') {
            window.HarmonyAudio.playViolinBowStroke();
          }
          setTelemetry('Violin Bow Stroke', '440.0 Hz A4 Swell', 'Bowing');
        }
      };
      bowTrack.addEventListener('mousemove', triggerBow);
      bowTrack.addEventListener('touchmove', triggerBow);
    }

    // Global Computer Keyboard Shortcuts for the Test Bench
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      const key = e.key.toUpperCase();

      if (currentInstrument === 'guitar') {
        if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
          const stringEl = document.querySelector(`[data-guitar-string="${e.key}"]`);
          if (stringEl) pluckString(stringEl);
        }
      } else if (currentInstrument === 'piano') {
        const keyMap = {
          'A': 261.63,
          'W': 277.18,
          'S': 293.66,
          'E': 311.13,
          'D': 329.63,
          'F': 349.23,
          'T': 369.99,
          'G': 392.00,
          'Y': 415.30,
          'H': 440.00,
          'U': 466.16,
          'J': 493.88,
          'K': 523.25
        };
        if (keyMap[key]) {
          const targetKeyEl = document.querySelector(`[data-studio-key="${keyMap[key]}"]`);
          if (targetKeyEl) playStudioPianoKey(targetKeyEl);
          else if (window.HarmonyAudio) window.HarmonyAudio.playPianoNote(keyMap[key]);
        }
      } else if (currentInstrument === 'drums') {
        const drumKeyMap = {
          'Q': 'kick',
          'W': 'snare',
          'E': 'hihat-closed',
          'R': 'hihat-open',
          'A': 'crash',
          'S': 'tom'
        };
        if (drumKeyMap[key]) {
          const padEl = document.querySelector(`[data-drum-pad="${drumKeyMap[key]}"]`);
          if (padEl) hitDrumPad(padEl);
        }
      } else if (currentInstrument === 'violin') {
        const violinKeyMap = {
          '1': 196.0,
          '2': 293.66,
          '3': 440.0,
          '4': 659.25
        };
        if (violinKeyMap[e.key]) {
          const strEl = document.querySelector(`[data-violin-freq="${violinKeyMap[e.key]}"]`);
          if (strEl) playViolinString(strEl);
        }
      }
    });

    // Trial CTA Button handler (Auto pre-select instrument in modal)
    if (trialCtaBtn) {
      trialCtaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const trialModal = document.getElementById('trial-modal');
        if (trialModal) {
          const select = trialModal.querySelector('#trial-instrument-select') || trialModal.querySelector('select[name="instrument"]') || trialModal.querySelector('select');
          if (select) {
            select.value = currentInstrument;
          }
          trialModal.classList.remove('hidden');
          const nameInput = trialModal.querySelector('input[type="text"]');
          if (nameInput) setTimeout(() => nameInput.focus(), 100);
        }
      });
    }
  },

  // Musical Matcher Quiz logic
  initMusicalMatcher() {
    const quizForm = document.getElementById('musical-matcher-form');
    const resultBox = document.getElementById('musical-matcher-result');
    if (!quizForm || !resultBox) return;

    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const age = quizForm.elements['quiz-age'] ? quizForm.elements['quiz-age'].value : 'adult';
      const vibe = quizForm.elements['quiz-vibe'] ? quizForm.elements['quiz-vibe'].value : 'pop';

      let recommendation = {
        title: "Acoustic & Electric Guitar Mastery",
        desc: "Build chords, rhythm strumming, and fingerstyle solos. Flexible evening and weekend jam sessions.",
        badge: "Most Popular Match",
        icon: "guitar",
        link: "course-details.html?course=course-guitar"
      };

      if (age === 'kid' && vibe === 'classical') {
        recommendation = {
          title: "Junior Piano Prodigy (Ages 5-11)",
          desc: "Suzuki ear training, gentle keyboard coordination, and playful melody games on grand pianos.",
          badge: "Top Choice for Children",
          icon: "music-2",
          link: "course-details.html?course=course-piano"
        };
      } else if (vibe === 'vocals') {
        recommendation = {
          title: "Contemporary & Western Vocals",
          desc: "Diaphragmatic breath control, vocal resonance, pitch correction, and stage confidence.",
          badge: "Voice & Songwriting",
          icon: "mic",
          link: "course-details.html?course=course-vocals"
        };
      } else if (vibe === 'rhythm') {
        recommendation = {
          title: "Rhythm & Percussion Drums Academy",
          desc: "Four-way limb independence, dynamic groove pockets, and rock rudiments on acoustic kits.",
          badge: "Energy & Timing",
          icon: "disc",
          link: "course-details.html?course=course-drums"
        };
      }

      resultBox.innerHTML = `
        <div class="p-5 rounded-2xl bg-purple-50 dark:bg-charcoal-750 border-2 border-[#6C4CE3]/40 animate-fadeIn space-y-3">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#6C4CE3] text-white">
              ${recommendation.badge}
            </span>
            <span class="text-xs font-semibold text-[#FF9F43]">Perfect Fit!</span>
          </div>
          <h4 class="font-serif text-xl font-bold text-gray-900 dark:text-white">${recommendation.title}</h4>
          <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">${recommendation.desc}</p>
          <div class="flex items-center gap-3 pt-2">
            <a href="${recommendation.link}" class="btn-3d-purple px-4 py-2 rounded-xl font-bold text-xs">
              View Syllabus &amp; Batches &rarr;
            </a>
            <button data-modal-target="trial-modal" class="px-3.5 py-2 rounded-xl border border-[#6C4CE3] text-[#6C4CE3] dark:text-[#987AF0] font-semibold text-xs hover:bg-purple-50 dark:hover:bg-charcoal-700 transition">
              Book Free Trial
            </button>
          </div>
        </div>
      `;
      resultBox.classList.remove('hidden');
      this.initLucide();
      HarmonyApp.showToast('Musical match found! Check your recommended course.', 'success');
    });
  },

  // Ensures Quick Search & Trial Modals are globally available on every page
  initGlobalModals() {
    const isPublicPage = !window.location.pathname.includes('/student/') && 
                         !window.location.pathname.includes('/admin/') && 
                         !window.location.pathname.includes('/auth/');
    if (!isPublicPage) return;

    // 1. Inject Quick Search Modal if missing
    if (!document.getElementById('quick-search-modal')) {
      const searchModal = document.createElement('div');
      searchModal.id = 'quick-search-modal';
      searchModal.className = 'harmony-modal fixed inset-0 z-50 hidden flex items-start justify-center p-4 pt-16 sm:pt-24';
      searchModal.innerHTML = `
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" data-modal-close></div>
        <div class="relative bg-white dark:bg-charcoal-850 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 dark:border-charcoal-700 z-10 animate-fadeIn">
          <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-charcoal-700">
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6C4CE3] dark:text-[#987AF0]">
              <i data-lucide="search" class="w-4 h-4"></i>
              <span>Quick Academy Finder</span>
            </div>
            <button data-modal-close class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>
          <div class="mt-4 space-y-4">
            <div class="relative">
              <i data-lucide="search" class="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"></i>
              <input type="text" id="modal-search-input" placeholder="Type course, instrument, genre, or mentor name..." class="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-sm focus:outline-none focus:border-[#6C4CE3]">
            </div>
            <div class="space-y-1.5 text-xs max-h-72 overflow-y-auto" id="modal-search-results"></div>
            <div class="text-[11px] text-gray-400 flex items-center justify-between pt-2 border-t border-gray-100 dark:border-charcoal-750">
              <span>Press <kbd class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-charcoal-700 font-mono text-[10px]">ESC</kbd> to exit &bull; <kbd class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-charcoal-700 font-mono text-[10px]">Ctrl+K</kbd> to search</span>
              <a href="courses.html" class="text-[#6C4CE3] dark:text-[#987AF0] hover:underline">Full Course Directory &rarr;</a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(searchModal);
    }

    // 2. Inject Free Trial Modal if missing
    if (!document.getElementById('trial-modal')) {
      const trialModal = document.createElement('div');
      trialModal.id = 'trial-modal';
      trialModal.className = 'harmony-modal fixed inset-0 z-50 hidden flex items-center justify-center p-4';
      trialModal.innerHTML = `
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" data-modal-close></div>
        <div class="relative bg-white dark:bg-charcoal-850 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-charcoal-700 z-10 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-charcoal-700">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-[#FF9F43]">Complimentary Session</span>
              <h3 class="font-serif text-2xl font-bold text-gray-900 dark:text-white">Book Your Free Trial</h3>
            </div>
            <button data-modal-close class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>
          <form data-ajax-form data-success-msg="Trial booked! Our music coordinator will contact you shortly." class="space-y-4 mt-6">
            <div>
              <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Student Full Name *</label>
              <input type="text" required placeholder="e.g. Maya Iyer" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-charcoal-700 bg-gray-50 dark:bg-charcoal-800 text-sm focus:outline-none focus:border-[#6C4CE3]">
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                <input type="email" required placeholder="maya@example.com" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-charcoal-700 bg-gray-50 dark:bg-charcoal-800 text-sm focus:outline-none focus:border-[#6C4CE3]">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Phone / WhatsApp *</label>
                <input type="tel" required placeholder="+91 98765 43210" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-charcoal-700 bg-gray-50 dark:bg-charcoal-800 text-sm focus:outline-none focus:border-[#6C4CE3]">
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Instrument *</label>
                <select id="trial-instrument-select" name="instrument" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-charcoal-700 bg-gray-50 dark:bg-charcoal-800 text-sm focus:outline-none focus:border-[#6C4CE3]">
                  <option value="guitar">Acoustic &amp; Electric Guitar</option>
                  <option value="piano">Piano &amp; Keyboard</option>
                  <option value="vocals">Singing &amp; Vocals</option>
                  <option value="drums">Drums &amp; Percussion</option>
                  <option value="violin">Violin &amp; String Ensemble</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Age Category *</label>
                <select required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-charcoal-700 bg-gray-50 dark:bg-charcoal-800 text-sm focus:outline-none focus:border-[#6C4CE3]">
                  <option value="kid">Kid (5-11 yrs)</option>
                  <option value="teen">Teen (12-17 yrs)</option>
                  <option value="adult" selected>Adult (18+ yrs)</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn-3d-purple w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition mt-2">
              Confirm Free Trial Reservation
            </button>
          </form>
        </div>
      `;
      document.body.appendChild(trialModal);
    }
  },

  initModals() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal-target]');
      if (trigger) {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-modal-target');
        this.openModal(targetId);
        return;
      }

      const closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) {
        e.preventDefault();
        const modal = closeBtn.closest('.harmony-modal');
        if (modal) {
          modal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
      }
    });
  },

  initQuickSearch() {
    // Keyboard shortcut Ctrl/Cmd + K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchModal = document.getElementById('quick-search-modal');
        if (searchModal && searchModal.classList.contains('hidden')) {
          this.openModal('quick-search-modal');
          const input = document.getElementById('modal-search-input');
          if (input) setTimeout(() => input.focus(), 100);
        } else if (searchModal) {
          this.closeModal('quick-search-modal');
        }
      }
      if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.harmony-modal:not(.hidden)');
        modals.forEach(m => m.classList.add('hidden'));
        document.body.classList.remove('overflow-hidden');
      }
    });

    const searchInput = document.getElementById('modal-search-input');
    const resultsContainer = document.getElementById('modal-search-results');
    if (!searchInput || !resultsContainer) return;

    const renderDefault = () => {
      if (!window.HarmonyData || !window.HarmonyData.courses) return;
      resultsContainer.innerHTML = window.HarmonyData.courses.slice(0, 4).map(c => `
        <a href="course-details.html?course=${c.id}" class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-charcoal-750 transition group">
          <div class="flex items-center gap-3">
            <span class="text-xl">${c.icon}</span>
            <div>
              <span class="font-bold text-gray-900 dark:text-white group-hover:text-[#6C4CE3] transition">${c.title}</span>
              <span class="block text-[11px] text-gray-500 dark:text-gray-400">${c.category} &bull; ${c.ageGroup}</span>
            </div>
          </div>
          <span class="text-[#6C4CE3] dark:text-[#987AF0] font-semibold text-xs">${c.feeMonthly} &rarr;</span>
        </a>
      `).join('');
    };

    renderDefault();

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!window.HarmonyData || !window.HarmonyData.courses) return;

      if (!q) {
        renderDefault();
        return;
      }

      const matchedCourses = window.HarmonyData.courses.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.category.toLowerCase().includes(q) || 
        c.shortDesc.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
      );

      const matchedInstructors = window.HarmonyData.instructors ? window.HarmonyData.instructors.filter(i => 
        i.name.toLowerCase().includes(q) ||
        i.specialization.toLowerCase().includes(q) ||
        i.instruments.some(inst => inst.toLowerCase().includes(q))
      ) : [];

      let html = '';
      if (matchedCourses.length === 0 && matchedInstructors.length === 0) {
        html = `<div class="p-6 text-center text-xs text-gray-500">No matching courses or faculty found for "${q}". Try "Guitar", "Piano", or "Vocals".</div>`;
      } else {
        matchedCourses.forEach(c => {
          html += `
            <a href="course-details.html?course=${c.id}" class="flex items-center justify-between p-3 rounded-xl hover:bg-purple-50/50 dark:hover:bg-charcoal-750 transition group">
              <div class="flex items-center gap-3">
                <span class="text-xl">${c.icon}</span>
                <div>
                  <span class="font-bold text-gray-900 dark:text-white group-hover:text-[#6C4CE3] transition">${c.title}</span>
                  <span class="block text-[11px] text-gray-500 dark:text-gray-400">${c.category} &bull; Mentor: ${c.instructor}</span>
                </div>
              </div>
              <span class="text-[#6C4CE3] dark:text-[#987AF0] font-semibold text-xs">${c.feeMonthly} &rarr;</span>
            </a>
          `;
        });
        matchedInstructors.forEach(inst => {
          html += `
            <a href="instructors.html#${inst.id}" class="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50/50 dark:hover:bg-charcoal-750 transition group border-t border-gray-100 dark:border-charcoal-800">
              <div class="flex items-center gap-3">
                <img src="${inst.avatar}" class="w-8 h-8 rounded-full object-cover">
                <div>
                  <span class="font-bold text-gray-900 dark:text-white group-hover:text-[#FF9F43] transition">${inst.name}</span>
                  <span class="block text-[11px] text-gray-500 dark:text-gray-400">${inst.designation} &bull; ${inst.specialization}</span>
                </div>
              </div>
              <span class="text-[#FF9F43] font-semibold text-xs">Faculty Profile &rarr;</span>
            </a>
          `;
        });
      }
      resultsContainer.innerHTML = html;
    });
  },

  // Interactive Practice Metronome Tool
  initPracticeMetronome() {
    const metronomes = document.querySelectorAll('[data-metronome]');
    metronomes.forEach(m => {
      let bpm = 100;
      let isPlaying = false;
      let timerId = null;
      let currentBeat = 0;
      const bpmSlider = m.querySelector('[data-bpm-slider]');
      const bpmDisplay = m.querySelector('[data-bpm-display]');
      const toggleBtn = m.querySelector('[data-metronome-toggle]');
      const dots = m.querySelectorAll('[data-beat-dot]');

      const updateBpm = (newBpm) => {
        bpm = Math.max(40, Math.min(220, parseInt(newBpm, 10)));
        if (bpmDisplay) bpmDisplay.textContent = bpm;
        if (bpmSlider) bpmSlider.value = bpm;
        if (isPlaying) {
          stop();
          start();
        }
      };

      const tick = () => {
        currentBeat = (currentBeat % 4) + 1;
        const isAccent = currentBeat === 1;
        if (window.HarmonyAudio) {
          window.HarmonyAudio.playMetronomeClick(isAccent);
        }
        dots.forEach((dot, idx) => {
          if (idx + 1 === currentBeat) {
            dot.classList.add('bg-[#6C4CE3]', 'scale-125');
            dot.classList.remove('bg-gray-300', 'dark:bg-charcoal-700');
          } else {
            dot.classList.remove('bg-[#6C4CE3]', 'scale-125');
            dot.classList.add('bg-gray-300', 'dark:bg-charcoal-700');
          }
        });
      };

      const start = () => {
        isPlaying = true;
        currentBeat = 0;
        const interval = (60 / bpm) * 1000;
        tick();
        timerId = setInterval(tick, interval);
        if (toggleBtn) {
          toggleBtn.innerHTML = '<i data-lucide="pause" class="w-4 h-4"></i> Stop Metronome';
          toggleBtn.classList.replace('bg-[#6C4CE3]', 'bg-charcoal-900');
        }
        if (window.lucide) window.lucide.createIcons();
      };

      const stop = () => {
        isPlaying = false;
        clearInterval(timerId);
        timerId = null;
        dots.forEach(d => {
          d.classList.remove('bg-[#6C4CE3]', 'scale-125');
          d.classList.add('bg-gray-300', 'dark:bg-charcoal-700');
        });
        if (toggleBtn) {
          toggleBtn.innerHTML = '<i data-lucide="play" class="w-4 h-4"></i> Start Metronome';
          toggleBtn.classList.replace('bg-charcoal-900', 'bg-[#6C4CE3]');
        }
        if (window.lucide) window.lucide.createIcons();
      };

      if (bpmSlider) {
        bpmSlider.addEventListener('input', (e) => updateBpm(e.target.value));
      }

      if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (isPlaying) stop();
          else start();
        });
      }

      const tapBtn = m.querySelector('[data-metronome-tap]');
      if (tapBtn) {
        let lastTap = 0;
        let tapDiffs = [];
        tapBtn.addEventListener('click', () => {
          const now = Date.now();
          if (lastTap) {
            const diff = now - lastTap;
            if (diff < 2000 && diff > 250) {
              tapDiffs.push(diff);
              if (tapDiffs.length > 4) tapDiffs.shift();
              const avgDiff = tapDiffs.reduce((a, b) => a + b, 0) / tapDiffs.length;
              const calculatedBpm = Math.round(60000 / avgDiff);
              updateBpm(calculatedBpm);
            } else {
              tapDiffs = [];
            }
          }
          lastTap = now;
        });
      }
    });
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      this.initLucide();
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  },

  initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        const icon = header.querySelector('.accordion-icon');
        const isOpen = !body.classList.contains('hidden');

        if (isOpen) {
          body.classList.add('hidden');
          if (icon) icon.classList.remove('rotate-180');
        } else {
          body.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    });
  },

  initContactForms() {
    const forms = document.querySelectorAll('form[data-ajax-form]');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const successMessage = form.getAttribute('data-success-msg') || 'Thank you! Your inquiry has been received. Our music counselor will contact you within 2 hours.';
        HarmonyApp.showToast(successMessage, 'success');
        if (!form.hasAttribute('data-no-reset') && !form.closest('main')?.querySelector('h2')?.textContent?.includes('Profile') && !form.closest('main')?.querySelector('h2')?.textContent?.includes('Settings')) {
          form.reset();
          // Reset premium select if present
          const labelSpan = document.getElementById('premium-select-label');
          const iconSpan = document.getElementById('premium-select-icon');
          if (labelSpan) {
            labelSpan.textContent = 'Select Instrument / Program';
            labelSpan.className = 'text-gray-500 dark:text-gray-400 truncate text-sm';
          }
          if (iconSpan) {
            iconSpan.className = 'w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-[#6C4CE3] dark:text-[#987AF0] flex items-center justify-center text-xs shrink-0';
            iconSpan.innerHTML = '<i data-lucide="music" class="w-3.5 h-3.5"></i>';
            HarmonyApp.initLucide();
          }
          document.querySelectorAll('.premium-option .opt-check').forEach(c => c.classList.add('opacity-0'));
          document.querySelectorAll('.premium-option').forEach(o => o.classList.remove('bg-purple-50/80', 'dark:bg-charcoal-750', 'border-purple-300', 'dark:border-purple-800'));
        }
      });
    });
  },

  initPremiumSelect() {
    const wrap = document.getElementById('premium-course-select-wrap');
    if (!wrap) return;

    const trigger = document.getElementById('premium-select-trigger');
    const menu = document.getElementById('premium-select-menu');
    const hiddenSelect = document.getElementById('contact-course-select');
    const labelSpan = document.getElementById('premium-select-label');
    const iconSpan = document.getElementById('premium-select-icon');
    const chevron = document.getElementById('premium-select-chevron');
    const options = wrap.querySelectorAll('.premium-option');

    const iconMap = {
      guitar: { icon: 'guitar', bg: 'bg-purple-100 dark:bg-purple-950/60 text-[#6C4CE3] dark:text-[#987AF0]' },
      piano: { icon: 'music-2', bg: 'bg-orange-100 dark:bg-orange-950/60 text-[#FF9F43]' },
      vocals: { icon: 'mic-2', bg: 'bg-purple-100 dark:bg-purple-950/60 text-[#6C4CE3] dark:text-[#987AF0]' },
      drums: { icon: 'disc', bg: 'bg-orange-100 dark:bg-orange-950/60 text-[#FF9F43]' },
      violin: { icon: 'sparkles', bg: 'bg-purple-100 dark:bg-purple-950/60 text-[#6C4CE3] dark:text-[#987AF0]' },
      production: { icon: 'sliders', bg: 'bg-orange-100 dark:bg-orange-950/60 text-[#FF9F43]' },
    };

    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : menu.classList.contains('hidden');
      if (isOpen) {
        menu.classList.remove('hidden');
        trigger.setAttribute('aria-expanded', 'true');
        if (chevron) chevron.classList.add('rotate-180');
      } else {
        menu.classList.add('hidden');
        trigger.setAttribute('aria-expanded', 'false');
        if (chevron) chevron.classList.remove('rotate-180');
      }
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    const selectOption = (val) => {
      const opt = Array.from(options).find(o => o.dataset.val === val);
      if (!opt) return;

      const title = opt.querySelector('.font-bold')?.textContent || opt.textContent.trim();
      if (labelSpan) {
        labelSpan.textContent = title;
        labelSpan.classList.remove('text-gray-500', 'dark:text-gray-400');
        labelSpan.classList.add('text-gray-900', 'dark:text-white', 'font-semibold');
      }

      if (iconSpan && iconMap[val]) {
        iconSpan.className = `w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 shadow-xs ${iconMap[val].bg}`;
        iconSpan.innerHTML = `<i data-lucide="${iconMap[val].icon}" class="w-3.5 h-3.5"></i>`;
        this.initLucide();
      }

      // Update checkmark visibility & active pill outline
      options.forEach(o => {
        const check = o.querySelector('.opt-check');
        if (o === opt) {
          o.classList.add('bg-purple-50/80', 'dark:bg-charcoal-750', 'border-purple-300', 'dark:border-purple-800');
          if (check) check.classList.remove('opacity-0');
        } else {
          o.classList.remove('bg-purple-50/80', 'dark:bg-charcoal-750', 'border-purple-300', 'dark:border-purple-800');
          if (check) check.classList.add('opacity-0');
        }
      });

      if (hiddenSelect) {
        hiddenSelect.value = val;
        hiddenSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }

      toggleMenu(false);
    };

    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        selectOption(opt.dataset.val);
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') toggleMenu(false);
    });

    // Support query param auto-selection (e.g. ?course=guitar or ?batch=piano)
    const params = new URLSearchParams(window.location.search);
    const courseParam = params.get('course') || params.get('batch') || params.get('instrument');
    if (courseParam) {
      const match = courseParam.replace('course-', '').split('-')[0].toLowerCase();
      if (iconMap[match]) {
        selectOption(match);
      }
    }
  },

  initRecitalCards() {
    const recitalCards = document.querySelectorAll('.recital-card');
    const modal = document.getElementById('recital-modal');
    if (!recitalCards.length || !modal) return;

    const modalTitle = document.getElementById('recital-modal-title');
    const modalTrack = document.getElementById('recital-modal-track');
    const modalBadge = document.getElementById('recital-modal-badge');
    const modalImg = document.getElementById('recital-modal-img');
    const playToggleBtn = document.getElementById('recital-play-toggle-btn');
    const playIcon = document.getElementById('recital-play-icon');
    const progressBar = document.getElementById('recital-progress-bar');
    const timeDisplay = document.getElementById('recital-modal-time');

    let isPlaying = false;
    let timer = null;
    let currentSec = 45;

    recitalCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.getAttribute('data-recital-title') || 'Student Recital';
        const track = card.getAttribute('data-recital-track') || 'Live Showcase';
        const band = card.getAttribute('data-recital-band') || 'Academy Ensemble';
        const img = card.getAttribute('data-recital-img');
        const sound = card.getAttribute('data-recital-sound') || 'guitar';

        if (modalTitle) modalTitle.textContent = title;
        if (modalTrack) modalTrack.textContent = track;
        if (modalBadge) modalBadge.textContent = band;
        if (modalImg && img) modalImg.src = img;

        isPlaying = false;
        clearInterval(timer);
        if (playIcon) playIcon.setAttribute('data-lucide', 'play');
        if (progressBar) progressBar.style.width = '20%';
        if (timeDisplay) timeDisplay.textContent = '00:00 / 03:20';
        currentSec = 0;

        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        if (window.lucide) window.lucide.createIcons();

        if (window.HarmonyAudio) {
          if (sound === 'guitar') HarmonyAudio.playGuitarStrum();
          else if (sound === 'piano') HarmonyAudio.playPianoChord();
          else if (sound === 'drums') HarmonyAudio.playDrumGroove();
        }
      });
    });

    if (playToggleBtn) {
      playToggleBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
          if (playIcon) playIcon.setAttribute('data-lucide', 'pause');
          if (window.lucide) window.lucide.createIcons();
          if (window.HarmonyAudio) {
            HarmonyAudio.playGuitarStrum();
          }
          timer = setInterval(() => {
            currentSec++;
            const pct = Math.min((currentSec / 200) * 100, 100);
            if (progressBar) progressBar.style.width = pct + '%';
            const m = Math.floor(currentSec / 60);
            const s = currentSec % 60;
            if (timeDisplay) timeDisplay.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} / 03:20`;
            if (currentSec >= 200) {
              clearInterval(timer);
              isPlaying = false;
              if (playIcon) playIcon.setAttribute('data-lucide', 'play');
              if (window.lucide) window.lucide.createIcons();
            }
          }, 1000);
        } else {
          clearInterval(timer);
          if (playIcon) playIcon.setAttribute('data-lucide', 'play');
          if (window.lucide) window.lucide.createIcons();
        }
      });
    }
  },

  // Interactive Faculty Filter Pills & Modal Prefill
  initFacultyFilters() {
    const filterBtns = document.querySelectorAll('.instructor-filter-btn');
    const cards = document.querySelectorAll('.id-card-3d');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = (btn.getAttribute('data-filter') || 'all').toLowerCase();

        // Update active button state
        filterBtns.forEach(b => {
          const isActive = b === btn;
          if (isActive) {
            b.className = 'instructor-filter-btn px-4 py-2 rounded-full text-xs font-bold bg-[#6C4CE3] text-white shadow-md transition cursor-pointer';
          } else {
            b.className = 'instructor-filter-btn px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white border border-white/10 transition cursor-pointer';
          }
        });

        // Filter faculty cards
        let visibleCount = 0;
        cards.forEach(card => {
          const cat = (card.getAttribute('data-category') || '').toLowerCase();
          const matches = filter === 'all' || cat.includes(filter);
          if (matches) {
            card.style.display = '';
            card.classList.remove('hidden');
            visibleCount++;
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Auto pre-select mentor in modal when 'Book Trial' is clicked on any mentor card
    document.querySelectorAll('[data-modal-target="mentor-trial-modal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.id-card-3d');
        if (!card) return;
        const nameEl = card.querySelector('h3');
        const mentorName = nameEl ? nameEl.textContent.trim().toLowerCase() : '';
        const modal = document.getElementById('mentor-trial-modal');
        if (!modal) return;
        const select = modal.querySelector('#mentor-select-dropdown') || modal.querySelector('select');
        if (select) {
          for (let opt of select.options) {
            const optVal = opt.value.toLowerCase();
            const optText = opt.text.toLowerCase();
            if (mentorName.includes(optVal) || optText.includes(mentorName.split(' ')[0])) {
              select.value = opt.value;
              break;
            }
          }
        }
      });
    });
  },

  // Fees Monthly vs Annual Enrolment Toggle
  initFeeCycleToggle() {
    const btnMonthly = document.getElementById('btn-monthly');
    const btnAnnual = document.getElementById('btn-annual');
    const prices = document.querySelectorAll('.fee-price');
    const calcCycle = document.getElementById('calc-cycle');
    if (!btnMonthly || !btnAnnual) return;

    btnMonthly.addEventListener('click', (e) => {
      e.preventDefault();
      btnMonthly.className = 'px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full bg-[#6C4CE3] text-white shadow-lg shadow-[#6C4CE3]/40 transition cursor-pointer font-bold';
      btnAnnual.className = 'px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-purple-200 hover:text-white transition flex items-center gap-1.5 cursor-pointer font-bold';
      prices.forEach(p => {
        const val = p.getAttribute('data-monthly');
        if (val) p.textContent = val;
      });
      if (calcCycle) {
        calcCycle.value = '1';
        calcCycle.dispatchEvent(new Event('change'));
      }
    });

    btnAnnual.addEventListener('click', (e) => {
      e.preventDefault();
      btnAnnual.className = 'px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full bg-[#6C4CE3] text-white shadow-lg shadow-[#6C4CE3]/40 transition flex items-center gap-1.5 cursor-pointer font-bold';
      btnMonthly.className = 'px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-purple-200 hover:text-white transition cursor-pointer font-bold';
      prices.forEach(p => {
        const val = p.getAttribute('data-annual');
        if (val) p.textContent = val;
      });
      if (calcCycle) {
        calcCycle.value = '0.9';
        calcCycle.dispatchEvent(new Event('change'));
      }
    });
  },

  // Live Blog Article Search Filter
  initBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    const container = document.getElementById('blog-articles-container');
    if (!searchInput || !container) return;

    const cards = container.querySelectorAll('.music-card');
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  },

  // Blog Details Comment Form
  initBlogCommentForm() {
    document.querySelectorAll('form').forEach(form => {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn && submitBtn.textContent.toLowerCase().includes('post comment')) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          HarmonyApp.showToast('Thank you! Your comment has been submitted.', 'success');
          form.reset();
        });
      }
    });
  },

  showToast(message, type = 'info') {
    let container = document.getElementById('harmony-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'harmony-toast-container';
      container.className = 'fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none max-w-sm w-full';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgStyles = type === 'success' 
      ? 'bg-[#6C4CE3] text-white border-[#5A38D4] shadow-lg shadow-[#6C4CE3]/30' 
      : type === 'error'
      ? 'bg-[#16171B] text-white border-[#FF9F43] shadow-lg shadow-[#FF9F43]/20' 
      : 'bg-[#16171B] text-white border-[#6C4CE3]/40 shadow-lg shadow-[#6C4CE3]/20';

    toast.className = `pointer-events-auto p-4 rounded-xl shadow-xl flex items-center gap-3 border text-sm font-medium transform transition-all duration-300 translate-y-[-10px] opacity-0 ${bgStyles}`;
    toast.innerHTML = `
      <div class="flex-1">${message}</div>
      <button class="text-white/70 hover:text-white" onclick="this.parentElement.remove()">
        &times;
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-[-10px]', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-[-10px]');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

// Auto boot on DOM load
document.addEventListener('DOMContentLoaded', () => {
  HarmonyApp.init();
});
