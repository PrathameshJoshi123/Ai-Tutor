import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ChatBox from './components/Chat/ChatBox';
import ProgressDashboard from './components/Dashboard/ProgressDashboard';
import LearningPath from './components/LearningPath/LearningPath';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/chat" element={<ChatBox/>} />
          <Route path="/dashboard" element={<ProgressDashboard/>} />
          <Route path="/learning-path" element={<LearningPath/>} />
          <Route path="/" exact element={<Login/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
