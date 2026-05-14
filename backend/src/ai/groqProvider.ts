import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "",
  baseURL: "https://api.groq.com/openai/v1",
});

export const queryGroq = async (prompt: string, systemInstruction?: string): Promise<string> => {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemInstruction || "You are a professional technical recruiter." },
        { role: "user", content: prompt },
      ],
      model: "llama-3.3-70b-versatile", // Updated from decommissioned llama-3.1
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("Groq query failed");
  }
};
