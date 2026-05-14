// Use require to avoid ESM/CJS interop issues with legacy pdf-parse
const pdf = require("pdf-parse");

/**
 * Parses a PDF buffer and returns the extracted text.
 * Uses the standard pdf-parse library (v1.1.1).
 */
export const parseResume = async (buffer: Buffer): Promise<string> => {
  try {
    const parseFunc = typeof pdf === 'function' ? pdf : pdf.default;

    if (typeof parseFunc !== 'function') {
      throw new Error("PDF parser initialization failed");
    }

    const data = await parseFunc(buffer);
    
    if (!data.text || data.text.trim().length === 0) {
      console.warn("[Pulse Parser] Warning: Extracted text is empty. Verify PDF content.");
    }
    
    return data.text || "";
  } catch (error: any) {
    console.error("[Pulse Parser] Extraction failed:", error.message);
    throw new Error(`Failed to parse PDF resume: ${error.message}`);
  }
};
