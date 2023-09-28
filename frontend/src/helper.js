import { Client as ConversationsClient } from "@twilio/conversations";

const getToken = async (identity) => {
  const response = await fetch(`http://localhost:5000/auth/user/${identity}`);
  const responseJson = await response.json();
  return responseJson.token;
};

export let conClient;
export const initConversationsClient = async (
  name,
  setStatusString,
  setIsConnected
) => {
  const token = await getToken(name);
  conClient = new ConversationsClient(token);
  setStatusString("Connecting to Twilio...");
  conClient.on("connectionStateChanged", (state) => {
    console.log("🚀 ~ file: helper.js:18 ~ conClient.on ~ state:", state);
    switch (state) {
      case "connected":
        setStatusString("You are connected.");
        setIsConnected(true);
        break;
      case "disconnecting":
        setStatusString("Disconnecting from Twilio...");
        break;
      case "disconnected":
        setStatusString("Disconnected.");
        break;
      case "denied":
        setStatusString("Failed to connect.");
        break;
    }
  });
};

export const createConversationFunction = async (
  convosClient,
  setActiveConversation
) => {
  console.log("🚀 ~ file: helper.js:49 ~ convosClient:", convosClient);
  console.log(
    "🚀 ~ file: helper.js:50 ~ setActiveConversation:",
    setActiveConversation
  );
};
