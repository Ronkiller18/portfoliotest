# Assets

All static assets for the portfolio site live here.
Nothing image-related should be hardcoded into HTML or CSS — reference from this folder instead.

---

## Folder structure

```
assets/
├── images/
│   ├── projects/
│   │   ├── screenshots/     ← full-page or cropped screenshots of your projects
│   │   │                       naming: <project-slug>.png  e.g. lockbox.png
│   │   │
│   │   └── previews/        ← smaller card-preview thumbnails (used in card grid)
│   │                           naming: <project-slug>-preview.png  e.g. lockbox-preview.png
│   │                           recommended size: 640×400 px
│   │
│   └── ui/
│       └── placeholder.svg  ← shown automatically when a screenshot is missing
│
├── icons/                   ← any custom SVG icons (favicon, social, etc.)
│
└── fonts/                   ← self-hosted fonts if you add any later
```

---

## How to add a project screenshot

1. Take a screenshot of your project (browser window or cropped content)
2. Save it as PNG: `assets/images/projects/screenshots/<project-slug>.png`
3. For the card preview thumbnail, save a smaller/cropped version:
   `assets/images/projects/previews/<project-slug>-preview.png`
4. In `js/projects.js`, update the project's `screenshot` and `preview` fields:

```js
const projects = {
  'security-tester': {
    screenshot: 'assets/images/projects/screenshots/security-tester.png',
    preview:    'assets/images/projects/previews/security-tester-preview.png',
    // ...
  }
}
```

If no screenshot is provided, the site automatically falls back to `assets/images/ui/placeholder.svg`.

---

## Project slugs (current)

| Project                     | Slug                | Page               |
|-----------------------------|---------------------|--------------------|
| Client-Side Security Tester | `security-tester`   | security.html      |
| Interactive Web Security Lab| `bug-bounty-lab`    | security.html      |
| Authentication Lab          | `auth-lab`          | security.html      |
| LockBox                     | `lockbox`           | programming.html   |
| Portfolio Website           | `portfolio`         | programming.html   |
| Browser Game                | `browser-game`      | other.html         |

---

## Recommended screenshot sizes

| Use              | Size       | Format |
|------------------|------------|--------|
| Card preview     | 640×400 px | PNG    |
| Modal screenshot | 1280×800 px| PNG    |
| Favicon          | 32×32 px   | PNG/SVG|