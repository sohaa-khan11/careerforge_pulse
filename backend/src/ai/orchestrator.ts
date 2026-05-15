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
  const modelUsed = "llama-3.3-70b-versatile";
  console.log(`[Pulse AI] Initiating ${type} sequence using Primary: Groq (${modelUsed})`);

  // 1. Primary: Groq
  try {
    const result = await queryGroq(prompt, systemInstruction);
    if (!result) throw new Error("Groq returned empty response");
    
    const parsed = extractJSON(result);
    console.log(`[Pulse AI] Groq successfully completed ${type} task.`);
    return parsed as T;
  } catch (error: any) {
    console.error(`[Pulse AI] Groq failed (${error.message}). Triggering Resilience Layer (Static Mocks).`);
  }

  // 2. Final Resilience Fallback
  console.log(`[Pulse AI] Serving mock response to prevent frontend "Failed to fetch" error.`);
  return (type === 'analysis' ? MOCK_ANALYSIS : MOCK_EVALUATION) as unknown as T;
};
