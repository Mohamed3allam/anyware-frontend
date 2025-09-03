import React, { useEffect } from 'react';
import { Box, Grid, Container, Typography, Button } from '@mui/material';
import Sidebar from '../Layout/Sidebar';
import Topbar from '../Layout/Topbar';
import QuizzesList from './QuizzesList';
import AnnouncementsList from './AnnouncementsList';
import { useDispatch } from 'react-redux';
import { fetchQuizzes } from '../../store/quizzesSlice';
import { fetchAnnouncements } from '../../store/announcementsSlice';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchQuizzes());
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        <Topbar onLogout={handleLogout}/>
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <QuizzesList />
            </Grid>
            <Grid item xs={12} md={4}>
              <AnnouncementsList />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
