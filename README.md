# Rajvenkadam S - Product Engineer Portfolio Website

This repository contains the premium, multi-page personal portfolio website of **Rajvenkadam S**, an Information Technology student, technology mentor, and founder of AMUX.

Designed with inspiration from **Stripe** (interactive visual meshes and layouts), **LinkedIn** (networking aesthetics and blue color theme), and **Vercel** (high-performance high-contrast border states and speed).

---

## 📂 Project Architecture

```text
rajvenkadam-portfolio/
├── index.html          # Home Page (Hero metrics, typed rotates, profile analytics)
├── about.html          # My Story (AMUX foundership, goals, milestone timeline)
├── skills.html         # Technical Toolbox (Animated bars, tech cloud, visual radar)
├── projects.html       # Case Studies (Grid filters, interactive modal case details)
├── experience.html     # Work Timeline (Chronological timeline of professional roles)
├── leadership.html     # Leadership Activities (HCLTech & Idea Lab Ambassadorship logs)
├── achievements.html   # Milestones (Counting telemetry, achievements wall)
├── resume.html         # PDF Viewer (ATS paper mock document, prints/PDF downloads)
├── contact.html        # Inquiries (Location map visualizer, validation forms)
├── firebase-config.js  # Firebase configuration options
├── css/
│   ├── global.css      # Design variables, resetting, mouse tracking glows, overlays
│   ├── navbar.css      # Sticky nav header, mobile burger drawer toggling
│   ├── footer.css      # Copyright blocks, live pulse indicators, quote generator
│   └── [page].css      # Modular CSS styles scoping for speed
├── js/
│   ├── global.js       # Clocks, keyboard shortcuts, particle effects, confetti bursts
│   ├── navbar.js       # Shrinking menus, page triggers, search input matcher
│   ├── theme.js        # Light/dark mode synchronizer
│   ├── visitor.js      # Visitor metrics tracker (LocalStorage database)
│   ├── particles.js    # Canvas background interactive networks loops
│   └── [page].js       # Page specific interactive scripts
├── data/
│   ├── projects.json   # Dynamic metadata representing portfolio achievements
│   ├── skills.json     # Skill levels rankings
│   └── achievements.json # Timeline milestones list
└── seo/
    ├── robots.txt      # Crawlers navigation logs
    ├── sitemap.xml     # Multi-page sitemap indexes
    ├── manifest.json   # PWA mobile setup
    └── schema.json     # Organization & Person JSON-LD schemas
```

---

## ⚡ Key Professional Features

### 1. Unique Visitor Experience System
Tracks visit statistics via browser LocalStorage to provide return visitor telemetry without tracking violations:
- Shows dashboard cards welcoming returning explorers.
- Tells visitors how many sessions they've opened.
- Pad counters (`0042`) in hero headers and footers.

### 2. Print-to-PDF Resume Overrides
The `resume.html` utilizes custom `@media print` CSS overrides. Pressing **Ctrl + P** or clicking **Save as PDF** hides navigation nodes and background particle loops, printing *only* a single-page ATS-ready paper document resume.

### 3. Keyboard Shortcut & Developer Console
Pressing `Ctrl + Shift + D` opens an interactive Developer Console overlay. Commands supported:
- `help` - Lists logs.
- `clear` - Wipes console screens.
- `theme [dark/light]` - Swaps styling rules.
- `facts` - Prints random computer facts.
- `visits` - Displays raw client tracking records.

---

## 🛢️ Activating Firebase Firestore Counters

By default, the website runs in high-performance mock mode using LocalStorage. To connect a live Firestore database:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Initialize **Cloud Firestore** in production mode.
3. Open `firebase-config.js` and replace the keys inside the `firebaseConfig` object with your web application credentials.
4. Set up a Firestore collection named `analytics` with a document named `visitor-data` containing a field `count` (integer initialized to 0).
5. Modify `js/visitor.js` to increment this Cloud Firestore document value on the user's first visit.
