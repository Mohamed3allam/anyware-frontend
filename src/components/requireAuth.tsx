import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export function requireAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const loggedIn = useAppSelector(s => s.auth.loggedIn);
    if (!loggedIn) {
      return <Navigate to="/" replace />;
    }
    return <WrappedComponent {...props} />;
  };
}
