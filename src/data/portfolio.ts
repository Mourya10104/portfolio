import type {
  Certification,
  ContactLink,
  EducationEntry,
  ExperienceEntry,
  NavLink,
  Project,
  SkillGroup,
} from "@/types/portfolio";

export const site = {
  name: "Penmetsa Mourya Varma",
  logo: "Mouryavarma",
  role: "Data Engineer & Full-Stack Developer",
  title: "Penmetsa Mourya Varma — Data Engineer & Full-Stack Developer",
  description:
    "Portfolio of Penmetsa Mourya Varma, a Data Engineer and Full-Stack Developer in Hyderabad specializing in data pipelines, time-series modeling, REST APIs and AI integrations.",
  // TODO: set the deployed URL (used for Open Graph / canonical metadata)
  url: "https://example.com",
  location: "Hyderabad, India",
  github: "https://github.com/Mourya10104",
  email: "mouryavarma10104@gmail.com",
  phone: { label: "+91 86399 83485", href: "tel:+918639983485" },
};

export const nav: NavLink[] = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
];

/** Links shown in the full-screen phone menu (desktop nav plus Contact). */
export const mobileNav: NavLink[] = [...nav, { label: "Contact", href: "#contact" }];

export const hero = {
  badge: "DATA ENGINEER & FULL-STACK DEVELOPER",
  titleLines: ["PENMETSA", "MOURYA VARMA"],
  tagline: "ingesting messy datasets, modeling schemas & shipping products ⚡",
  description:
    "Specializing in data ingestion pipelines, time-series data modeling, REST API backends, and AI integrations. Experienced with live data streams, query optimization, and cloud-native applications.",
  stampText: "DATA ENGINEER • HYDERABAD • ",
};

export const marqueeItems: string[] = [
  "PYTHON",
  "SQL",
  "FASTAPI",
  "POSTGRESQL",
  "MONGODB",
  "NEXT.JS 14",
  "REACT",
  "AWS S3",
  "DOCKER",
  "ETL PIPELINES",
];

export const experienceIntro = {
  tag: "( 01 / EXPERIENCE & IMPACT )",
  heading: "ARCHITECTING ROBUST DATA SYSTEMS",
  bio: "I engineer high-integrity data aggregation workflows, optimize multi-table database queries, and integrate responsive web interfaces on top. Currently executing data architecture at STRF.",
};

export const experience: ExperienceEntry[] = [
  {
    role: "Data Engineer",
    org: "Social Tech Research Foundation (STRF) • Hyderabad, India",
    date: "Aug 2026 – Present",
    bullets: [
      "Spearhead technical execution and data architecture for foundation-driven research projects and organizational data systems.",
      "Architect and maintain robust data pipelines, ETL workflows, and relational/NoSQL schemas to ensure high-integrity data aggregation.",
      "Collaborate directly with the Technical Manager to optimize database queries, automate reporting workflows, and deliver technical tooling.",
    ],
  },
  {
    role: "Marketing Chair — Kognitiv Club",
    org: "KL University (College Activities) • Vijayawada, India",
    date: "Aug 2023 – May 2024",
    bullets: [
      "Directed promotional and marketing strategies for 200+ national symposium participants.",
      "Boosted active community membership and event engagement by 30%.",
      "Orchestrated cross-functional student teams for technical workshops and hackathons.",
    ],
  },
];

export const projectsIntro = {
  tag: "( 02 / SELECTED PROJECTS )",
  heading: "FEATURED ENGINEERING",
};

