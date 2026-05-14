# CareerForge Pulse

**"What a recruiter actually sees when they read your resume."**

CareerForge Pulse is an AI-powered interview simulation tool that helps developers understand their technical readiness. Instead of just matching keywords like traditional ATS scanners, Pulse analyzes your project history to generate specific technical questions, evaluates your reasoning, and provides an objective breakdown of your strengths and gaps.

---

## 🔗 Quick Links
- **[Demo Link](https://drive.google.com/file/d/1w51lmaGbcDySIfb0C3ZEXmMtxF8V-Emi/view?usp=sharing)**
- **[Live Application](https://careerforge-pulse.vercel.app)**
- **[Technical Architecture](docs/architecture.md)**

---

## 🚩 The Problem
- **Feedback Gap**: Most applicants don't know why they were rejected or if they were even qualified for the role.
- **Surface-Level Scanners**: Current resume tools focus on SEO and keywords rather than technical depth or logical consistency.
- **Generic Prep**: General interview prep often misses the specific context of a developer's unique project background.

---

## ✅ The Solution
Pulse acts as a simulation of a technical recruiter’s initial screening process.
- **Contextual Interviewing**: Questions aren't pulled from a bank; they are generated dynamically from the tech stack and projects listed on your resume.
- **Objective Evaluation**: The system looks for technical signals in your answers—like architectural awareness and trade-off reasoning—to determine seniority.
- **Actionable Roadmap**: Beyond just a score, Pulse generates a 3-week study plan targeting the specific "weak signals" identified during the session.

---

## 🛠️ Key Features
- **Semantic Resume Parsing**: Goes beyond keywords to understand the complexity and seniority of your past work.
- **Adaptive Technical Questions**: Generates follow-up questions that probe the "how" and "why" of your specific projects.
- **Recruiter Dashboard**: Provides a "Verdict" (Strong Hire, Potential, etc.) alongside detailed hiring manager notes.
- **Competency Radar**: A visual map of your performance across Architecture, Logic, and Communication.
- **Multi-Model Orchestration**: Uses Gemini 1.5 Flash as the primary engine with Groq (Llama 3.3) as a low-latency fallback.
- **Grounded AI**: The evaluation logic is strictly grounded in your resume to ensure questions remain relevant and realistic.

---

## 🎥 Watch Full Demo
> [!IMPORTANT]
> Link: https://drive.google.com/file/d/1w51lmaGbcDySIfb0C3ZEXmMtxF8V-Emi/view?usp=sharing

---

## 💻 Tech Stack

### Frontend
- **Next.js 14**: App Router for a fast, modern UI.
- **Tailwind CSS**: Clean, responsive layout.
- **Framer Motion**: Subtle transitions and interactive states.
- **Recharts**: Data visualization for the competency matrix.

### Backend
- **Node.js / Express**: Lightweight API orchestration.
- **TypeScript**: Shared types across the full stack for stability.
- **Multer**: Handling secure resume uploads.
- **PDF-Parse**: Extracting text from candidate resumes.

### AI Infrastructure
- **Primary**: Google Gemini 1.5 Flash.
- **Fallback**: Groq (Llama 3.3 70B).
- **Custom Logic**: Logic for robust JSON extraction and model failovers.

---

## 🏗️ Architecture Overview
Pulse is built as a monorepo for simplicity and type safety.
- **Prompts as Code**: AI system instructions are stored as Markdown files in `/prompts`, making them easy to version and refine.
- **Failover Strategy**: The backend includes a resilience layer that automatically switches AI providers if the primary API is unavailable.
- **In-Memory Sessions**: Evaluation states are managed on the server to keep the interview flow secure and consistent.

---

## 📂 Folder Structure
```text
CareerForge_Pulse/
├── frontend/             # Next.js UI
├── backend/              # Express API & AI Logic
├── shared/               # Shared TypeScript interfaces
├── prompts/              # Markdown prompt templates
├── docs/                 # Technical documentation
└── package.json          # Root workspace config
```

---

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js 18 or higher
- API keys for Gemini and Groq

### 2. Configuration
**Note:** The following environment variables are required for the application to function:
- `GEMINI_API_KEY`
- `GROQ_API_KEY`
- `NEXT_PUBLIC_API_URL` (Points to the backend server)

**Backend (`backend/.env`):**
```env
PORT=5000
GEMINI_API_KEY=your_actual_key_here
GROQ_API_KEY=your_actual_key_here
FRONTEND_URL=http://localhost:3000
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Run Locally
```bash
# Install dependencies
npm run setup

# Start both frontend and backend
npm run dev
```

---

## 🔮 Future Scope
- **Voice Support**: Transitioning the interview from text to real-time voice-to-voice simulation.
- **Role Customization**: Selecting specific company "cultures" (e.g., Big Tech vs. Early Stage Startup) to adjust the recruiter's persona.
- **Coding Integration**: Adding short live-coding snippets into the evaluation flow.


