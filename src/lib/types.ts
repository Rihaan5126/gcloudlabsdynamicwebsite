export type Profile = {
  name: string;
  headline: string;
  bio: string;
  location?: string;
  email: string;
  resumeUrl?: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
};

export type SkillGroup = {
  category: string;
  skills: string[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repoHref?: string;
  highlight?: string;
  featured?: boolean;
};

export type NavLink = {
  label: string;
  href: string;
};
