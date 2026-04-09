# Azure LLM Healthcare Clustering

A small React + TypeScript Vite app demonstrating clustering and visualization of healthcare and psychiatric research data using LLM-assisted analysis. This repo contains example datasets, UI components for charts and cluster cards, and explanatory sections describing methodology and validation.

**Tech stack**
- Vite
- React (TSX)
- TypeScript
- CSS (plain)

**Features**
- Interactive charts and cluster cards
- Sections explaining methodology, validation, clinical relevance, and limitations
- Two sample datasets included for demonstration

**Project structure**
- [index.html](index.html) — App entry
- [package.json](package.json) — Scripts & dependencies
- [tsconfig.json](tsconfig.json)
- [vite.config.ts](vite.config.ts)
- [src/main.tsx](src/main.tsx) — App bootstrap
- [src/App.tsx](src/App.tsx) — Root component
- [src/index.css](src/index.css) — Global styles
- [src/components](src/components) — UI components
  - [src/components/Header.tsx](src/components/Header.tsx)
  - [src/components/ClusterCards.tsx](src/components/ClusterCards.tsx)
  - [src/components/Charts.tsx](src/components/Charts.tsx)
  - [src/components/MethodologySection.tsx](src/components/MethodologySection.tsx)
  - [src/components/ResultsSection.tsx](src/components/ResultsSection.tsx)
  - [src/components/ClinicalRelevanceSection.tsx](src/components/ClinicalRelevanceSection.tsx)
  - [src/components/ClinicianValidationSection.tsx](src/components/ClinicianValidationSection.tsx)
  - [src/components/LimitationsAndScalingSection.tsx](src/components/LimitationsAndScalingSection.tsx)
  - [src/components/MethodologyComparisonSection.tsx](src/components/MethodologyComparisonSection.tsx)
  - [src/components/DatasetSection.tsx](src/components/DatasetSection.tsx)
  - [src/components/ConclusionSection.tsx](src/components/ConclusionSection.tsx)
  - [src/components/ArchitectureDiagram.tsx](src/components/ArchitectureDiagram.tsx)

- [src/data/healthcareData.ts](src/data/healthcareData.ts) — Example dataset
- [src/data/psychiatricResearchData.ts](src/data/psychiatricResearchData.ts) — Example dataset
- [src/utils/cn.ts](src/utils/cn.ts) — Utility helpers

**Getting started (development)**
1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

Open the app at the address shown by Vite (usually http://localhost:5173).

**Build for production**

```bash
npm run build
npm run preview
```

**Notes**
- This project is focused on demonstrating UI and explanatory content for clustering workflows in healthcare/psychiatric research. It includes sample data under `src/data` for demos.
- If you plan to connect real LLMs or datasets, add environment configuration and follow relevant data governance and privacy best practices.

**Contributing**
- Feel free to open issues or PRs to improve visualizations, add tests, or expand datasets.

**License**
- Add a license as appropriate for your organization or project.
