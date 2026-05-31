# ⚡ NexusChat — Real-Time Multi-Room Messaging

> A high-performance, fluid, and modern multi-room chat application powered by WebSockets. Built with a TypeScript-first stack using React on the frontend and Node.js/Express on the backend.

<div align="center">

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFDF00)](https://vitejs.dev/)

</div>

---

## 📖 Presentation Overview

**NexusChat** is designed to demonstrate low-latency, bidirectional, event-driven communication using **Socket.io**. Rather than using a database or heavy session management, it leverages lightweight in-memory socket rooms to coordinate instantly-joined messaging clusters. 

The application is split into two clean packages:
1. **Backend**: An Express server running Socket.io, utilizing TypeSafe user state management.
2. **Frontend**: A React single-page application built on Vite, boasting a modern dark-mode glassmorphic theme, responsive sidebar directory, and custom message components.

---

## ✨ Features

- 🌐 **Dynamic Room Routing**: Create or join any room dynamically by simply entering a custom Room ID.
- ⚡ **Instant Bidirectional Messaging**: Sub-millisecond text synchronization with Socket.io client-server heartbeats.
- 👥 **Live Active Directory**: A dynamic sidebar that lists all currently connected users in your active room.
- 📣 **System Notifications**: Integrated system broadcasts when users join or leave the channel.
- 🕒 **Localized Timestamps**: Precise message timestamps custom-tailored to the user's localized time.
- 🎨 **Sleek Glassmorphic Theme**: Dark mode design with linear gradient buttons, interactive hover transitions, and user avatar initials.

---

## 💻 Tech Stack & Dependencies

| Component | Technology / Library | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19 & TypeScript** | Components, state management, hooks. |
| **Frontend Router** | **React Router 7** | Client-side routing and state transfer between Join and Chat views. |
| **WebSocket Client** | **Socket.io Client** | Real-time event listener and emitter. |
| **Frontend Bundler** | **Vite** | Hyper-fast hot module reloading and build processing. |
| **Styling** | **Vanilla CSS3** | Custom variables, keyframe animations, responsive grid layouts. |
| **Backend Engine** | **Node.js & Express** | Runs the HTTP server hosting the Socket.io adapter. |
| **Development Utility**| **tsx & TypeScript** | On-the-fly execution and hot-reloading for TypeScript backend files. |

---

## 📂 Project Structure

```
SOCKET IO/
├── backend/
│   ├── src/
│   │   ├── index.ts        # Socket.io connection & event dispatchers
│   │   ├── app.ts          # Express configuration
│   │   └── models/         # Memory-based user model state
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── main.tsx        # React entrypoint
│   │   ├── App.tsx         # Route manager
│   │   ├── pages/          
│   │   │   ├── Join.tsx    # Connection settings / Join screen
│   │   │   └── Chat.tsx    # Workspace chat UI & event listeners
│   │   └── App.css         # Responsive styling sheets
│   ├── package.json
│   └── index.html
└── README.md               # Presentation and guide (this file)
```

---

## 🚀 Getting Started

Follow these instructions to spin up the local development servers for both components.

### 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1️⃣ Run the Backend Server
Navigate to the `backend/` directory, install packages, and start the development hot-reloader:

```bash
cd backend
npm install
npm run dev
```
> [!NOTE]
> The backend server will spin up at `http://localhost:3000`.

### 2️⃣ Run the Frontend client
In a new terminal window, navigate to the `frontend/` directory, install packages, and start Vite's dev server:

```bash
cd frontend
npm install
npm run dev
```
> [!NOTE]
> The client interface will open at `http://localhost:5173`.

---

## 🔒 License
This project is open-source and available under the [ISC License](LICENSE).
