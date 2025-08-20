import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  return currentUser ? children : <Navigate to="/login" replace />;
};

// Public Route component (redirect to profile if already logged in)
const PublicRoute = ({ children }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  return currentUser ? <Navigate to="/profile" replace /> : children;
};

function AppContent() {
  return (
    <div className="app-container">
      <Routes>
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <WelcomePage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;