# Election of India (भारत चुनाव) 🇮🇳

> **Multiplayer Political Strategy, Democracy Simulation, and Nation Management Game**

Built strictly following the **Election of India Complete Game Development Blueprint** (`Election of India.docx`).

---

## 🏛️ Project Vision & Features

*Election of India* is more than an election game—it is an interactive sovereign political simulation where players can start as grassroots citizens, found national or regional political parties, contest high-stakes elections, form alliances, lead coalitions as Chief Minister or Prime Minister, debate on the floor of Parliament, run public opinion polls on DeshConnect, and steer national economic policy.

### Core Modules Implemented

1. **🏛️ Republic Dashboard**
   - Live Lok Sabha 543-seat composition bar and 272-seat majority tracker.
   - Real-time election phase status and countdown timers.
   - Macroeconomic health metrics (GDP, Inflation, Deficit, Public Approval).
   - Citizen-to-Prime-Minister career progress tracker and earned constitutional badges.

2. **🗺️ Sovereign India Map & Constituency Explorer**
   - Interactive state directory across all 28 States & 8 Union Territories.
   - Dual simulation modes: **Lok Sabha (Parliamentary)** and **Vidhan Sabha (Assembly)**.
   - In-depth constituency dossiers (Varanasi, Gandhinagar, Wayanad, Baramati, New Delhi, Bengaluru South, Hyderabad, etc.) with urban/rural voter ratios and local political demands.
   - Direct nomination filing from the map view.

3. **🚩 6-Step Political Party Creation Wizard**
   - **Step 1:** Name & abbreviation validation with duplicate checks.
   - **Step 2:** Official symbol selection (Lotus, Hand, Elephant, Broom, Rising Sun, Scales of Justice, Lion, etc.) and custom color palette.
   - **Step 3:** Party constitution and leadership rules (presidential election frequency, party whip enforcement, nomination ticket cost).
   - **Step 4:** Ideological alignment (Centrist, Social Democratic, Nationalist, Progressive, Regional Interest) and citizen manifesto.
   - **Step 5:** Founding cadres and initial seed treasury balance (₹50 Lakh).
   - **Step 6:** Statutory review and registration on the official Party Register.

4. **🗳️ Chunav & Campaign Headquarters (EVM Voting Machine)**
   - Server-authoritative phase simulation: *Announcement → Nominations → Campaigning → Polling → Counting → Results Declared*.
   - **Interactive EVM Unit:** Simulated Electronic Voting Machine with candidate selection and VVPAT confirmation.
   - **Campaign War Room:** Deploy simulated funds for Mega Public Rallies, DeshConnect Digital Ads, and Door-to-Door Jan Sampark.
   - **Live Counting Animation:** Round-by-round tally race with automated victory margins and celebration confetti.

5. **🏛️ Parliament of India (Sansad Bhavan)**
   - Visual chamber with Speaker's Dais, Treasury Benches (NDA), and Opposition Benches (I.N.D.I.A).
   - Notice of Motion modal to table new legislative bills.
   - Legislative division teller: Cast **AYES**, **NOES**, or **ABSTAIN** votes on bills.
   - Hansard floor speeches and intervention records.

6. **💼 Union Government Formation & Constitutional Floor Test**
   - Single-largest party identification and coalition seat aggregation.
   - Portfolios allocation: Prime Minister, Home Affairs, Finance, External Affairs, Defence, Railways, and Technology.
   - **Live Floor Test (Confidence Motion):** Test majority on the floor with roll-call division voting.

7. **📱 DeshConnect (देश कनेक्ट) — In-Game Political Social Network**
   - Verified leader badges for constitutional roles (PM, CM, MP, MLA, Party President).
   - Multimedia posts, statements, and image feeds.
   - **Interactive Opinion Polls:** Citizen polls with real-time percentage distribution.
   - Trending political hashtags (`#LokSabha2026`, `#ViksitBharat`, `#KisaanNyay`, `#DigitalAIAct`).

8. **📈 National Economy & Welfare Governance**
   - Dynamic macroeconomic gauges: Real GDP (7.2%), CPI Inflation (4.6%), Unemployment (5.8%), Fiscal Deficit (5.1%), and Citizen Trust Index (64%).
   - Interactive policy allocation sliders: Infrastructure, Agriculture & MSP, Education & AI Compute, and Ayushman Healthcare.

