import React from 'react';
import { Paper, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { Announcement } from '../../features/announcements/announcementsSlice';

export default function AnnouncementsList() {
  const { list, status } = useAppSelector(s => s.announcements);

  if (status === 'loading') {
    return <Typography>Loading announcements...</Typography>;
  }

  if (!list.length) {
    return <Paper sx={{ p: 2 }}><Typography>No announcements</Typography></Paper>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Announcements</Typography>
      <List>
        {list.map((a: Announcement) => (
          <React.Fragment key={a._id ?? a.title}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{a.author ? a.author[0] : 'A'}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={a.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {a.author ?? 'School management'}
                    </Typography>
                    {" — "}{a.body}
                  </>
                }
              />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
