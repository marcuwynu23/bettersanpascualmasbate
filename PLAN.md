# Role & Project Objective
Act as an expert Frontend Software Engineer. Your task is to build a clean, minimalist, and highly performant client-side web application for "BetterSanPablo.org"—a volunteer-led, non-official community transparency portal for San Pablo City, Laguna. 

The user interface must be modern, highly scannable, and completely self-contained on the frontend using TypeScript, React, Vite, and Tailwind CSS. All data must be driven by clean, local mock JSON structures.

---

# Design & UI Philosophy
- **Clean & Minimalist:** Use ample white space, sharp typography, and a cohesive, professional color palette (e.g., slate/indigo accents balanced with neutral backgrounds). Avoid cluttered dashboards.
- **Scannability First:** Information must be digestible at a glance. Use structured cards, distinct data tables, and explicit visual hierarchies.
- **Global Disclaimer:** Every view must feature a permanent, clearly visible header or footer banner stating: *"BetterSanPablo.org is a volunteer-built, non-official transparency portal. It is not affiliated with or operated by the official local government unit."*

---

# Application Structure & Layout
Generate the file directory structure (`src/components`, `src/data`, `src/pages`, etc.) and provide the implementation for a unified `Layout.tsx` that manages:
1. A clean, sticky Top Navigation Bar (with links to Home, Services, Transparency, and Explore).
2. A high-visibility **Emergency Hotlines Panel** (CDRRMO, PNP, BFP, 911) accessible globally or fixed prominently.
3. The global non-official disclaimer banner.
4. An environment-identifying banner component that checks `import.meta.env.MODE` and highlights if the app is running in `development` or `staging`.

---

# Page-Specific Specifications & Components
Generate the following modular React views using local TypeScript interfaces and dummy data files:

### 1. Home / Dashboard (`/`)
- A minimal hero section explaining the portal's purpose.
- Quick-access grid linking to popular local services.
- A "San Pablo at a Glance" stat grid showing key metrics: Population (300,166), Barangays (80), Crater Lakes (7), and Cityhood Year (1940).

### 2. Services & External Portals (`/services`)
- A grid of informational cards categorized by sector (Health, Education, Business, Social Welfare, Waste Disposal).
- An "Official Portals Gateway" component with styled external anchor tags directing users to actual LGU transaction pages (e.g., Real Property Tax, BPLO, eLGU) with explicit "External Link" visual cues (`↗`).

### 3. Interactive Transparency Registry (`/transparency`)
- Create a client-side filterable and searchable **Data Table** component.
- The table must load a local array of mock public records (Ordinances, Resolutions, Executive Orders, and Annual Budgets).
- Include an intuitive text search bar and a dropdown category filter to sort through the records smoothly on the client side.

### 4. Explore & History (`/explore`)
- A responsive card grid layout showcasing local landmarks (e.g., Sampaloc Lake, Pandin Lake, Yambo Lake, Museo ng San Pablo).
- A clean, vertical timeline component mapping historical milestones (from the 1586 parish founding to the annual Coco Festival).

---

# Expected Code Output
1. **Directory Blueprint:** A clean folder tree structure.
2. **TypeScript Interfaces:** Data definitions for `PublicRecord`, `CityOfficial`, and `Landmark`.
3. **Core Scaffolding:** Complete code for the `Layout.tsx` (incorporating navigation, emergency sidebar/panel, and the environment banner).
4. **Data Table Component:** The complete filterable registry component for the transparency page.