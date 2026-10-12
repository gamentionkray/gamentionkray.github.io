---
name: Krishna Thorat Portfolio
description: Shared professional content across distinct visitor-selectable theme layouts.
colors:
  primary: "#326348"
  paper: "#f7f7f2"
  ink: "#202822"
  line: "color-mix(in srgb,var(--fg) 27%,var(--bg))"
  wash: "color-mix(in srgb,var(--fg) 5%,var(--bg))"
  muted: "color-mix(in srgb,var(--fg) 78%,var(--bg))"
  picker-paper: "#f8f9f5"
  picker-accent: "#294d38"
  picker-muted: "#4d584f"
  picker-line: "#c4ccc3"
  picker-focus: "#1c6841"
typography:
  display:
    fontFamily: "Nimbus, Arial, sans-serif"
    fontSize: "clamp(3.5rem,6.6vw,6rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-.035em"
  headline:
    fontSize: "clamp(1.8rem,3.6vw,3.3rem)"
    lineHeight: 1.15
    letterSpacing: "-.025em"
  title:
    fontSize: "1.55rem"
    lineHeight: 1.2
    letterSpacing: "-.02em"
  body:
    fontFamily: "Nimbus, Arial, sans-serif"
    fontSize: "17px"
    lineHeight: 1.6
  picker-body:
    fontFamily: "Arial, sans-serif"
    fontSize: "15px"
    lineHeight: 1.5
rounded:
  picker-input: "6px"
  picker-card: "10px"
  picker-filter: "20px"
  picker-launch: "30px"
spacing:
  stack-gap: ".5rem"
  navigation-gap: "1.5rem"
  project-padding: "2rem 0"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: ".65rem 1rem"
  picker-filter:
    backgroundColor: "{colors.picker-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.picker-filter}"
    padding: "9px 12px"
  picker-filter-selected:
    backgroundColor: "{colors.picker-accent}"
    textColor: "#fff"
  picker-launch:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.picker-paper}"
    rounded: "{rounded.picker-launch}"
    padding: "14px 20px"
---

# Design System: Krishna Thorat Portfolio

## Overview

This document records the implemented system, not a user-approved visual comp. The inherited multi-theme gallery has a structural refresh: 44 opening templates share professional content while varying composition, project presentation, typography and palette. No qualitative brand metaphor has been approved.

The default Minimal page uses an open introduction, portrait and spacious project index. Other themes deliberately use different spatial models, from a research abstract to a desktop, journal or project board. The picker remains visually consistent across them.

**Key Characteristics:**

- Shared facts with theme-specific opening and project structures.
- Self-hosted type and an existing photographic portrait.
- Readable mobile layouts and a consistent isolated theme picker.

## Colors

### Primary

The default green accent marks roles, links, focus and selected text. Each theme's `bg`, `fg` and `accent` values in `data/themes.json` replace the default palette; that file is the full theme palette registry.

### Neutral

Paper and ink define the default page and inverted actions. Line, wash and muted colors derive from the active foreground/background pair rather than fixed gray values. The picker uses its own paper, ink, muted, line, accent and focus colors inside Shadow DOM.

**The Picker Isolation Rule.** Theme styles must not recolor the picker controls or their text.

## Typography

**Display Font:** Nimbus, PalatinoLocal or NimbusMono, selected by theme, with Arial/sans-serif, Georgia/serif or monospace fallbacks respectively.

**Body Font:** Nimbus with Arial/sans-serif fallback; individual themes override selected text. **Label/Mono Font:** NimbusMono with monospace fallback. The picker uses Arial/sans-serif independently.

### Hierarchy

The frontmatter records the base display, headline, title and body styles; theme selectors override headings to fit their layouts. Body paragraphs cap at 70ch, introductory copy at 40ch before theme overrides. Project titles use 2rem in the shared pattern. Body text becomes 16px at the narrow breakpoint. Font files load locally with `font-display: swap`.

