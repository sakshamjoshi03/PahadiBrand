require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateResponse = async (prompt) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
        });

        return response.text;

    } catch (error) {
        console.error("Gemini Error:", error);
        throw new Error(error.message || "Failed to generate AI response");
    }
};

module.exports = {
    generateResponse,
};