// client/src/components/Chat.jsx
import React, { useEffect, useState } from "react";
import socket from "../socket/socket";

const Chat = ({ username }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    socket.emit("join", username);

    socket.on("receiveMessage", (data) => setMessages((prev) => [...prev, data]));
    socket.on("notification", (msg) => setMessages((prev) => [...prev, { user: "System", text: msg }]));
    socket.on("onlineUsers", (users) => setOnlineUsers(users));
    socket.on("typing", (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(""), 2000);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("notification");
      socket.off("onlineUsers");
      socket.off("typing");
    };
  }, [username]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  const handleTyping = () => {
    socket.emit("typing", username);
  };

  return (
    <div className="chat-container">
      <aside className="users">
        <h3>Online Users</h3>
        <ul>{onlineUsers.map((u, i) => <li key={i}>{u}</li>)}</ul>
      </aside>

      <main className="chat">
        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.user === username ? "own" : ""}`}>
              <strong>{msg.user}:</strong> {msg.text}
              {msg.time && <span className="time"> ({msg.time})</span>}
            </div>
          ))}
        </div>
        {typingUser && <p className="typing">{typingUser} is typing...</p>}
        <form onSubmit={sendMessage} className="input-form">
          <input
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping}
          />
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
};

export default Chat;
