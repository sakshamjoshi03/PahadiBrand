require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

let aiClient = null;

const getAIClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured in backend environment variables.");
    }
    if (!aiClient) {
        aiClient = new GoogleGenAI({ apiKey });
    }
    return aiClient;
};

const SYSTEM_INSTRUCTION = `You are YourPahadiBhula (also known as Bhula), a warm, helpful, and highly knowledgeable AI assistant dedicated to assisting local and rural food-processing businesses in Uttarakhand and other hilly regions.

Your goals are:
- Help users generate beautiful brand names, product descriptions, creative packaging content, competitor insights, social media posts, and brand stories.
- Keep your tone friendly, encouraging, and respectful of local traditions and heritage.
- Provide clean, extremely well-structured, and easy-to-read replies. 

Formatting Rules:
- Break up your responses using short paragraphs with empty lines between them.
- Avoid large, compressed walls of text.
- Use unordered list bullets (e.g., using "-") or ordered numbers (e.g., "1.") to present key points, instructions, or suggestions.
- Use bold text (with "**bold**") for emphasis and headers (with "###" or "##") to organize different sections.
- Make sure lists are spaced out nicely so that they are highly readable.`;

const generateResponse = async (prompt) => {
    const ai = getAIClient();
    const primaryModel = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
    const modelsToTry = [primaryModel, "gemini-3.1-flash-lite", "gemini-2.0-flash"].filter(
        (m, idx, arr) => arr.indexOf(m) === idx
    );

    let lastError = null;

    for (const model of modelsToTry) {
        try {
            const response = await ai.models.generateContent({
                model,
                contents: prompt,
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION,
                }
            });

            if (response && response.text) {
                return response.text;
            }
        } catch (error) {
            console.warn(`Gemini model ${model} attempt failed:`, error.message);
            lastError = error;
        }
    }

    console.error("Gemini Error across all fallback models:", lastError);
    throw new Error(lastError?.message || "Failed to generate AI response");
};

module.exports = {
    generateResponse,
};
