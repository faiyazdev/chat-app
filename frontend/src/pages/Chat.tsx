import React, { useState } from "react";
import { useNavigate } from "react-router";
const SOCKET_SERVER_URL =
  import.meta.env.MODE === "production" ? "/" : "http://localhost:3000";

export default function Chat() {
  const navigate = useNavigate();
  const isConnected = true; // Placeholder for actual connection status
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    setInputText("");
  };

  return (
    <div className="chat-container">
      {/* Sidebar Panel */}
      <aside className="chat-sidebar">
        <div className="sidebar-header">
          <div className="status-indicator">
            <span className="pulse-dot"></span>
            <span className="status-text">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
          <h2>Rooms</h2>
        </div>

        <div className="active-room-section">
          <div className="room-badge">
            <svg
              className="hashtag-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 9H20M4 15H20M9 3V21M15 3V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="room-name">jsj</span>
          </div>
        </div>

        <div className="sidebar-members">
          <div className="members-header">
            <h3>
              Members
              <span className="members-count">({users.length})</span>
            </h3>
          </div>

          {users.length === 0 ? (
            <div className="empty-members">No active members</div>
          ) : (
            <ul className="members-list">
              {users.map((user) => {
                const isCurrentUser = user.username === username;

                return (
                  <li
                    key={user.id}
                    className={`member-item ${
                      isCurrentUser ? "current-user" : ""
                    }`}
                  >
                    <div className="member-avatar-wrapper">
                      <div className="member-avatar">
                        {user.username.charAt(0).toUpperCase()}
                      </div>

                      <span className="online-indicator"></span>
                    </div>

                    <div className="member-details">
                      <span className="member-name">
                        {user.username}

                        {isCurrentUser && (
                          <span className="you-badge">You</span>
                        )}
                      </span>

                      <span className="member-status">Online</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="sidebar-footer">
          <button className="btn-leave" onClick={() => navigate("/")}>
            <svg
              className="leave-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 16L21 12M21 12L17 8M21 12H9M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Leave Room</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-main">
        <header className="chat-header">
          <div className="chat-header-info">
            <h1 className="chat-title">{roomId}</h1>
            <p className="chat-subtitle">Real-time socket.io room</p>
          </div>
        </header>

        {/* Message Log */}
        <div className="messages-log">
          {messages.map((msg) => {
            const isSystem = msg.sender === "System";
            return (
              <div
                key={msg.id}
                className={`message-row ${isSystem ? "system-message" : msg.isMe ? "message-mine" : "message-others"}`}
              >
                {!isSystem && !msg.isMe && (
                  <div className="message-avatar">
                    {msg.sender.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="message-content-wrapper">
                  {!isSystem && (
                    <div className="message-meta">
                      <span className="sender-name">
                        {msg.isMe ? "You" : msg.sender}
                      </span>
                      <span className="message-time">{msg.timestamp}</span>
                    </div>
                  )}

                  <div className="message-bubble">
                    <p>{msg.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Composer Form */}
        <form onSubmit={handleSendMessage} className="message-composer">
          <input
            type="text"
            placeholder={`Message #${roomId}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            maxLength={500}
          />
          <button
            type="submit"
            className="btn-send"
            disabled={!inputText.trim()}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </main>
    </div>
  );
}
