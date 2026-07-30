import { ResumeData, ATSReviewResult, UserProfile, ResumeVersion } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  id: 'res-demo-101',
  personalInfo: {
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA (Open to Remote)',
    portfolioUrl: 'https://alexvance.dev',
    linkedInUrl: 'https://linkedin.com/in/alexvance',
    gitHubUrl: 'https://github.com/alexvance',
    summary: 'Results-driven Senior Full Stack & AI Engineer with 6+ years of experience designing scalable distributed systems, high-throughput microservices, and fine-tuning Large Language Model (LLM) workflows. Proven track record reducing API latency by 45% and driving 35% growth in user retention.'
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Apex AI Labs',
      role: 'Senior AI System Engineer',
      location: 'San Francisco, CA',
      startDate: '2023-03',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected an enterprise RAG pipeline using LangChain, OpenAI GPT-4o, and Qdrant Vector DB, reducing query resolution latency by 42% for over 150k monthly active users.',
        'Designed high-availability FastAPI and Node.js microservices processing 12,000 requests/sec with 99.99% uptime across multi-region AWS EKS clusters.',
        'Mentored 6 mid-level engineers, established CI/CD automated pipeline standard via GitHub Actions, and cut deployment release cycles from 4 days to 30 minutes.'
      ]
    },
    {
      id: 'exp-2',
      company: 'Nexus Software Inc.',
      role: 'Full Stack Engineer',
      location: 'San Jose, CA',
      startDate: '2020-06',
      endDate: '2023-02',
      current: false,
      bullets: [
        'Engineered responsive React / Next.js web application consuming GraphQL endpoints, boosting customer checkout conversion rate by 22%.',
        'Optimized PostgreSQL database query execution plans and Redis caching strategy, decreasing server database load during peak traffic events by 60%.',
        'Collaborated closely with Product and UI/UX design teams to implement WCAG 2.1 AA accessible component libraries.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2016-08',
      endDate: '2020-05',
      gpa: '3.88 / 4.0',
      highlights: ['Dean’s Honor List', 'President of AI & Robotics Student Association']
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'SmartResume AI - Intelligent CV Analyzer',
      description: 'An open-source LLM agent application for ATS resume parsing and automated feedback.',
      technologies: ['Next.js 14', 'Python', 'FastAPI', 'OpenAI API', 'Tailwind CSS', 'Supabase'],
      link: 'https://github.com/alexvance/smart-resume-ai',
      bullets: [
        'Implemented custom PDF & DOCX text extraction pipeline with 98.4% accuracy.',
        'Created real-time streaming AI feedback interface supporting STAR bullet point suggestions.'
      ]
    }
  ],
  skills: {
    technical: ['Python', 'TypeScript', 'JavaScript', 'React', 'Next.js', 'FastAPI', 'Node.js', 'PostgreSQL', 'GraphQL'],
    soft: ['Technical Leadership', 'Cross-functional Collaboration', 'System Design Communication'],
    tools: ['Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD', 'Redis', 'Vector DBs (Qdrant, Pinecone)'],
    frameworks: ['LangChain', 'LlamaIndex', 'PyTorch', 'Tailwind CSS'],
    languages: ['English (Native)', 'Spanish (Professional)'],
    certifications: ['AWS Certified Solutions Architect - Associate', 'DeepLearning.AI Generative AI Developer']
  },
  achievements: [
    'Winner of HackSF 2024 (Best Generative AI Implementation)',
    'Authored tech blog post on RAG optimization with 85,000+ views'
  ],
  interests: ['Open Source AI', 'Algorithmic Trading', 'Trail Running', 'Chess']
};

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr-101',
  fullName: 'Sanghamitra Gawai',
  email: 'sanghamitra.g97@gmail.com',
  preferredRole: '',
  preferredLocation: '',
  expectedSalary: '',
  skills: [],
  portfolioUrl: '',
  linkedInUrl: '',
  gitHubUrl: '',
  aiCreditsRemaining: 50,
  isComplete: false
};

