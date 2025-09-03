import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/authSlice';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Button, Container, Typography } from '@mui/material';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((s: RootState) => s.auth.loggedIn);
  const intl = useIntl();

  const handleLogin = () => {
    dispatch(login());
    navigate('/dashboard');
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h3">{intl.formatMessage({ id: 'home.welcome' })}</Typography>
      <Typography sx={{ mt: 2 }}>This is the public homepage. Click login to view the dashboard.</Typography>
      {loggedIn ? (
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleLogout}>
          {intl.formatMessage({ id: 'logout.button' })}
        </Button>
      ) : (
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleLogin}>
          {intl.formatMessage({ id: 'login.button' })}
        </Button>
      )}
    </Container>
  );
}
