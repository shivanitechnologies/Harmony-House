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
    this.initQuickSearch();
    this.initAccordions();
    this.initContactForms();
    this.initSoundboard();
    this.initPlayablePiano();
    this.initMusicalMatcher();
    this.initPracticeMetronome();
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
    this.showToast(isDark ? 'Switched to Dark Mode 🌙' : 'Switched to Light Mode ☀️', 'info');
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
    this.showToast(newDir === 'rtl' ? 'RTL Mode Enabled ⇄' : 'LTR Mode Enabled ⇄', 'info');
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

    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        if (backdrop) backdrop.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      });
    }

    const closeMenu = () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
      if (backdrop) backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);
  },

  // Soundboard Trigger & Live Hero Instrument Photo Switcher
  initSoundboard() {
    const HERO_INSTRUMENTS = {
      guitar: {
        image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80',
        alt: 'Live student practicing acoustic guitar in sunlit music studio',
        badge: 'Studio 1A &bull; Acoustic &amp; Classical',
        title: 'Acoustic &amp; Classical Guitar',
        session: 'Live Guitar Session',
        rating: '4.9 / 5.0'
      },
      piano: {
        image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=1000&q=80',
        alt: 'Pianist practicing on acoustic grand piano in studio',
        badge: 'Studio 2B &bull; Grand Keys &amp; Classical',
        title: 'Yamaha Grand Piano Studio',
        session: 'Live Piano Session',
        rating: '5.0 / 5.0'
      },
      drums: {
        image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1000&q=80',
        alt: 'Drummer practicing rhythm fills on acoustic drumkit',
        badge: 'Studio 3A &bull; Rhythm &amp; Percussion',
        title: 'Acoustic Drumkit Studio',
        session: 'Live Drum Session',
        rating: '4.9 / 5.0'
      },
      violin: {
        image: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=1000&q=80',
        alt: 'Solo violinist playing classical violin in rehearsal room',
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
                <select required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-charcoal-700 bg-gray-50 dark:bg-charcoal-800 text-sm focus:outline-none focus:border-[#6C4CE3]">
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
    document.querySelectorAll('[data-modal-target]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-modal-target');
        this.openModal(targetId);
      });
    });

    document.querySelectorAll('[data-modal-close]').forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = closeBtn.closest('.harmony-modal');
        if (modal) {
          modal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
      });
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
        }
      });
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
