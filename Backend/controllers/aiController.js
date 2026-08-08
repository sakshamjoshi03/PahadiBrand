const { generateResponse } = require("../services/geminiService");

const chatWithBhula = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "A valid text message is required.",
            });
        }

        const reply = await generateResponse(message.trim());

        return res.status(200).json({
            success: true,
            reply,
        });
    } catch (error) {
        console.error("aiController Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to process AI chat request.",
        });
    }
};

module.exports = {
    chatWithBhula,
};