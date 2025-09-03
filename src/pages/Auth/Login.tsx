import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

type Form = { email: string; password: string };

export default function Login() {
  const { register, handleSubmit } = useForm<Form>({ defaultValues: { email: '', password: '' } });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: Form) => {
    try {
      const res = await dispatch(loginUser(data)).unwrap();
      // token handling / localStorage can be added here
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      // show toast/snackbar in real app
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Email" {...register('email')} />
          <TextField label="Password" type="password" {...register('password')} />
          <Button type="submit" variant="contained">Login</Button>
        </Box>
      </Paper>
    </Container>
  );
}
