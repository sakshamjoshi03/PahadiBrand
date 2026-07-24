import "./TypingIndicator.css";

import bhula from "../../assets/ai/bhula.png";

const messages = [
  "🌿 Exploring the Himalayan forests...",
  "🍯 Gathering wisdom from local artisans...",
  "🏔 Consulting the mountain elders...",
];

export default function TypingIndicator() {

  const random =
    messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="typing-wrapper">

      <img
        src={bhula}
        alt="Bhula"
        className="typing-avatar"
      />

      <div className="typing-box">

        <p>{random}</p>

        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>

      </div>

    </div>
  );
}