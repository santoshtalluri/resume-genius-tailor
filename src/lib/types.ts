export type UserRole = 'admin' | 'standard';

export type User = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status?: 'active' | 'pending' | 'suspended';
  created: string;
  lastLogin?: string;
};

export type ResumeType = {
  id: string;
  name: string;
  created: string;
  lastModified: string;
  skills: string[];
  format: 'PDF' | 'DOCX' | 'TXT';
  wordCount: number;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
};

export type JobType = {
  id: string;
  title: string;
  company: string;
  location: string;
  created: string;
  source: string;
  url?: string;
  description: string;
  technicalSkills: string[];
  functionalSkills: string[];
  requirements: string[];
  responsibilities: string[];
};

export type LogType = {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
  details?: string;
};
