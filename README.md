# Nadia Voss — Portfolio Website

A modern, interactive graphic-designer portfolio. Blue-black theme, GSAP-driven animation, an "artboard/blueprint" motif throughout (corner brackets, ruler coordinates, a custom cursor) that echoes a designer's own tools.

## Folder structure

```
project/
├── index.html          → All markup / page structure
├── css/
│   └── style.css        → All styling (colors, layout, animation keyframes)
├── js/
│   └── script.js         → All interactivity (GSAP timelines, cursor, video hover-play, etc.)
└── assets/
    ├── images/           → Put real photos / project stills here
    └── videos/           → Put real .mp4 clips here (see below)
```

Just open `index.html` in a browser — no build step, no install. GSAP and Google Fonts load from CDN, so an internet connection is needed the first time.

## Sections

1. **Hero** — big animated title, skills marquee
2. **Selected Work** — 4 static "artboard" project cards
3. **Short-Form** (`#shorts`) — horizontal-scrolling strip of vertical 9:16 clip cards (Reels/Shorts style)
4. **Long-Form** (`#longform`) — stacked horizontal 16:9 video rows (case-study style)
5. **About** — bio + animated stat counters
6. **Process** — 4-stage workflow list
7. **Contact** — magnetic CTA button

## Customizing

- **Colors / fonts**: edit the `:root` variables at the top of `css/style.css`.
- **Copy / project names**: edit directly in `index.html`.
- **Adding a short-form video**: in `index.html`, find `<!-- NEW-SHORT-CARD-MARKER -->` inside `#shortsTrack`, duplicate the `.short-card` block above it, drop your file in `assets/videos/`, then add `src="assets/videos/yourfile.mp4"` to the `<video>` tag and delete that card's `<div class="ph"></div>` placeholder line.
- **Adding a long-form video**: same idea — find `<!-- NEW-LF-ROW-MARKER -->` inside `#longformList` and duplicate a `.lf-row` block.
- **Style variation**: short-form and long-form cards cycle their accent gradient automatically (every 4 cards / every 3 rows) via CSS `nth-child` — no manual class needed when you add more.

## Notes

- The custom cursor is desktop-only; it's disabled automatically on touch devices.
- Video cards autoplay muted on hover and pause on mouse-leave; the 🔇 icon on short-form cards toggles sound.
- Replace `hello@nadiavoss.design` and the social links in the contact/footer sections with real details before publishing.
