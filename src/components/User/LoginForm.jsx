import AxiosInstance from '../../config/axios'
import React, { useState } from 'react';
import { useNavigate } from 'react-router'
import { TextField, Typography, Button } from '@mui/material';

const LoginForm = ({ onClose, setUser, onSwitchToSignup}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isBusy, setIsBusy] = useState(false)
  const navigate = useNavigate()


  const canSubmit = username && password && !isBusy;

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    setIsBusy(true);
  
    if (!username || !password) {
      setError('Both fields are required.');
      setIsBusy(false);
      return;
    } 

    AxiosInstance.post(`login/`,{
      username: username,
      password: password,
    })
    .then((response) => {
      console.log(response);
      setUser(response.data.user);
      localStorage.setItem('Token', response.data.token);
      onClose();

      // Force page reload after login
      window.location.reload();
    }
    )
    .catch((error) => {
      console.error("Error during login", error)
    })
  };
  


  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
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
