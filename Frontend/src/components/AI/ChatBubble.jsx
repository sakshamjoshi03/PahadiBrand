import "./ChatBubble.css";

import { motion } from "framer-motion";
import bhula from "../../assets/ai/bhula.png";

export default function ChatBubble({ role, message }) {
  const isUser = role === "user";

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

      <div className="bubble-content">
        {message}
      </div>
    </motion.div>
  );
}