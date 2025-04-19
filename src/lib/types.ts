
// Defines all types used throughout the application

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'standard';
  isApproved: boolean;
  createdAt: string;
}

export type UserWithPassword = User & { password: string };

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Resume Types
export interface Resume {
  id: string;
  userId: string;
  name: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    linkedin?: string;
    website?: string;
  };
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  additional: AdditionalSection[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  location?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  gpa?: string;
  location?: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
  level?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
}

export interface AdditionalSection {
  id: string;
  title: string;
  content: string;
}

// Job Description Types
export interface JobDescription {
  id: string;
  userId: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  keySkills: string[];
  responsibilities: string[];
  source?: string;
  url?: string;
  createdAt: string;
}

// Tailored Resume Types
export interface TailoredResume {
  id: string;
  userId: string;
  originalResumeId: string;
  jobDescriptionId: string;
  resumeContent: Resume;
  coverLetter: string;
  createdAt: string;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
