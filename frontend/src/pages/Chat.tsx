import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useUser } from "@clerk/react";

// const SOCKET_SERVER_URL =
// import.meta.env.MODE === "production" ? "/" : "http://localhost:3000";

export default function Chat() {
  const [inputText, setInputText] = useState("");
  const {
    users,
    messages,
    isMessagesLoading,
    setSelectedUserId,
    isUsersLoading,
    selectedUserId,
    createMessage,
  } = useChatStore((state) => state);
  const { user: currentUser } = useUser();

  useEffect(() => {
    useChatStore.getState().getUsers();
    useChatStore.getState().getMessages();
  }, []);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) return;
    createMessage(inputText);
    setInputText("");
  };

  return (
    <div className="chat-container">
      {/* Sidebar Panel */}
      <aside className="chat-sidebar">
        <div className="sidebar-members">
          <div className="members-header">
            <h3>
              Members
              <span className="members-count">({users?.length})</span>
            </h3>
          </div>

          {isUsersLoading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <ul className="members-list">
              {users?.map((user) => {
                console.log(user);
                const isCurrentUser = user.clerkUserId === currentUser?.id;

                return (
                  <li
                    key={user.id}
                    className={`member-item ${
                      isCurrentUser ? "current-user" : ""
                    }`}
                    onClick={() => setSelectedUserId(user.id)}
                  >
                    <div className="member-avatar-wrapper">
                      <div className="member-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      <span className="online-indicator"></span>
                    </div>

                    <div className="member-details">
                      <span className="member-name">
                        {user.name}

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
      </aside>

      {/* Main Chat Area */}
      {!selectedUserId ? (
        <div className="chat-placeholder">
          <p>Select a user to start chatting</p>
        </div>
      ) : (
        <main className="chat-main">
          {/* Message Log */}
          {isMessagesLoading ? (
            <div className="loading">Loading messages...</div>
          ) : (
            <div className="messages-log">
              {messages?.map((msg) => {
                console.log(msg);
                const isMe = msg.senderId === currentUser?.id;
                return (
                  <div
                    key={msg.id}
                    className={`message-row ${isMe ? "message-mine" : "message-others"}`}
                  >
                    <div className="message-avatar">
                      {msg.senderId.charAt(0).toUpperCase()}
                    </div>

                    <div className="message-content-wrapper">
                      <div className="message-meta">
                        <span className="sender-name">
                          {isMe ? "You" : msg.senderId}
                        </span>
                        <span className="message-time">
                          {msg.createdAt?.toLocaleTimeString()}
                        </span>
                      </div>

                      <div className="message-bubble">
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <div ref={messagesEndRef} /> */}
            </div>
          )}

          {/* Message Composer Form */}
          <form onSubmit={handleSendMessage} className="message-composer">
            <input
              type="text"
              placeholder={`Message ${users?.find((u) => u.clerkUserId === currentUser?.id)?.name || "User"}...`}
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
      )}
    </div>
  );
}
