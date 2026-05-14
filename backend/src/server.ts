import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { parseResume } from "./services/resumeParser";
import { orchestrateAI } from "./ai/orchestrator";
import { AnalysisResponse, FinalEvaluation } from "@shared/types";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`[Pulse] ${req.method} ${req.url}`);
  next();
});

const upload = multer({ dest: "uploads/" });

// In-memory session store (Scalability note: Move to Redis/Postgres for production)
const sessions = new Map<string, any>();

app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  try {
    const role = req.body.role;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No resume file uploaded" });
    }

    if (!fs.existsSync(file.path)) {
      throw new Error("Temporary file storage error");
    }

    const fileBuffer = fs.readFileSync(file.path);
    const resumeText = await parseResume(fileBuffer);
    
    // Cleanup temporary file
    fs.unlinkSync(file.path);

    const systemPromptPath = path.resolve(__dirname, "../../prompts/resume_extraction.md");
    if (!fs.existsSync(systemPromptPath)) {
      throw new Error("Configuration error: Prompt template missing");
    }
    
    const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8");
    const userPrompt = `Role: ${role}\n\nResume Text:\n${resumeText}`;

    const analysis = await orchestrateAI<AnalysisResponse>(userPrompt, systemPrompt, 'analysis');
    
    const sessionId = analysis.sessionId || Math.random().toString(36).substring(7);
    analysis.sessionId = sessionId;

    sessions.set(sessionId, { profile: analysis.profile, role });

    res.json(analysis);
  } catch (error: any) {
    console.error("[Pulse] Analysis pipeline failed:", error.message);
    res.status(500).json({ 
      error: "Resume analysis failed", 
      details: error.message
    });
  }
});

app.post("/api/evaluate", async (req, res) => {
  try {
    const { sessionId, answers } = req.body;
    const sessionData = sessions.get(sessionId);

    if (!sessionData) {
      return res.status(404).json({ error: "Evaluation session expired or not found" });
    }

    const systemPromptPath = path.resolve(__dirname, "../../prompts/technical_evaluation.md");
    const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8");
    const userPrompt = `
      Candidate Profile: ${JSON.stringify(sessionData.profile)}
      Role: ${sessionData.role}
      Answers: ${JSON.stringify(answers)}
    `;

    const evaluation = await orchestrateAI<FinalEvaluation>(userPrompt, systemPrompt, 'evaluation');
    
    res.json(evaluation);
  } catch (error: any) {
    console.error("[Pulse] Evaluation pipeline failed:", error.message);
    res.status(500).json({ 
      error: "Answer evaluation failed", 
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`[Pulse] Intelligence Backend running on port ${port}`);
});
