
export type UserRole = 'admin' | 'standard';

export type User = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status?: 'active' | 'pending' | 'suspended';
  created: string;
  lastLogin?: string;
  isApproved: boolean; // Added this property
};

// Added UserWithPassword type
export type UserWithPassword = User & {
  password: string;
};

// Added AuthState type
export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
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

// Added LLMProvider type
export type LLMProvider = 'openai' | 'anthropic';

// Added LLMConfig type
export type LLMConfig = {
  provider: LLMProvider;
  model: string;
  apiKey?: string;
  temperature: number;
  maxTokens: number;
};
