export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  details: string;
  features?: string[];
  link?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
  projects?: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  github: string;
  location: string;
}
