<!--
Sync Impact Report
==================
Version change: (template) → 1.0.0
Modified principles: N/A (initial ratification — all placeholders filled)
Added sections:
  - Core Principles (5): Clean Architecture with MVVM; Reusable Component-First UI;
    Internationalization by Default; Per-Task Verification; Build Integrity
  - Technology & Quality Constraints
  - Development Workflow & Quality Gates
  - Governance
Removed sections: none (template slots consumed)
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ compatible (Constitution Check gates derived at plan time)
  - .specify/templates/spec-template.md ✅ compatible (no constitution-specific sections)
  - .specify/templates/tasks-template.md ✅ compatible (task categories accommodate test/build gates)
Follow-up TODOs: none
-->

# ELEVATE Constitution

Constitution for ELEVATE, an online consulting website.

## Core Principles

### I. Clean Architecture with MVVM

All code MUST follow Clean Architecture layering combined with the MVVM presentation
pattern:

- The codebase MUST be organized into distinct layers: **Presentation** (Views +
  ViewModels), **Domain** (entities, use cases, business rules), and **Data**
  (repositories, data sources, API clients).
- Dependencies MUST point inward only: Presentation → Domain ← Data. The Domain layer
  MUST NOT import from Presentation or Data layers.
- Views MUST be logic-free: they render state exposed by a ViewModel and forward user
  events to it. Business logic in a View is a violation.
- ViewModels MUST NOT access data sources directly; they call Domain use cases /
  repository interfaces.
- Data access MUST go through repository interfaces defined in the Domain layer and
  implemented in the Data layer.

**Rationale**: Strict layering keeps business rules independent of UI and
infrastructure, making the consulting workflows testable in isolation and safe to
evolve.

### II. Reusable Component-First UI

UI MUST be built from reusable, composable components:

- Before creating any new UI element, developers MUST check the shared component
  library and reuse or extend an existing component.
- Any visual pattern used in two or more places (buttons, cards, inputs, modals,
  section headers, etc.) MUST be extracted into a shared component.
- Shared components MUST be configurable via props/inputs — no page-specific logic or
  copy baked into a shared component.
- Duplicated markup/styles across pages is a review-blocking violation.

**Rationale**: A consulting site relies on consistent presentation across many
content-heavy pages; a component library keeps the UI coherent and changes cheap.

### III. Internationalization by Default (NON-NEGOTIABLE)

No hardcoded user-facing text, anywhere:

- Every user-facing string (labels, headings, buttons, validation and error messages,
  placeholders, alt text, page titles, meta descriptions) MUST be defined in the
  language/translation system and referenced by key.
- String literals rendered directly in Views/components are a review-blocking
  violation, including "temporary" ones.
- Translation keys MUST be organized by feature/screen and named descriptively
  (e.g., `contact.form.submit`), not by raw English text.
- New features MUST ship with entries for all supported locales (fallback locale
  entries at minimum, with TODO markers tracked for pending translations).
- Locale-sensitive formatting (dates, numbers, currency) MUST use the i18n layer, not
  manual string construction.

**Rationale**: Retrofitting i18n is far costlier than enforcing it from day one; the
site must be able to serve clients in multiple languages without a rewrite.

### IV. Per-Task Verification (NON-NEGOTIABLE)

Every task ends with proof that it works:

- After completing each implementation task, the developer MUST test the delivered
  behavior before marking the task done — automated tests where they exist, plus a
  concrete manual verification of the affected feature.
- A task with failing tests, console errors, or broken affected pages MUST NOT be
  marked complete.
- Bug fixes MUST include a test (or documented verification step) demonstrating the
  fix.
- Test evidence (what was run, what was observed) MUST be recorded in the task
  completion notes.

**Rationale**: Verifying each task at completion catches regressions immediately,
when the change is smallest and cheapest to fix.

### V. Build Integrity

The project MUST always be buildable, and delivery ends with a build:

- At the end of every completed task set (feature/milestone), a full production build
  MUST be executed and MUST succeed with zero errors.
- Build warnings introduced by the work MUST be resolved or explicitly justified in
  writing before the milestone is considered done.
- Code that breaks the production build MUST NOT be merged; fixing a broken build
  takes priority over new work.

**Rationale**: A permanently green build keeps the site deployable at any time and
prevents integration debt from accumulating silently.

## Technology & Quality Constraints

- **Project type**: Online consulting website (marketing/content pages, service
  listings, consultation booking/contact flows).
- **Architecture**: Clean Architecture + MVVM as defined in Principle I; feature
  folders internally organized by layer.
- **i18n**: A single translation system MUST be the sole source of user-facing text
  (Principle III). Adding a new locale MUST require only new resource files, no code
  changes.
- **Styling**: Shared design tokens (colors, spacing, typography) MUST be centralized;
  component-local magic values for brand styling are prohibited.
- **Accessibility**: Interactive components MUST be keyboard-accessible with
  appropriate semantic markup/ARIA.
- **Responsiveness**: All pages MUST function correctly on mobile, tablet, and desktop
  viewports.

## Development Workflow & Quality Gates

The following gates apply in order; each MUST pass before proceeding:

1. **Task gate (per task)**: Implement → test the change (Principle IV) → record
   verification evidence → mark done.
2. **Milestone gate (end of task set)**: All tasks verified → run full production
   build (Principle V) → resolve failures/warnings → milestone complete.
3. **Review gate**: Code review MUST check for: layering violations (Principle I),
   duplicated UI instead of shared components (Principle II), hardcoded user-facing
   strings (Principle III). Any of these blocks approval.
4. **Plan gate**: Feature plans produced via the spec workflow MUST include a
   Constitution Check confirming the design honors Principles I–V before
   implementation begins.

## Governance

- This constitution supersedes all other development practices for ELEVATE. Where
  guidance conflicts, the constitution wins.
- **Amendments**: Any change MUST be made by editing this file with an updated Sync
  Impact Report, a version bump per the policy below, and propagation to dependent
  templates (`.specify/templates/*.md`) in the same change.
- **Versioning policy**: Semantic versioning — MAJOR for removing/redefining a
  principle or other backward-incompatible governance change; MINOR for adding a
  principle/section or materially expanding guidance; PATCH for clarifications and
  wording fixes.
- **Compliance review**: Every feature plan and every code review MUST verify
  compliance with Principles I–V. Violations MUST be either fixed or explicitly
  justified in the plan's Complexity Tracking section before work proceeds.

**Version**: 1.0.0 | **Ratified**: 2026-07-22 | **Last Amended**: 2026-07-22
