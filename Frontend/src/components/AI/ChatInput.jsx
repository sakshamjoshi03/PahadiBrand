import { useState } from "react";

import "./ChatInput.css";

export default function ChatInput({ onSend, disabled = false }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || disabled) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder={disabled ? "Generating response..." : "Ask Your Pahadi Bhula..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) {
            handleSend();
          }
        }}
      />

      <button type="button" onClick={handleSend} disabled={disabled || !input.trim()}>
        {disabled ? "..." : "➤"}
      </button>
    </div>
  );
}
