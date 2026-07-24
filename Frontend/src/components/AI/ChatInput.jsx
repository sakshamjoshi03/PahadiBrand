import { useState } from "react";

import "./ChatInput.css";

export default function ChatInput({ onSend }) {

  const [input, setInput] = useState("");

  const handleSend = () => {

    if (!input.trim()) return;

    onSend(input);

    setInput("");

  };

  return (

    <div className="chat-input">

      <input

        type="text"

        placeholder="Ask Your Pahadi Bhula..."

        value={input}

        onChange={(e)=>setInput(e.target.value)}

        onKeyDown={(e)=>{

          if(e.key==="Enter"){

            handleSend();

          }

        }}

      />

      <button onClick={handleSend}>

        ➤

      </button>

    </div>

  );

}