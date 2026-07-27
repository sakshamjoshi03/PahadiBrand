import "./ChatWindow.css";

import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({
  messages,
  loading,
  messagesEndRef,
}) {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <ChatBubble
          key={`${message.role}-${index}`}
          role={message.role}
          message={message.content}
          timestamp={message.timestamp}
        />
      ))}

      {loading && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}