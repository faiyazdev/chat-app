import { BrowserRouter, Routes, Route } from 'react-router';
import Join from './pages/Join';
import Chat from './pages/Chat';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
