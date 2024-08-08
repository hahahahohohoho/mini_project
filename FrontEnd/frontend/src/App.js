// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Main from './components/Main';
import ProtectedPage from './components/ProtectedPage';
import AdminPage from './components/AdminPage';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/main" element={auth ? <Main /> : <Navigate to="/login" />} />
        <Route path="/protected" element={auth ? <ProtectedPage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={auth ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
