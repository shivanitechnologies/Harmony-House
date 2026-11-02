# Harmony-House

## Harmony House Music Academy
> **Find your rhythm. Make music.**  
> Modern, responsive multi-page music academy website with integrated Student & Admin Dashboard portals.

---

## 🎵 Project Overview
**Harmony House** is a music learning academy designed for children, teenagers, and adults who want to learn musical instruments and singing. Built with modern HTML5, Tailwind CSS, and vanilla JavaScript, it provides a frontend template featuring interactive UI demonstrations, state management (Dark Mode, Light Mode, RTL), and comprehensive portals for students and academy staff.

No backend or database installation is required to preview the template.

---

## 🎨 Branding & Design System
- **Brand Name**: Harmony House Music Academy
- **Tagline**: *"Find your rhythm. Make music."*
- **Primary Color**: Coral `#E8795D` (Hover `#D15F43`, Tint `#FDF2E9`)
- **Secondary Color**: Sage `#6E8978` (Hover `#566E5F`, Tint `#EAF0EC`)
- **Accent Color**: Amber Gold `#E5A855`
- **Dark Mode Background**: Charcoal `#121516`, `#1A1F22`, `#22282C`
- **Typography**:
  - Headings: `Playfair Display`, serif
  - Body: `DM Sans`, sans-serif
- **Iconography**: Lucide-style SVG icons (`lucide.createIcons()`)

---

## 📁 Project Architecture & File Sitemap

```
d:/Stackly/Music Classes for Kids & Adults/
│
├── index.html                  # Home Page 1 (Classic Guitar School aesthetic)
├── home-2.html                 # Home Page 2 (Premium Conservatory / Nuvo style)
├── about.html                  # About Us (Heritage timeline, Suzuki/Kodály methodology)
├── courses.html                # All Courses catalog with live search & filters
├── course-details.html         # Course detail (Syllabus accordion, mentor, pricing card)
├── instructors.html            # Faculty profiles & trial booking modals
├── fees-batches.html           # Tuition pricing tiers & batch schedule matrix
├── pricing.html                # Dedicated plan comparison matrix
├── blog.html                   # Academy journal & practice tips
├── blog-details.html           # Full article with author card & discussion
├── contact.html                # Contact form, academy hours & location map
├── 404.html                    # Custom musical 404 error page
├── coming-soon.html            # Virtual campus countdown page
├── maintenance.html            # Maintenance calibration mode
│
├── auth/                       # Clean authentication views (no navbar/footer)
│   ├── login.html              # Student login with demo 1-click credentials
│   ├── register.html           # Student registration form
│   └── forgot-password.html    # Password reset & OTP simulation
│
├── student/                    # Dedicated Student Dashboard Portal
│   ├── index.html              # Dashboard overview (Metrics, upcoming class, recorder)
│   ├── courses.html            # Enrolled courses with curriculum progress
│   ├── schedule.html           # Weekly class timetable & reschedule modal
│   ├── attendance.html         # Attendance rate (94%) & roll call log
│   ├── progress.html           # Mentor evaluations, skills breakdown & audio clips
│   ├── fees.html               # Fee invoices & online payment modal (UPI/Card)
│   ├── notifications.html      # Notification alerts center
│   └── profile.html            # Student profile & settings
│
├── admin/                      # Academy Administration Management Portal
│   ├── index.html              # Admin operations overview & revenue analytics
│   ├── students.html           # Student roster directory & registration modal
│   ├── courses.html            # Batch schedule & studio capacity management
│   ├── attendance.html         # Roll call attendance manager with toggle buttons
│   ├── payments.html           # Fee ledger & bulk dues alert system
│   ├── messages.html           # Admissions inquiries inbox & reply workflow
│   ├── reports.html            # Annual growth, retention & revenue analytics
│   └── settings.html           # Academy operational policies & parameters
│
├── assets/
│   ├── css/
│   │   └── custom.css          # Soundwave bars, keyframe animations & print rules
│   ├── js/
│   │   ├── data.js             # Shared mock data (courses, instructors, students)
│   │   ├── main.js             # Theme manager, RTL toggles, modals, toasts & nav
│   │   └── dashboard.js        # Practice audio recorder, search filters & payments
│   └── images/
│       └── logo.svg            # Custom vector brandmark
│
└── README.md                   # Complete documentation
```

---

## ⚡ Key Interactive Features

1. **Light & Dark Mode**:
   - Toggles theme instantaneously using Tailwind's `class` strategy.
   - Automatically detects system preference and saves user choice in `localStorage`.
2. **Bidirectional RTL / LTR Support**:
   - Dynamic direction switcher with mirrored layout and icons for Arabic/Hebrew scripts.
3. **Floating Quick-Preview Switcher**:
   - A floating pill at the bottom right corner lets reviewers switch between Home 1, Home 2, Student Portal, and Admin Portal with one click.
4. **Interactive Trial & Enrollment Modals**:
   - Book a 30-min trial class from any page with live feedback notifications.
5. **Practice Audio Recorder Mockup**:
   - Student dashboard includes an interactive live recording widget with timer for practicing before mentor submission.
6. **Teacher Audio Feedback Player**:
   - Interactive play/pause buttons to listen to simulated voice notes from instructors.
7. **Search & Category Filtering**:
   - Dynamic client-side filtering on the Courses directory and Admin student directory.
8. **Fee Payment & Receipt Generator**:
   - Simulated UPI/Card checkout modal with instant confirmation toast and PDF receipt download.

---

## 📱 Responsive Breakpoints Tested
- **Mobile**: 360px & 390px (Collapsible hamburger drawer navigation)
- **Tablet**: 768px (Adapted multi-column grids)
- **Laptop**: 1024px (Expanded desktop navbar)
- **Desktop**: 1440px (Max-width 7xl layout containers)

---

## 🚀 How to Preview
Double-click `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Safari, Firefox) or serve using any static web server (e.g., Live Server or `npx serve .`). No backend or Node.js server is required.

