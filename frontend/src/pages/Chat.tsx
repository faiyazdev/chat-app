import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { io, Socket } from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:3000"; // Adjust if your server runs on a different port

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export default function Chat() {
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Extract navigation state
  const state = location.state as { username?: string; roomId?: string } | null;
  const username = state?.username || "User";
  const roomId = state?.roomId || "General";

  // Use a ref to persist the socket instance without triggering re-renders
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  // Local chat messages state (starting with some welcoming mock messages to make the UI look rich)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "System",
      text: `Welcome to room "${roomId}"! You are connected as ${username}.`,
      timestamp: new Date(Date.now() - 60000 * 5).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: false,
    },
    {
      id: "2",
      sender: "Sarah Jenkins",
      text: "Hey everyone! Glad we got this room set up. Is the Socket.IO server running?",
      timestamp: new Date(Date.now() - 60000 * 3).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: false,
    },
    {
      id: "3",
      sender: "David Kim",
      text: "Yes! Just spun up the Node server. WebSockets are active. It feels incredibly fast ⚡",
      timestamp: new Date(Date.now() - 60000 * 2).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: false,
    },
  ]);
  const [users, setUsers] = useState<
    {
      id: string;
      socketId: string;
      username: string;
      roomId: string;
      createdAt: Date;
    }[]
  >([]);

  useEffect(() => {
    // 1. Initialize the socket connection
    const socket = io(SOCKET_SERVER_URL);
    socketRef.current = socket;

    // 2. Set up lifecycle listeners
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to server with ID:", socket.id);

      socket.emit("join_room", { roomId, username });
      // Optionally join a room immediately on connect
      // socket.emit("join_room", roomId);
    });

    socket.on("room_users", (users) => {
      console.log(users);
      setUsers(users);
    });

    socket.on("receive_message", (data) => {
      const isMe = data.sender === username;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: data.sender,
          text: data.text,
          timestamp: data.timestamp,
          isMe,
        },
      ]);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    // 4. Cleanup on component unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
      socket.disconnect(); // Closes the connection cleanly
    };
  }, [roomId, username]);

  // Check state and redirect if missing
  useEffect(() => {
    if (!state?.username || !state?.roomId) {
      // Redirect to Join page if username/room isn't provided
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  const [inputText, setInputText] = useState("");

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    const socket = socketRef.current;

    if (!socket) return;

    socket.emit("chatMessage", {
      sender: username,
      text: inputText.trim(),
      roomId,
    });

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
            <span className="room-name">{roomId}</span>
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
