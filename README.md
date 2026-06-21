# Rushikesh Patil — Portfolio

Personal portfolio site showcasing security labs, programming projects, and experiments.

**Live site → [ronkiller18.github.io/portfolio](https://ronkiller18.github.io/portfolio/)**

---

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | About, skills, contact, D20 fact roller |
| Security | `/security.html` | XSS labs, auth lab, security tester tool |
| Programming | `/programming.html` | LockBox password manager, this portfolio |
| Other | `/other.html` | Games and experiments |

Each project page has its own color theme — indigo for security, amber for programming, neon for other.

---

## Tech

- Vanilla HTML, CSS, JavaScript — no frameworks, no build tools
- Hosted on GitHub Pages
- Zero dependencies

---

## Structure

```
portfolio/
├── index.html            ← Home page
├── security.html         ← Security projects
├── programming.html      ← Programming projects
├── other.html            ← Other / games
│
├── css/
│   ├── base.css          ← Shared layout, cards, modal, nav
│   ├── home.css          ← Home page styles
│   ├── security.css      ← Indigo/blue theme
│   ├── programming.css   ← Amber/orange theme
│   └── other.css         ← Neon theme
│
├── js/
│   ├── main.js           ← Shared logic (modal close, ESC, keyboard)
│   ├── projects.js       ← Modal renderer + preview iframe overlay
│   └── home.js           ← D20 dice roller
│
└── assets/
    ├── README.md         ← How to add screenshots (read this)
    └── images/
        ├── projects/
        │   ├── screenshots/   ← WebP screenshots used in modals
        │   └── previews/      ← Card thumbnails (future use)
        └── ui/
            └── placeholder.svg
```

---

## Running locally

No server needed — just open `index.html` in a browser.

If you use VS Code, the **Live Server** extension gives you hot reload:
1. Install Live Server from the Extensions panel
2. Right-click `index.html` → Open with Live Server

---

## Adding a project

1. Add a card in the relevant HTML page (security / programming / other)
2. Add a `<template id="detail-your-slug">` block below the card grid with the project details
3. Add screenshots to `assets/images/projects/screenshots/` (WebP, 60% quality)
4. Reference them with `data-screenshots="path1.webp,path2.webp"` on the template tag

Full screenshot instructions in [`assets/README.md`](assets/README.md).

---

## Contact

- Email — Rushikesh8021@gmail.com
- LinkedIn — [iamrushikeshpatil](https://www.linkedin.com/in/iamrushikeshpatil/)
- GitHub — [Ronkiller18](https://github.com/Ronkiller18)