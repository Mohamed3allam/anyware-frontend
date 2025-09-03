import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchQuizzes, deleteQuiz } from '../../features/quizzes/quizzesSlice';
import QuizFormDialog from '../../components/Quizzes/QuizFormDialog';
import { Quiz } from '../../features/quizzes/quizzesSlice';

export default function QuizzesPage() {
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector(s => s.quizzes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Quiz | null>(null);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const handleEdit = (q: Quiz) => {
    setEditing(q);
    setDialogOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this quiz?')) return;
    await dispatch(deleteQuiz(id)).unwrap();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Quizzes</Typography>
        <IconButton onClick={handleCreate}><AddIcon /></IconButton>
      </Box>

      <Paper sx={{ p: 2 }}>
        {status === 'loading' && <Typography>Loading...</Typography>}
        {!list.length && <Typography>No quizzes yet.</Typography>}
        <List>
          {list.map(q => (
            <React.Fragment key={q._id ?? q.title}>
              <ListItem>
                <ListItemText primary={q.title} secondary={q.description} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEdit(q)} edge="end"><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(q._id)} edge="end"><DeleteIcon /></IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <QuizFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} initial={editing} />
    </Container>
  );
}
