import API_BASE_URL from "../../config/config";
import React, { useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';

const LoginForm = ({ onClose, setUser, onSwitchToSignup}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const canSubmit = username && password

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
            const userData = await response.json();
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            onClose();
        }
       else {
        const data = await response.json();
        setError(data.message || 'Login failed.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };


  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
            label="Gebruikersnaam"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            autoFocus
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
        <Typography
            variant="body2"
            sx={{ cursor: 'pointer', color: 'primary.main', mt: 1 }}
            onClick={onSwitchToSignup}
            >
            Nog geen account? Meld je aan
        </Typography>
        <Button type="submit" variant="contained" disabled={!canSubmit}>
              Inloggen
        </Button>
    </form>
  );
};

export default LoginForm;
