// client/src/App.jsx
import React, { useState } from "react";
import Chat from "./components/Chat";
import "./App.css";



function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) setJoined(true);
  };

  return (
    <div className="app">
      {!joined ? (
        <form onSubmit={handleJoin} className="join-form">
          <h2>Join Chat</h2>
          <input
            type="text"
            placeholder="Enter your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Join</button>
        </form>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;
