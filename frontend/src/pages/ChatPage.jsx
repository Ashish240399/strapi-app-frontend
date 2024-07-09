import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { getMessagesForUser } from "../services/getMessagesForUser";
import "../styles/ChatPage.css";
import { IoSend } from "react-icons/io5";
import { logoutUser } from "../services/logout";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:1337");

const ChatPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const jwt = localStorage.getItem("jwt-token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getAllChat();
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("server-message", (data) => {
      getAllChat();
      console.log("Server message received:", data);
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

  async function getAllChat() {
    const response = await getMessagesForUser(user.id, jwt);
    if (response.status === 200) {
      setChat(response.data);
    }
  }

  const sendMessage = async () => {
    const messageData = {
      message,
      senderId: user.id,
      jwt,
    };
    console.log("Sending message:", messageData);
    socket.emit("message", messageData);
    setChat((prev) => [...prev, messageData]);
    setMessage("");
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);

    // Extracting date components
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // Extracting time components
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Formatting date and time
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} ${formattedTime}`;
  };

  function logout() {
    const response = logoutUser();
    navigate("/auth/login");
  }

  return (
    <div className="chat-page-container">
      <div className="chat-nav">
        <p className="chat-title">Chat With Server</p>
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <div onClick={() => logout()} style={{ cursor: "pointer" }}>
            Logout
          </div>
          <div className="avatar">{user.username[0]}</div>
        </div>
      </div>
      <div className="chat-container">
        <div>
          {chat.map((msg, index) => (
            <div
              className={`${msg.sender == 0 ? "received-msg" : "sent-msg"}`}
              key={index}
            >
              <span>{msg.message}</span>
              <div>{formatDateTime(msg.createdAt)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-box">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send Message"
        />
        <button onClick={sendMessage}>
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
