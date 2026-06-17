# Design System

## Overview

Portfolio สไตล์ **clean precision** อ้างอิง Linear.app / Vercel — light background, oxblood brand accent, serif display font paired with humanist sans body. ไม่มี gradient text, ไม่มี glassmorphism, ไม่มี dark-mode glow. ทุก visual decision มีเหตุผล

---

## Colors

### Brand

| Token | Value | Role |
|-------|-------|------|
| `--primary` | `#7B0D1E` | Oxblood red — CTA, accent, links |
| `--primary-light` | `#9B1030` | Hover state |
| `--primary-dark` | `#5A0815` | Pressed / deep state |
| `--primary-bg` | `#FDF0F3` | Tinted surface (tags, icon bg) |

### Neutrals

| Token | Value | Role |
|-------|-------|------|
| `--white` | `#FFFFFF` | Page background |
| `--bg-light` | `#F7F7F8` | Alternate section bg |
| `--bg-section` | `#F2F2F4` | Deeper section variant |
| `--border` | `#E4E4E7` | Dividers, card borders |
| `--text-dark` | `#111827` | Headings, primary text |
| `--text-mid` | `#374151` | Secondary text |
| `--text-gray` | `#606876` | Descriptive / muted — 5.1:1 on white ✓ WCAG AA |
| `--text-light` | `#9CA3AF` | Labels, metadata — use sparingly |

