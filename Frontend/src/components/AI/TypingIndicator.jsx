import "./TypingIndicator.css";

import bhula from "../../assets/ai/bhula.png";

export default function TypingIndicator() {
  return (
    <div className="typing-wrapper">
      <img src={bhula} alt="Bhula" className="typing-avatar" />

      <div className="typing-box">
        <p className="typing-title">Thinking...</p>
        <p className="typing-subtitle">Generating response...</p>

        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
}