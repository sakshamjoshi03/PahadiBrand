const { generateResponse } = require("../services/geminiService");

const chatWithBhula = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        const reply = await generateResponse(message);

        return res.status(200).json({
            success: true,
            reply,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    chatWithBhula,
};