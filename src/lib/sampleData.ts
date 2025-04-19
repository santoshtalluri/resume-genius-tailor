
import { ResumeType, JobType, LogType } from './types';

export const sampleResumes: ResumeType[] = [
  {
    id: '1',
    name: 'Software Engineer Resume',
    created: '2024-02-15T10:00:00Z',
    lastModified: '2024-03-15T10:00:00Z',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'MongoDB', 'Docker'],
    format: 'PDF',
    wordCount: 650,
    personalInfo: {
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA'
    },
    summary: 'Full-stack developer with 5+ years of experience building scalable web applications using modern JavaScript frameworks. Passionate about clean code and user-centric design.',
    experience: [
      {
        title: 'Senior Software Engineer',
        company: 'TechCorp',
        period: 'Jan 2022 - Present',
        description: 'Led the development of a customer-facing portal using React and GraphQL, reducing load times by 40%. Mentored junior developers and implemented CI/CD pipelines.'
      },
      {
        title: 'Software Engineer',
        company: 'WebSolutions Inc',
        period: 'Jun 2019 - Dec 2021',
        description: 'Developed and maintained multiple React applications. Implemented responsive designs and optimized API performance. Collaborated closely with UX designers.'
      },
      {
        title: 'Junior Developer',
        company: 'StartupXYZ',
        period: 'Mar 2018 - May 2019',
        description: 'Built and maintained features for a SaaS platform using React and Node.js. Participated in code reviews and agile development process.'
      }
    ],
    education: [
      {
        degree: 'B.S. Computer Science',
        institution: 'University of California, Berkeley',
        year: '2018'
      }
    ]
  },
  {
    id: '2',
    name: 'Product Manager Resume',
    created: '2024-02-05T15:30:00Z',
    lastModified: '2024-03-10T15:30:00Z',
    skills: ['Product Strategy', 'Agile', 'User Research', 'A/B Testing', 'Product Analytics', 'Wireframing'],
    format: 'DOCX',
    wordCount: 720,
    personalInfo: {
      name: 'Taylor Smith',
      email: 'taylor.smith@example.com',
      phone: '(555) 987-6543',
      location: 'Seattle, WA'
    },
    summary: 'Results-driven Product Manager with expertise in bringing innovative products to market. Experienced in leading cross-functional teams and driving user-centric product development.',
    experience: [
      {
        title: 'Senior Product Manager',
        company: 'InnoTech Solutions',
        period: 'Jul 2021 - Present',
        description: 'Managed the roadmap for a B2B SaaS platform with 50,000+ users. Prioritized features based on user research and business goals, resulting in 35% revenue growth.'
      },
      {
        title: 'Product Manager',
        company: 'TechStart Inc',
        period: 'Mar 2019 - Jun 2021',
        description: 'Led product development for mobile applications with over 1M downloads. Conducted user interviews and translated findings into product requirements.'
      },
      {
        title: 'Associate Product Manager',
        company: 'Global Software Co',
        period: 'Jan 2017 - Feb 2019',
        description: 'Supported senior product managers in feature development and implementation. Conducted competitor analysis and market research.'
      }
    ],
    education: [
      {
        degree: 'MBA, Technology Management',
        institution: 'University of Washington',
        year: '2016'
      },
      {
        degree: 'B.A. Business Administration',
        institution: 'Western Washington University',
        year: '2014'
      }
    ]
  },
  {
    id: '3',
    name: 'UX Designer Resume',
    created: '2024-01-20T09:15:00Z',
    lastModified: '2024-03-05T09:15:00Z',
    skills: ['Figma', 'User Testing', 'UI Design', 'Wireframing', 'Prototyping', 'Design Systems'],
    format: 'PDF',
    wordCount: 680,
    personalInfo: {
      name: 'Morgan Chen',
      email: 'morgan.chen@example.com',
      phone: '(555) 456-7890',
      location: 'Austin, TX'
    },
    summary: 'Creative UX/UI Designer with a strong background in user-centered design principles. Experienced in creating intuitive and accessible digital experiences across multiple platforms.',
    experience: [
      {
        title: 'Senior UX Designer',
        company: 'Digital Experience Co',
        period: 'Aug 2021 - Present',
        description: 'Lead designer for an e-commerce platform serving 2M+ monthly users. Created and maintained a comprehensive design system that improved team efficiency by 25%.'
      },
      {
        title: 'UX/UI Designer',
        company: 'Creative Agency Inc',
        period: 'May 2019 - Jul 2021',
        description: 'Designed user interfaces for web and mobile applications across various industries. Conducted usability testing and created user personas and journey maps.'
      },
      {
        title: 'UI Designer',
        company: 'MobileApps Co',
        period: 'Feb 2017 - Apr 2019',
        description: 'Designed responsive interfaces for mobile applications. Collaborated with developers to ensure design implementation matched specifications.'
      }
    ],
    education: [
      {
        degree: 'M.F.A. Interactive Design',
        institution: 'Savannah College of Art and Design',
        year: '2017'
      },
      {
        degree: 'B.F.A. Graphic Design',
        institution: 'Rhode Island School of Design',
        year: '2015'
      }
    ]
  }
];

