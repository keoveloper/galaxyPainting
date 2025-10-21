# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional painting services website built with Astro 5.x, React 19, and Tailwind CSS. It's a single-page application with a component-based architecture, using pnpm as the package manager.

## Development Commands

All commands use pnpm and are run from the project root:

- `pnpm install` - Install dependencies
- `pnpm dev` - Start dev server at localhost:4321
- `pnpm build` - Build production site to ./dist/
- `pnpm preview` - Preview production build locally
- `pnpm astro ...` - Run Astro CLI commands (e.g., `pnpm astro check` for type checking)

## Architecture

### Tech Stack
- **Framework**: Astro 5.14.7 with React 19.2.0 integration
- **Styling**: Tailwind CSS 3.4.18 with custom theme
- **TypeScript**: Configured with Astro's strict tsconfig preset
- **Package Manager**: pnpm 10.6.4+

### Component Structure

The project uses a hybrid component architecture:

1. **Astro Components** (.astro files in src/components/): Static, server-rendered components that make up the majority of the UI. These are rendered at build time and sent as plain HTML. Examples include Header, Hero, Services, Gallery, Footer, etc.

2. **React Components** (.jsx files in src/components/): Interactive components requiring client-side JavaScript. These use Astro's `client:load` directive for hydration:
   - `ContactForm.jsx` - Form with state management
   - `FloatingButtons.jsx` - Sticky call-to-action buttons

   These are imported in index.astro with `client:load` to enable interactivity.

3. **Layout**: Single base layout at src/layouts/Layout.astro that provides:
   - HTML structure and meta tags
   - Global styles import (src/styles/global.css)
   - Google Fonts (Inter) integration
   - Dark theme base styles

### Page Structure

The site is a single-page application built in src/pages/index.astro. Components are composed in this order:
1. Header (navigation)
2. Hero (main banner)
3. TrustBadges
4. Services
5. WhyChooseUs
6. Gallery
7. Process
8. CTASection
9. Testimonials
10. ServiceArea
11. AboutUs
12. FAQ
13. ContactForm (React, hydrated)
14. ContactInfo
15. Footer
16. FloatingButtons (React, hydrated)

### Styling System

**Tailwind Configuration** (tailwind.config.cjs):
- Custom color palette:
  - `darkest`: #06030c (background)
  - `dark`: #131424 (secondary background)
  - `medium`: #475363 (medium tone)
  - `accent`: #d2a034 (gold accent)
- Custom font: Inter (loaded from Google Fonts)
- Extended animations and shadows

**Global Styles** (src/styles/global.css):
- Imported in Layout.astro
- Contains base reset and global styles

### TypeScript Configuration

- Extends `astro/tsconfigs/strict`
- JSX configured for React with `react-jsx` transform
- Excludes dist directory from compilation

## Key Patterns

### Astro Islands Architecture
The project uses Astro's "islands" architecture where most content is static (Astro components), with interactive "islands" (React components) hydrated only where needed using `client:load`.

### Component File Organization
- Static presentation components: .astro files
- Interactive stateful components: .jsx files (React)
- All components live in src/components/ (flat structure, no nesting)
- Single layout in src/layouts/
- Single page in src/pages/

### Styling Approach
- Utility-first with Tailwind CSS
- Dark theme by default (bg-darkest, text-slate-200)
- Custom color system defined in tailwind.config.cjs
- Component-scoped styles can be added in .astro files using `<style>` tags
