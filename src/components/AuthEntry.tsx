import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCurrentUser } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { setToken } from '../api/apiClient'; // <- import

export default function AuthEntry() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(s => s.auth);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token); // <- set token for api client BEFORE fetchCurrentUser
      dispatch(fetchCurrentUser() as any)
        .catch(() => {
          // If fetch fails (token invalid), clear token
          setToken(null);
          localStorage.removeItem('token');
        })
        .finally(() => setInitialized(true));
    } else {
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!initialized || auth.status === 'loading') {
    return (
      <Box sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!auth.loggedIn) return <Navigate to="/dashboard" replace />;

  return <Navigate to="/login" replace />;
}