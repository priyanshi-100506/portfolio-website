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
  resume: "/resume/Priyanshi-Shah-Resume.md"
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
  { value: "9.19", label: "CGPA", icon: GraduationCap },
  { value: "15,000+", label: "SQL tuples optimized", icon: DatabaseZap },
  { value: "50+", label: "members led through SCOPE", icon: Users },
  { value: "48-hour", label: "prototype delivery", icon: Rocket }
];

export const projects = [
  {
    title: "ShelfPulse AI",
    tagline: "Retail intelligence from real-time shelf perception.",
    problem:
      "Retail teams lose margin and customer trust when inventory gaps, product displacement, and aisle behavior stay invisible until after the sale is missed.",
    solution:
      "A YOLOv8-based vision platform tracks shelf availability, movement patterns, and customer interaction signals so operators can intervene faster.",
    technologies: ["YOLOv8", "Python", "OpenCV", "Analytics", "Computer Vision"],
    outcome:
      "Transforms store footage into actionable inventory and customer analytics for faster replenishment decisions."
  },
  {
    title: "EduNotes AI",
    tagline: "A RAG assistant for learning material that actually answers in context.",
    problem:
      "Students need fast retrieval from dense lectures and notes, but generic search often misses semantic meaning and source grounding.",
    solution:
      "A retrieval-augmented assistant uses Whisper transcription, embeddings, vector databases, and semantic search to surface precise explanations.",
    technologies: ["RAG", "Whisper", "Vector DB", "Semantic Search", "LLM"],
    outcome:
      "Shortens the path from lecture content to study-ready answers while preserving source relevance."
  },
  {
    title: "PDAC Risk Engine",
    tagline: "Interpretable deep learning for predictive healthcare analytics.",
    problem:
      "High-risk healthcare prediction needs accuracy, but clinical stakeholders also need transparent signals behind model behavior.",
    solution:
      "A 1D-CNN framework evaluates risk patterns and uses SHAP interpretability to make model drivers inspectable.",
    technologies: ["1D-CNN", "Deep Learning", "SHAP", "Healthcare AI", "Python"],
    outcome:
      "Pairs predictive modeling with explainability so risk outputs are more trustworthy and decision-ready."
  },
  {
    title: "EstatePro Platform",
    tagline: "A normalized property platform with production-minded data architecture.",
    problem:
      "Property workflows become slow and inconsistent when listings, users, transactions, and search filters live in fragmented data structures.",
    solution:
      "A full-stack platform built with Next.js, Node.js, and a normalized SQL database containing 15,000+ tuples.",
    technologies: ["Next.js", "Node.js", "SQL", "TypeScript", "Database Design"],
    outcome:
      "Improves data integrity, query structure, and operational readiness for property discovery workflows."
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
  { label: "LinkedIn", href: siteConfig.linkedin, value: "https://www.linkedin.com/in/priyanshi-chirag-shah-26a759319/", icon: Link2 },
  { label: "GitHub", href: siteConfig.github, value: "https://github.com/priyanshi-100506", icon: GitBranch }
];

export const aboutHighlights = [
  "Computer Science & Business Systems student at PDEU with a 9.17 CGPA.",
  "Focused on production-ready AI systems that combine modeling depth with dependable engineering.",
  "Founder and Strategy Lead of SCOPE, leading 50+ members through execution-oriented initiatives.",
  "Contributor with Vidhyadaan NGO, aligning technical capability with social impact.",
  "Bridges engineering execution with business strategy to build systems that serve measurable decisions."
];

export const experiencePillars = [
  { label: "Institution", value: "PDEU", icon: Building2 },
  { label: "Academic Index", value: "9.17 CGPA", icon: GraduationCap },
  { label: "Leadership", value: "Founder & Strategy Lead, SCOPE", icon: Users }
];
