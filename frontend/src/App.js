import "./App.css";
import { useState } from "react";
import {
  conClient,
  initConversationsClient,
  createConversationFunction,
} from "./helper.js";
import Conversation from "./Conversation";

function App() {
  const [statusString, setStatusString] = useState("");
  const [activeConversation, setActiveConversation] = useState(null);
  const [name, setName] = useState("");
  const [nameRegistered, setNameRegistered] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const registerName = async (tempSetStatusString, tempSetIsConnected) => {
    setNameRegistered(true);
    await initConversationsClient(
      name,
      tempSetStatusString,
      tempSetIsConnected
    );
  };

  const createConversation = async () => {
    console.log("check 123");
    try {
      await conClient.getUser("aa");
      await conClient.getUser("bb");
    } catch {
      console.error("Waiting for Ruchika and Hemanth client sessions");
      return;
    }

    try {
      console.log(
        "🚀 ~ file: App.js:40 ~ createConversation ~ conClient:",
        conClient
      );
      const newConversation = await conClient.conversation.conversation.create({
        friendlyName: "chat",
      });
      console.log(
        "🚀 ~ file: App.js:41 ~ createConversation ~ newConversation:",
        newConversation
      );
      const joinedConversation = await newConversation
        .join()
        .catch((err) => console.log(err));
      await joinedConversation
        .add("Ruchika")
        .catch((err) => console.log("error: ", err));
      await joinedConversation
        .add("Hemanth")
        .catch((err) => console.log("error: ", err));
      setActiveConversation(joinedConversation);
    } catch {
      setActiveConversation(
        await conClient.getConversationByUniqueName("chat")
      );
    }
  };

  return (
    <div className="App">
      <h1>Welcome to React Chat App{nameRegistered && `, ${name}`}!</h1>
      <p>{statusString}</p>
      {!nameRegistered && (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button onClick={() => registerName(setStatusString, setIsConnected)}>
            Register name
          </button>
        </div>
      )}
      {nameRegistered && !activeConversation && isConnected && (
        <div>
          <button onClick={createConversation}>Join Chat</button>
        </div>
      )}
      {nameRegistered && activeConversation && isConnected && (
        <Conversation activeConversation={activeConversation} name={name} />
      )}
    </div>
  );
}

export default App;
