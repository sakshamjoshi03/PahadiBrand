import "./ChatBubble.css";

import { motion } from "framer-motion";
import bhula from "../../assets/ai/bhula.png";

const renderFormattedMessage = (text) => {
  if (!text) return null;

  // Split into lines to parse line-by-line for blocks (lists, headers, etc.)
  const lines = text.split("\n");
  const elements = [];
  let inList = false;
  let listItems = [];
  let inNumList = false;
  let numListItems = [];

  const parseInlineStyles = (line) => {
    let parts = [];
    let currentIdx = 0;
    
    // Regex for bold (**text** or __text__), inline code (`code`), and italic (*text*)
    const inlineRegex = /(\*\*|__)(.*?)\1|(`)(.*?)\3|(\*)(.*?)\5/g;
    let match;
    
    while ((match = inlineRegex.exec(line)) !== null) {
      const matchIndex = match.index;
      // Add text before match
      if (matchIndex > currentIdx) {
        parts.push(line.substring(currentIdx, matchIndex));
      }
      
      if (match[1]) { // Bold
        parts.push(<strong key={matchIndex}>{match[2]}</strong>);
      } else if (match[3]) { // Code
        parts.push(<code key={matchIndex} className="inline-code">{match[4]}</code>);
      } else if (match[5]) { // Italic
        parts.push(<em key={matchIndex}>{match[6]}</em>);
      }
      
      currentIdx = inlineRegex.lastIndex;
    }
    
    if (currentIdx < line.length) {
      parts.push(line.substring(currentIdx));
    }
    
    return parts.length > 0 ? parts : line;
  };

  const flushList = (key) => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="chat-ul">
          {listItems.map((item, idx) => (
            <li key={idx}>{parseInlineStyles(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
    if (inNumList && numListItems.length > 0) {
      elements.push(
        <ol key={`ol-${key}`} className="chat-ol">
          {numListItems.map((item, idx) => (
            <li key={idx}>{parseInlineStyles(item)}</li>
          ))}
        </ol>
      );
      numListItems = [];
      inNumList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check headers
    if (trimmed.startsWith("### ")) {
      flushList(i);
      elements.push(<h4 key={i} className="chat-h4">{parseInlineStyles(trimmed.slice(4))}</h4>);
    } else if (trimmed.startsWith("## ")) {
      flushList(i);
      elements.push(<h3 key={i} className="chat-h3">{parseInlineStyles(trimmed.slice(3))}</h3>);
    } else if (trimmed.startsWith("# ")) {
      flushList(i);
      elements.push(<h2 key={i} className="chat-h2">{parseInlineStyles(trimmed.slice(2))}</h2>);
    } 
    // Check unordered lists
    else if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
      if (inNumList) flushList(i);
      inList = true;
      listItems.push(trimmed.slice(2));
    } 
    // Check ordered lists (e.g. 1. item)
    else if (/^\d+\.\s+/.test(trimmed)) {
      if (inList) flushList(i);
      inNumList = true;
      const content = trimmed.replace(/^\d+\.\s+/, "");
      numListItems.push(content);
    } 
    // Check horizontal rules
    else if (trimmed === "---" || trimmed === "***") {
      flushList(i);
      elements.push(<hr key={i} className="chat-hr" />);
    }
    // Empty line (paragraph break)
    else if (trimmed === "") {
      flushList(i);
    } 
    // Regular paragraph line
    else {
      flushList(i);
      elements.push(<p key={i} className="chat-p">{parseInlineStyles(line)}</p>);
    }
  }

  // Flush any remaining lists at the end
  flushList(lines.length);

  return elements;
};

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
          {renderFormattedMessage(message)}
        </div>
        {formattedTime ? <span className="bubble-time">{formattedTime}</span> : null}
      </div>
    </motion.div>
  );
}