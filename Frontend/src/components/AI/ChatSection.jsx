import { useEffect, useRef, useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import { sendMessage } from "../../services/aiService";
import { useNotifications } from "../UI/NotificationProvider";
import "./ChatSection.css";

const getChatErrorMessage = (error) => {
    if (!error.response) {
        return "Network connection lost. Please check your internet and try again.";
    }

    if (error.response.status >= 500) {
        return "Something went wrong while generating a response. Please try again.";
    }

    return "I couldn't generate a response. Please try again.";
};

const ChatSection = () => {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Namaste! I'm Your Pahadi Bhula. Ask me anything about Himalayan products, recipes, wellness, culture, or PahadiBrand products!",
            timestamp: new Date().toISOString(),
        },
    ]);

    const [loading, setLoading] = useState(false);
    const [lastSentMessage, setLastSentMessage] = useState("");
    const { addNotification } = useNotifications();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSendMessage = async (message) => {
        const trimmed = message.trim();
        if (!trimmed || loading || trimmed === lastSentMessage) return;

        const userMessage = {
            role: "user",
            content: trimmed,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setLastSentMessage(trimmed);
        setLoading(true);

        try {
            const reply = await sendMessage(trimmed);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: reply || "I couldn't generate a response.",
                    timestamp: new Date().toISOString(),
                },
            ]);
            addNotification("AI response generated successfully.", "success");
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: getChatErrorMessage(error),
                    timestamp: new Date().toISOString(),
                },
            ]);
            addNotification(getChatErrorMessage(error), "error");
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
                        {loading ? "Generating..." : chip}
                    </button>
                ))}
            </div>

            <ChatWindow
                messages={messages}
                loading={loading}
                messagesEndRef={messagesEndRef}
            />

            <ChatInput
                onSend={handleSendMessage}
                disabled={loading}
            />
        </section>
    );
};

export default ChatSection;
