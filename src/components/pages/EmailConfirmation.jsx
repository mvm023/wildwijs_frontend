import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Container } from '@mui/material';
import API_BASE_URL from '../../config/config';

import { useRef } from 'react';

const EmailConfirmation = () => {
  const { uidb64, token } = useParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const hasRun = useRef(false); // stays persistent across re-renders

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const confirmEmail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/confirm-email/${uidb64}/${token}/`);
        const data = await response.json();
        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.error || 'Er is iets misgegaan bij het activeren van je account.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Er is een netwerkfout opgetreden.');
      }
    };

    confirmEmail();
  }, [uidb64, token]);


  return (
    <Container style={{ marginTop: '2rem', textAlign: 'center' }}>
      {status === 'loading' && <CircularProgress />}
      {status !== 'loading' && (
        <Typography variant="h6" color={status === 'success' ? 'green' : 'error'}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default EmailConfirmation;
