import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { registerUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

type Form = { name: string; email: string; password: string };

export default function Register() {
  const { register, handleSubmit } = useForm<Form>({ defaultValues: { name: '', email: '', password: '' } });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: Form) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Name" {...register('name')} />
          <TextField label="Email" {...register('email')} />
          <TextField label="Password" type="password" {...register('password')} />
          <Button type="submit" variant="contained">Create account</Button>
        </Box>
      </Paper>
    </Container>
  );
}
