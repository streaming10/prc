# PRC Data & Intelligence — Project Conventions

## Overview
Corporate website for PRC Data & Intelligence — Business Intelligence, Competitive Intelligence (OSINT), and Cybersecurity / Threat Intelligence. Static site on **GitHub Pages** (no build step).

## Aesthetic Direction
**Elegancia corporativa premium** — reference: Dassault Systèmes (3ds.com). Sophisticated, luminous, technologically authoritative yet warm. Must convey: "this company protects your data and your business."

## Color Palette (CSS Custom Properties)
```css
--color-primary: #005386;       /* Deep corporate cian-blue */
--color-secondary: #0078B4;     /* Lighter blue for gradients */
--color-bg: #FAFBFC;            /* Warm white */
--color-bg-alt: #F0F2F5;        /* Pearl grey, alternating sections */
--color-accent: #C9A84C;        /* Subtle gold, premium CTAs */
--color-accent-hover: #B8953F;  /* Gold hover */
--color-text: #1E2A3A;          /* Anthracite — never pure black */
--color-text-muted: #5A6B7D;    /* Medium grey */
--color-border: #E2E6EA;        /* Soft grey borders */
--color-dark: #0A1628;          /* Dark section backgrounds */
```

## Typography (Google Fonts — max 3 families, max 7 weights)
- **Display / Headings**: Sora (600, 700) — geometric, modern authority
- **Body**: Manrope (400, 500) — warm, legible, refined
- **Mono / Stats**: IBM Plex Mono (400, 600) — technical elegance
- **PROHIBITED**: Inter, Roboto, Arial, Space Grotesk, system-ui as primary

## File Structure
```
prc/
├── index.html          # Home
├── servicios.html      # Services
├── nosotros.html       # About
├── contacto.html       # Contact
├── css/styles.css      # All styles
├── js/main.js          # All interactions
├── assets/icons/       # SVG icons
├── assets/images/      # Optimized images
└── assets/fonts/       # Self-hosted if needed
```

## CSS
- Tokens in `:root`, mobile-first, BEM naming
- Breakpoints: 480, 768, 1024, 1280 px
- Animations: CSS-only, 300-500ms hovers, 600-900ms reveals, cubic-bezier
- Glassmorphism: max 1-2 elements (nav, one card)
- No flat backgrounds — gradients, patterns, textures

## JS
- Vanilla ES6+, `'use strict'`, no frameworks
- IntersectionObserver reveals + animated counters
- Smooth scroll anchors, sticky header, mobile menu

## Animations
- Buttons: translateY(-2px) + box-shadow + color shift
- Cards: translateY(-4px) + deeper shadow
- Links: underline L→R
- Reveals: fade-up + translateY, staggered 100-150ms
- Focus: custom outline with primary color

## Logo (SVG inline, typographic)
- "PRC": weight 700, tight tracking
- "data & intelligence": weight 400, wide tracking (200-300%), uppercase, smaller
- Dark version (light bg) + light version (dark bg)

## Content
- Spanish, corporate-warm tone, no lorem ipsum
- Services: "Analítica de Datos & BI", "Inteligencia Competitiva & OSINT", "Ciberseguridad & Threat Intelligence"

## Accessibility
- Semantic HTML5, ARIA, WCAG AA contrast, skip-link, visible focus, alt text

## SEO
- Meta title/description/OG per page, single h1, Schema.org JSON-LD, loading="lazy"
- All paths relative for GitHub Pages
