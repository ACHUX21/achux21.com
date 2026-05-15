# Design Brief: achux21.com — Next Iteration

## Project Identity

**achux21.com** is a dark-cyber portfolio for **Achraf Ouazzani Chahidi** — an AI security student focused on offensive security, systems programming, and supply-chain tooling. The vibe is technical, dark, immersive, and slightly cyberpunk — like a terminal interface with depth.

---

## Current State

### Stack
- **Framework:** React 19 + TypeScript + Vite 6
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **3D Scene:** Three.js + `@react-three/fiber` + `@react-three/drei` + postprocessing (Bloom, ChromaticAberration)
- **Animations:** Framer Motion (scroll/viewport animations) + GSAP (hero parallax)
- **Content:** Fully data-driven from `src/content/portfolio.ts` (single source of truth)
- **Deployment:** GitHub Pages via Actions
- **Build:** `esnext` target, manual chunks for three, r3f, framer-motion, gsap

### Palette
```
Background:    #05030a (near-black with purple tint)
Panel:         rgba(16,10,26,0.78) → rgba(12,8,20,0.92)
Text Primary:  #f1eaf9 (pale lavender white)
Text Dim:      #b5a7c8 (muted violet-gray)
Accent:        #e8beff (bright lavender)
Accent Soft:   #cbb7ff (medium lavender)
Accent Deep:   #8b73df (violet)
Lines:         rgba(193,162,255,0.18)
Lines Strong:  rgba(221,200,255,0.4)
```

### Layout Structure
1. **Fixed Nav** — brand left, section links right, mobile hamburger toggle
2. **Hero Section** — full viewport height, name as large display text, cycling status line, portfolio sidebar
3. **About** — bio paragraphs + profile card (contact details, links)
4. **Experience** — timeline cards + education/certs/languages sidebar
5. **Projects** — 2-column grid of project cards with detail modals
6. **Skills** — 3-column grid of skill categories
7. **Posts** — linkedin post cards with images
8. **Contact** — contact info + action buttons
9. **Footer** — minimal

### 3D Scene (lazy loaded, Three.js)
- Hard-edge chamber geometry (dark purple panels, wireframe accents)
- Floating layered frames with parallax response to pointer movement
- Particle field (instanced, subtly animated)
- Rotating geometric octahedra accents
- Light bars and fog/haze planes
- Bloom + chromatic aberration postprocessing
- Camera rig follows pointer with gentle idle oscillation
- Falls back to gradient background on low-power / reduced-motion

---

## Design Goals for This Iteration

### 1. Visual Polish & Depth
- [ ] **Hero display type** — the name "ACHRAF OUAZZANI CHAHIDI" should feel monumental. Consider a split reveal, staggered letter animation, or a scan-line effect on the name.
- [ ] **Status line** — currently cycles text via AnimatePresence. Could add a typewriter effect or a subtle cursor blink to match the terminal aesthetic.
- [ ] **Panel borders** — currently `rgba(193,162,255,0.18)`. Consider a subtle gradient border that shifts with scroll position or pointer.
- [ ] **Glow accents** — on hover states for buttons, links, and tags. A soft glow using box-shadow or text-shadow matching accent colors.

### 2. 3D Scene Enhancements
- [ ] **More variation in chamber** — the scene is cool but static in structure. Could add:
  - A subtle wireframe grid that scrolls with the page (tied to scroll position)
  - Floating text or code snippets as 3D sprites
  - A visible framebuffer effect on scroll (e.g., scan lines become more prominent)
- [ ] **Performance budget** — the 3D chunk is already split. Ensure it stays ~300KB max. Use instancing aggressively.

### 3. Micro-interactions & Motion
- [ ] **Scroll-triggered reveal refinements** — sections already fade up via framer-motion. Could add:
  - Staggered children with more variety
  - A subtle parallax on section cards relative to scroll
- [ ] **Project modal transitions** — entering feels smooth. Exiting could have a direction hint (card flies back to origin position).
- [ ] **Nav indicator animation** — the active section dot/underline could animate between items smoothly rather than just swapping class.

