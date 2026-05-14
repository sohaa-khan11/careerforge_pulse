import { queryGemini } from "./geminiProvider";
import { queryGroq } from "./groqProvider";
import { MOCK_ANALYSIS, MOCK_EVALUATION } from "./fallbackMock";

const extractJSON = (text: string) => {
  try {
    // Try simple parse first
    return JSON.parse(text);
  } catch (e) {
    // Try to find JSON block in markdown
    const match = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
    if (match) {
      try {
        return JSON.parse(match[1] || match[0]);
      } catch (inner) {
        throw new Error("Failed to parse extracted JSON content");
      }
    }
    throw new Error("No valid JSON structure found in AI response");
  }
};

export const orchestrateAI = async <T>(
  prompt: string, 
  systemInstruction: string, 
  type: 'analysis' | 'evaluation'
): Promise<T> => {
  console.log(`[Pulse AI] Initiating ${type} sequence...`);

  // 1. Primary: Gemini
  try {
    const result = await queryGemini(prompt, systemInstruction);
    return extractJSON(result) as T;
  } catch (error: any) {
    console.warn(`[Pulse AI] Gemini failed (${error.message}). Attempting fallback...`);
  }

  // 2. Secondary: Groq
  try {
    const result = await queryGroq(prompt, systemInstruction);
    return extractJSON(result) as T;
  } catch (error: any) {
    console.error(`[Pulse AI] Groq failed (${error.message}). Returning static fallback.`);
  }

  // 3. Final Resilience Fallback
  return (type === 'analysis' ? MOCK_ANALYSIS : MOCK_EVALUATION) as unknown as T;
};
