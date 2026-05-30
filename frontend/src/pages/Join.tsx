import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Join() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !roomId.trim()) return;

    // Navigate to Chat room and pass state
    navigate('/chat', {
      state: {
        username: username.trim(),
        roomId: roomId.trim(),
      },
    });
  };

  return (
    <div className="join-container">
      <div className="join-card">
        <div className="join-header">
          <div className="logo-badge">
            <svg className="bubble-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.9189 3.60098 15.698 4.62534 17.1593C4.85196 17.481 4.93774 17.886 4.85476 18.277L4.31687 20.8115C4.20572 21.3353 4.6647 21.7943 5.18852 21.6831L7.72297 21.1452C8.11403 21.0623 8.51902 21.148 8.84074 21.3747C10.302 22.399 12.0811 23 12 21Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Connect & Chat</h1>
          <p>Join a room to start conversing in real-time</p>
        </div>

        <form onSubmit={handleJoin} className="join-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="e.g., Alex Carter"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              maxLength={20}
            />
          </div>

          <div className="input-group">
            <label htmlFor="roomId">Room ID</label>
            <input
              id="roomId"
              type="text"
              placeholder="e.g., dev-room"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
              maxLength={15}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={!username.trim() || !roomId.trim()}>
            <span>Join Room</span>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
