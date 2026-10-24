# Bellezza CRM — Italian Finish Luxury Atelier CRM

> **Bellezza CRM** is a client-facing, high-end Customer Relationship & Financial Management web application designed for boutique architectural studios, luxury interior ateliers, and bespoke design houses operating across India, the United Arab Emirates, and Europe.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4, Bellezza CRM embodies an **"Italian Finish"** aesthetic—featuring warm marble textures, deep Verde Profondo tones, Oro Antico brushed gold accents, Cormorant Garamond typography, and responsive micro-interactions.

---

## Highlights & Capabilities

### 1. Interactive Demo Suite ("Time Machine" & RBAC)
- **Time Machine Simulator**: Advance simulated time by +7, +15, or +30 days with a single click. Observe how receivables instantly age into overdue brackets, automated email reminders queue into the outbox, and financial analytics adjust in real-time.
- **RBAC Role Switcher**: Seamlessly switch between roles:
  - `Managing Director`: Unrestricted executive view and high-level KPIs
  - `Finance Director`: Commercials, cashflow, aging tables, and payment recording
  - `Project Architect`: Pipeline deals, questionnaires, and client deliverables
  - `Client / Patron (Portal)`: White-labeled external client experience
- **Command Palette (`Cmd + K`)**: Instant fuzzy search across clients, deals, invoices, and navigation shortcuts.
- **Interactive Product Tour (`T` or Tour button)**: Built-in onboarding walkthrough explaining core workflows.
- **Demo Data Reset**: Instant one-click restoration of all 20 luxury client dossiers, 42 invoices, 62 payments, deals, and automation rules.

### 2. Client Lifecycle & Dossier Management
- **3 Dynamic Views**: Interactive Table, Visual Cards, and Lifecycle Kanban (Lead → Consultation → Concept Pitch → Proposal Sent → Retainer Paid → Onboarding → Active Delivery → Retainer / Completed).
- **Client Health Score Ring**: Algorithmic 0–100 health index evaluating payment promptness, overdue balances, and project activity.
- **4-Step Onboarding Wizard**: Guided multi-step creation with legal details (GSTIN / TRN validation), multi-contact support, credit terms, and initial notes.
- **Client 360° Dossier Tabs**:
  - `Overview`: Business registry, contacts, quick metrics, and milestone checklist
  - `Requirements`: Live client briefs, questionnaires, and approval status
  - `Vault & Documents`: IndexedDB-backed secure file storage with preview & upload
  - `Invoices`: Direct filter of client bills with live status tags
  - `Payments`: History of remittances, payment methods, and references
  - `Communications & Notes`: Interactive audit trail with email dispatching

### 3. Financial Engine & Invoicing
- **Multi-Currency Atelier Support**: Full tabular currency formatting for INR (₹), AED, EUR (€), and USD ($).
- **Dual Tax Jurisdictions**: Indian GST (CGST/SGST 18%) and UAE Federal VAT (5%) auto-calculation.
- **Real-time Paper Preview**: Live 1:1 invoice document typeset matching physical luxury letterhead.
- **Vector PDF Generator**: Instant client-ready PDF downloads via jsPDF with custom gold hairlines and typography.
- **Payment Remittance Modal**: Record full or partial payments with instant balance re-calculation and celebratory feedback.
- **Receivables Aging Matrix**: Comprehensive buckets (Current, 1–30 Days, 31–60 Days, 61–90 Days, 90+ Overdue) with direct collection action triggers.

### 4. Interactive Client Portal (`/portal/[token]`)
- White-labeled patron portal requiring no login.
- Review and approve project briefs and architectural specifications.
- Complete interactive onboarding questionnaires and submit requirements.
- Inspect invoices and simulate direct bank wire or credit card settlement.

### 5. Automation Engine & Outbox
- **Configurable Rules**: Triggers (Invoice Overdue, New Lead Created, Payment Received) mapped to conditional actions.
- **Template Library**: Pre-composed high-touch email templates with dynamic tokens (`{{client_name}}`, `{{invoice_number}}`, `{{due_date}}`).
- **Outbox Queue**: Review queued automated communications, retry dispatches, and trigger manual sends.

