import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Quiz, createQuiz, updateQuiz } from '../../features/quizzes/quizzesSlice';
import { useAppDispatch } from '../../store/hooks';

type Props = {
  open: boolean;
  onClose: () => void;
  initial?: Quiz | null;
};

type Form = { title: string; course?: string; dueDate?: string; description?: string };

export default function QuizFormDialog({ open, onClose, initial }: Props) {
  const { register, handleSubmit, reset } = useForm<Form>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    reset(initial ?? { title: '', course: '', dueDate: '', description: '' });
  }, [initial, reset]);

  const onSubmit = async (data: Form) => {
    try {
      if (initial && initial._id) {
        await dispatch(updateQuiz({ ...data, id: initial._id } as any)).unwrap();
      } else {
        await dispatch(createQuiz(data as any)).unwrap();
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initial ? 'Edit quiz' : 'Create quiz'}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Title" margin="normal" {...register('title')} />
        <TextField fullWidth label="Course" margin="normal" {...register('course')} />
        <TextField fullWidth label="Due date (ISO)" margin="normal" {...register('dueDate')} />
        <TextField fullWidth label="Description" margin="normal" multiline rows={4} {...register('description')} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">{initial ? 'Save' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
}
