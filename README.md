# PlaceReady AI ⚔️
## AI-Powered Gamified Placement Preparation Platform

> **"Prepare Smarter. Level Up. Get Placement Ready."**  
> *"Every student starts somewhere. Your current skills do not determine your final potential. Your progress does."*

---

## 🌟 Executive Overview
**PlaceReady AI** transforms traditional, monotonous campus placement preparation into an interactive training journey inspired by the progression mechanics and aesthetic of *Solo Leveling*. 

Built specifically for Computer Science Engineering (CSE) students, PlaceReady AI merges structured curricula, server-side validated gamification, Gemini AI mock interviews, and explainable readiness metrics into a single unified web application.

---

## ⚔️ Solo Leveling Gamified Architecture

### 1. Hunter Rank Progression System
Ranks depend on genuine assessment performance and verifiable practice milestones:
1. **E-Rank (Beginner)** — Foundational coding and basic math
2. **D-Rank (Developing)** — Arrays, basic recursion, elementary CS concepts
3. **C-Rank (Intermediate)** — Standard DSA, SQL queries, normalized schemas
4. **B-Rank (Advanced)** — Medium-Hard algorithms, OS concurrency, mock tests
5. **A-Rank (Expert)** — Complex DP, Trees/Graphs, System Design fundamentals
6. **S-Rank (Elite)** — Consistently clears placement mock simulations
7. **National Elite (Apex)** — Top percentile across coding, core CS, and interview rounds

### 2. Character Attributes
- **Problem Solving** (DSA and Algorithmic agility)
- **Intelligence** (Quantitative aptitude and logical puzzles)
- **Technical Knowledge** (OOP, DBMS, OS, Computer Networks)
- **Communication** (Verbal clarity and behavioral STAR framework)
- **Development Skills** (Full-stack architecture and project execution)
- **Interview Readiness** (AI mock interview performance)

---

## 🚀 Application Modules

| Module | Purpose | Status |
|---|---|---|
| **1. Landing Page** | Dark fantasy hero, animated system window, features, sample testimonials, pricing & FAQ | ✅ Complete |
| **2. Authentication** | Supabase Auth + standalone demo mode with persistence | ✅ Complete |
| **3. Student Onboarding** | 5-phase Hunter Awakening Wizard with role calibration & baseline stats | ✅ Complete |
| **4. Main Dashboard** | Command Centre with XP progression, streak, daily missions, quick access | ✅ Complete |
| **5. Personalized Roadmap** | Week-by-week AI curriculum with difficulty and status tracking | ✅ Complete |
| **6. DSA Arena** | 100+ Curated problem bank with Python reference code & complexity | ✅ Complete |
| **7. Aptitude Training** | Speed sprint quizzes with timer, immediate scoring & step-by-step math solutions | ✅ Complete |
| **8. Technical Academy** | 9 Core CS subjects, key definitions, and interview Q&As | ✅ Complete |
| **9. Resume Forge** | AI-grounded resume review, impact scoring, and bullet enhancements | ✅ Complete |
| **10. AI Interview Arena** | Gemini AI mock technical & behavioral interviewer with feedback | ✅ Complete |
| **11. AI Senior Mentor** | 24/7 Placement mentor for conceptual questions & intuition | ✅ Complete |
| **12. Placement Tracker** | Kanban & table board for tracking campus job drives & deadlines | ✅ Complete |
| **13. Skill Tree** | Interactive node constellation (Locked, Available, In Progress, Mastered) | ✅ Complete |
| **14. Achievements** | Verified trophy gallery awarding server-backed XP | ✅ Complete |
| **15. Analytics** | Telemetry charts, accuracy by domain, and preparation trends | ✅ Complete |

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide React, Recharts, React Hook Form, Zod
- **Backend:** Node.js (ES Modules), Express.js, Helmet, CORS, Express Rate Limit, Zod
- **Database & Auth:** Supabase PostgreSQL, Row Level Security (RLS), Supabase Storage
- **AI Engine:** Google Gemini API (`@google/genai`) with structured JSON schema responses

---

## 📦 Project Structure

```text
Placement_Hack/
│
├── client/                     # Vite + React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # GlassCard, Button, FormInput, RankBadge, ProgressBar, StatCard
│   │   │   └── layout/         # Navbar, DashboardLayout (Sidebar, TopBar)
│   │   ├── context/            # AuthContext (Supabase + Demo persistence)
│   │   ├── pages/              # Landing, Login, Register, Onboarding, Dashboard, Arenas
│   │   ├── services/           # API fetch wrapper with JWT bearer token
│   │   ├── lib/                # Supabase client initializer
│   │   ├── App.jsx             # React Router routing & ProtectedRoute
│   │   ├── index.css           # Tailwind v4 theme, Solo Leveling glows & animations
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express.js Backend
│   ├── src/
│   │   ├── config/             # env.js, supabase.js
│   │   ├── controllers/        # profileController.js, gamificationController.js
│   │   ├── middleware/         # auth.js, errorHandler.js, rateLimiter.js
│   │   ├── routes/             # profileRoutes.js, gamificationRoutes.js
│   │   ├── utils/              # response.js standard formatting
│   │   ├── validators/         # profile.js, common.js (Zod)
│   │   └── app.js              # Express app setup with rate limiting & health check
│   └── package.json
│
├── database/                   # Supabase PostgreSQL Database
│   ├── schema.sql              # 27 normalized tables with constraints & indexes
│   ├── rls_policies.sql        # Row Level Security policies for user isolation
│   └── seed.sql                # 3 plans, 15 achievements, 10 skill nodes, quest templates
│
└── README.md
```

---

## ⚡ Quick Start & Verification

### 1. Run Client
```bash
cd client
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Run Server
```bash
cd server
npm run dev
```
Backend runs on [http://localhost:5000](http://localhost:5000) with health check at `/api/health`.

### 3. Instant Evaluator Demo Access
On the `/login` page, click **"⚡ Instant Evaluator Demo Access"** to immediately awaken a pre-configured Hunter Profile with active stats, roadmap, and quests!