export const sampleJobs: JobType[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA (Remote)',
    created: '2024-04-12T15:30:00Z',
    source: 'LinkedIn',
    url: 'https://example.com/job1',
    description: 'TechCorp Solutions is seeking a Senior Frontend Developer to join our growing team. You will be responsible for building user interfaces for our enterprise SaaS products, collaborating with designers and backend engineers, and mentoring junior developers.',
    technicalSkills: [
      'React', 'TypeScript', 'GraphQL', 'Next.js', 'Testing (Jest, Cypress)',
      'CSS-in-JS', 'Webpack', 'Git'
    ],
    functionalSkills: [
      'Team Leadership', 'Agile Methodologies', 'Code Reviews',
      'Technical Documentation', 'Mentoring', 'Project Planning'
    ],
    requirements: [
      '5+ years of experience in frontend development',
      'Strong proficiency with React and TypeScript',
      'Experience with GraphQL and RESTful APIs',
      'Knowledge of modern frontend build tools',
      'Experience with responsive and accessible design',
      'Bachelor\'s degree in Computer Science or equivalent experience'
    ],
    responsibilities: [
      'Develop and maintain frontend applications using React and TypeScript',
      'Collaborate with UX designers to implement intuitive user interfaces',
      'Work with backend engineers to integrate frontend with APIs',
      'Write clean, maintainable, and well-tested code',
      'Mentor junior developers and conduct code reviews',
      'Contribute to technical documentation and architecture decisions'
    ]
  },
  {
    id: '2',
    title: 'Product Manager - AI/ML Products',
    company: 'Innovation AI',
    location: 'New York, NY or Remote',
    created: '2024-04-10T09:45:00Z',
    source: 'Indeed',
    url: 'https://example.com/job2',
    description: 'Innovation AI is looking for a Product Manager to lead our AI/ML product initiatives. You will work closely with data scientists, engineers, and business stakeholders to define and execute the product roadmap for our machine learning solutions.',
    technicalSkills: [
      'Product Analytics', 'SQL', 'Data Visualization', 'Agile/Scrum',
      'Basic Python', 'A/B Testing', 'AI/ML Concepts'
    ],
    functionalSkills: [
      'Product Strategy', 'Stakeholder Management', 'User Research',
      'Roadmap Planning', 'Market Analysis', 'Cross-functional Collaboration'
    ],
    requirements: [
      '3+ years of product management experience, preferably with AI/ML products',
      'Strong understanding of machine learning concepts and applications',
      'Experience gathering and prioritizing product requirements',
      'Excellent communication and presentation skills',
      'Ability to translate complex technical concepts to business stakeholders',
      'Bachelor\'s degree in a technical or business field'
    ],
    responsibilities: [
      'Define and prioritize product features based on user needs and business goals',
      'Work with data scientists to translate ML capabilities into product features',
      'Create detailed product specifications and user stories',
      'Manage product roadmap and communicate progress to stakeholders',
      'Analyze product metrics and gather user feedback to inform product decisions',
      'Coordinate with marketing team on product launches and messaging'
    ]
  },
  {
    id: '3',
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Austin, TX (Hybrid)',
    created: '2024-04-08T11:20:00Z',
    source: 'Company Website',
    url: 'https://example.com/job3',
    description: 'StartupXYZ is seeking a Full Stack Engineer to help build our next-generation collaboration platform. You will work on both frontend and backend components, implement new features, and help shape our technical architecture.',
    technicalSkills: [
      'JavaScript/TypeScript', 'React', 'Node.js', 'Express', 'MongoDB',
      'AWS/Cloud Services', 'Docker', 'CI/CD', 'RESTful APIs'
    ],
    functionalSkills: [
      'Problem Solving', 'Communication', 'Teamwork',
      'Time Management', 'Adaptability', 'Self-motivated'
    ],
    requirements: [
      '3+ years of full stack development experience',
      'Strong proficiency with JavaScript/TypeScript, React, and Node.js',
      'Experience with database design and ORM technologies',
      'Familiarity with cloud services (AWS, GCP, or Azure)',
      'Understanding of CI/CD practices',
      'Bachelor\'s degree in Computer Science or equivalent experience'
    ],
    responsibilities: [
      'Develop and maintain features across the full stack',
      'Build RESTful APIs and server-side logic',
      'Create responsive and interactive frontend interfaces',
      'Collaborate with the product team to understand requirements',
      'Write clean, testable code with appropriate documentation',
      'Participate in code reviews and architectural discussions'
    ]
  }
];

export const sampleLogs: LogType[] = [
  {
    id: '1',
    timestamp: '2024-04-19T10:23:15Z',
    level: 'info',
    message: 'User profile updated',
    source: 'UserProfileService',
    details: 'User ID: user-123 updated their profile information'
  },
  {
    id: '2',
    timestamp: '2024-04-19T09:45:30Z',
    level: 'error',
    message: 'API request failed',
    source: 'ResumeUploadService',
    details: 'Failed to parse resume PDF. Error: Invalid file format'
  },
  {
    id: '3',
    timestamp: '2024-04-19T08:30:12Z',
    level: 'warning',
    message: 'High API usage detected',
    source: 'LLMService',
    details: 'LLM API usage exceeded 80% of daily quota'
  },
  {
    id: '4',
    timestamp: '2024-04-18T15:12:45Z',
    level: 'info',
    message: 'Resume generated successfully',
    source: 'TailoringService',
    details: 'Resume ID: resume-456 tailored for Job ID: job-789'
  },
  {
    id: '5',
    timestamp: '2024-04-18T14:20:33Z',
    level: 'error',
    message: 'Database connection error',
    source: 'DatabaseService',
    details: 'Connection timeout after 30s. Retrying...'
  },
  {
    id: '6',
    timestamp: '2024-04-18T11:05:27Z',
    level: 'info',
    message: 'New user registered',
    source: 'AuthService',
    details: 'User ID: user-456 created account'
  },
  {
    id: '7',
    timestamp: '2024-04-17T16:48:10Z',
    level: 'warning',
    message: 'Slow query performance',
    source: 'QueryService',
    details: 'Query took 4.5s to execute: SELECT * FROM resumes WHERE...'
  }
];