export const projects: Project[] = [
  {
    category: "TIME-SERIES",
    period: "SEP 2024 – DEC 2024",
    title: "REInt AI Forecast Monitor",
    description:
      "End-to-end data platform parsing 1,000+ live BMRS API records to model and visualize UK wind energy generation trends. Engineered a Forecast Horizon Filter and statistical MAE/P95 metrics suite, cutting query retrieval times by 40% across 5+ resilient REST endpoints.",
    tags: ["Python", "FastAPI", "React.js", "MySQL", "BMRS API"],
    kind: "DATA PIPELINE",
    repoUrl: "", // TODO: add repository URL
  },
  {
    category: "GEN-AI",
    period: "JAN 2025 – APR 2025",
    title: "AI-Powered Resume Builder",
    description:
      "Leveraged Google Gemini Flash API with prompt-engineered JSON output to generate ATS-optimized resumes. Implemented real-time token streaming via Vercel AI SDK to cut perceived UI latency from 12s to sub-second updates, backed by server-side Zod schema validation.",
    tags: ["Next.js 14", "TypeScript", "Gemini API", "Vercel AI SDK", "Zod"],
    kind: "FULL-STACK • AI",
    repoUrl: "", // TODO: add repository URL
  },
  {
    category: "CV & ML",
    period: "OCT 2024 – NOV 2024",
    title: "Hands-Free Virtual Mouse",
    description:
      "Engineered a real-time computer vision pipeline mapping 21 hand landmarks to OS-level mouse events via webcam streams. Optimized frame processing rates and landmark detection thresholds for zero-latency cursor tracking.",
    tags: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    kind: "COMPUTER VISION",
    repoUrl: "", // TODO: add repository URL
  },
  {
    category: "BACKEND",
    period: "JUL 2024 – SEP 2024",
    title: "Hotel Reservation System",
    description:
      "Architected a concurrent booking backend featuring JWT authentication, automated email triggers, and synchronized MongoDB/MySQL transactional workflows across 8+ validated REST endpoints.",
    tags: ["Node.js", "Express.js", "MongoDB", "JWT Auth"],
    kind: "ENTERPRISE BACKEND",
    repoUrl: "", // TODO: add repository URL
  },
];

export const skillsIntro = {
  script: "The Complete Stack",
  heading: "Technical Skills",
};

export const skills: SkillGroup[] = [
  {
    category: "Programming",
    skills: "Python, SQL, JavaScript (ES6+), TypeScript, Java, C, HTML5, CSS3",
  },
  {
    category: "Data & Backend",
    skills:
      "FastAPI, Node.js, Express.js, Django, REST APIs, ETL Pipelines, Data Modeling, Query Optimization",
  },
  {
    category: "Databases & Cloud",
    skills: "PostgreSQL, MySQL, MongoDB, AWS (S3), Docker (basics)",
  },
  {
    category: "Frontend & UI",
    skills: "React.js, Next.js 14, Tailwind CSS, Responsive UI Design",
  },
  {
    category: "AI/ML & Tools",
    skills: "Google Gemini API, Vercel AI SDK, OpenCV, MediaPipe, Git, GitHub, Zod, JWT",
  },
];

export const certifications: Certification[] = [
  {
    name: "Oracle Certified Architect Associate (2025)",
    detail: "Cloud Infrastructure & Solution Architecture",
  },
  {
    name: "Salesforce AI Associate (2024)",
    detail: "AI workflows, NLP fundamentals, intelligent automation",
  },
  {
    name: "Aviatrix Certified Engineer (ACE)",
    detail: "Multicloud Network Associate",
  },
  {
    name: "Wipro Talent Next",
    detail: "Java Full Stack Development",
  },
];

export const education: EducationEntry[] = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    school: "KL University (Vijayawada, India)",
    score: "GPA: 8.31 / 10.0",
    period: "Jul 2022 – Jun 2026",
  },
  {
    degree: "Intermediate in MPC",
    school: "Bhashyam Titanic Campus (Guntur, India)",
    score: "Percentage: 68 / 100",
    period: "Jul 2020 – Apr 2022",
  },
];

export const contact = {
  heading: { before: "LET'S ", link: "BUILD", after: " TOGETHER." },
  links: [
    { label: site.email, href: `mailto:${site.email}` },
    { label: site.phone.label, href: site.phone.href },
    { label: "github.com/Mourya10104 ↗", href: site.github, external: true },
  ] satisfies ContactLink[],
  copyright: "© 2026 Penmetsa Mourya Varma • Hyderabad, India",
};
