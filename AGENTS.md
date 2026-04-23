# AGENTS.md

This document describes the architecture, conventions, and non-obvious decisions in the Bablade project for AI agents working on this codebase.

## Project Overview

A marketing website for Bablade, a fictional Norwegian summer soda brand. The site showcases 6 flavors with SVG bottle illustrations and a Norwegian fjord/nature background.

## Directory Structure

```
src/
  data/
    products.ts        # Product catalog — 6 flavors with color/gradient/cap data
  routes/
    __root.tsx         # Root layout: Google Fonts (Righteous + Nunito), HTML lang="no"
    index.tsx          # Home page: hero, flavor grid, about, footer
    products/
      $productId.tsx   # Product detail page with large bottle + info card
  styles.css           # Tailwind import + keyframe animations (floatBottle, scrollDot)
  router.tsx           # TanStack Router setup
public/
  favicon.ico
  placeholder.png
```

## Key Architectural Decisions

### Inline SVG for Bottle Illustrations
All bottle artwork is implemented as inline SVG React components (`BottleSvg`, `LargeBottleSvg`) rather than image files. This allows dynamic color changes based on the flavor's `color`, `colorAlt`, and `capColor` properties. No external image assets are needed for the bottles.

### Inline SVG for Norwegian Nature Background
The Norwegian fjord/nature scene (`NorwegianBackground`, `NorwegianBg`) is also inline SVG. The detail page variant tints the fjord water with the flavor's primary color for a cohesive per-flavor atmosphere. IDs for SVG gradients are namespaced per-instance (e.g., `hero-sky`, `detail-1-sky`) to avoid conflicts when multiple instances appear in the same DOM.

### Product Data Shape
`src/data/products.ts` exports a `Product` interface with:
- `color` — primary label/gradient start color (hex)
- `colorAlt` — gradient end/secondary color
- `capColor` — bottle cap color (darker than `color`)
- `labelTextColor` — always `#ffffff` for all current products

### Typography
- **Righteous** (Google Font): brand wordmark, headings, price display, CTA buttons
- **Nunito** (Google Font): body text, descriptions, badges

Both are loaded via `<link>` in `__root.tsx`'s `head()` config.

### Norwegian Language
The UI copy is in Norwegian (bokmål). The `<html>` element has `lang="no"`.

### Animations
CSS keyframes are defined in `styles.css`:
- `floatBottle`: subtle up/down float for bottle illustrations
- `scrollDot`: animated scroll indicator in the hero
These are referenced via inline `style={{ animation: ... }}` on the SVG wrapper elements.

## Coding Conventions

- **Components**: PascalCase, defined inline in route files (no separate component files currently)
- **Utilities**: camelCase
- **Imports**: `@/` alias for `src/*`
- **Tailwind**: utility classes with inline `style` props for dynamic/color values
- **No external image dependencies**: all visuals are SVG-based

## Adding a New Flavor

1. Add a new entry to `src/data/products.ts` with a unique `id` and flavor-specific colors
2. The bottle SVG and Norwegian background will automatically use the new colors
3. The Mix flavor (`id: 6`) uses all flavor colors as gradient stops — update if needed
