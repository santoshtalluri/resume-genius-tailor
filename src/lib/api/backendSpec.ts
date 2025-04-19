
import { z } from 'zod';
import { ApiRoutes } from './apiRoutes';

/**
 * Backend API Specification
 * Comprehensive guide for implementing the FastAPI backend
 */

export const BackendModels = {
  // Database Models
  User: `
    class User(SQLModel, table=True):
        id: str = Field(default_factory=uuid4, primary_key=True)
        username: str
        email: str
        hashed_password: str
        role: str = "user"
        is_active: bool = True
        created_at: datetime = Field(default_factory=datetime.utcnow)
  `,
  
  Resume: `
    class Resume(SQLModel, table=True):
        id: str = Field(default_factory=uuid4, primary_key=True)
        user_id: str = Field(foreign_key="user.id")
        name: str
        skills: List[str]
        personal_info: Dict[str, str]
        experience: List[Dict[str, str]]
        created_at: datetime = Field(default_factory=datetime.utcnow)
  `,

  Job: `
    class Job(SQLModel, table=True):
        id: str = Field(default_factory=uuid4, primary_key=True)
        user_id: str = Field(foreign_key="user.id")
        title: str
        company: str
        description: str
        technical_skills: List[str]
        requirements: List[str]
        created_at: datetime = Field(default_factory=datetime.utcnow)
  `
};

export const BackendDependencies = {
  required: [
    'fastapi>=0.100.0',
    'sqlmodel>=0.0.8',
    'python-jose[cryptography]>=3.3.0',
    'passlib[bcrypt]>=1.7.4',
    'python-multipart>=0.0.6',
    'pydantic>=2.0.0',
    'httpx>=0.24.1',
  ],
  optional: [
    'openai>=1.0.0',  // For LLM integration
    'anthropic>=0.3.0'  // For Claude integration
  ]
};

export const BackendServices = {
  AuthService: `
    class AuthService:
        def __init__(self, db: Session):
            self.db = db
            
        async def authenticate(self, email: str, password: str) -> Tuple[User, str]:
            user = await self.get_user_by_email(email)
            if not user or not verify_password(password, user.hashed_password):
                raise HTTPException(401, "Invalid credentials")
            access_token = create_access_token({"sub": user.id})
            return user, access_token
  `,

  ResumeService: `
    class ResumeService:
        def __init__(self, db: Session):
            self.db = db
            
        async def parse_resume(self, file: UploadFile) -> Dict[str, Any]:
            content = await file.read()
            # Implement resume parsing logic
            return parsed_data
            
        async def create_resume(self, user_id: str, data: ResumeCreate) -> Resume:
            resume = Resume(**data.dict(), user_id=user_id)
            self.db.add(resume)
            await self.db.commit()
            return resume
  `,

  JobService: `
    class JobService:
        def __init__(self, db: Session):
            self.db = db
            
        async def parse_job_url(self, url: str) -> Dict[str, Any]:
            # Implement job scraping logic
            return job_data
            
        async def create_job(self, user_id: str, data: JobCreate) -> Job:
            job = Job(**data.dict(), user_id=user_id)
            self.db.add(job)
            await self.db.commit()
            return job
  `,

  TailoringService: `
    class TailoringService:
        def __init__(self, db: Session, llm_client: LLMClient):
            self.db = db
            self.llm_client = llm_client
            
        async def generate_tailored_resume(
            self, 
            resume_id: str, 
            job_id: str
        ) -> Dict[str, Any]:
            resume = await self.get_resume(resume_id)
            job = await self.get_job(job_id)
            return await self.llm_client.tailor_resume(resume, job)
  `
};

export const BackendRouters = {
  auth: `
    @router.post("/login", response_model=TokenResponse)
    async def login(
        credentials: LoginRequest,
        auth_service: AuthService = Depends(get_auth_service)
    ):
        user, token = await auth_service.authenticate(
            credentials.email, 
            credentials.password
        )
        return {"access_token": token, "user": user}
  `,

  resumes: `
    @router.post("/resumes", response_model=ResumeResponse)
    async def create_resume(
        data: ResumeCreate,
        current_user: User = Depends(get_current_user),
        resume_service: ResumeService = Depends(get_resume_service)
    ):
        return await resume_service.create_resume(current_user.id, data)
        
    @router.post("/resumes/upload")
    async def upload_resume(
        file: UploadFile,
        current_user: User = Depends(get_current_user),
        resume_service: ResumeService = Depends(get_resume_service)
    ):
        return await resume_service.parse_resume(file)
  `,

  jobs: `
    @router.post("/jobs", response_model=JobResponse)
    async def create_job(
        data: JobCreate,
        current_user: User = Depends(get_current_user),
        job_service: JobService = Depends(get_job_service)
    ):
        return await job_service.create_job(current_user.id, data)
        
    @router.post("/jobs/parse-url")
    async def parse_job_url(
        url: str,
        current_user: User = Depends(get_current_user),
        job_service: JobService = Depends(get_job_service)
    ):
        return await job_service.parse_job_url(url)
  `,

  tailoring: `
    @router.post("/tailored/generate")
    async def generate_tailored_resume(
        resume_id: str,
        job_id: str,
        current_user: User = Depends(get_current_user),
        tailoring_service: TailoringService = Depends(get_tailoring_service)
    ):
        return await tailoring_service.generate_tailored_resume(resume_id, job_id)
  `
};

export const SecurityConfig = {
  JWT: {
    secret_key: 'your-secret-key',  // Move to environment variable
    algorithm: 'HS256',
    access_token_expire_minutes: 30
  },
  Middleware: `
    async def get_current_user(
        token: str = Depends(oauth2_scheme),
        db: Session = Depends(get_db)
    ) -> User:
        credentials_exception = HTTPException(
            status_code=401,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
            user_id: str = payload.get("sub")
            if user_id is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception
            
        user = await get_user_by_id(db, user_id)
        if user is None:
            raise credentials_exception
        return user
  `
};

export const MainAppConfig = `
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Tailor Resume API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(resumes_router, prefix="/resumes", tags=["Resumes"])
app.include_router(jobs_router, prefix="/jobs", tags=["Jobs"])
app.include_router(tailoring_router, prefix="/tailored", tags=["Tailoring"])
app.include_router(admin_router, prefix="/admin", tags=["Admin"])
`;

// Implementation tips
export const BackendImplementationGuide = {
  setup: [
    'Create a virtual environment and install dependencies',
    'Set up SQLModel with PostgreSQL',
    'Configure environment variables',
    'Implement database migrations'
  ],
  security: [
    'Move all secrets to environment variables',
    'Implement rate limiting',
    'Set up proper CORS configuration',
    'Add request validation'
  ],
  bestPractices: [
    'Use dependency injection for services',
    'Implement proper error handling',
    'Add request logging',
    'Write unit tests for all endpoints'
  ]
};

