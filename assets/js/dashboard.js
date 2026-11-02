/**
 * Harmony House Music Academy - Centralized Dashboard Interactivity & Mobile Engine
 * Powers both Student Portal and Admin Portal features, responsive drawer, audio feedback & simulations.
 */

const HarmonyDashboard = {
  init() {
    this.initMobileSidebar();
    this.initAudioPlayers();
    this.initPracticeRecorder();
    this.initPaymentModal();
    this.initRescheduleModal();
    this.initSearchFilters();
    this.initAttendanceToggles();
    this.initAdminModalsAndActions();
    this.initInquiryFilters();
    this.initNotificationFilters();
    this.initSettingsAndProfileForms();
    this.initResponsiveTables();
  },

  // Robust Mobile Sidebar & Navigation Controller
  initMobileSidebar() {
    const sidebars = [
      {
        toggle: document.getElementById('sidebar-toggle'),
        sidebar: document.getElementById('dashboard-sidebar'),
        backdrop: document.getElementById('sidebar-backdrop')
      },
      {
        toggle: document.getElementById('admin-sidebar-toggle'),
        sidebar: document.getElementById('admin-sidebar'),
        backdrop: document.getElementById('admin-sidebar-backdrop')
      }
    ];

    sidebars.forEach(({ toggle, sidebar, backdrop }) => {
      if (!sidebar) return;

      const openDrawer = () => {
        sidebar.classList.remove('-translate-x-full');
        if (backdrop) backdrop.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      };

      const closeDrawer = () => {
        sidebar.classList.add('-translate-x-full');
        if (backdrop) backdrop.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      };

      if (toggle) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
          const isOpen = !sidebar.classList.contains('-translate-x-full');
          if (isOpen) closeDrawer();
          else openDrawer();
        });
      }

      if (backdrop) {
        backdrop.addEventListener('click', closeDrawer);
      }

      // Close buttons inside sidebar
      sidebar.querySelectorAll('.sidebar-close-btn, [data-sidebar-close]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          closeDrawer();
        });
      });

      // Auto-close sidebar on mobile when any navigation item is tapped
      sidebar.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 1024) {
            closeDrawer();
          }
        });
      });

      // Close on Escape key
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 1024) {
          closeDrawer();
        }
      });

      // Clean up body overflow when resizing to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
          document.body.classList.remove('overflow-hidden');
          if (backdrop) backdrop.classList.add('hidden');
        }
      });
    });
  },

  // Audio recording simulation for student practice
  initPracticeRecorder() {
    const recordBtn = document.getElementById('btn-record-practice');
    const statusText = document.getElementById('record-status-text');
    const timerText = document.getElementById('record-timer-text');
    let isRecording = false;
    let timerInterval = null;
    let seconds = 0;

    if (recordBtn && statusText) {
      recordBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isRecording = !isRecording;
        if (isRecording) {
          seconds = 0;
          recordBtn.classList.remove('bg-coral-500', 'bg-[#6C4CE3]');
          recordBtn.classList.add('bg-[#FF9F43]', 'animate-pulse');
          recordBtn.innerHTML = '<i data-lucide="square" class="w-4 h-4"></i> Stop Recording';
          statusText.textContent = 'Listening to your instrument audio input...';
          
          timerInterval = setInterval(() => {
            seconds++;
            const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
            const secs = String(seconds % 60).padStart(2, '0');
            if (timerText) timerText.textContent = `${mins}:${secs}`;
          }, 1000);
          
          if (window.HarmonyApp) HarmonyApp.showToast('Microphone active! Play your piece clearly.', 'info');
        } else {
          clearInterval(timerInterval);
          recordBtn.classList.add('bg-[#6C4CE3]');
          recordBtn.classList.remove('bg-[#FF9F43]', 'animate-pulse');
          recordBtn.innerHTML = '<i data-lucide="mic" class="w-4 h-4"></i> Record New Take';
          statusText.innerHTML = '<span class="text-green-600 font-bold">✓ Take saved (00:' + String(seconds).padStart(2, '0') + ')</span>. Ready to submit to mentor!';
          
          if (window.HarmonyApp) {
            HarmonyApp.showToast('Practice take recorded and saved to mentor review inbox! 🎵', 'success');
            HarmonyApp.initLucide();
          }
        }
      });
    }
  },

  // Audio player with Web Audio synthesized feedback
  initAudioPlayers() {
    document.querySelectorAll('[data-audio-player]').forEach(playerBtn => {
      playerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isPlaying = playerBtn.getAttribute('data-playing') === 'true';
        
        if (isPlaying) {
          playerBtn.setAttribute('data-playing', 'false');
          playerBtn.innerHTML = '<i data-lucide="play" class="w-3.5 h-3.5"></i> Play Voice Note';
        } else {
          playerBtn.setAttribute('data-playing', 'true');
          playerBtn.innerHTML = '<i data-lucide="pause" class="w-3.5 h-3.5"></i> Pause Audio';
          
          // Play acoustic chord arpeggio simulation
          if (window.HarmonyAudio && typeof window.HarmonyAudio.playPianoChord === 'function') {
            window.HarmonyAudio.playPianoChord();
          } else if (window.HarmonyAudio && typeof window.HarmonyAudio.playGuitarStrum === 'function') {
            window.HarmonyAudio.playGuitarStrum();
          }
          
          if (window.HarmonyApp) {
            HarmonyApp.showToast('Playing teacher evaluation note for Rohan...', 'info');
          }

          // Reset after audio duration
          setTimeout(() => {
            if (playerBtn.getAttribute('data-playing') === 'true') {
              playerBtn.setAttribute('data-playing', 'false');
              playerBtn.innerHTML = '<i data-lucide="play" class="w-3.5 h-3.5"></i> Play Voice Note';
              if (window.HarmonyApp) HarmonyApp.initLucide();
            }
          }, 4500);
        }
        if (window.HarmonyApp) HarmonyApp.initLucide();
      });
    });
  },

  // Payment checkout simulation & dynamic UI update
  initPaymentModal() {
    const payForm = document.getElementById('harmony-pay-form');
    if (payForm) {
      payForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const modal = document.getElementById('payment-modal');
        if (modal) modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');

        // Update payment banner status dynamically if present
        const dueCard = document.querySelector('.border-2.border-coral-500\\/30');
        if (dueCard) {
          dueCard.classList.remove('border-coral-500/30');
          dueCard.classList.add('border-green-500/40', 'bg-green-50/20');
          const statusSpan = Array.from(dueCard.querySelectorAll('span')).find(s => s.textContent.includes('Pending Payment'));
          if (statusSpan) {
            statusSpan.className = 'text-green-600 font-bold';
            statusSpan.textContent = 'Status: Paid (Verified) ✓';
          }
          const btn = dueCard.querySelector('button[data-modal-target="payment-modal"]');
          if (btn) {
            btn.className = 'px-6 py-3 rounded-full bg-green-600 text-white font-bold text-xs flex items-center gap-1.5 shadow';
            btn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> Tuition Paid (Nov 2026)';
            btn.disabled = true;
          }
        }

        if (window.HarmonyApp) {
          HarmonyApp.showToast('Payment of ₹3,200 successful! Receipt #INV-2026-1101 issued.', 'success');
          HarmonyApp.initLucide();
        }
      });
    }
  },

  // Class reschedule submission
  initRescheduleModal() {
    const rescheduleModal = document.getElementById('reschedule-modal');
    if (rescheduleModal) {
      const form = rescheduleModal.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          rescheduleModal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
          if (window.HarmonyApp) {
            HarmonyApp.showToast('Reschedule request submitted! Counselor will confirm your slot within 2 hours.', 'success');
          }
        });
      }
    }
  },

  // Instant Table Search Filtering
  initSearchFilters() {
    const searchInputs = document.querySelectorAll('[data-table-search]');
    searchInputs.forEach(input => {
      const targetTableId = input.getAttribute('data-table-search');
      const table = document.getElementById(targetTableId);
      if (!table) return;

      input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
          const text = row.innerText.toLowerCase();
          row.style.display = text.includes(term) ? '' : 'none';
        });
      });
    });
  },

  // Attendance status toggles in admin
  initAttendanceToggles() {
    document.querySelectorAll('.btn-attendance-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = btn.getAttribute('data-status');
        if (current === 'present') {
          btn.setAttribute('data-status', 'absent');
          btn.className = 'btn-attendance-toggle px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 transition';
          btn.textContent = 'Absent';
          if (window.HarmonyApp) HarmonyApp.showToast('Marked as Absent for today\'s roll call', 'error');
        } else {
          btn.setAttribute('data-status', 'present');
          btn.className = 'btn-attendance-toggle px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 transition';
          btn.textContent = 'Present';
          if (window.HarmonyApp) HarmonyApp.showToast('Marked as Present ✓', 'success');
        }
      });
    });
  },

  // Admin dynamic forms (Add Student, Add Batch, Mark Paid)
  initAdminModalsAndActions() {
    // Add Student Modal Form
    const addStudentModal = document.getElementById('add-student-modal');
    if (addStudentModal) {
      const form = addStudentModal.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const nameInput = form.querySelector('input[type="text"]');
          const courseSelect = form.querySelector('select');
          const studentName = nameInput ? nameInput.value : 'New Student';
          const course = courseSelect ? courseSelect.value : 'Guitar Mastery';

          // Add row to table if table exists
          const table = document.getElementById('students-table');
          if (table) {
            const tbody = table.querySelector('tbody');
            if (tbody) {
              const newRow = document.createElement('tr');
              newRow.className = 'bg-purple-50/40 dark:bg-purple-950/20 transition animate-fade-in';
              newRow.innerHTML = `
                <td class="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-[#6C4CE3] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ${studentName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span>${studentName}</span>
                    <span class="block text-[10px] text-gray-400 font-mono">STU-2026-` + Math.floor(100 + Math.random() * 900) + `</span>
                  </div>
                </td>
                <td class="p-4">${course}</td>
                <td class="p-4">Assigned Batch A</td>
                <td class="p-4 text-center"><span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">100% (New)</span></td>
                <td class="p-4 text-center"><span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">Pending</span></td>
                <td class="p-4 text-right">
                  <button class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal-700 text-gray-400"><i data-lucide="more-vertical" class="w-4 h-4"></i></button>
                </td>
              `;
              tbody.prepend(newRow);
            }
          }

          addStudentModal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
          form.reset();
          if (window.HarmonyApp) {
            HarmonyApp.showToast(`Student record for "${studentName}" registered successfully!`, 'success');
            HarmonyApp.initLucide();
          }
        });
      }
    }

    // Add Batch Modal Form
    const addBatchModal = document.getElementById('add-batch-modal');
    if (addBatchModal) {
      const form = addBatchModal.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          addBatchModal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
          form.reset();
          if (window.HarmonyApp) {
            HarmonyApp.showToast('New batch created and added to timetable schedule!', 'success');
          }
        });
      }
    }

    // Mark Paid buttons in Payments Ledger
    Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Mark Paid')).forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const row = btn.closest('tr');
        if (row) {
          const statusCol = row.querySelector('span');
          if (statusCol) {
            statusCol.className = 'px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700';
            statusCol.textContent = 'Paid (Verified)';
          }
          btn.style.display = 'none';
        }
        if (window.HarmonyApp) {
          HarmonyApp.showToast('Payment manually verified & marked as Paid!', 'success');
        }
      });
    });
  },

  // Inquiries filter tabs in Admin messages
  initInquiryFilters() {
    const filterButtons = document.querySelectorAll('[data-inquiry-filter]');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterButtons.forEach(b => {
          b.classList.remove('text-[#6C4CE3]', 'border-b-2', 'border-[#6C4CE3]', 'font-bold');
          b.classList.add('text-gray-500');
        });
        btn.classList.add('text-[#6C4CE3]', 'border-b-2', 'border-[#6C4CE3]', 'font-bold');
        btn.classList.remove('text-gray-500');

        const filter = btn.getAttribute('data-inquiry-filter');
        document.querySelectorAll('[data-inquiry-type]').forEach(card => {
          if (filter === 'all' || card.getAttribute('data-inquiry-type') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  },

  // Responsive Table wrapping
  initResponsiveTables() {
    document.querySelectorAll('table').forEach(table => {
      if (!table.parentElement.classList.contains('overflow-x-auto')) {
        const wrap = document.createElement('div');
        wrap.className = 'overflow-x-auto w-full';
        table.parentNode.insertBefore(wrap, table);
        wrap.appendChild(table);
      }
    });
  },

  // Notification center tabs filter
  initNotificationFilters() {
    const tabBtns = document.querySelectorAll('[data-notif-tab]');
    const cards = document.querySelectorAll('[data-notif-category]');
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const category = btn.getAttribute('data-notif-tab');

        tabBtns.forEach(b => {
          b.classList.remove('bg-coral-500', 'text-white', 'font-bold');
          b.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-charcoal-800');
        });

        btn.classList.add('bg-coral-500', 'text-white', 'font-bold');
        btn.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-charcoal-800');

        cards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-notif-category') === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  },

  // Form submit handlers for Student Profile and Admin Settings
  initSettingsAndProfileForms() {
    const forms = document.querySelectorAll('form[data-ajax-submit], #profile-settings-form, #academy-settings-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const origText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="inline-block animate-spin mr-1.5">&#9696;</span> Saving Changes...';
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = origText;
          }
          if (window.HarmonyApp) {
            HarmonyApp.showToast('All changes saved successfully!', 'success');
          }
        }, 600);
      });
    });
  }
};

// Auto boot on DOM load
document.addEventListener('DOMContentLoaded', () => {
  HarmonyDashboard.init();
});
