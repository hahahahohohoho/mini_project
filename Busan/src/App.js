import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import RegisterForm from './components/login/RegisterForm';
import LoginForm from './components/login/LoginForm';
import Main from './components/login/Main';
import Board from '../public/Board';
import DetailPage from './components/board/DetailPage';

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
        <Route path="/board" element={<Board />} /> {/* 누구나 접근 가능 */}
        <Route path="/detail/:username/:title" element={auth ? <DetailPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={auth ? "/board" : "/login"} />} />
      </Routes>
    </Router>
    
    
  );
}

export default App;
