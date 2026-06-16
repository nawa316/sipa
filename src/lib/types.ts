// Type definitions for API responses

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  published_at: string;
  read_time: number;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link: string;
  github: string;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: number;
  organization: string;
  role: string;
  description: string;
  image: string;
  start_date: string;
  end_date: string | null;
  type: 'organization' | 'work' | 'volunteer';
  skills: string[];
  location: string;
  photos?: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateBlogInput {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  author: string;
  category: string;
  tags?: string[];
  published_at: string;
  read_time: number;
}

export interface UpdateBlogInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  author?: string;
  category?: string;
  tags?: string[];
  published_at?: string;
  read_time?: number;
}

export interface CreatePortfolioInput {
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  category: string;
  link?: string;
  github?: string;
}

export interface UpdatePortfolioInput {
  title?: string;
  description?: string;
  image?: string;
  technologies?: string[];
  category?: string;
  link?: string;
  github?: string;
}

export interface CreateExperienceInput {
  organization: string;
  role: string;
  description: string;
  image?: string;
  start_date: string;
  end_date?: string | null;
  type: 'organization' | 'work' | 'volunteer';
  skills?: string[];
  location?: string;
  photos?: string[];
}

export interface UpdateExperienceInput {
  organization?: string;
  role?: string;
  description?: string;
  image?: string;
  start_date?: string;
  end_date?: string | null;
  type?: 'organization' | 'work' | 'volunteer';
  skills?: string[];
  location?: string;
  photos?: string[];
}

export interface Profile {
  id: number;
  name: string;
  tagline: string;
  about_text: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  cv_url: string;
  photo_url: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileInput {
  name?: string;
  tagline?: string;
  about_text?: string;
  email?: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  cv_url?: string;
  photo_url?: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  major: string;
  start_date: string;
  end_date: string | null;
  gpa: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEducationInput {
  institution: string;
  degree: string;
  major?: string;
  start_date: string;
  end_date?: string | null;
  gpa?: string;
  description?: string;
}

export interface UpdateEducationInput {
  institution?: string;
  degree?: string;
  major?: string;
  start_date?: string;
  end_date?: string | null;
  gpa?: string;
  description?: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  description: string;
  credential_url: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCertificationInput {
  name: string;
  issuer: string;
  date: string;
  description?: string;
  credential_url?: string;
}

export interface UpdateCertificationInput {
  name?: string;
  issuer?: string;
  date?: string;
  description?: string;
  credential_url?: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface CreateAchievementInput {
  title: string;
  description?: string;
  year: number;
}

export interface UpdateAchievementInput {
  title?: string;
  description?: string;
  year?: number;
}
