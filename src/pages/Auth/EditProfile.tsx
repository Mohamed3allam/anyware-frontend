import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setUser } from '../../features/auth/authSlice';
import { useAppSelector as select } from '../../store/hooks';

type Form = { name: string; email: string };

export default function EditProfile() {
  const user = useAppSelector(s => s.auth.user);
  const { register, handleSubmit } = useForm<Form>({ defaultValues: { name: user?.name ?? '', email: user?.email ?? '' } });
  const dispatch = useAppDispatch();

  const onSubmit = (data: Form) => {
    // This demo updates local state only; ideally send to backend
    dispatch(setUser({ ...user, ...data } as any));
    // show success message
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Edit Profile</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Name" {...register('name')} />
          <TextField label="Email" {...register('email')} />
          <Button type="submit" variant="contained">Save profile</Button>
        </Box>
      </Paper>
    </Container>
  );
}