### Elevation / Shadows

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,.06)` |
| `--shadow-md` | `0 8px 28px rgba(0,0,0,.09)` |
| `--shadow-lg` | `0 20px 50px rgba(0,0,0,.12)` |
| `--shadow-red` | `0 8px 30px rgba(123,13,30,.25)` — brand shadow on CTAs |

### Color Strategy

**Restrained** — white background, oxblood carries ≤15% of any surface area. สีแดงเป็น accent point ไม่ใช่ background filler. หลีกเลี่ยง gradient ทุกรูปแบบ

---

## Typography

### Font Stack

| Role | Family | Weights |
|------|--------|---------|
| Display | `Literata` (optical size 7–72) | 400, 700, 800 |
| Body | `Work Sans` | 300, 400, 500, 600, 700 |

**Pairing rationale:** Literata (optical serif) + Work Sans (humanist sans) — contrast axis serif/sans ให้ hierarchy ชัดโดยไม่ต้องใช้ขนาดสูง

### Scale

| Element | Size | Weight | Font |
|---------|------|--------|------|
| Hero name (h1) | `clamp(2.6rem, 6vw, 4.4rem)` | 800 | Literata |
| Section title (h2) | `clamp(1.9rem, 4vw, 2.75rem)` | 800 | Literata |
| Subsection (h3) | `1.25rem` | 700 | Literata |
| Card title (h3) | `1rem` | 700 | Literata |
| Body | `1rem / 16px` | 400 | Work Sans |
| Body small | `.935rem` | 400 | Work Sans |
| Label / meta | `.72–.82rem` | 600–700 | Work Sans |
| Stat number | `2.1rem` | 800 | Work Sans |

### Text Rules

- `text-wrap: balance` บน h1–h3 ทุกตัว
- body line-height: 1.6; prose line-height: 1.75–1.85
- max line length: 65–75ch สำหรับ paragraph
- Letter-spacing: -0.04em ขั้นต่ำสำหรับ display heading

---

## Spacing & Layout

| Token | Value |
|-------|-------|
| Section padding | `100px 0` (desktop), `72px 0` (≤480px) |
| Container max-width | `1180px` |
| Container padding | `0 24px` |
| Nav height | `72px` |

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | `8px` | Inputs, small UI |
| `--radius` | `14px` | Cards, modals |
| `--radius-xl` | `24px` | Form wrapper, large cards |
| Pill | `50px` | Buttons, tags |

### Grid Patterns

- Hero: 2-column `1fr 1fr` (collapse 1-col ≤768px)
- About: `1.25fr 1fr` (collapse ≤768px)
- Projects featured: `repeat(3, 1fr)` (2-col ≤1024px, 1-col ≤768px)
- Skills cards: `repeat(auto-fill, minmax(118px, 1fr))`
- Experience: `1fr 1fr` (collapse ≤768px)
- Contact: `1fr 1.55fr` (collapse ≤768px)

---

## Motion

| Property | Value |
|----------|-------|
| Default ease | `cubic-bezier(.4, 0, .2, 1)` (Material standard) |
| Duration default | `300ms` |
| Transform hover | `translateY(-3px)` to `translateY(-8px)` |

### Named Animations

| Name | Definition | Use |
|------|-----------|-----|
| `spin-slow` | `rotate(360deg)` 20s linear | Hero image ring |
| `float` | `translateY(0 → -10px)` 3.2s ease-in-out | Hero badges |
| `blink` | opacity 1→0→1 0.75s step-end | Typing cursor |
| `wheel` | `translateY(0 → 12px)` + fade 2s | Scroll indicator |
| Scroll reveal | `opacity 0→1, translateY 32→0` 0.7s | Section entrance |

### Reduced Motion Rule

```css
@media (prefers-reduced-motion: reduce) {
  /* ต้องเพิ่ม: disable all animations */
  .hero__image-ring, .hero__badge, .hero__scroll-wheel { animation: none; }
  .reveal, .project-card { transition: none; opacity: 1; transform: none; }
}
```
⚠️ **ยังไม่ได้ implement** — ต้องเพิ่มใน style.css

---

## Components

### Buttons

3 variants: `btn--primary` (filled oxblood), `btn--outline` (bordered), `btn--white` (inverted)
- Padding: `13px 28px` pill shape (`border-radius: 50px`)
- Hover: `translateY(-3px)` + shadow deepens
- ⚠️ ทุก `<button>` ต้องมี `type` attribute

### Tags / Badges

Pill shape (`border-radius: 50px`), `--primary-bg` background, oxblood text + thin border
ใช้สำหรับ: tech stack labels, project type badges

### Skill Cards

Grid `118px min` — icon (2rem, oxblood) + name (0.72rem uppercase). Hover: border oxblood + `translateY(-6px)` + icon `scale(1.15) rotate(-5deg)`

### Timeline

Left-side dot + vertical gradient line + card
Card: `border: 1px solid var(--border)` + inner `::before` accent bar (`height: 3px`, primary, full-width inside `overflow:hidden`) — ไม่มี side-stripe

### Project Cards

Image (aspect-ratio 16/10) + overlay + body (title, desc, tags)
Featured variant: `project-card--featured` — oxblood border + badge
Compact variant: `project-card--compact` — single line desc

### Form Inputs

`background: var(--bg-light)`, `border: 2px solid var(--border)`, focus: `border-color: var(--primary)` + ring `rgba(123,13,30,.08)`

### Modal

`border-radius: var(--radius-xl)`, `scale(.85)→scale(1)` entrance, easing `cubic-bezier(.22, 1, .36, 1)` (ease-out-circ)

---

## Known Issues (ต้องแก้)

| # | ปัญหา | ความเร่งด่วน | สถานะ |
|---|--------|-------------|--------|
| 1 | `@media (prefers-reduced-motion)` ยังไม่มี | P1 | ✅ แก้แล้ว |
| 2 | Timeline `border-left: 4px` AI slop | P1 | ✅ แก้แล้ว (::before accent bar) |
| 3 | Modal bounce easing | P2 | ✅ แก้แล้ว |
| 4 | Project card `opacity: 0` default (ต้อง JS) | P1 | ✅ แก้แล้ว (JS-gated class) |
| 5 | `--text-gray` contrast บน white | P1 | ✅ แก้แล้ว (#606876 = 5.1:1) |
| 6 | Section eyebrow tag ทุก section | P2 | ✅ แก้แล้ว (left-aligned headers + subtitle แทน tag) |
