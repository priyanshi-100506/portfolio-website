# 🌸 Complete Website Content & Data Master

This file contains **every single piece of copy, text, headline, metric, project detail, experience point, skill list, and metadata** across the entire website and all its source files (`lib/portfolio-data.ts`, `app/page.tsx`, `app/about/page.tsx`, `app/projects/page.tsx`, `app/contact/page.tsx`, `components/site-header.tsx`, `components/site-footer.tsx`, and `public/resume/Priyanshi-Shah-Resume.md`).

---

## 1. Global Metadata & Site Config (`lib/portfolio-data.ts`, `app/layout.tsx`)
- **Full Name:** Priyanshi Shah
- **Meta Title:** `Priyanshi Shah | AI/ML Engineer & Strategy Builder`
- **Meta Description:** `Premium portfolio for Priyanshi Shah, a Computer Science & Business Systems student specializing in applied AI/ML, predictive modeling, and scalable software systems.`
- **Base URL:** `https://priyanshishah.dev`
- **Email:** `priyanshicshah@gmail.com`
- **LinkedIn URL:** `https://linkedin.com/in/priyanshi-shah-26a759319`
- **LinkedIn Display Text:** `linkedin.com/in/priyanshi-shah-26a759319`
- **GitHub URL:** `https://github.com/priyanshi-100506`
- **GitHub Display Text:** `github.com/priyanshi-100506`
- **Resume Download Path:** `/resume/priyanshi_shah_resume.pdf`
- **Markdown Resume Path:** `/resume/Priyanshi-Shah-Resume.md`

---

## 2. Header & Navigation (`components/site-header.tsx`)
- **Logo / Brand Text:** `Priyanshi Shah` (with SilkFlower icon)
- **Menu Items:**
  1. `Home` → `/`
  2. `Projects` → `/projects`
  3. `About` → `/about`
  4. `Contact` → `/contact`
- **Accessibility Skip Link:** `Skip to content` → `#main`

---

## 3. Home Page (`/` — `app/page.tsx`)

### A. Hero Section
- **Badge:** `AI/ML · Systems · Strategy` (with pulse animation)
- **Main Heading:**
  > *Engineering Intelligence.*
  > **Architecting Strategy.**
- **Sub-headline:**
  > `Priyanshi Shah is a Computer Science & Business Systems student specializing in applied AI/ML, predictive modeling, and scalable software systems.`
- **Primary CTA Button:** `View Projects` (links to `/projects`)
- **Secondary CTA Button:** `About Me` (links to `/about`)
- **Bottom Scroll Indicator:** `Selected intelligence systems`
- **Background Video:** `/media/intelligence-field.mp4`

### B. Animated Infinite Ticker (`components/animated-ticker.tsx`)
- `Applied Machine Learning`
- `Computer Vision`
- `Agentic AI`
- `Predictive Data Pipelines`
- `Strategic Execution`
- `Platform Engineering`
*(Separated by glowing SilkFlower bloom icons)*

### C. Philosophy / Quote Block
- **Icon:** Silk Flower Heart
- **Quote Text:**
  > *“Where high-dimensional architecture meets strategic intelligence, I engineer systems that don't just process data—they drive decisions.”*

### D. Core Capabilities Grid
1. **Applied Machine Learning:**
   - *Description:* `Modeling workflows that move from exploratory notebooks to reliable, measurable systems.`
2. **Computer Vision:**
   - *Description:* `Real-time perception systems for retail intelligence, inventory state, and operational analytics.`
3. **Platform Engineering:**
   - *Description:* `Full-stack foundations, clean data models, and delivery patterns built for scale.`

### E. Metrics & Impact Numbers
- **`9.17`** — `CGPA`
- **`15,000+`** — `SQL tuples optimized`
- **`50+`** — `members led through SCOPE`
- **`48-hour`** — `prototype delivery`

### F. Bottom Banner
- **Eyebrow:** `Engineering & Artistry`
- **Statement:**
  > *“Built for work that needs both technical precision and strategic clarity.”*

---

## 4. Projects Page (`/projects` — `app/projects/page.tsx`, `components/project-card.tsx`)

### Page Header
- **Eyebrow:** `Projects`
- **Title:** *“Impact-focused systems across AI, data, and product engineering.”*
- **Copy:** `Each project is designed around a measurable problem, a production-minded solution, and outcomes that improve decision quality.`

---

