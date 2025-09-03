import React from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useIntl } from 'react-intl';

export default function Sidebar() {
  const intl = useIntl();
  const links = [
    { to: '/dashboard', label: intl.formatMessage({ id: 'nav.quizzes' }) },
    { to: '/dashboard#announcements', label: intl.formatMessage({ id: 'nav.announcements' }) }
  ];
  return (
    <Box sx={{ width: 220, bgcolor: 'background.paper', height: '100vh', borderRight: 1, borderColor: 'divider' }}>
      <List>
        {links.map(link => (
          <ListItemButton
            key={link.to}
            component={RouterLink}
            to={link.to}
            sx={{
              color: 'text.primary',
              // EXACT SPEC: change both background and foreground to white on hover
              '&:hover': {
                backgroundColor: 'white',
                color: 'white'
              }
              // more usable alt (commented): '&:hover': { backgroundColor: 'primary.main', color: 'white' }
            }}
          >
            <ListItemText primary={link.label}/>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
