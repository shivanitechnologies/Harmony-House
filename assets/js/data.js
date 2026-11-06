/**
 * Harmony House Music Academy - Shared Mock Database & Dataset
 */

const HarmonyData = {
  academy: {
    name: "Harmony House",
    tagline: "Find your rhythm. Make music.",
    subheading: "Music Academy for Kids & Adults",
    phone: "+91 98765 43210",
    email: "hello@harmonyhousemusic.com",
    address: "42 Melodic Grove, Kalyani Nagar, Pune, Maharashtra 411006",
    hours: "Monday – Saturday: 9:00 AM – 8:30 PM | Sunday: 10:00 AM – 3:00 PM"
  },

  courses: [
    {
      id: "course-guitar",
      title: "Acoustic & Electric Guitar Mastery",
      category: "Guitar",
      categoryBadge: "Guitar & Bass",
      ageGroup: "Kids & Adults (7+ yrs)",
      duration: "16 Weeks / 32 Sessions",
      difficulty: "Beginner to Intermediate",
      rating: 4.9,
      reviewsCount: 142,
      priceMonthly: "₹3,200",
      featured: true,
      image: "assets/images/guitar-3d.jpg",
      bannerImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
      description: "From first strum to fluid soloing. Learn fingerpicking, rhythm techniques, chord progressions, and modern pop/rock repertoire with certified Trinity College London mentors.",
      learningOutcomes: [
        "Fretboard navigation and ergonomic posture",
        "Open chords, barre chords & fingerstyle patterns",
        "Rhythm mastery with metronome syncopation",
        "Reading standard notation & guitar tablature",
        "Improvisation over blues & pentatonic scales"
      ],
      instructorId: "inst-david",
      batches: ["Kids Beginner (Mon/Wed 4:00 PM)", "Adult Evening (Tue/Thu 6:30 PM)", "Weekend Jam (Sat 11:00 AM)"]
    },
    {
      id: "course-piano",
      title: "Classical & Contemporary Piano",
      category: "Piano",
      categoryBadge: "Piano & Keys",
      ageGroup: "Kids & Adults (5+ yrs)",
      duration: "24 Weeks / 48 Sessions",
      difficulty: "All Levels",
      rating: 5.0,
      reviewsCount: 189,
      priceMonthly: "₹3,500",
      featured: true,
      image: "assets/images/piano-3d.jpg",
      bannerImage: "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=1200&q=80",
      description: "Master two-hand coordination, sight-reading, classical sonatinas, and jazz chords on premium Yamaha grand keyboards and upright pianos in acoustic studios.",
      learningOutcomes: [
        "Independent finger agility and hand independence",
        "Sight-reading Treble and Bass clefs fluently",
        "Ear training and interval identification",
        "Classical repertoire (Bach, Mozart, Chopin miniatures)",
        "Contemporary ballad and pop accompaniment chord charts"
      ],
      instructorId: "inst-elena",
      batches: ["Junior Keys (Tue/Fri 4:30 PM)", "Adult Classical (Mon/Wed 7:00 PM)", "Sunday Masterclass (10:00 AM)"]
    },
    {
      id: "course-vocals",
      title: "Contemporary & Western Vocals",
      category: "Vocals",
      categoryBadge: "Singing & Voice",
      ageGroup: "All Ages (6+ yrs)",
      duration: "12 Weeks / 24 Sessions",
      difficulty: "Beginner to Advanced",
      rating: 4.8,
      reviewsCount: 128,
      priceMonthly: "₹3,200",
      featured: true,
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
      bannerImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
      description: "Unleash your authentic singing voice. Discover diaphragmatic breath control, pitch correction, vocal resonance, range expansion, and confident stage delivery.",
      learningOutcomes: [
        "Diaphragmatic breathing and support mechanics",
        "Pitch accuracy, intervals and harmony singing",
        "Vocal resonance, head/chest voice transitions",
        "Microphone technique and studio vocal recording",
        "Stage performance confidence and storytelling"
      ],
      instructorId: "inst-aarav",
      batches: ["Kids Vocals Spark (Wed/Fri 4:00 PM)", "Adult Vocal Lab (Tue/Thu 7:00 PM)", "Weekend Choir (Sat 3:00 PM)"]
    },
    {
      id: "course-drums",
      title: "Rhythm & Percussion Drums Academy",
      category: "Drums",
      categoryBadge: "Percussion",
      ageGroup: "Kids & Teens (6+ yrs & Adults)",
      duration: "16 Weeks / 32 Sessions",
      difficulty: "Beginner to Pro",
      rating: 4.9,
      reviewsCount: 104,
      priceMonthly: "₹3,400",
      featured: true,
      image: "assets/images/drums-3d.jpg",
      bannerImage: "https://images.unsplash.com/photo-1543791187-df796fa11835?auto=format&fit=crop&w=1200&q=80",
      description: "Build unstoppable groove, limb independence, dynamic drum fills, and rock/funk pocket rhythm on real acoustic Roland and Pearl drumkits.",
      learningOutcomes: [
        "Drum kit ergonomics, grip and posture control",
        "Fundamental rudiments (paradiddles, flams, rolls)",
        "Four-way limb independence and coordination",
        "Rock, pop, funk, and Latin groove patterns",
        "Timekeeping and playing live with a rhythm section"
      ],
      instructorId: "inst-marcus",
      batches: ["Kids Rhythm Beat (Mon/Thu 5:00 PM)", "Adult Groove Session (Fri 6:30 PM & Sat 4:00 PM)"]
    },
    {
      id: "course-violin",
      title: "Violin & String Ensemble",
      category: "Violin",
      categoryBadge: "Strings",
      ageGroup: "Kids & Adults (6+ yrs)",
      duration: "20 Weeks / 40 Sessions",
      difficulty: "Beginner to Intermediate",
      rating: 4.8,
      reviewsCount: 86,
      priceMonthly: "₹3,600",
      featured: false,
      image: "assets/images/violin-3d.jpg",
      bannerImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
      description: "Pure intonation, graceful bowing technique, and expressive classical & Celtic fiddle repertoire taught through tailored Suzuki and Western classical frameworks.",
      learningOutcomes: [
        "Proper bow hold, finger placement, and posture",
        "Intonation and ear-guided pitch purity without frets",
        "Dynamics, vibrato, and bowing articulations (staccato, legato)",
        "Ensemble chamber harmony coordination"
      ],
      instructorId: "inst-clara",
      batches: ["Violin Starters (Tue/Thu 4:30 PM)", "Ensemble Strings (Saturday 2:00 PM)"]
    },
    {
      id: "course-production",
      title: "Music Production & Sound Design",
      category: "Production",
      categoryBadge: "Digital Audio",
      ageGroup: "Teens & Adults (13+ yrs)",
      duration: "12 Weeks / 24 Sessions",
      difficulty: "Intermediate",
      rating: 4.9,
      reviewsCount: 95,
      priceMonthly: "₹3,800",
      featured: false,
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
      bannerImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
      description: "Learn Logic Pro, Ableton Live, beat making, vocal mixing, synth programming, and sound engineering in our cutting-edge iMac workstations.",
      learningOutcomes: [
        "DAW navigation, audio routing and MIDI editing",
        "Drum programming, sampling, and synth patching",
        "Equalization, compression, reverb and space mixing",
        "Creating a complete original track ready for Spotify"
      ],
      instructorId: "inst-marcus",
      batches: ["Logic / Ableton Lab (Wed/Sat 6:00 PM)"]
    }
  ],

  instructors: [
    {
      id: "inst-david",
      name: "David Miller",
      designation: "Head of Guitar Department",
      instrument: "Acoustic & Electric Guitar",
      experience: "14+ Years Experience",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      qualification: "Trinity College London Licentiate (LTCL)",
      bio: "David has toured globally with indie-rock ensembles and instructed over 700 students across classical, flamenco, and modern blues guitar.",
      teachingApproach: "Focuses on rhythmic feel first, unlocking natural musical intuition rather than rigid rote memorization.",
      studentsTaught: "720+ Students",
      rating: "4.95 / 5.0"
    },
    {
      id: "inst-elena",
      name: "Elena Rostova",
      designation: "Senior Classical Piano Specialist",
      instrument: "Piano & Music Theory",
      experience: "12+ Years Experience",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      qualification: "Moscow Conservatory Alumna / ABRSM Fellow",
      bio: "Elena specializes in building impeccable finger technique and soulful musicality in both young children and discerning adult beginners.",
      teachingApproach: "Blending Suzuki ear development with structured sight-reading to nurture complete pianists.",
      studentsTaught: "550+ Students",
      rating: "5.0 / 5.0"
    },
    {
      id: "inst-aarav",
      name: "Aarav Sharma",
      designation: "Vocal Coach & Choir Director",
      instrument: "Contemporary Vocals & Voice Culture",
      experience: "10+ Years Experience",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      qualification: "Berklee College of Music Certified Vocal Specialist",
      bio: "A playback singer and choir master, Aarav trains vocalists to expand their range without strain, mastering mixed voice and stage presence.",
      teachingApproach: "Scientific vocal ergonomics paired with emotional vocal interpretation and resonance placement.",
      studentsTaught: "830+ Students",
      rating: "4.9 / 5.0"
    },
    {
      id: "inst-marcus",
      name: "Marcus Vance",
      designation: "Drum Department Head & Audio Engineer",
      instrument: "Drums, Percussion & Music Production",
      experience: "11+ Years Experience",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      qualification: "Musicians Institute (MI) Los Angeles Alumnus",
      bio: "Session drummer with extensive studio credits. Marcus transforms aspiring drummers into groove powerhouses with stellar timing.",
      teachingApproach: "Groove-centric methods using click tracks, polyrhythmic breakdowns, and live jam simulations.",
      studentsTaught: "490+ Students",
      rating: "4.92 / 5.0"
    },
    {
      id: "inst-clara",
      name: "Clara Dupont",
      designation: "Violin Virtuoso & Strings Instructor",
      instrument: "Violin & Viola",
      experience: "9+ Years Experience",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      qualification: "Royal Academy of Music M.Mus Graduate",
      bio: "Clara brings European classical violin precision and warm Scottish fiddle traditions to students of all developmental stages.",
      teachingApproach: "Gentle physical posture calibration that eliminates neck tension and cultivates sweet, rich tone.",
      studentsTaught: "340+ Students",
      rating: "4.88 / 5.0"
    }
  ],

  pricingPlans: [
    {
      id: "starter",
      name: "Starter",
      badge: "For Beginners",
      monthlyFee: "₹1,800",
      annualFee: "₹19,400",
      classesPerMonth: "4 Classes",
      classDuration: "45 Mins / Class",
      groupSize: "Small Group (Max 4)",
      features: [
        "1 weekly dedicated session",
        "Sheet music & backing track access",
        "Instrument practice room (1 hr/week)",
        "Student portal schedule access",
        "Academy recital participation"
      ],
      popular: false,
      ctaText: "Choose Starter"
    },
    {
      id: "harmony-plus",
      name: "Harmony Plus",
      badge: "Most Popular",
      monthlyFee: "₹3,200",
      annualFee: "₹34,500",
      classesPerMonth: "8 Classes",
      classDuration: "60 Mins / Class",
      groupSize: "Semi-Private (Max 3)",
      features: [
        "2 weekly sessions for steady growth",
        "Complete digital sheet library",
        "Free instrument practice room (3 hrs/wk)",
        "Trinity / RockSchool exam prep support",
        "Detailed monthly instructor feedback",
        "Priority batch slot selection"
      ],
      popular: true,
      ctaText: "Start Harmony Plus"
    },
    {
      id: "ensemble",
      name: "Ensemble & Master",
      badge: "Intensive",
      monthlyFee: "₹4,500",
      annualFee: "₹48,600",
      classesPerMonth: "12 Classes",
      classDuration: "60 Mins / Class",
      groupSize: "1-on-1 + Band Jam",
      features: [
        "Dedicated weekly 1-on-1 private lesson",
        "Weekly weekend band / ensemble jam",
        "Unlimited studio practice access",
        "Annual studio recording session (1 song)",
        "Masterclass access with guest artists",
        "Complimentary instrument tune-up"
      ],
      popular: false,
      ctaText: "Enroll in Ensemble"
    }
  ],

  batchSchedules: [
    {
      batchName: "Kids Beginner (Ages 6-10)",
      instrument: "Guitar & Ukulele",
      days: "Mon / Wed",
      time: "4:00 PM – 4:45 PM",
      instructor: "David Miller",
      availableSeats: 2,
      totalSeats: 4,
      status: "Filling Fast"
    },
    {
      batchName: "Junior Piano Prodigy (Ages 7-12)",
      instrument: "Piano & Keyboard",
      days: "Tue / Fri",
      time: "4:30 PM – 5:15 PM",
      instructor: "Elena Rostova",
      availableSeats: 1,
      totalSeats: 4,
      status: "1 Seat Left"
    },
    {
      batchName: "Adult Evening Groove (Ages 16+)",
      instrument: "Acoustic Guitar",
      days: "Tue / Thu",
      time: "6:30 PM – 7:30 PM",
      instructor: "David Miller",
      availableSeats: 3,
      totalSeats: 5,
      status: "Available"
    },
    {
      batchName: "Adult Contemporary Vocals",
      instrument: "Singing & Pitch",
      days: "Wed / Sat",
      time: "7:00 PM – 8:00 PM",
      instructor: "Aarav Sharma",
      availableSeats: 4,
      totalSeats: 6,
      status: "Available"
    },
    {
      batchName: "Weekend Drum Academy",
      instrument: "Drums & Percussion",
      days: "Saturday & Sunday",
      time: "11:00 AM – 12:00 PM",
      instructor: "Marcus Vance",
      availableSeats: 2,
      totalSeats: 3,
      status: "Filling Fast"
    },
    {
      batchName: "Weekend Harmony Choir & Band",
      instrument: "Mixed Ensemble",
      days: "Saturday",
      time: "2:00 PM – 3:30 PM",
      instructor: "Aarav & Clara",
      availableSeats: 5,
      totalSeats: 10,
      status: "Available"
    }
  ],

  testimonials: [
    {
      name: "Meera & Rajesh Kulkarni",
      role: "Parents of Ananya (Age 8)",
      course: "Junior Piano Prodigy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      content: "Harmony House made piano learning fun rather than a chore for our daughter. Ms. Elena's patience and the interactive student dashboard keep us updated on every weekly milestone!"
    },
    {
      name: "Vikram Malhotra",
      role: "Software Architect (Age 34)",
      course: "Adult Evening Guitar",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      content: "I started guitar at 33 with zero background. In 4 months, I can play Eric Clapton and Coldplay chords smoothly. The weekend jam sessions are the highlight of my week."
    },
    {
      name: "Sunita Deshmukh",
      role: "Parent of Kabir (Age 11)",
      course: "Drums Academy",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
      content: "Marcus is an incredible drum teacher. Kabir had trouble focusing in school, but drumming at Harmony House has channeled his energy and boosted his self-discipline immensely."
    }
  ],

  blogPosts: [
    {
      id: "post-piano-practice",
      title: "Daily 20-Minute Piano Practice: The Science of Musical Consistency",
      slug: "daily-piano-practice-tips",
      category: "Practice Tips",
      date: "Oct 24, 2026",
      readTime: "5 min read",
      author: "Elena Rostova",
      authorRole: "Head of Piano Studies",
      image: "assets/images/piano-3d.jpg",
      excerpt: "Why short, focused daily sessions outperform grueling weekend cramming sessions for neuroplasticity, muscle memory, and creative joy."
    },
    {
      id: "post-guitar-starter",
      title: "How to Pick Your Very First Acoustic Guitar Without Breaking the Bank",
      slug: "how-to-start-learning-guitar",
      category: "Instrument Guides",
      date: "Oct 18, 2026",
      readTime: "6 min read",
      author: "David Miller",
      authorRole: "Head of Guitar Studies",
      image: "assets/images/guitar-3d.jpg",
      excerpt: "Body shapes, string actions, tonewoods, and key things to test in a guitar shop before buying your first instrument."
    },
    {
      id: "post-child-benefits",
      title: "The Cognitive Superpower: Why Early Childhood Music Education Matters",
      slug: "music-learning-for-children",
      category: "Child Development",
      date: "Oct 10, 2026",
      readTime: "7 min read",
      author: "Aarav Sharma",
      authorRole: "Voice & Youth Director",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      excerpt: "Scientific insights into how rhythm, tempo, and pitch training enhance spatial-temporal reasoning, mathematical aptitude, and language skills."
    },
    {
      id: "post-stage-fright",
      title: "Conquering Stage Fright: 5 Pre-Performance Rituals of Great Musicians",
      slug: "preparing-for-music-performances",
      category: "Performance",
      date: "Sep 28, 2026",
      readTime: "4 min read",
      author: "Clara Dupont",
      authorRole: "Strings Faculty",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
      excerpt: "Transform performance anxiety into dynamic stage charisma with breath control, mental visualization, and centering techniques."
    }
  ],

  // Mock Student Session Data for Rohan Sen
  student: {
    id: "STU-2026-084",
    name: "Rohan Sen",
    email: "rohan.sen@gmail.com",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    enrolledCoursesCount: 2,
    classesAttended: 18,
    practiceStreakDays: 6,
    nextFeeDue: "₹3,200",
    dueDate: "Nov 15, 2026",
    attendanceRate: 94,
    phone: "+91 98234 11223",
    dateOfBirth: "14 Aug 2004",
    guardianName: "Sunil Sen",
    enrolledCourses: [
      {
        id: "course-guitar",
        title: "Acoustic & Electric Guitar Mastery",
        level: "Level 2: Intermediate Harmony",
        instructor: "David Miller",
        batch: "Tue & Thu 6:30 PM",
        progress: 68,
        totalClasses: 32,
        completedClasses: 22,
        nextClass: "Tomorrow, 6:30 PM (Room 2A)",
        status: "Active"
      },
      {
        id: "course-vocals",
        title: "Contemporary & Western Vocals",
        level: "Level 1: Fundamentals of Breath & Pitch",
        instructor: "Aarav Sharma",
        batch: "Wed 7:00 PM",
        progress: 45,
        totalClasses: 24,
        completedClasses: 11,
        nextClass: "Wednesday, 7:00 PM (Studio B)",
        status: "Active"
      }
    ],
    scheduleUpcoming: [
      {
        id: "sch-1",
        course: "Acoustic Guitar - Barre Chords & Minor Pentatonics",
        instructor: "David Miller",
        date: "Tomorrow, Nov 2",
        time: "6:30 PM – 7:30 PM",
        room: "Acoustic Room 2A",
        type: "In-Person Class"
      },
      {
        id: "sch-2",
        course: "Western Vocals - Diaphragmatic Breath & Resonance",
        instructor: "Aarav Sharma",
        date: "Wednesday, Nov 4",
        time: "7:00 PM – 8:00 PM",
        room: "Vocal Studio B",
        type: "In-Person Class"
      },
      {
        id: "sch-3",
        course: "Acoustic Guitar - Rhythm Synchronization & Jamming",
        instructor: "David Miller",
        date: "Thursday, Nov 5",
        time: "6:30 PM – 7:30 PM",
        room: "Acoustic Room 2A",
        type: "In-Person Class"
      },
      {
        id: "sch-4",
        course: "Academy Weekend Open Jam Session",
        instructor: "Marcus & David",
        date: "Saturday, Nov 7",
        time: "4:00 PM – 5:30 PM",
        room: "Main Auditorium Hall",
        type: "Ensemble Rehearsal"
      }
    ],
    progressNotes: [
      {
        id: "prg-1",
        date: "Oct 29, 2026",
        course: "Acoustic Guitar",
        instructor: "David Miller",
        rating: 5,
        topic: "F Major Barre Chord Transition & Strumming",
        feedback: "Rohan's transition to the F major barre chord is noticeably cleaner this week! Hand tension has reduced by 80%. Keep practicing with the 75 BPM metronome groove.",
        homework: "Practice 'Hotel California' intro arpeggio 15 mins daily.",
        audioClip: "Audio Feedback Recorded (0:48)"
      },
      {
        id: "prg-2",
        date: "Oct 22, 2026",
        course: "Western Vocals",
        instructor: "Aarav Sharma",
        rating: 4,
        topic: "Chest-to-Mix Voice Transition",
        feedback: "Great breath support on high G notes. Need to work on keeping the soft palate lifted to avoid nasal coloration on vowels.",
        homework: "5-tone ascending scales on 'Nay' sound.",
        audioClip: "Audio Feedback Recorded (1:12)"
      }
    ],
    paymentInvoices: [
      {
        id: "INV-2026-1002",
        date: "01 Oct 2026",
        plan: "Harmony Plus (Guitar & Vocals)",
        amount: "₹3,200",
        method: "UPI (Google Pay)",
        status: "Paid",
        downloadUrl: "#"
      },
      {
        id: "INV-2026-0901",
        date: "01 Sep 2026",
        plan: "Harmony Plus (Guitar & Vocals)",
        amount: "₹3,200",
        method: "Credit Card (HDFC)",
        status: "Paid",
        downloadUrl: "#"
      },
      {
        id: "INV-2026-0801",
        date: "01 Aug 2026",
        plan: "Harmony Plus (Guitar & Vocals)",
        amount: "₹3,200",
        method: "UPI (PhonePe)",
        status: "Paid",
        downloadUrl: "#"
      }
    ]
  },

  // Mock Admin Dashboard Data
  admin: {
    stats: {
      totalStudents: 428,
      activeBatches: 34,
      monthlyRevenue: "₹8,42,000",
      attendanceRate: "94.2%",
      pendingEnquiries: 19,
      instructorsCount: 12
    },
    recentStudents: [
      { id: "STU-0428", name: "Ananya Kulkarni", course: "Piano & Keyboard", batch: "Junior Keys (Tue/Fri 4:30 PM)", feeStatus: "Paid", attendance: "96%", date: "28 Oct 2026" },
      { id: "STU-0427", name: "Rohan Sen", course: "Guitar Mastery", batch: "Adult Evening (Tue/Thu 6:30 PM)", feeStatus: "Due Nov 15", attendance: "94%", date: "25 Oct 2026" },
      { id: "STU-0426", name: "Zoya Merchant", course: "Contemporary Vocals", batch: "Adult Vocal Lab (Tue/Thu 7 PM)", feeStatus: "Paid", attendance: "90%", date: "24 Oct 2026" },
      { id: "STU-0425", name: "Kabir Deshmukh", course: "Drums Academy", batch: "Weekend Beat (Sat/Sun 11 AM)", feeStatus: "Paid", attendance: "100%", date: "22 Oct 2026" },
      { id: "STU-0424", name: "Pooja Varma", course: "Violin Ensemble", batch: "Violin Starters (Tue/Thu 4:30 PM)", feeStatus: "Overdue", attendance: "82%", date: "20 Oct 2026" }
    ],
    inquiries: [
      { id: "INQ-901", name: "Kunal Mehra", email: "kunal@gmail.com", phone: "+91 99887 76655", course: "Acoustic Guitar", message: "Looking for weekend batches for adult complete beginner.", status: "New", date: "Today, 11:20 AM" },
      { id: "INQ-900", name: "Shalini Roy", email: "shalini.roy@outlook.com", phone: "+91 98711 22334", course: "Piano for Kids", message: "My 6-year-old daughter wants to try a trial class this Saturday.", status: "Replied", date: "Yesterday, 4:45 PM" },
      { id: "INQ-899", name: "Arjun Nair", email: "arjun.nair@corp.com", phone: "+91 97654 32109", course: "Music Production", message: "Inquiry about Ableton Live and sound synthesis modules.", status: "Closed", date: "Oct 29, 2026" }
    ]
  }
};

// Ensure HarmonyData is accessible globally across all modules and scripts
if (typeof window !== 'undefined') {
  window.HarmonyData = HarmonyData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HarmonyData;
}

