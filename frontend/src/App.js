import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Notes from './components/Notes';

function App() {
  const [authToken, setAuthToken] = useState('');

  const handleLogin = (token) => {
    setAuthToken(token);
  };

  const handleRegister = (token) => {
    setAuthToken(token);
  };

  const isLoggedIn = !!authToken;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/notes" /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/notes" /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/notes" /> : <RegistrationForm onRegister={handleRegister} />} />
        <Route path="/notes" element={isLoggedIn ? <Notes authToken={authToken} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
