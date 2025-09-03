// src/pages/Dashboard/Dashboard.tsx
import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import AnnouncementsList from '../../components/Announcements/AnnouncementsList';
import DueList from '../../components/Dashboard/DueList';
import { useAppDispatch } from '../../store/hooks';
import { fetchAnnouncements } from '../../features/announcements/announcementsSlice';
import { fetchQuizzes } from '../../features/quizzes/quizzesSlice';
import illustration from '../../assets/d-i.png'; // put your image here

export default function Dashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAnnouncements());
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      {/* HERO: always full width */}
      <Grid item xs={12}>
        <Paper
          sx={{
            display: 'flex',
            gap: 2,
            p: 3,
            alignItems: 'center',
            // stack vertically on small screens, horizontal on md+
            flexDirection: { xs: 'column', md: 'row' }
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              EXAMS TIME
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Here we are. Are you ready to fight? Don't worry, we prepared some tips to be ready for your exams.
            </Typography>

            {/* responsive full-width on mobile, auto width on desktop */}
            <Button
              variant="contained"
              sx={{ mt: 2, width: { xs: '100%', md: 'auto' } }}
              size="large"
            >
              View exams tips
            </Button>
          </Box>

          {/* Illustration: use imported asset (works with Vite) */}
          <Box
            component="img"
            src={illustration}
            alt="illustration"
            sx={{
              width: { xs: '100%', md: 220 },
              height: { xs: 160, md: 120 },
              objectFit: 'cover',
              borderRadius: 2,
              flexShrink: 0
            }}
          />
        </Paper>
      </Grid>

      {/* CONTENT ROW: 75% / 25% on md+, stacked on mobile */}
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={12} md={9}>
          <AnnouncementsList />
        </Grid>

        <Grid item xs={12} md={3}>
          <DueList />
        </Grid>
      </Grid>
    </Grid>
  );
}