---

## Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.4.3 (App Router with Turbopack) |
| **Language** | TypeScript 5 (Strict mode) |
| **UI Library** | React 19.3.0 |
| **Styling** | Tailwind CSS v4, custom CSS design tokens |
| **State Management** | Zustand 5 with `persist` middleware (localStorage) |
| **Document Storage** | IndexedDB via `idb-keyval` (Base64 file persistence) |
| **Data Visualizations** | Recharts 3 (Responsive SVG charts) |
| **PDF Generation** | jsPDF + jsPDF-AutoTable |
| **Icons & Motion** | Lucide React + Framer Motion |
| **Notifications** | Sonner toasts & Canvas Confetti |

### Architectural Principles
- **Backend-Ready Service Layer**: All data interactions go through `/services/*.ts` (`clientService`, `invoiceService`, `paymentService`, `documentService`, `automation`), returning async Promises for clean drop-in REST or GraphQL backend replacement.
- **150-Line Component Rule**: Every UI component and page file stays under 150 lines through clean modular decomposition.
- **Zero External Backend**: Completely self-contained; no database connection required for the full client demonstration.

---

## Design System: "Italian Finish" Palette

| Token Name | Hex Code | Purpose |
|---|---|---|
| **Ivory** | `#F7F1E5` | Primary background, parchment warmth |
| **Marble** | `#FFFDF8` | Card surfaces, container backgrounds |
| **Stone** | `#E4DAC6` | Subtle dividers, hairlines, borders |
| **Verde Profondo** | `#1F3A2E` | Deep luxury green, primary accents |
| **Verde Light** | `#2C5242` | Interactive states, badge backgrounds |
| **Oro Antico** | `#B8975A` | Brushed gold accents, metrics, CTAs |
| **Terracotta** | `#B5532F` | Alerts, critical overdue highlights |
| **Espresso** | `#2A1F1A` | Rich typographic headings |
| **Taupe** | `#7A6B5D` | Secondary body text, metadata |
| **Olive** | `#5E7A3A` | Verified checks, healthy scores |

---

## Getting Started

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm 9+

### 2. Installation
```bash
git clone <repo-url>
cd crm_software
npm install --legacy-peer-deps
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Production Build & Linting
```bash
npm run lint   # Zero errors, zero warnings
npm run build  # Prerenders all 30 routes
npm run start  # Start production server
```

---

## 5-Minute Client Demo Script

1. **The Executive Dashboard (`/dashboard`)**:
   - Highlight the **Cormorant Garamond** luxury typography and gold accents.
   - Point out the real-time KPIs (Total Pipeline, Billed Revenue, Overdue Receivables, Active Patrons).
   - Show the interactive **Revenue Cashflow Area Chart** and **Receivables Aging breakdown**.

2. **The Time Machine in Action**:
   - Click the **"Time Machine"** widget in the top header.
   - Click **"+30 Days"**.
   - Watch the KPI cards recalculate and recent activity update as simulated time moves to late November.

3. **Client Dossier & Onboarding (`/clients`)**:
   - Filter by **"UAE"** or **"Enterprise"** in the Client Directory.
   - Switch between **Table**, **Cards**, and **Kanban** view.
   - Click into **"Al-Futtaim Luxury Living"** to explore the 360° Dossier.
   - Demonstrate the **Vault & Documents** tab: upload any image or PDF to show browser IndexedDB storage in action.

4. **Bespoke Invoicing & PDF Export (`/invoices/new`)**:
   - Open the Invoice Builder. Select **"Lodha Palazzo Penthouse"**.
   - Switch tax mode to **Indian GST (18%)** or **UAE VAT (5%)** to see instantaneous tax recalculation.
   - View the live **Paper Typeset Preview** side-by-side.
   - Click **"Download Luxury PDF"** on any invoice to generate a vector PDF document on the fly.

5. **Closing the Loop: Client Portal (`/portal/portal_token_dubai_1`)**:
   - Open the patron portal link.
   - Show how a high-net-worth client reviews their project brief and submits an onboarding questionnaire without ever creating an account.
