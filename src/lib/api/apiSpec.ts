
import { User, ResumeType, JobType, LogType } from '../types';

// Base API configuration
export const API_BASE_URL = 'http://localhost:8000/api/v1';

// Request/Response Types for each endpoint
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// API Endpoints Specification
export const API_ROUTES = {
  // Auth Routes
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    profile: '/auth/profile',
  },

  // User Management Routes
  users: {
    list: '/users',
    getById: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    approve: (id: string) => `/users/${id}/approve`,
    reject: (id: string) => `/users/${id}/reject`,
  },

  // Resume Management Routes
  resumes: {
    list: '/resumes',
    create: '/resumes',
    getById: (id: string) => `/resumes/${id}`,
    update: (id: string) => `/resumes/${id}`,
    delete: (id: string) => `/resumes/${id}`,
    upload: '/resumes/upload',
    parse: '/resumes/parse',
  },

  // Job Management Routes
  jobs: {
    list: '/jobs',
    create: '/jobs',
    getById: (id: string) => `/jobs/${id}`,
    update: (id: string) => `/jobs/${id}`,
    delete: (id: string) => `/jobs/${id}`,
    parseUrl: '/jobs/parse-url',
  },

  // Tailored Resume Routes
  tailored: {
    list: '/tailored',
    create: '/tailored',
    getById: (id: string) => `/tailored/${id}`,
    update: (id: string) => `/tailored/${id}`,
    delete: (id: string) => `/tailored/${id}`,
    generate: '/tailored/generate',
  },

  // Cover Letter Routes
  coverLetters: {
    list: '/cover-letters',
    create: '/cover-letters',
    getById: (id: string) => `/cover-letters/${id}`,
    update: (id: string) => `/cover-letters/${id}`,
    delete: (id: string) => `/cover-letters/${id}`,
    generate: '/cover-letters/generate',
  },

  // Admin Routes
  admin: {
    dashboard: '/admin/dashboard',
    metrics: '/admin/metrics',
    logs: '/admin/logs',
    settings: '/admin/settings',
  }
};

// Example of expected response types
export interface LoginResponse {
  user: User;
  token: string;
}

export interface ResumesListResponse {
  resumes: ResumeType[];
  total: number;
}

export interface JobsListResponse {
  jobs: JobType[];
  total: number;
}

export interface MetricsResponse {
  userCount: number;
  resumeCount: number;
  jobCount: number;
  tailoredCount: number;
  activeUsers: number;
}

export interface LogsResponse {
  logs: LogType[];
  total: number;
}

// API Client Configuration
export interface ApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
}

// Utility type for pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Sample FastAPI implementation guide
/**
 * FastAPI Implementation Example:
 * 
 * ```python
 * from fastapi import FastAPI, Depends, HTTPException, status
 * from fastapi.middleware.cors import CORSMiddleware
 * from typing import List, Optional
 * from pydantic import BaseModel
 * 
 * app = FastAPI()
 * 
 * # Add CORS middleware
 * app.add_middleware(
 *     CORSMiddleware,
 *     allow_origins=["http://localhost:5173"],  # React dev server
 *     allow_credentials=True,
 *     allow_methods=["*"],
 *     allow_headers=["*"],
 * )
 * 
 * # Auth routes example
 * @app.post("/api/v1/auth/login")
 * async def login(login_data: LoginRequest):
 *     # Implement login logic
 *     pass
 * 
 * # Resume routes example
 * @app.get("/api/v1/resumes")
 * async def list_resumes(
 *     page: int = 1,
 *     limit: int = 10,
 *     user = Depends(get_current_user)
 * ):
 *     # Implement resume listing logic
 *     pass
 * 
 * # Job routes example
 * @app.post("/api/v1/jobs/parse-url")
 * async def parse_job_url(
 *     url: str,
 *     user = Depends(get_current_user)
 * ):
 *     # Implement job parsing logic
 *     pass
 * ```
 */

