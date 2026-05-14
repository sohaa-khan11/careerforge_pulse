export interface CandidateProfile {
  name: string;
  seniority: 'Student' | 'Beginner' | 'Intermediate' | 'Experienced';
  summary: string;
  technicalSkills: string[];
  strengths: string[];
  weakSignals: string[];
  roleAlignment: number; // Changed to number for realism
  communicationIndicators: string[];
}

export interface AdaptiveQuestion {
  id: string;
  type: 'technical' | 'behavioral' | 'situational';
  text: string;
  context?: string;
}

export interface AnalysisResponse {
  profile: CandidateProfile;
  questions: AdaptiveQuestion[];
  sessionId: string;
}

export interface Answer {
  questionId: string;
  text: string;
}

export interface EvaluationMetric {
  label: string;
  score: number; // 0-100
  feedback: string;
}

export interface RoadmapStep {
  phase: string;
  focus: string;
  desc: string;
  impact: 'High Priority' | 'Med Priority' | 'Low Priority';
}

export interface FinalEvaluation {
  overallScore: number;
  verdict: string;
  verdictTier: 'Strong Hire' | 'Potential Hire' | 'Needs Improvement' | 'Not a Fit';
  hiringManagerNote: string;
  metrics: EvaluationMetric[];
  roadmap: RoadmapStep[];
}
