# Lighthouse Intelligence Ecosystem
## UI / UX Product Roadmap

### North Star

Build a cohesive, beautiful, human-centered intelligence ecosystem
that feels calm, intuitive, clinically sophisticated, and operationally useful.

The ecosystem consists of three intelligence layers:

## COMPASS — Clinical Intelligence
Clinical reasoning, assessment, documentation, diagnosis support,
treatment planning, outcomes, supervision, coaching, and guidance.

Core question:
"What is happening with this patient, what does it mean,
and where do we go next?"

## BEACON — Operational Intelligence
Patient movement, workflows, referrals, handoffs, tasks,
medication workflows, operations, and compliance.

Core question:
"What needs to happen, who owns it, and what happens next?"

## LIGHTHOUSE — Organizational Intelligence
Quality, organizational performance, leadership intelligence,
reporting, outcomes, workforce/operations data, aggregate measures,
patient feedback, and program effectiveness.

Core question:
"What is happening across the organization,
and what does leadership need to know?"

---

# Shared Design Philosophy

Beautiful
Intuitive
Connected
Informed
Compassionate
Secure

Design should feel:
- Calm
- Spacious
- Warm
- Intelligent
- Human-centered
- Clinically credible
- Purposeful

Beauty should come primarily from information architecture,
hierarchy, spacing, typography, and interaction — not decoration.

---

# Compass Room Architecture

## 01 — Observation Room
"What do we know?"

Capture and organize the client's story before interpreting it.

## 02 — Understanding Room
"What connects?"

Identify patterns, relationships, history, clinical themes,
and explanatory connections.

## 03 — Navigation Room
"What matters now?"

Prioritize clinical concerns, risks, unanswered questions,
and decisions requiring attention.

## 04 — Growth Room
"Where do we go?"

Translate understanding into goals, interventions,
treatment planning, and meaningful next steps.

## 05 — Reflection Room
"What have we learned?"

Synthesize, document, evaluate progress,
and prepare for what comes next.

---

# UI Development Roadmap

## Phase 1 — Stabilize Compass Rooms
- Create all five Room components
- Reliable Room navigation
- Back-to-Rooms behavior
- Remove legacy tab dependency
- Establish Room-specific content boundaries
- Eliminate unnecessary redundancy

## Phase 2 — Compass Design System
Define reusable:
- Typography
- Color system
- Spacing
- Cards
- Shadows
- Borders
- Icons
- Status indicators
- Section headers
- Buttons
- Empty states
- Hover states
- Responsive behavior

## Phase 3 — Room Selector
Transform the selector into a polished clinical-thinking gateway.

## Phase 4 — Full-Screen Room Workspaces
Rooms become dedicated clinical intelligence environments rather
than content squeezed into the side panel.

## Phase 5 — Legacy UI Cleanup
Remove redundant:
- Story / Coach / Journey / Quality / Final navigation
- Duplicate executive summaries
- Duplicate live overviews
- Repeated missing-information displays
- Transitional scaffolding no longer serving the architecture

## Phase 6 — Assessment UI Polish
Bring the assessment workflow into the shared ecosystem design language.

## Phase 7 — Ecosystem Home
Create the unified Compass / Beacon / Lighthouse entry experience.

## Phase 8 — Motion & Microinteractions
Add subtle transitions and feedback without distracting from clinical work.

## Phase 9 — Production Hardening
Responsive layouts, accessibility, performance,
keyboard navigation, loading/error/empty states, and QA.

---

# Architectural Principle

ONE PATIENT.
ONE RECORD.
ONE ECOSYSTEM.

The same information may support multiple intelligence layers,
but each layer interprets it according to its purpose.

Example: PHQ-9

Compass:
What does this score mean clinically for this patient?

Beacon:
Has the measure been completed and does it require follow-up?

Lighthouse:
What do aggregate scores tell us about outcomes and program effectiveness?

Data should not be unnecessarily duplicated between intelligence layers.

---

# Current Development Priority

CURRENT PHASE: Compass Rooms + Design System

NEXT:
1. Create UnderstandingRoom.jsx
2. Create NavigationRoom.jsx
3. Create GrowthRoom.jsx
4. Create ReflectionRoom.jsx
5. Wire all Room components into CompassIntelligencePanel.jsx
6. Confirm Room selector and Back-to-Rooms navigation
7. Begin shared Compass UI design-system implementation

Do not begin major cosmetic redesign of individual Rooms until
the five-Room architecture is stable.