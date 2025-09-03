import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  to: string;
  label: string;
  icon?: React.ReactNode;
};

export default function SidebarItem({ to, label, icon }: Props) {
  return (
    <ListItemButton
      component={RouterLink}
      to={to}
      sx={{
        px: 3,
        py: 1.2,
        '&:hover': {
          // literal spec: both bg and text become white (this makes label invisible).
          // It's implemented to meet spec; consider the commented alternative for real UX.
          backgroundColor: 'white',
          color: 'white'
          // alternative: backgroundColor: 'primary.main', color: 'white'
        }
      }}
    >
      {icon && <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>}
      <ListItemText primary={label} />
    </ListItemButton>
  );
}
