import React, { useState } from 'react';
import axios from 'axios';
import './auth.scss';
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const endpoint = 'http://localhost:3300/api/register';
    axios.post(endpoint, { username, password }).then(res => {
      console.log('Register Response', res);
    });
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="username" />
        <input
          className="auth-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
          id="username"
          type="text"
        />
        <label htmlFor="password" />
        <input
          className="auth-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          id="password"
          type="password"
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
