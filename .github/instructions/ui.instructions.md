---
applyTo: "/ui/**"
---

# Project Overview

**Nomadi** is a modular, production-focused SaaS starter using the MEAN stack (MongoDB, Express, Angular, Node.js) with Azure-first infrastructure.

**You will be working primarily in the `ui/` directory, which contains the Angular frontend.**

# Build & Test Commands

- **UI** (from `ui/`):
  - `npm install` — install dependencies
  - `npm run start` — Angular dev server
  - `npm run build:stage` / `npm run build:prod` — build for staging/production
  - `npm run test` — run unit tests
  - `npm run lint` — lint code
  - `npm run watch` — dev server with local config

# Conventions & Patterns

You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- DO NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

# Libraries

- **Angular 19**: Core framework for building the UI (`@angular/*`)
- **Lucide Angular**: Icon library, use `<lucide-icon>` tags (`lucide-angular`)
- **Tailwind CSS**: Utility-first CSS framework (`tailwindcss`, `@tailwindcss/postcss`)
- **DaisyUI**: Tailwind CSS component library (`daisyui`)
  - Use DaisyUI components for consistent styling
  - View https://daisyui.com/llms.txt for Rules and Guidelines
- **Animate.css**: Animation library for CSS transitions (`animate.css`)
- **Microsoft Clarity**: Analytics and session recording (`@microsoft/clarity`)
- **Angular ESLint**: Linting for Angular projects (`@angular-eslint/*`)
- **TypeScript**: Type-safe development (`typescript`)
- **Jasmine/Karma**: Unit testing framework (`jasmine-core`, `karma`, etc.)
- **PostCSS**: CSS processing (`postcss`)
