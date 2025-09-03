// src/routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthEntry from './components/AuthEntry';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DashboardPage from './pages/Dashboard/Dashboard';
import AnnouncementsPage from './pages/Announcements/Announcements';
import QuizzesPage from './pages/Quizzes/Quizzes';
import EditProfile from './pages/Auth/EditProfile';
import RequireAuthRoute from './components/RequireAuthRoute';
import DashboardLayout from './layouts/DashboardLayout';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root: bootstraps auth and redirects to /dashboard or /login */}
      <Route path="/" element={<AuthEntry />} />

      {/* Public auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes: all children render inside DashboardLayout (sidebar + header) */}
      <Route element={<RequireAuthRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/profile" element={<EditProfile />} />
          {/* add more protected routes here — they will be wrapped by DashboardLayout */}
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<AuthEntry />} />
    </Routes>
  );
}
