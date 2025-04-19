
import { z } from 'zod';
import { User, ResumeType, JobType, LLMConfig } from '../types';

/**
 * API Routes Specification
 * This file serves as a comprehensive guide for frontend-backend API interactions
 */

// Validation Schemas
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const RegisterSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export const ResumeSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  skills: z.array(z.string()),
  personalInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    location: z.string().optional()
  }),
  experience: z.array(z.object({
    title: z.string(),
    company: z.string(),
    period: z.string(),
    description: z.string()
  }))
});

export const JobSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  company: z.string(),
  description: z.string(),
  technicalSkills: z.array(z.string()),
  requirements: z.array(z.string())
});

// API Route Definitions
export const ApiRoutes = {
  // Authentication Routes
  Auth: {
    login: {
      method: 'POST',
      path: '/auth/login',
      requestSchema: LoginSchema,
      responseType: 'User & Token'
    },
    register: {
      method: 'POST', 
      path: '/auth/register',
      requestSchema: RegisterSchema,
      responseType: 'User'
    },
    profile: {
      method: 'GET',
      path: '/auth/profile',
      responseType: 'User'
    }
  },

  // Resume Management Routes
  Resumes: {
    list: {
      method: 'GET',
      path: '/resumes',
      queryParams: ['page', 'limit'],
      responseType: 'ResumeType[]'
    },
    create: {
      method: 'POST',
      path: '/resumes',
      requestSchema: ResumeSchema,
      responseType: 'ResumeType'
    },
    upload: {
      method: 'POST',
      path: '/resumes/upload',
      expectedFiles: ['resume.pdf', 'resume.docx'],
      responseType: 'ResumeType'
    },
    parse: {
      method: 'POST',
      path: '/resumes/parse',
      expectedFiles: ['resume.pdf', 'resume.docx'],
      responseType: 'Parsed Resume Structure'
    }
  },

  // Job Description Routes
  Jobs: {
    list: {
      method: 'GET', 
      path: '/jobs',
      queryParams: ['page', 'limit'],
      responseType: 'JobType[]'
    },
    create: {
      method: 'POST',
      path: '/jobs',
      requestSchema: JobSchema,
      responseType: 'JobType'
    },
    parseUrl: {
      method: 'POST',
      path: '/jobs/parse-url',
      requestParams: ['url'],
      responseType: 'Extracted Job Details'
    }
  },

  // Tailored Resume Generation Routes
  TailoredResume: {
    generate: {
      method: 'POST',
      path: '/tailored/generate',
      requestParams: ['resumeId', 'jobId'],
      responseType: 'Customized Resume'
    }
  },

  // LLM Configuration Routes
  LLMConfig: {
    update: {
      method: 'PUT',
      path: '/settings/llm',
      requestSchema: z.object({
        provider: z.enum(['openai', 'anthropic']),
        model: z.string(),
        temperature: z.number().min(0).max(1)
      }),
      responseType: 'Updated LLM Configuration'
    }
  },

  // Admin Routes
  Admin: {
    userManagement: {
      list: {
        method: 'GET',
        path: '/admin/users',
        queryParams: ['status', 'role'],
        responseType: 'User[]'
      },
      approve: {
        method: 'POST',
        path: '/admin/users/{userId}/approve',
        responseType: 'Approved User'
      }
    },
    metrics: {
      method: 'GET',
      path: '/admin/metrics',
      responseType: 'System Usage Metrics'
    }
  }
};

// FastAPI Integration Guide Comment
/**
 * FastAPI Route Implementation Guide:
 * 
 * 1. Use Pydantic for request/response validation
 * 2. Implement dependency injection for authentication
 * 3. Use type hints and return type annotations
 * 
 * Example Route Structure:
 * 
 * ```python
 * @app.post("/auth/login", response_model=UserResponse)
 * async def login(
 *     login_data: LoginRequest, 
 *     user_service: UserService = Depends()
 * ):
 *     return await user_service.authenticate(login_data)
 * ```
 */

export default ApiRoutes;

