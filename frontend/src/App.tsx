import { Routes, Route } from "react-router";
import Chat from "./pages/Chat";
import "./App.css";
import Navbar from "./components/Navbar";
import { useAuthReq } from "./hooks/useAuthReq";

function App() {
  const { isClerkLoaded } = useAuthReq();
  if (!isClerkLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
