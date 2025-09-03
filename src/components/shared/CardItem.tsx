import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

type Props = { title: string; subtitle?: string; body?: string };

export default function CardItem({ title, subtitle, body }: Props) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1">{title}</Typography>
        {subtitle && <Typography variant="caption" display="block">{subtitle}</Typography>}
        {body && <Typography sx={{ mt: 1 }}>{body}</Typography>}
      </CardContent>
    </Card>
  );
}