## Layout

The shared main container caps at 1280px with 3.5rem horizontal padding; navigation caps at 1440px. At 1100px padding decreases to 2rem; at 760px it becomes 1.3rem. Narrow project layouts collapse to one column, reset offsets and transforms, and keep the same content. Theme-specific openings retain their hierarchy with smaller portraits and adapted grids. Dashboard's fixed side rail becomes normal document navigation; Mobile App retains bottom navigation.

The six additions are Blueprint, Kanban, Library, Dossier, Studio and Atlas. All 38 previous theme URLs, including Mobile App, remain represented. `data/themes.json` maps each theme to its opening and project layout; `scripts/build.mjs` supplies the corresponding markup.

The picker is a right-side native dialog, up to 640px wide and full viewport height, with a two-column scrollable results grid. Its compact spacing breakpoint is 480px. Category controls scroll horizontally.

## Elevation & Depth

Most shared content relies on rules and tonal washes. Depth belongs to individual themes: Neubrutalism uses hard offset shadows, Claymorphism uses rounded lifted panels, and desktop/paper themes layer their surfaces. Do not impose one elevation language on all themes. Picker launch and dialog shadows separate persistent controls from page content.

### Shadow Vocabulary

- Picker launch: `0 5px 22px #0003`.
- Picker drawer: `-12px 0 40px #0002`.
- Neubrutalism project: `6px 6px 0 var(--fg)`.
- Claymorphism project: `8px 10px 28px #66364a12`.

## Shapes

Shared actions and content rules are square by default. Rounded shapes are contextual: the picker has pill filters and launcher, gently rounded search and cards, and a circular close button; Claymorphism and desktop themes have their own silhouettes. Portraits use a 3:4 crop by default with theme-specific crops. The existing portrait is grayscale at rest.

## Components

### Buttons

The shared primary action inverts foreground and background, with a minimum 44px height. Links lift 2px on hover. Theme styles may change their material treatment. Page keyboard focus uses a 3px accent outline offset 5px; picker controls use their fixed focus color with a 3px offset.

### Chips

Technology tags are compact bordered labels. Picker category filters are buttons with `aria-pressed`; the selected filter uses the picker accent with white text.

### Cards / Containers

Project articles share category, title, subtitle, description, native disclosure, stack and optional outbound link. Their surrounding grid, border, padding and material vary by theme. Picker cards use a schematic theme-colored thumbnail, a description and Current/New badges. The current page receives a stronger border and `aria-current`.

### Inputs / Fields

The picker search has a visible label, a light surface, a subtle border and a focus outline. Search matches name, description and category together with the selected filter. An empty result offers “Show all themes”; result counts are announced through a polite live region.

### Navigation

Section anchors and a skip link serve the shared page. Theme-specific navigation can be a rail, dock, tabs or project index. The normal Themes link points to `themes.html`; JavaScript enhances it to open the picker. Retain that no-JavaScript directory.

### Theme Picker

Native dialog provides modal behavior; the implementation adds keyboard focus wrapping, search focus on open, restoration on close and background scroll locking. Selection follows the theme's existing HTML URL. Reduced-motion preference disables drawer animation, page transitions and smooth scrolling. Otherwise the drawer enters over .2s, action transforms transition over .18s, and portrait filtering over .35s.

## Do's and Don'ts

### Do:

- **Do** preserve distinct opening structures and theme-appropriate project layouts.
- **Do** update shared content through the data and build sources.
- **Do** retain visible keyboard focus, labeled search and native disclosures.
- **Do** preserve theme URLs, the portrait and the no-JavaScript directory.

### Don't:

- **Don't** let page CSS leak into picker colors or controls.
- **Don't** add remote font or runtime CDN dependencies.
- **Don't** describe schematic picker thumbnails as screenshots.
- **Don't** treat this implementation record as a user-approved visual comp.
