import "./ChatWindow.css";

import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({
  messages,
  loading,
}) {

  return (

    <div className="chat-window">

      {messages.map((message, index)=>(

        <ChatBubble

          key={index}

          role={message.role}

          message={message.content}

        />

      ))}

      {loading && <TypingIndicator />}

    </div>

  );

}