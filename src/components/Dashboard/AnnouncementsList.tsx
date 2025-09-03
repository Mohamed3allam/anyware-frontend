import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

export default function AnnouncementsList() {
  const announcements = useSelector((s: RootState) => s.announcements.list);

  if (!announcements.length) {
    return <Paper sx={{ p: 2 }}><Typography>No announcements for this semester.</Typography></Paper>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Announcements</Typography>
      <List>
        {announcements.map(q => (
          <ListItem key={q._id}>
            <ListItemText primary={q.title} secondary={q.date ? `Due: ${new Date(q.date).toLocaleString()}` : ''}/>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
