import { useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import { sendMessage } from "../../services/aiService";
import "./ChatSection.css";

const ChatSection = () => {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "🙏 Namaste! I'm Your Pahadi Bhula. Ask me anything about Himalayan products, recipes, wellness, culture, or PahadiBrand products!",
        },
    ]);

    const [loading, setLoading] = useState(false);

    const handleSendMessage = async (message) => {
        if (!message.trim() || loading) return;

        const userMessage = {
            role: "user",
            content: message.trim(),
        };

        // Display user message immediately
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const reply = await sendMessage(message.trim());

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: reply || "I couldn't generate a response.",
                },
            ]);
        } catch (error) {
            console.error("AI Error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "⚠️ Sorry, I'm currently unavailable. Please try again in a few moments.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const suggestionChips = [
        "Tell me about Buransh Juice",
        "Best Himalayan products",
        "Healthy recipes using Mandua",
        "Benefits of Wild Himalayan Honey",
        "Tell me about Pahadi culture",
    ];

    return (
        <section className="chat-section">
            <div className="chat-suggestions">
                {suggestionChips.map((chip) => (
                    <button
                        key={chip}
                        className="suggestion-chip"
                        disabled={loading}
                        onClick={() => handleSendMessage(chip)}
                    >
                        {chip}
                    </button>
                ))}
            </div>

            <ChatWindow
                messages={messages}
                loading={loading}
            />

            <ChatInput
                onSend={handleSendMessage}
                disabled={loading}
            />
        </section>
    );
};

export default ChatSection;