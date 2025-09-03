// src/components/Dashboard/DueList.tsx
import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box
} from '@mui/material';
import { useAppSelector } from '../../store/hooks';

export default function DueList() {
  // mapped UI-friendly quizzes (title, questionCount, semester, dueDate, id)
  const quizzes = useAppSelector(state => state.quizzes.list);

  // Sort: earliest due date first. Items with no dueDate go to the end.
  const sorted = [...quizzes].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    const da = new Date(a.dueDate).getTime();
    const db = new Date(b.dueDate).getTime();
    return da - db;
  });

  // Pick top 3
  const top = sorted.slice(0, 3);

  const now = Date.now();

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        What's due
      </Typography>

      <List>
        {top.map((q) => {
          const due = q.dueDate ? new Date(q.dueDate) : null;
          const isOverdue = due ? due.getTime() < now : false;
          const dueLabel = due
            ? `${isOverdue ? 'Overdue' : 'Due'}: ${due.toLocaleString()}`
            : 'No due date';

          return (
            <ListItem
              key={q.id}
              secondaryAction={
                <Button variant="outlined" size="small">
                  Start Quiz
                </Button>
              }
              sx={{ alignItems: 'flex-start' }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <Typography variant="subtitle1">{q.title}</Typography>
                    {q.semester && (
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        • {q.semester}
                      </Typography>
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {q.questionCount} question{q.questionCount !== 1 ? 's' : ''}
                    </Typography>
                    <Typography variant="caption" sx={{ color: isOverdue ? 'error.main' : 'text.secondary' }}>
                      {dueLabel}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          );
        })}

        {!top.length && <Typography>No due items</Typography>}
      </List>
    </Paper>
  );
}
