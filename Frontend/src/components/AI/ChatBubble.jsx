import "./ChatBubble.css";

import { motion } from "framer-motion";
import bhula from "../../assets/ai/bhula.png";

export default function ChatBubble({ role, message, timestamp }) {
  const isUser = role === "user";

  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : "";

  return (
    <motion.div
      className={`chat-bubble ${isUser ? "user" : "assistant"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {!isUser && (
        <img
          src={bhula}
          alt="Bhula"
          className="chat-avatar"
        />
      )}

      <div className="bubble-wrapper">
        <div className="bubble-content">
          {message}
        </div>
        {formattedTime ? <span className="bubble-time">{formattedTime}</span> : null}
      </div>
    </motion.div>
  );
}