export const INITIAL_ATS_REVIEW: ATSReviewResult = {
  overallScore: 87,
  readabilityScore: 91,
  formattingScore: 78,
  keywordScore: 82,
  sectionScores: {
    summary: 90,
    skills: 85,
    projects: 82,
    experience: 88,
    education: 96,
    formatting: 78,
    keywords: 82,
    readability: 91,
    achievements: 75
  },
  analysis: {
    whatsGood: [
      'Strong quantitative metrics in experience bullets (e.g. 42% latency reduction, 12,000 req/sec).',
      'Modern, high-demand technical stack listed (RAG, LangChain, Next.js 14, AWS EKS).',
      'Clear career progression from Full Stack Engineer to Senior AI System Engineer.'
    ],
    whatsMissing: [
      'Missing explicit Cloud Security compliance keywords (SOC2, OAuth2, IAM).',
      'Soft skills leadership metrics could be strengthened with team size scaling.'
    ],
    weakSections: ['Achievements section can be expanded with formal business revenue impact.'],
    recruiterConcerns: ['Formatting uses custom columns in PDF export which might trip older ATS parsers.'],
    formattingIssues: ['Ensure consistent font sizes between section headers and body text.'],
    keywordProblems: ['Include exact target JD terms like "CI/CD Orchestration" and "Kubernetes Helm".'],
    grammarIssues: ['No critical grammar errors found. Strong active voice present.'],
    impactStatements: ['High density of STAR method (Situation, Task, Action, Result) statements.'],
    actionVerbsUsed: ['Architected', 'Engineered', 'Optimized', 'Collaborated', 'Mentored', 'Designed'],
    passiveLanguageFound: ['Worked on (replaced with Architected)', 'Responsible for (replaced with Led)'],
    buzzwordsFound: ['Synergy (Not recommended)', 'Guru (Consider replacing with Specialist)'],
    weakBullets: ['"Collaborated with UI/UX team" - add measurable design system adoption metric.'],
    repetitiveContent: ['"Optimized" appears multiple times across experience entries. Use "Spearheaded" or "Revamped".']
  },
  atsSimulation: {
    canRecruiterRead: true,
    extractedTextPreview: `ALEX VANCE\nalex.vance@example.com | +1 (555) 234-5678 | San Francisco, CA\nSUMMARY: Results-driven Senior Full Stack & AI Engineer with 6+ years of experience...\nEXPERIENCE:\nApex AI Labs - Senior AI System Engineer (2023 - Present)\n- Architected an enterprise RAG pipeline using LangChain, OpenAI GPT-4o...\nNexus Software Inc. - Full Stack Engineer (2020 - 2023)\nSKILLS: Python, TypeScript, React, Next.js, FastAPI, Docker, AWS, Vector DBs`,
    parsingIssues: [
      'Links located in header might be ignored by Workday ATS.',
      'Ensure standard UTF-8 bullet symbols (-) are used.'
    ]
  },
  keywordAnalysis: {
    matched: ['Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'AWS', 'Docker', 'RAG'],
    missingTechnical: ['PySpark', 'Kafka', 'GraphQL Subscriptions'],
    missingTools: ['Terraform', 'Helm', 'Prometheus', 'Grafana'],
    missingFrameworks: ['FastAI', 'TensorFlow Serving'],
    missingCertifications: ['CKAD (Certified Kubernetes Application Developer)'],
    missingSoftSkills: ['Stakeholder Management', 'Cross-functional Alignment'],
    missingLeadershipWords: ['Spearheaded', 'Championed', 'Orchestrated'],
    missingAIKeywords: ['Vector Search', 'Fine-tuning', 'Prompt Engineering', 'Guardrails'],
    missingCloudKeywords: ['Serverless', 'Lambda', 'Terraform', 'CloudWatch']
  },
  improvementSuggestions: [
    {
      id: 'sugg-1',
      section: 'Professional Summary',
      currentVersion: 'Results-driven Senior Full Stack & AI Engineer with 6+ years of experience...',
      problem: 'Lacks explicit mention of Cloud Architecture & Enterprise Scale.',
      suggestedVersion: 'Senior Full Stack & AI Architect with 6+ years specializing in Cloud-Native LLM Applications, High-Throughput Microservices, and Enterprise RAG Architectures delivering 99.99% SLA.',
      reason: 'Recruiters search specifically for "Architect" and "Cloud-Native" for senior tier positions.',
      recruiterImpact: '+18% increased likelihood of passing senior screening filters.'
    },
    {
      id: 'sugg-2',
      section: 'Work Experience (Nexus Software)',
      currentVersion: 'Engineered responsive React / Next.js web application consuming GraphQL endpoints...',
      problem: 'Does not state performance metrics or user traffic size.',
      suggestedVersion: 'Engineered responsive Next.js web platform serving 250k daily active users with GraphQL API integration, accelerating page load by 35% and boosting conversion by 22%.',
      reason: 'Adding scale metrics (250k users) proves capability to work in high-traffic production environments.',
      recruiterImpact: 'Dramatically improves credibility during engineering manager reviews.'
    }
  ]
};

export const RESUME_TEMPLATES = [
  { id: 'modern', name: 'Modern Tech', category: 'Tech', accentColor: '#6366F1', description: 'Clean, sleek layout optimized for AI, Software Engineers & Product Teams.' },
  { id: 'minimal', name: 'Minimalist Clean', category: 'Minimal', accentColor: '#0F172A', description: 'Maximum readability, high contrast, 100% ATS friendly classic style.' },
  { id: 'professional', name: 'Executive Suite', category: 'Executive', accentColor: '#1E3A8A', description: 'Sophisticated corporate design for Senior Managers, Leads & Executives.' },
  { id: 'datascience', name: 'Data & AI Specialist', category: 'Data Science', accentColor: '#0D9488', description: 'Structured layout emphasizing research, ML pipelines, and technical metrics.' },
  { id: 'consultant', name: 'Strategic Consultant', category: 'Consultant', accentColor: '#7C3AED', description: 'Highlights problem solving, business impact, and cross-functional leadership.' },
  { id: 'darktheme', name: 'Dark Mode SaaS', category: 'Modern', accentColor: '#38BDF8', description: 'Visually stunning dark slate theme designed for online portfolio preview.' }
];

export const INITIAL_VERSION_HISTORY: ResumeVersion[] = [
  {
    id: 'ver-3',
    versionNumber: 3,
    date: '2026-07-28',
    atsScore: 87,
    title: 'Senior AI Engineer - Optimized Version',
    changeSummary: 'Applied AI STAR bullet suggestions, added RAG & Vector DB keywords.',
    data: INITIAL_RESUME_DATA
  },
  {
    id: 'ver-2',
    versionNumber: 2,
    date: '2026-07-15',
    atsScore: 78,
    title: 'Full Stack Engineer - Draft 2',
    changeSummary: 'Updated education and technical skills section.',
    data: { ...INITIAL_RESUME_DATA, id: 'res-ver-2' }
  },
  {
    id: 'ver-1',
    versionNumber: 1,
    date: '2026-06-01',
    atsScore: 65,
    title: 'Initial Uploaded Resume',
    changeSummary: 'Original unformatted PDF import.',
    data: { ...INITIAL_RESUME_DATA, id: 'res-ver-1' }
  }
];
