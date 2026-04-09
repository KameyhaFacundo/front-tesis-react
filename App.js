import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { ToastProvider } from './src/contexts/ToastContext';
import ErrorBoundary from './src/components/ErrorBoundary/ErrorBoundary';
import Router from './routes';

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
