import React, { useEffect, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket }) => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessage([...message, data]));
  }, [socket, message]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody message={message} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
