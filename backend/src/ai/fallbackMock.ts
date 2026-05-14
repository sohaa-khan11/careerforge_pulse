import { AnalysisResponse, FinalEvaluation } from "@shared/types";

export const MOCK_ANALYSIS: any = {
  sessionId: "mock-session-grounded",
  profile: {
    name: "Alex Rivera",
    seniority: "Student",
    summary: "Computer Science student focused on Machine Learning and Data Analysis.",
    technicalSkills: ["Python", "Scikit-Learn", "Matplotlib", "SQL", "Flask"],
    strengths: ["Academic foundation in ML", "Hands-on project work"],
    weakSignals: ["Lack of production experience", "Limited deployment knowledge"],
    roleAlignment: 65,
    communicationIndicators: ["Academic tone", "Clear explanation of logic"]
  },
  questions: [
    {
      id: "q1",
      type: "technical",
      text: "In your Breast Cancer Classification project, why did you choose CNNs over traditional ML approaches?",
    },
    {
      id: "q2",
      type: "behavioral",
      text: "Tell me about a technical hurdle you faced while cleaning your dataset for the insurance prediction project.",
    },
    {
      id: "q3",
      type: "situational",
      text: "If your model accuracy dropped significantly on the validation set, what would be your first three debugging steps?",
    }
  ]
};

export const MOCK_EVALUATION: FinalEvaluation = {
  overallScore: 68,
  verdict: "Shows good foundational knowledge for a student, but needs to work on explaining the 'why' behind model selection and handling edge cases in data.",
  verdictTier: "Potential Hire",
  hiringManagerNote: "Strong academic foundation but lacks 'battle-tested' logic. Worth a follow-up for a junior role.",
  metrics: [
    { label: "Technical Depth", score: 62, feedback: "Understands basics but answers lack specific architectural trade-offs." },
    { label: "Communication", score: 75, feedback: "Clear and structured, though slightly academic." },
    { label: "Role Alignment", score: 68, feedback: "Aligned for an entry-level position." }
  ],
  roadmap: [
    { phase: "Week 01", focus: "Model Evaluation", desc: "Study Precision-Recall curves and F1-score trade-offs deeply.", impact: "High Priority" },
    { phase: "Week 02", focus: "Deployment", desc: "Learn how to wrap your Flask model in a Docker container.", impact: "Med Priority" },
    { phase: "Week 03", focus: "Testing", desc: "Explore basic unit testing for data pre-processing pipelines.", impact: "Low Priority" }
  ]
};
