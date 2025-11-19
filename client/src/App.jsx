import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
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

        {/* Protected Routes */}
        <Route path="/" element={user ? <DashboardLayout user={user} onLogout={handleLogout}><Dashboard /></DashboardLayout> : <Navigate to="/login" />} />
        <Route path="/customers" element={user ? <DashboardLayout user={user} onLogout={handleLogout}><Customers /></DashboardLayout> : <Navigate to="/login" />} />
        <Route path="/inventory" element={user ? <DashboardLayout user={user} onLogout={handleLogout}><Inventory /></DashboardLayout> : <Navigate to="/login" />} />
        <Route path="/sales" element={user ? <DashboardLayout user={user} onLogout={handleLogout}><Sales /></DashboardLayout> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
