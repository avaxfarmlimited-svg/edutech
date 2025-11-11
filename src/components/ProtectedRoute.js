import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { currentUser, userRole } = useAuth();

  // If not logged in, redirect to auth page
  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  // If role is required and doesn't match, redirect to appropriate dashboard
  if (requiredRole && userRole !== requiredRole) {
    if (userRole === 'student') {
      return <Navigate to="/student/dashboard" />;
    } else if (userRole === 'teacher') {
      return <Navigate to="/teacher/dashboard" />;
    }
    return <Navigate to="/" />;
  }

  return children;
}
