import API_BASE_URL from "../../config/config";
import React, { useState, useRef } from 'react';
import { TextField, Typography } from '@mui/material';

const SignupForm = React.forwardRef(({onClose, setUser}, ref) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const formRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        onClose();
      } else {
        const data = await response.json();
        setError(data.message || 'Signup failed.');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred. Please try again.');
    }
  };

  React.useImperativeHandle(ref, () => ({
    submit: () => formRef.current.requestSubmit()
  }));

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField
        label="Gebruikersnaam"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
        autoFocus
      />
      <TextField
        label="E-mailadres"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Wachtwoord"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />
      {error && <Typography color="error">{error}</Typography>}
    </form>
  );
});

export default SignupForm;
