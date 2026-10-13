export interface NavLink {
  label: string;
  href: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  date: string;
  bullets: string[];
}

export interface Project {
  /** Badge category, e.g. "TIME-SERIES" -> rendered as "01 // TIME-SERIES" */
  category: string;
  /** Date range shown top-right of the card */
  period: string;
  title: string;
  description: string;
  tags: string[];
  /** Footer label shown next to the repo button */
  kind: string;
  /** Leave empty to hide the "View repository" button */
  repoUrl: string;
}

export interface SkillGroup {
  category: string;
  skills: string;
}

export interface Certification {
  name: string;
  detail: string;
}

export interface EducationEntry {
  degree: string;
  school: string;
  /** Bold score text, e.g. "GPA: 8.31 / 10.0" */
  score: string;
  period: string;
}

export interface ContactLink {
  label: string;
  href: string;
  external?: boolean;
}
