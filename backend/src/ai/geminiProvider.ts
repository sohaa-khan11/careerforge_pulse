import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const queryGemini = async (prompt: string, systemInstruction?: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      systemInstruction: systemInstruction,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Robust JSON extraction: Find the first { and last }
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    } else {
      // Fallback clean-up
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    }
    
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Gemini query failed");
  }
};
