// src/components/RequireAuthRoute.tsx
import React from 'react';
import { useAppSelector } from '../store/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RequireAuthRoute() {
  const loggedIn = useAppSelector(s => s.auth.loggedIn);
  const location = useLocation();

  if (loggedIn) {
    // save the attempted path in `state` so you can redirect back after login (optional)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
