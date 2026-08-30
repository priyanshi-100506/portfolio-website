import {
  Blocks,
  BrainCircuit,
  Building2,
  Cpu,
  DatabaseZap,
  Eye,
  GitBranch,
  GraduationCap,
  Link2,
  Mail,
  Network,
  Rocket,
  Sparkles,
  Users
} from "lucide-react";

export const siteConfig = {
  name: "Priyanshi Shah",
  title: "Priyanshi Shah | AI/ML Engineer & Strategy Builder",
  description:
    "Premium portfolio for Priyanshi Shah, a Computer Science & Business Systems student specializing in applied AI/ML, predictive modeling, and scalable software systems.",
  email: "priyanshicshah@gmail.com",
  linkedin: "https://www.linkedin.com/in/priyanshi-chirag-shah-26a759319/",
  github: "https://github.com/priyanshi-100506",
  resume: "/resume/priyanshi_shah_resume.pdf" // Updated extension from .md to .pdf for cleaner downloads
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const tickerItems = [
  "Applied Machine Learning",
  "Computer Vision",
  "Agentic AI",
  "Predictive Data Pipelines",
  "Strategic Execution",
  "Platform Engineering"
];

export const capabilities = [
  {
    title: "Applied Machine Learning",
    description:
      "Modeling workflows that move from exploratory notebooks to reliable, measurable systems.",
    icon: BrainCircuit
  },
  {
    title: "Computer Vision",
    description:
      "Real-time perception systems for retail intelligence, inventory state, and operational analytics.",
    icon: Eye
  },
  {
    title: "Platform Engineering",
    description:
      "Full-stack foundations, clean data models, and delivery patterns built for scale.",
    icon: Blocks
  }
];

export const metrics = [
  { value: "9.17", label: "CGPA", icon: GraduationCap }, // Corrected from 9.19 to 9.17 to match your 3rd-year index
  { value: "15,000+", label: "SQL tuples optimized", icon: DatabaseZap },
  { value: "50+", label: "members led through SCOPE", icon: Users },
  { value: "48-hour", label: "prototype delivery", icon: Rocket }
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
      "A principled decision-tracking system where history is permanent, state is always reproducible, and every past version can be structurally compared.",
    liveDemo: "https://doxa-gules.vercel.app/",
    github: "https://github.com/priyanshi-100506/doxa"
  }
];

export const skillGroups = [
  {
    title: "AI & Deep Learning",
    skills: ["Machine Learning", "Deep Learning", "Computer Vision", "RAG Systems", "SHAP", "Predictive Modeling"],
    icon: Sparkles
  },
  {
    title: "Software Engineering",
    skills: ["Next.js", "TypeScript", "Node.js", "SQL", "API Design", "Data Pipelines"],
    icon: Cpu
  },
  {
    title: "Strategy & Cloud",
    skills: ["Strategic Execution", "Team Leadership", "Cloud Foundations", "Product Thinking", "Stakeholder Communication"],
    icon: Network
  }
];

export const contactLinks = [
  { label: "Email", href: `mailto:${siteConfig.email}`, value: siteConfig.email, icon: Mail },
  { label: "LinkedIn", href: siteConfig.linkedin, value: "linkedin.com/in/priyanshi-chirag-shah-26a759319", icon: Link2 }, // Made values cleaner for UI layout display
  { label: "GitHub", href: siteConfig.github, value: "github.com/priyanshi-100506", icon: GitBranch }
];

export const aboutHighlights = [
  "Computer Science & Business Systems student at PDEU with a 9.17 CGPA.", // Confirmed 9.17
  "Focused on production-ready AI systems that combine modeling depth with dependable engineering.",
  "Founder and Strategy Lead of SCOPE, leading 50+ members through execution-oriented initiatives.",
  "Contributor with Vidhyadaan NGO, aligning technical capability with social impact.",
  "Bridges engineering execution with business strategy to build systems that serve measurable decisions."
];

export const experiencePillars = [
  { label: "Institution", value: "PDEU", icon: Building2 },
  { label: "Academic Index", value: "9.17 CGPA", icon: GraduationCap }, // Confirmed 9.17
  { label: "Leadership", value: "Founder & Strategy Lead, SCOPE", icon: Users }
];
