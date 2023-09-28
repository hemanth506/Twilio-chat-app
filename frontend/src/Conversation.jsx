import React, { useEffect, useState } from "react";
import "./Conversation.css";

function Conversation({ activeConversation, name }) {
  console.log(
    "🚀 ~ file: Conversation.jsx:7 ~ Conversation ~ activeConversation:",
    activeConversation
  );

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  console.log(
    "🚀 ~ file: Conversation.jsx:11 ~ Conversation ~ messages:",
    messages
  );
  useEffect(() => {
    activeConversation.getMessages().then((newMessage) => {
      setMessages([...messages, newMessage.items]);
    });

    activeConversation.on("messageAdded", (message) => {
      setMessages([...messages, message]);
    });
  }, []);

  const sendMessage = () => {
    activeConversation.sendMessage(messageText).then(() => {
      setMessageText("");
    });
  };

  return (
    <div id="conversation">
      <div className="conversation-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`bubble-container ${
              message?.state?.author === name ? "myMessage" : ""
            }`}
          >
            <div className="bubble">
              <div className="name">{message?.state?.author}:</div>
              <div className="message">{message?.state?.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={sendMessage}>Send message</button>
      </div>
    </div>
  );
}

export default Conversation;
