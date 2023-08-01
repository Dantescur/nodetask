import React, { useState } from 'react';
import api from '../services/api';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post('/auth/login', { email, password });
    console.log(response); // Add this line to inspect the response object
    if (response && response.data && response.data.token) {
      onLogin(response.data.token);
    } else {
      console.error('Login failed: Token not received');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
