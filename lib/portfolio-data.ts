import {
  Blocks,
  Bot,
  Building2,
  Cpu,
  DatabaseZap,
  GitBranch,
  GraduationCap,
  HeartHandshake,
  Layers,
  Link2,
  Mail,
  Network,
  Rocket,
  Server,
  Sparkles,
  Terminal
} from "lucide-react";

export const siteConfig = {
  name: "Priyanshi Shah",
  title: "Priyanshi Shah | Backend Engineer & Applied AI Builder",
  description:
    "Portfolio of Priyanshi Shah, a Computer Science & Business Systems student building reliable backend systems and applied AI features — REST APIs, async Python, and LLM/RAG integrations that ship.",
  email: "priyanshicshah@gmail.com",
  linkedin: "https://linkedin.com/in/priyanshi-shah-26a759319",
  github: "https://github.com/priyanshi-100506",
  resume: "/resume/priyanshi_shah_resume.pdf"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const tickerItems = [
  "Backend Systems",
  "REST API Design",
  "Async Python",
  "LLM & RAG Integration",
  "CI/CD & Deployment",
  "Distributed Systems"
];

export const capabilities = [
  {
    title: "Backend Engineering",
    description:
      "Async FastAPI services, PostgreSQL data layers, and REST APIs designed for reliability and tested end-to-end.",
    icon: Server
  },
  {
    title: "Applied AI & LLM Integration",
    description:
      "Retrieval-augmented generation, LLM API integration (Gemini, Ollama), and AI-assisted features built with the same correctness bar as hand-written code.",
    icon: Bot
  },
  {
    title: "Systems & DevOps",
    description:
      "Docker, CI/CD via GitHub Actions, and deployment pipelines that turn a working prototype into a shipped, monitored system.",
    icon: Terminal
  }
];

export const metrics = [
  { value: "9.17", label: "CGPA", subtext: "PDEU CSBS Undergraduate Index", icon: GraduationCap },
  { value: "15,000+", label: "SQL tuples optimized", subtext: "Query optimization in DBMS project", icon: DatabaseZap },
  { value: "48-hour", label: "prototype delivery", subtext: "Hackathon prototype to working demo", icon: Rocket }
];

export const projects = [
  {
    title: "ATHENA",
    tagline: "Architectural Analysis Engine for Python Repos — understand any codebase before you touch it.",
    problem:
      "Navigating unfamiliar Python codebases is slow and risky: hidden circular dependencies, dead code, and unmeasured coupling silently accumulate until a refactor breaks something.",
    solution:
      "A static-analysis tool that parses Python repos via ASTs to construct module-level dependency graphs and symbol-level call graphs. Detects circular dependencies and dead code, computes coupling and instability metrics, and surfaces AI-assisted refactoring suggestions via Gemini 2.5 Flash through a FastAPI + Next.js/React/Tailwind frontend.",
    technologies: ["Python", "FastAPI", "Next.js", "React", "Tailwind", "Gemini", "AST Analysis"],
    outcome:
      "Quantifies architectural impact before changes are made — giving engineers a reliable map of any codebase rather than guesswork.",
    liveDemo: "https://athena-eta-puce.vercel.app/"
  },
  {
    title: "METIS",
    tagline: "AI Research Intelligence Platform — real-time arXiv ingestion with AI-powered curation.",
    problem:
      "Researchers drown in paper volume. Manually tracking arXiv for relevant work across rapidly moving fields is unsustainable without automation and smart filtering.",
    solution:
      "A deployed, real-time backend platform (FastAPI + PostgreSQL + SQLAlchemy Async + AsyncPG) that continuously ingests arXiv papers, deduplicates and validates them with Pydantic, and streams AI-powered summaries (Gemini) to a React dashboard via Server-Sent Events. Containerized with Docker/Docker Compose and automated with GitHub Actions CI/CD.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Gemini", "Docker", "GitHub Actions", "Pytest", "SSE"],
    outcome:
      "Production-ready research pipeline that surfaces curated, summarized findings in real time — owned end-to-end from ingestion correctness to CI/CD reliability.",
    liveDemo: "https://metis-ashen-seven.vercel.app/",
    github: "https://github.com/priyanshi-100506/metis"
  },
  {
    title: "DOXA",
    tagline: "Event-Sourced Decision Ledger — immutable, time-travellable technical decision records.",
    problem:
      "Engineering teams lose context on why decisions were made. In-place mutation of records destroys history, making audits and rollbacks unreliable.",
    solution:
      "An event-sourced system modeling technical decisions as immutable, append-only event logs with state derived via deterministic replay. Enforces graph invariants (blocking self-loops, invalid transitions, mutations to resolved decisions) and supports version time-travel with structural graph diffing across historical versions. 100% deterministic — zero LLM dependency in the core engine.",
    technologies: ["Python", "FastAPI", "SQLAlchemy", "React", "TypeScript", "Vite", "Event Sourcing"],
    outcome:
      "A principled decision-tracking system where history is permanent, state is always reproducible, and every past version can be structurally compared — demonstrating that not every problem needs an LLM to be solved well.",
    liveDemo: "https://doxa-gules.vercel.app/",
    github: "https://github.com/priyanshi-100506/doxa"
  }
];

export const skillGroups = [
  {
    title: "Backend & APIs",
    skills: [
      "FastAPI",
      "AsyncIO / Async Python",
      "PostgreSQL / SQLAlchemy / AsyncPG",
      "REST API Design",
      "Third-party & Service Integration"
    ],
    icon: Server
  },
  {
    title: "Applied AI",
    skills: [
      "Retrieval-Augmented Generation (RAG)",
      "Gemini API",
      "Ollama",
      "Pydantic (Structured LLM Output)"
    ],
    icon: Bot
  },
  {
    title: "Systems & DevOps",
    skills: [
      "Docker / Docker Compose",
      "GitHub Actions / CI-CD",
      "Linux/Unix Tooling",
      "Pytest (Unit / Integration / E2E)"
    ],
    icon: Terminal
  },
  {
    title: "Also Worked With",
    skills: [
      "Deep Learning",
      "Computer Vision (OpenCV, YOLO)",
      "SHAP / Model Interpretability"
    ],
    icon: Sparkles
  }
];

export const contactLinks = [
  { label: "Email", href: `mailto:${siteConfig.email}`, value: siteConfig.email, icon: Mail },
  { label: "LinkedIn", href: siteConfig.linkedin, value: "linkedin.com/in/priyanshi-shah-26a759319", icon: Link2 },
  { label: "GitHub", href: siteConfig.github, value: "github.com/priyanshi-100506", icon: GitBranch }
];

export const aboutHighlights = [
  "Computer Science & Business Systems student at PDEU with a 9.17 CGPA.",
  "Builds backend services and REST APIs with FastAPI, PostgreSQL, and async Python — treated as production systems, not scripts.",
  "Co-Founder & Testing Engineer at Pegasus Lab, building automated test suites that hold AI-generated code to the same quality bar as hand-written code.",
  "Integrates LLM APIs (Gemini, Ollama) and RAG techniques into real backend pipelines — using AI to accelerate engineering, not replace judgment.",
  "Digital Strategy Volunteer with Vidhyadaan Foundation, supporting outreach and fundraising for educational initiatives."
];

export const experiencePillars = [
  { label: "Institution", value: "Pandit Deendayal Energy University (PDEU)", icon: Building2 },
  { label: "Academic Index", value: "9.17 CGPA", icon: GraduationCap },
  { label: "Role", value: "Co-Founder & Testing Engineer, Pegasus Lab", icon: Rocket }
];