9. **📰 Living World Gazette & Verified Dispatch**
   - Verified news cards with source links (PIB, Election Commission, Sansad TV, IMD, Supreme Court).
   - In-game simulation consequences generated for every dispatch.
   - Custom dispatch creator for breaking political events.

10. **📻 Multiplayer Political Chambers**
    - Live room channels: Central Public Square, Sansad Floor Debates, and Party Inner Caucus.
    - Synchronized presence indicators showing active lawmakers in session.

11. **⚖️ Election Commission Admin & Audit Center**
    - Instant phase overrides to test any game stage.
    - Immutable audit trail recording votes, nominations, and floor tests.
    - Development baseline reset tool.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + TypeScript + Vite 8 |
| **Styling & Design System** | Tailwind CSS 4 + Custom Token Variables (Light Theme `#F7F9FC`, Navy `#173B67`, Saffron `#F59E0B`, Green `#16845B`) |
| **Icons** | Lucide React |
| **Animations & FX** | Canvas Confetti |
| **Backend / DB** | PostgreSQL through Supabase (`supabase/migrations/20261003_init.sql`, `supabase/seed.sql`) |
| **Local Containerization** | Docker + Docker Compose (`Dockerfile`, `docker-compose.yml`, `nginx.conf`) |
| **Mobile Packaging** | Capacitor 7 (`capacitor.config.ts`) |

---

## 🚀 Quick Start Guide

### 1. Run Locally with Vite
```bash
# Install dependencies (already completed)
npm install

# Start development server
npm run dev
```
The application will launch at `http://localhost:3000`.

### 2. Production Build
```bash
npm run build
npm run preview
```

### 3. Run with Docker Compose
```bash
docker compose up --build
```
Access the containerized web client at `http://localhost:3000`.

### 4. Supabase Setup (Optional Cloud Sync)
1. Link your Supabase project or run local Supabase:
   ```bash
   npx supabase start
   ```
2. Apply migrations:
   ```bash
   npx supabase db push
   ```
3. Set your environment variables in `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

### 5. Android Packaging (Capacitor)
```bash
# Build production bundle
npm run build

# Add Android native platform
npx cap add android

# Open in Android Studio
npx cap open android
```

---

## 📂 Project Structure

```
election-of-india/
├── public/
│   └── assets/                  # High-resolution media extracted from project blueprint
├── src/
│   ├── components/              # Header, Sidebar, MobileNav
│   ├── features/
│   │   ├── dashboard/           # Republic seat composition & overview
│   │   ├── india-map/           # Interactive state & constituency explorer
│   │   ├── parties/             # 6-Step Party Creation Wizard & Directory
│   │   ├── elections/           # Campaign HQ, EVM unit, counting animations
│   │   ├── parliament/          # Sansad Chamber, Bill introducing & division
│   │   ├── government/          # Coalition formation, portfolios, floor test
│   │   ├── deshconnect/         # Political social network & polls
│   │   ├── economy/             # Macro indicators & budget sliders
│   │   ├── news/                # Living world verified news dispatch
│   │   ├── multiplayer/         # Real-time simulated chambers
│   │   ├── profile/             # Politician career milestones & persona switch
│   │   └── admin/               # Election Commission admin controls
│   ├── services/
│   │   ├── mockData.ts          # Authentic Indian state & election seed data
│   │   └── gameStore.ts         # Authoritative state engine with persistence
│   ├── types/
│   │   └── index.ts             # Domain TypeScript definitions
│   ├── index.css                # Curated light-theme design system
│   ├── App.tsx                  # Main application orchestrator
│   └── main.tsx
├── supabase/
│   ├── migrations/              # 24 PostgreSQL tables with RLS policies
│   ├── seed.sql                 # Initial Indian states, parties & news seed
│   └── config.toml
├── docker/
│   └── nginx.conf               # High-performance SPA Nginx config
├── Dockerfile                   # Multi-stage production container
├── docker-compose.yml           # Local containerized orchestration
├── capacitor.config.ts          # Android mobile packaging configuration
├── .env.example
├── package.json
└── README.md
```

---

*Election of India 🇮🇳 — Sovereign Democratic Simulation.*
