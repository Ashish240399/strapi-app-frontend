import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:1337");

const App = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [senderId, setSenderId] = useState(2); // Set this to the appropriate sender ID
  const [jwt, setJwt] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIwNDYwNDY2LCJleHAiOjE3MjMwNTI0NjZ9.lQGUHi6uyASNVMCEgbK1MAw9EN2qqiDfoUgUCYv8gOo"
  ); // Set this to the JWT token received after login

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("server-message", (data) => {
      console.log("Server message received:", data);
      setChat((prevChat) => [...prevChat, data]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.off("server-message");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const sendMessage = async () => {
    const messageData = {
      message,
      senderId,
      jwt,
    };
    console.log("Sending message:", messageData);
    socket.emit("message", messageData);
    setMessage("");
  };

  return (
    <div>
      <h1>Chat with Server</h1>
      <div>
        {chat.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
