# Assets

All static assets for the portfolio live here.
No image paths should be hardcoded into HTML or CSS — reference from this folder.

---

## Folder structure

```
assets/
├── images/
│   ├── projects/
│   │   ├── screenshots/     ← project screenshots shown in modal gallery
│   │   └── previews/        ← card thumbnail (shown on card hover, future use)
│   └── ui/
│       └── placeholder.svg  ← shown when a screenshot is missing
├── icons/
└── fonts/
```

---

## Screenshot format recommendation

Use **WebP** at **60% quality**. This gives excellent visual quality at a fraction of PNG size.

| Use case         | Resolution  | Quality | Typical size |
|------------------|-------------|---------|--------------|
| Modal screenshot | 1280 × 800  | WebP 60%| 80–150 KB    |
| Card thumbnail   | 640 × 360   | WebP 60%| 20–40 KB     |

**How to export WebP at 60%:**
- **Squoosh** (free, browser): squoosh.app — drag image, set WebP, quality 60
- **Sharp CLI**: `sharp input.png -o output.webp -q 60`
- **macOS Preview**: Export → Format: JPEG → rename to .webp (rough, use Squoosh instead)

---

## How to add screenshots to a project

### Single screenshot
Add one file, reference it on the template:
```html
<template id="detail-lockbox"
  data-screenshots="assets/images/projects/screenshots/lockbox-1.webp">
```

### Multiple screenshots (gallery)
Drop multiple files, comma-separate the paths:
```html
<template id="detail-lockbox"
  data-screenshots="assets/images/projects/screenshots/lockbox-1.webp,assets/images/projects/screenshots/lockbox-2.webp,assets/images/projects/screenshots/lockbox-3.webp">
```
The modal will show the first image large, with a thumbnail strip below.
Clicking a thumbnail swaps the main image. Recommended: 2–3 screenshots max.

### No screenshot yet
Leave `data-screenshots` off the template entirely (or empty).
The screenshot section hides automatically — no flicker, no placeholder shown.

---

## Naming convention

`<slug>-<number>.webp`

| Project                     | Slug             | Example files                              |
|-----------------------------|------------------|--------------------------------------------|
| Client-Side Security Tester | security-tester  | security-tester-1.webp, security-tester-2.webp |
| Interactive Web Security Lab| bug-bounty-lab   | bug-bounty-lab-1.webp                      |
| Authentication Lab          | auth-lab         | auth-lab-1.webp                            |
| LockBox                     | lockbox          | lockbox-1.webp, lockbox-2.webp             |
| Portfolio Website           | portfolio        | portfolio-1.webp                           |
| Browser Game                | browser-game     | browser-game-1.webp                        |

---

## Project slugs → template IDs

| Page             | Template ID              |
|------------------|--------------------------|
| security.html    | detail-security-tester   |
| security.html    | detail-bug-bounty-lab    |
| security.html    | detail-auth-lab          |
| programming.html | detail-lockbox           |
| programming.html | detail-portfolio         |
| other.html       | (add as needed)          |