# Technical & Contribution Guidelines

Welcome to the technical contributor hub for BetterSanPascualMasbate! 🎉

This document provides a complete guide to our technology stack, file architecture, local development workflow, styling conventions, and pull request guidelines for engineers, designers, and systems builders.

---

## Technology Stack

Our portal is built using a modern, lightweight, and highly performant frontend architecture:

*   **Core Framework**: [React 19](https://react.dev/) — utilizes the latest compiler optimizations for fast render cycles.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) — ensures strict data contract safety.
*   **Bundler & Dev Server**: [Vite](https://vite.dev/) — provides fast hot-module reloading.
*   **Styling Engine**: [Tailwind CSS v4](https://tailwindcss.com/) — supports high-performance CSS grid, flexbox, and dynamic variables.
*   **Icon Library**: [Lucide React](https://lucide.dev/) — robust SVG visual indicators.

---

## File Architecture

Below is the directory blueprint of the codebase, outlining where various views, data stores, components, and styling rules reside:

```text
src/
├── assets/         # Community logos & vector icons
├── components/     # Reusable UI shells
│   └── Layout.tsx        # Unified layout, sticky headers, hotlines, & footer
├── data/           # Mock registries & local databases
│   └── mockData.ts       # Emergency contacts, services guide, public records, landmarks
├── pages/          # Tab-specific monochromatic views
│   ├── Home.tsx          # Home page (Royal Blue monochromatic scheme)
│   ├── Services.tsx      # Municipal services list (Scarlet Red monochromatic scheme)
│   ├── Transparency.tsx  # Document filters & directories (Golden Yellow scheme)
│   └── Explore.tsx       # Chronicles timeline & island maps (Blue/Tricolor highlights)
├── types/          # Strict TypeScript contract interfaces
├── App.tsx         # Tab router and content hydrator
├── main.tsx        # React hydration entry point
└── index.css       # Monochromatic theme classes & Tailwind v4 imports
```

---

## Dynamic Monochromatic Styling

The layout utilizes a dynamic, page-aware color system based on the colors of the Philippine flag. **Do not** hardcode static Tailwind utility colors (e.g. `bg-blue-500` or `text-slate-900`) for structural elements. Instead, use our dynamic, theme-aware tokens which automatically shift color depending on the active tab:

| Variable Type | Dynamic Tailwind Utility Class | Light Mode Base Value | Dark Mode Base Value |
| :--- | :--- | :--- | :--- |
| **App Background** | `bg-app-bg` | `#ffffff` | `#000511` (Blue) / `#1a0103` (Red) / `#1f1300` (Yellow) |
| **Card Surface** | `bg-app-card` | `#ffffff` | `#000b21` (Blue) / `#3a0307` (Red) / `#3d2600` (Yellow) |
| **Card Hover** | `hover:bg-app-card-hover` | `#eff6ff` / `#fff1f2` / `#fffdf0` | `#001642` / `#5d070d` / `#5c3900` |
| **Muted Background** | `bg-app-muted` | `#f4f8ff` / `#fff8f8` / `#fffef5` | `#000b21` / `#3a0307` / `#3d2600` |
| **Primary Text** | `text-app-text` | `#001642` / `#47050a` / `#331f00` | `#ffffff` |
| **Muted Text** | `text-app-text-muted` | `#002d86` / `#8f0b18` / `#8c5f00` | `#bcd5ff` / `#ffc7cb` / `#fff085` |
| **Accent Text** | `text-app-text-dim` | `#0038a8` / `#ce1126` / `#ad7b00` | `#91baff` / `#ffa0a7` / `#ffe247` |
| **Borders** | `border-app-border` | `#bfdbfe` / `#ffc7cb` / `#fff085` | `#002164` / `#760a14` / `#8c5f00` |
| **Active Highlights**| `bg-app-primary` | `#0038a8` / `#ce1126` / `#d8a400` | `#5c92ff` / `#ff6a75` / `#ffd41a` |

---

## Local Development Workflow

### Prerequisites
Make sure Node.js (v18+) and npm are installed on your system.

### 1. Clone & Set Up the Repository
```bash
git clone https://github.com/your-username/bettersanpascualmasbate.git
npm install
```

### 2. Run in Hot-Reload Mode
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. Changing any file will instantly hot-reload the UI.

### 3. Build & Type Verification
Before submitting a PR, always compile a production build to check for lint or TypeScript static type errors:
```bash
npm run build
```
This runs the compiler (`tsc`) and builds optimized static assets into the `dist/` directory.

---

## Pull Request Guidelines

To maintain repository quality, all code submissions must adhere to the following steps:

1. **Strict Type Safety**: The codebase compiles with `strict: true`. Avoid casting using `any` or disabling lint/compiler checks.
2. **Dynamic Styling Review**: Double check that your new views or blocks support dynamic transitions. Changing tabs should smoothly transition your components through blue, red, and yellow monochromatic states.
3. **Commit Messages**: Follow standard semantic git naming structures, such as:
   - `feat(transparency): add text search query highlight to ordinances table`
   - `fix(data): update PNP station hotline mobile number`
   - `docs(readme): add responsive mobile preview screens`
4. **License Agreement**: By submitting code, you agree that your work will be licensed under our **[Creative Commons Attribution 4.0 International Public License (CC BY 4.0)](LICENSE)** terms.
