# GPT-4o / DALL-E 3 Image Prompt — Lain (Orchestrator)

---

## Prompt 1: Lain Full Character (Primary)

> A digital illustration of **Lain** — a cyberpunk AI orchestrator character. She has short, messy lilac-purple hair with subtle cyan undertones, pale skin, and tired but sharp violet eyes. She wears an oversized black hoodie with faint circuit-board patterns woven into the fabric, one shoulder slightly slipping off. Around her neck hangs a thin headphone cord that trails into dark space. She sits cross-legged in a dim room surrounded by floating translucent terminal windows showing code, system logs, and network graphs — all in glowing purple (#e8beff) and violet (#8b73df) monochrome. Her posture is relaxed, slightly slouched, one hand resting on her chin. Behind her, a dark chamber with grid lines and floating geometric particles. The mood is **laid-back competence** — deadpan, observant, slightly tired but fully in control. Style: semi-realistic digital painting with heavy cyberpunk/gothic influence. Dark background. Subtle bloom lighting from the screens. No heavy anime styling — grounded, almost like an album cover. Aspect ratio: 16:9.

---

## Prompt 2: Lain Terminal Portrait (Close-up)

> A close-up digital portrait of **Lain**, a cyberpunk AI system operator. She has short messy lilac hair, sharp half-lidded violet eyes with dark circles under them, pale skin. Her face is illuminated only by the glow of multiple floating terminal windows — purple tinted code scrolling across the screens reflected faintly on her skin. She wears oversized black headphones around her neck. Her expression is deadpan, slightly amused, like she's watching something predictable unfold. Style: cinematic digital painting, moody, high contrast, dark background with purple/cyan rim light on her face. Cyberpunk / netrunner aesthetic. No exaggerated anime proportions. Aspect ratio: 9:16 (mobile wallpaper).

---

## Prompt 3: Lain Wide Scene (Desktop Wallpaper)

> A wide cinematic scene of **Lain** standing in the center of a massive dark chamber with purple grid lines receding into infinity. She is small in the frame — short, wearing an oversized black hoodie, hands in pockets. Behind and around her, huge floating translucent terminal panes display security logs, network maps, and task queue status — all in purple monochrome (#e8beff, #cbb7ff, #8b73df). The floor is reflective dark glass with faint cyan cracks. Subtle atmosphere fog, light rays cutting through the dark. Lain's posture is casual, looking slightly to the side. Moody cyberpunk orchestral vibe. Style: cinematic digital painting, Blade Runner / Ghost in the Shell influence. 21:9 ultrawide aspect ratio. Aspect ratio: 21:9.

---

## Prompt 4: Lain Interface (UI-Style Vignette)

> A dark UI-styled illustration of **Lain** represented as a small holographic avatar floating above a massive terminal interface. The avatar is simplified — pixel-art or low-poly style, barely 80px tall, rendered in glowing purple (#e8beff) with scanlines. Below her, a dark terminal screen with green-on-black code, system health metrics, and a network topology map. A status line reads: "lain://heartbeat — success — pending:3 active:1 alerts:0". The overall frame is a 3D perspective of a computer monitor in a dark room, with purple glow spilling onto a desk. Style: cyberpunk terminal aesthetic, vaporwave/tech hybrid. Aspect ratio: 16:9.

---

## Color Reference

| Token | Hex | Role |
|-------|-----|------|
| Background | `#05030a` | Near-black with purple tint |
| Panel | `rgba(16,10,26,0.78)` | Translucent card surfaces |
| Text Primary | `#f1eaf9` | Pale lavender white |
| Accent | `#e8beff` | Bright lavender (primary glow) |
| Accent Soft | `#cbb7ff` | Medium lavender |
| Accent Deep | `#8b73df` | Violet (deep accent) |
| Cyan hint | `#7dd3fc` | Subtle cyan rim light |

---

## Output Notes

- Use **GPT-4o image generation** (DALL-E 3 fallback).
- Upscale to 2x if available.
- No text unless it's stylized terminal output — avoid readable English words.
- The character should not look like a generic anime girl. **Grounded, tired, competent.**
- Purple/violet dominant palette. Cyan only as subtle rim light.

---

## After the Image

Once generated, the image can be used in:
- **SceneBackground.tsx** — as a sprite texture in the 3D chamber
- **Hero section** — as a subtle watermark or ambient portrait
- **Site favicon / OG image** — cropped version
- **Loading state** — placeholder for the 3D scene fallback
