export interface StudentProfile {
  name: string;
  degree: string;
  major: string;
  currentYear: string;
  technicalSkills: string[];
  softSkills: string[];
  interests: string[];
  goals: string;
  workPreference: 'Remote' | 'Hybrid' | 'On-site' | 'Any';
  targetRoles: string[];
}

export interface CareerRecommendation {
  id: string;
  title: string;
  matchScore: number;
  domain: string;
  summary: string;
  rationale: string;
  avgSalary: string;
  growthRate: string;
  industryDemand: 'High' | 'Very High' | 'Moderate';
  requiredSkills: { skill: string; importance: 'Essential' | 'Recommended' | 'Bonus' }[];
  typicalRoles: string[];
  topEmployers: string[];
  pros: string[];
  cons: string[];
}

export interface SkillGapItem {
  name: string;
  category: 'Technical' | 'Soft' | 'Tool';
  priority: 'Critical' | 'Medium' | 'Low';
  estimatedHours: number;
  learningTip: string;
}

export interface SkillAnalysisResult {
  role: string;
  overallMatchScore: number;
  matchedSkills: string[];
  missingSkills: SkillGapItem[];
  strengthsSummary: string;
  actionPlan: string[];
}

export interface CourseRecommendation {
  id: string;
  title: string;
  platform: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isFree: boolean;
  rating: number;
  skillsCovered: string[];
  certificationName: string;
  category: string;
}

export interface InternshipStrategy {
  targetRole: string;
  timeline: { month: string; focus: string; checklist: string[] }[];
  platforms: { name: string; url: string; badge: string; description: string }[];
  coldEmailTemplates: {
    title: string;
    targetRecipient: string;
    subject: string;
    body: string;
  }[];
  standoutProjectIdeas: {
    title: string;
    tech: string[];
    pitch: string;
    expectedDeliverable: string;
  }[];
  interviewPrepChecklist: string[];
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
    summary: string;
  };
  education: {
    id: string;
    institution: string;
    degree: string;
    major: string;
    graduationYear: string;
    gpa?: string;
  }[];
  experience: {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    location: string;
    bullets: string[];
  }[];
  projects: {
    id: string;
    name: string;
    technologies: string[];
    description: string;
    githubUrl?: string;
    liveUrl?: string;
    bullets: string[];
  }[];
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  certifications: {
    id: string;
    name: string;
    issuer: string;
    year: string;
  }[];
}

export interface ATSCheckResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'Needs Improvement';
  checks: { label: string; passed: boolean; message: string }[];
  foundKeywords: string[];
  suggestedKeywords: string[];
  actionableFeedback: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type: 'Technical' | 'HR / Behavioral' | 'Situational';
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  modelAnswer: string;
  evalCriteria: string[];
  starFrameworkTip?: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  skillsAcquired: string[];
  suggestedProject?: string;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseTitle: string;
  timeframe: string;
  focus: string;
  milestones: RoadmapMilestone[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string; payload?: any }[];
}
