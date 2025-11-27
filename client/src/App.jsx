import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import AccessDenied from './pages/AccessDenied';
import Users from './pages/Users';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/index.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register onRegisterSuccess={() => { }} /> : <Navigate to="/" />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user} onLogout={handleLogout}><Dashboard /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/customers" element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user} onLogout={handleLogout}><Customers /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/inventory" element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user} onLogout={handleLogout}><Inventory /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/sales" element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user} onLogout={handleLogout}><Sales /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute user={user} allowedRoles={['admin']}>
            <DashboardLayout user={user} onLogout={handleLogout}><Users /></DashboardLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
