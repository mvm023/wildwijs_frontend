import API_BASE_URL from "../../config/config";
import React, { useState } from 'react';
import { TextField, Typography, Button, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { green, red } from '@mui/material/colors';


const SignupForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isBusy, setIsBusy] = useState(false)

  const isLongEnough = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = isLongEnough && hasNumber && hasUppercase && hasSpecialChar;
  const passwordsAgree = isPasswordValid && password == repeatPassword;

  const canSubmit = username && email && isPasswordValid && passwordsAgree && !isBusy;

  const handleSubmit = async (event) => {
    setIsBusy(true);

    event.preventDefault();
    if (!canSubmit) {
      setError('Vul alle velden in en kies een sterk wachtwoord.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setError('');
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.message || 'Aanmelding mislukt.');
      }
    } catch (error) {
      console.log(error);
      setError('Er is een fout opgetreden. Probeer het opnieuw.');
    }
    finally{
      setIsBusy(false);
    }
  };


  const renderCondition = (label, valid) => (
    <Box display="flex" alignItems="center" gap={1}>
      {valid ? <CheckCircleIcon color="success" fontSize="small" /> : <CancelIcon color="error" fontSize="small" />}
      <Typography color={valid ? 'green' : 'error'} fontSize="0.9rem">{label}</Typography>
    </Box>
  );

  if (success) {
    return (
      <Typography sx={{ mt: 2 }}>
        Bevestig je e-mailadres om je account te activeren. 
        Controleer je inbox (en eventueel je spamfolder).
      </Typography>
    );
  }

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
      <TextField
        label="Herhaal wachtwoord"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        required
        fullWidth
      />
      {renderCondition("Minstens 8 karakters", isLongEnough)}
      {renderCondition("Minstens 1 getal", hasNumber)}
      {renderCondition("Minstens 1 hoofdletter", hasUppercase)}
      {renderCondition("Minstens 1 speciaal karakter", hasSpecialChar)}
      {renderCondition("Wachtwoorden komen overeen", passwordsAgree)}
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" disabled={!canSubmit}>
        Aanmelden
      </Button>
    </form>
  );
};

export default SignupForm;
