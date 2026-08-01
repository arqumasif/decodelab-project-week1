# SOLARC — Responsive Shoe Store

A fully responsive front-end e-commerce interface built as **Project 1: Responsive Frontend Interface** for the DecodeLabs Full Stack Development Internship (Batch 2026).

> "Every step follows an arc." — SOLARC is a fictional footwear brand demo showcasing running, casual, sport, and formal shoe collections.

---

## 📌 Project Overview

This project demonstrates the ability to build a clean, user-friendly, and fully responsive frontend interface using **only core web fundamentals** — no frameworks, no libraries, no build tools.

| Requirement | Status |
|---|---|
| HTML, CSS, and basic JavaScript only | ✅ |
| Responsive layout for all screen sizes | ✅ |
| Clean, user-friendly UI | ✅ |
| No frameworks (React, Bootstrap, Tailwind, etc.) | ✅ |
| Semantic HTML5 landmarks | ✅ |
| Accessibility (WCAG-conscious) | ✅ |

---

## 🗂️ File Structure

```
solarc-shoe-store/
├── index.html      # Semantic HTML5 markup — page structure & content
├── style.css        # All styling — Grid, Flexbox, responsive breakpoints
├── script.js        # Vanilla JS — cart logic, filters, mobile nav
└── README.md         # This file
```

---

## 🚀 How to Run

No installation, server, or build step required.

1. Download/clone all three files (`index.html`, `style.css`, `script.js`) into the **same folder**.
2. Double-click `index.html`, or right-click → **Open with Browser**.
3. That's it — the site runs entirely client-side.

*(Optional)* For live-reload during development, you can use the VS Code "Live Server" extension — but it is not required.

---

## 🛠️ Tech Stack

- **HTML5** — Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- **CSS3** — CSS Grid (macro/page layout), Flexbox (micro/component layout), `clamp()` for fluid typography, CSS custom properties (design tokens)
- **Vanilla JavaScript (ES6+)** — DOM manipulation, event delegation, in-memory state management
- **Google Fonts** — Montserrat (display) & Roboto (body), loaded via CDN `<link>`

No npm, no bundlers, no frameworks.

---

## 🎨 Design System

| Token | Value | Role |
|---|---|---|
| Mocha Mousse | `#A5856F` | Primary / stability |
| Ethereal Blue | `#A0D4E0` | Secondary / trust |
| Moonlit Grey | `#F2F0EA` | Background / refinement |
| Ink | `#2B241E` | Primary text |

**Typography:** Montserrat (headings, 600–800 weight) + Roboto (body, 400–700 weight) — max 2 font families, per brief constraint.

**Signature element:** A custom-drawn line-art shoe silhouette (SVG) used consistently across the logo, hero visual, and product icons — replacing generic stock photography with a cohesive, brand-specific visual identity.

---

## 📱 Responsive Breakpoints (Mobile-First)

| Breakpoint | Width | Layout Change |
|---|---|---|
| Default (mobile) | < 768px | Single column, off-canvas nav, stacked product grid |
| Tablet | ≥ 768px | Horizontal nav, 2-column feature grid, side-by-side hero |
| Desktop | ≥ 1024px | 4-column product grid, expanded spacing |

Approach: build the single-column mobile layout first, then progressively enhance with `min-width` media queries — as specified in the project brief.

---

## ✨ Features

- **Sticky, responsive header** with mobile hamburger menu (off-canvas nav)
- **Category filter tabs** (All / Running / Casual / Sport / Formal) — dynamic JS filtering, no page reload
- **Product catalogue** — 8 products across 4 collections, rendered dynamically from a JS data array
- **Shopping cart** — Add to Bag, live item count, running total, remove items, slide-in cart drawer
- **Newsletter signup form** with inline validation feedback
- **Keyboard & screen-reader friendly**: skip-to-content link, visible focus states, `aria-*` attributes on interactive elements, `prefers-reduced-motion` support

---

## ♿ Accessibility & Performance Notes

- Semantic landmark elements used throughout for screen reader navigation
- All interactive controls (buttons, links, form fields) have accessible labels
- Focus states are visible and never suppressed
- Motion respects `prefers-reduced-motion: reduce`
- No layout-shifting images — SVG icons scale without reflow, supporting good CLS (Cumulative Layout Shift)
- Google Fonts preconnected for faster load

---

## 🔮 Possible Future Enhancements

- Persist cart state with `localStorage` (kept in-memory here per this project's scope)
- Product detail modal/page
- Size and color variant selection
- Connect to a real backend (planned for later project milestones in this internship track)

---

## 👤 Credits

Built for **DecodeLabs Internship Program — Project 1**
📧 decodelabs.tech@gmail.com | 🌍 www.decodelabs.tech | 📍 Greater Lucknow, India