### 4. UX & Accessibility
- [ ] **Keyboard navigation** — verify full tab flow. The skip-to-content link is there but could be more visible on focus.
- [ ] **Focus indicators** — currently outline-based. Could use a glow ring (box-shadow with accent color) instead.
- [ ] **Touch targets** — on mobile, nav links and buttons should have min 44px tap targets.
- [ ] **Reduced motion** — already handled via `useLowPowerMode`. Verify all animations gracefully degrade to no-motion.

### 5. Content Presentation
- [ ] **Experience timeline** — currently stacked cards. Could use a true timeline layout with a vertical line and dot markers.
- [ ] **Skills visualization** — currently tag clouds. Could add a subtle progress-like indicator or category grouping with visual hierarchy.
- [ ] **Project cards** — the modal is good. Consider a quick-peek hover state that reveals more detail without opening the modal.
- [ ] **CTF wins emphasis** — with 3 first-place finishes, these deserve more visual weight. Maybe a trophy section or an animated counter.

### 6. Technical Polish
- [ ] **CSS scroll-driven animations** — already started with `@supports (animation-timeline: scroll())`. Extend this for entrance animations on browsers that support it (progressive enhancement).
- [ ] **Font loading** — Inter and JetBrains Mono are loaded from Google Fonts. Consider `font-display: swap` and preloading the critical weights.
- [ ] **Image optimization** — LinkedIn post images are raw uploaded JPEGs. Could serve them via a small image CDN or at least use `srcset` for responsive sizes.
- [ ] **Bundle analysis** — `npx vite-bundle-visualizer` to understand chunk sizes. The R3F chunk is the main concern.

### 7. Potential Additions
- [ ] **Terminal section** — a pseudo-terminal embedded in the page that outputs recent activity, CTF results, or blog posts. Matches the security/terminal aesthetic.
- [ ] **Scroll-driven progress bar** — a thin glowing line at the top of the viewport showing reading progress (already implemented! but could be styled more prominently).
- [ ] **Theme subtle variation** — a light toggle? Probably not for this aesthetic. But a "glow intensity" preference could be nice.

---

## Technical Constraints

1. **No API calls** — this is a static portfolio. No runtime data fetching. All content from `portfolio.ts`.
2. **GitHub Pages deploy** — output goes to `dist/`, pushed via Actions. Max bundle size should be reasonable (<2MB total).
3. **No external posts** — no auto-posting to social media, no email sending from the client.
4. **Performance for mobile** — the 3D scene is already lazy-loaded. The low-power fallback must remain solid.
5. **Content is data-driven** — any new section must add its types to `PortfolioContent` in `portfolio.ts`.
6. **Existing tech choices are intentional** — don't replace Three.js/GSAP/Framer Motion without good reason. Build on top.

---

## Implementation Order (Recommended)

```
Phase 1 — Visual Polish (hero display, borders, glow states, button hover)
Phase 2 — Motion (nav indicator, staggered reveals, modal exit direction)  
Phase 3 — 3D refinements (scroll-reactive elements, sprite text, wireframe)
Phase 4 — UX (keyboard flow, focus rings, touch targets)
Phase 5 — Content presentation (timeline, skills viz, CTF emphasis, project peek)
Phase 6 — Technical (font loading, image optimization, CSS scroll-driven)
```

---

## Reference Files

- `src/App.tsx` — main layout, sections, orchestration
- `src/index.css` — theme tokens, base styles, overlay effects
- `src/components/SceneBackground.tsx` — Three.js 3D scene
- `src/components/Nav.tsx` — fixed navigation bar
- `src/components/ProjectModal.tsx` — project detail modal
- `src/components/SectionHeader.tsx` — section title/description pattern
- `src/content/portfolio.ts` — all site content as typed data
- `src/hooks/useLowPowerMode.ts` — low-power/reduced-motion detection
- `vite.config.ts` — build configuration, chunk splitting
- `index.html` — HTML shell, SEO tags, font loading
