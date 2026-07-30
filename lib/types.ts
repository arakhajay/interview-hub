export interface ResumeSectionExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface ResumeSectionEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights: string[];
}

export interface ResumeSectionProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  bullets: string[];
}

export interface ResumeData {
  id?: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    portfolioUrl?: string;
    linkedInUrl?: string;
    gitHubUrl?: string;
    summary: string;
  };
  experience: ResumeSectionExperience[];
  education: ResumeSectionEducation[];
  projects: ResumeSectionProject[];
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
    frameworks?: string[];
    languages: string[];
    certifications: string[];
  };
  achievements: string[];
  interests: string[];
}

export interface SectionScore {
  name: string;
  score: number; // 0-100
  weight: number;
  comments: string;
}

export interface ATSReviewResult {
  overallScore: number; // e.g. 87
  readabilityScore: number;
  formattingScore: number;
  keywordScore: number;
  sectionScores: {
    summary: number;
    skills: number;
    projects: number;
    experience: number;
    education: number;
    formatting: number;
    keywords: number;
    readability: number;
    achievements: number;
  };
  analysis: {
    whatsGood: string[];
    whatsMissing: string[];
    weakSections: string[];
    recruiterConcerns: string[];
    formattingIssues: string[];
    keywordProblems: string[];
    grammarIssues: string[];
    impactStatements: string[];
    actionVerbsUsed: string[];
    passiveLanguageFound: string[];
    buzzwordsFound: string[];
    weakBullets: string[];
    repetitiveContent: string[];
  };
  atsSimulation: {
    canRecruiterRead: boolean;
    extractedTextPreview: string;
    parsingIssues: string[];
  };
  keywordAnalysis: {
    matched: string[];
    missingTechnical: string[];
    missingTools: string[];
    missingFrameworks: string[];
    missingCertifications: string[];
    missingSoftSkills: string[];
    missingLeadershipWords: string[];
    missingAIKeywords: string[];
    missingCloudKeywords: string[];
  };
  improvementSuggestions: {
    id: string;
    section: string;
    currentVersion: string;
    problem: string;
    suggestedVersion: string;
    reason: string;
    recruiterImpact: string;
  }[];
}

export interface JobMatchResult {
  matchScore: number; // 0-100
  hiringProbability: string; // "High", "Medium", "Moderate"
  matchedSkills: string[];
  missingSkills: string[];
  importantKeywords: string[];
  recruiterRecommendations: string[];
  expectedInterviewQuestions: string[];
  suggestedResumeImprovements: string[];
}

export interface MockInterviewQuestion {
  id: string;
  category: string;
  question: string;
  idealAnswer: string;
  tips: string[];
}

export interface MockInterviewAnswerEvaluation {
  questionId: string;
  userAnswer: string;
  score: number; // 0-100
  confidence: number;
  correctness: number;
  depth: number;
  communication: number;
  technicalAccuracy: number;
  feedback: string;
  idealAnswer: string;
}

export interface ResumeVersion {
  id: string;
  versionNumber: number;
  date: string;
  atsScore: number;
  title: string;
  changeSummary: string;
  data: ResumeData;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  preferredRole: string;
  preferredLocation: string;
  expectedSalary: string;
  skills: string[];
  portfolioUrl?: string;
  linkedInUrl?: string;
  gitHubUrl?: string;
  aiCreditsRemaining: number;
  isComplete?: boolean;
}
