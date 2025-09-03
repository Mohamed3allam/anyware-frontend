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
import { Announcement, createAnnouncement, updateAnnouncement } from '../../features/announcements/announcementsSlice';
import { useAppDispatch } from '../../store/hooks';

type Props = {
  open: boolean;
  onClose: () => void;
  initial?: Announcement | null;
};

type Form = { title: string; body: string; author?: string };

export default function AnnouncementFormDialog({ open, onClose, initial }: Props) {
  const { register, handleSubmit, reset } = useForm<Form>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    reset(initial ?? { title: '', body: '', author: '' });
  }, [initial, reset]);

  const onSubmit = async (data: Form) => {
    try {
      if (initial && initial._id) {
        await dispatch(updateAnnouncement({ ...data, id: initial._id } as any)).unwrap();
      } else {
        await dispatch(createAnnouncement({ ...data, date: new Date().toISOString() } as any)).unwrap();
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initial ? 'Edit announcement' : 'Create announcement'}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Title" margin="normal" {...register('title')} />
        <TextField fullWidth label="Author" margin="normal" {...register('author')} />
        <TextField fullWidth label="Body" margin="normal" multiline rows={4} {...register('body')} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">{initial ? 'Save' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
}