### Project 1: ATHENA
- **Project Number:** `Project 01`
- **Title:** `ATHENA`
- **Tagline:** `Architectural Analysis Engine for Python Repos — understand any codebase before you touch it.`
- **Problem:**
  > `Navigating unfamiliar Python codebases is slow and risky: hidden circular dependencies, dead code, and unmeasured coupling silently accumulate until a refactor breaks something.`
- **Solution:**
  > `A static-analysis tool that parses Python repos via ASTs to construct module-level dependency graphs and symbol-level call graphs. Detects circular dependencies and dead code, computes coupling and instability metrics, and surfaces AI-assisted refactoring suggestions via Gemini 2.5 Flash through a FastAPI + Next.js/React/Tailwind frontend.`
- **Technologies / Tags:** `Python` | `FastAPI` | `Next.js` | `React` | `Tailwind` | `Gemini` | `AST Analysis`
- **Outcome:** `Quantifies architectural impact before changes are made — giving engineers a reliable map of any codebase rather than guesswork.`
- **Live Demo Link:** [https://athena-eta-puce.vercel.app/](https://athena-eta-puce.vercel.app/)
- **GitHub Link:** *(None currently attached)*

---

### Project 2: METIS
- **Project Number:** `Project 02`
- **Title:** `METIS`
- **Tagline:** `AI Research Intelligence Platform — real-time arXiv ingestion with AI-powered curation.`
- **Problem:**
  > `Researchers drown in paper volume. Manually tracking arXiv for relevant work across rapidly moving fields is unsustainable without automation and smart filtering.`
- **Solution:**
  > `A deployed, real-time backend platform (FastAPI + PostgreSQL + SQLAlchemy Async + AsyncPG) that continuously ingests arXiv papers, deduplicates and validates them with Pydantic, and streams AI-powered summaries (Gemini) to a React dashboard via Server-Sent Events. Containerized with Docker/Docker Compose and automated with GitHub Actions CI/CD.`
- **Technologies / Tags:** `Python` | `FastAPI` | `PostgreSQL` | `Gemini` | `Docker` | `GitHub Actions` | `Pytest` | `SSE`
- **Outcome:** `Production-ready research pipeline that surfaces curated, summarized findings in real time — owned end-to-end from ingestion correctness to CI/CD reliability.`
- **Live Demo Link:** [https://metis-ashen-seven.vercel.app/](https://metis-ashen-seven.vercel.app/)
- **GitHub Link:** [https://github.com/priyanshi-100506/metis](https://github.com/priyanshi-100506/metis)

---

### Project 3: DOXA
- **Project Number:** `Project 03`
- **Title:** `DOXA`
- **Tagline:** `Event-Sourced Decision Ledger — immutable, time-travellable technical decision records.`
- **Problem:**
  > `Engineering teams lose context on why decisions were made. In-place mutation of records destroys history, making audits and rollbacks unreliable.`
- **Solution:**
  > `An event-sourced system modeling technical decisions as immutable, append-only event logs with state derived via deterministic replay. Enforces graph invariants (blocking self-loops, invalid transitions, mutations to resolved decisions) and supports version time-travel with structural graph diffing across historical versions. 100% deterministic — zero LLM dependency in the core engine.`
- **Technologies / Tags:** `Python` | `FastAPI` | `SQLAlchemy` | `React` | `TypeScript` | `Vite` | `Event Sourcing`
- **Outcome:** `A principled decision-tracking system where history is permanent, state is always reproducible, and every past version can be structurally compared.`
- **Live Demo Link:** [https://doxa-gules.vercel.app/](https://doxa-gules.vercel.app/)
- **GitHub Link:** [https://github.com/priyanshi-100506/doxa](https://github.com/priyanshi-100506/doxa)

---

## 5. About Page (`/about` — `app/about/page.tsx`)

### Page Header
- **Eyebrow:** `About`
- **Title:** *“An engineering mind with a strategy operator's discipline.”*
- **Copy:** `Priyanshi Shah bridges applied intelligence, scalable software, and business execution.`

### Profile Card
- **Tag:** `Profile`
- **Heading:** *“Production-ready AI is where research quality meets delivery discipline.”*
- **Copy:** `Her work centers on building intelligent systems that can be understood, shipped, measured, and improved.`

### Key Highlights
1. `Computer Science & Business Systems student at PDEU with a 9.17 CGPA.`
2. `Focused on production-ready AI systems that combine modeling depth with dependable engineering.`
3. `Founder and Strategy Lead of SCOPE, leading 50+ members through execution-oriented initiatives.`
4. `Contributor with Vidhyadaan NGO, aligning technical capability with social impact.`
5. `Bridges engineering execution with business strategy to build systems that serve measurable decisions.`

### Academic & Leadership Pillars
1. **Institution:** `Pandit Deendayal Energy University (PDEU)`
2. **Academic Index:** `9.17 CGPA`
3. **Leadership:** `Founder & Strategy Lead, SCOPE`

### Skills by Category
- **AI & Deep Learning:**
  - `Machine Learning`
  - `Deep Learning`
  - `Computer Vision`
  - `RAG Systems`
  - `SHAP`
  - `Predictive Modeling`
- **Software Engineering:**
  - `Next.js`
  - `TypeScript`
  - `Node.js`
  - `SQL`
  - `API Design`
  - `Data Pipelines`
- **Strategy & Cloud:**
  - `Strategic Execution`
  - `Team Leadership`
  - `Cloud Foundations`
  - `Product Thinking`
  - `Stakeholder Communication`

---

## 6. Contact Page (`/contact` — `app/contact/page.tsx`)

### Page Header & Actions
- **Eyebrow:** `Contact`
- **Title:** *“Initiate Innovation.”*
- **Copy:** `Currently seeking AI/ML internships, engineering opportunities, and impactful collaborations.`
- **Action 1:** `Resume` (Downloads `/resume/priyanshi_shah_resume.pdf`)
- **Action 2:** `Email Priyanshi` (`mailto:priyanshicshah@gmail.com`)

### Direct Channels Card
- **Heading:** *“Direct channels”*
- **Email:** `priyanshicshah@gmail.com`
- **LinkedIn:** `linkedin.com/in/priyanshi-shah-26a759319`
- **GitHub:** `github.com/priyanshi-100506`

---

## 7. Footer (`components/site-footer.tsx`)
- **Copyright Statement:** `© 2026 Priyanshi Shah. Built with elegance & precision.`
- **Nav Links:** `Home` | `Projects` | `About` | `Contact`

---

## 8. Full Resume Content (`public/resume/Priyanshi-Shah-Resume.md`)

```markdown
# Priyanshi Shah
Ahmedabad, Gujarat, India | priyanshicshah@gmail.com
LinkedIn: linkedin.com/in/priyanshi-shah-26a759319
GitHub: github.com/priyanshi-100506

## Professional Summary
Third-year B.Tech Computer Science and Business Systems student (CGPA: 9.17/10) with hands-on experience building backend services, REST APIs, and third-party integrations using Python, FastAPI, and PostgreSQL. Comfortable working across Unix/Linux environments, containerized deployments (Docker), and CI/CD pipelines. Experienced writing automated test suites (unit, integration, end-to-end) as both a design tool and a safety net for refactoring. Uses AI to accelerate, not replace, engineering judgment. Seeking a Software Engineering Internship to build reliable, well-tested backend systems at scale.

## Education
Pandit Deendayal Energy University (PDEU), Gandhinagar, Gujarat | Expected May 2028
B.Tech in Computer Science and Business Systems | CGPA: 9.17 / 10.00
Coursework: Data Structures and Algorithms, Operating Systems, Database Management Systems, Computer Networks, Object-Oriented Programming, Software Engineering, Machine Learning, Deep Learning.

## Technical Skills
- Languages: Python, Java, C++, SQL, TypeScript, JavaScript
- Backend & APIs: FastAPI, AsyncIO, HTTPX, REST API design, third-party and service integration
- Databases & Data Modeling: PostgreSQL, AsyncPG, SQLAlchemy, SQLite
- Systems & DevOps: Linux/Unix command-line tooling, Docker, Docker Compose, Git, GitHub Actions, CI/CD, Vercel
- Testing: Pytest, Unit Testing, Integration Testing, End-to-End Testing
- CS Fundamentals: Data Structures and Algorithms, Distributed Systems, Operating Systems, DBMS, Computer Networks, OOP, SDLC
- AI/ML: Retrieval-Augmented Generation (RAG), Ollama, Gemini API, Pydantic, OpenCV, YOLO

## Experience & Leadership
- Pegasus Lab — Co-Founder & Testing Engineer (2026 – Present)
- Vidhyadaan Foundation — Digital Strategy Volunteer (May 2025 – July 2025)

## Projects
- ATHENA — Architectural Analysis Engine for Python Repos
- METIS — AI Research Intelligence Platform
- DOXA — Event-Sourced Decision Ledger
```
