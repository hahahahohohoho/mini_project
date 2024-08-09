// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Main from './components/Main';
import ProtectedPage from './components/ProtectedPage';
import AdminPage from './components/AdminPage';
import Board from './components/board/Board'
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
  <BrowserRouter>
      <div className="flex flex-col w-full max-w-screen-xl mx-auto h-screen overflow-y-auto max-w-auto">
      <header className='flex justify-between items-center text-xl font-bold h-20 p-10 bg-slate-300'>
          <div>리액트연습</div>
          <ul className="flex items-center">
            <li><Link to='/login' className="mx-3">로그인</Link></li>
            <li><Link to='/main' className="mx-3">메인</Link></li>
            <li><Link to='/admin' className="mx-3">관리자</Link></li>
            <li><Link to='/rest' className="mx-3">restfull</Link></li>
          </ul>
          </header>

    <main className='grow flex justify-center items-center'>

      <Routes>
        <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/main" element={auth ? <Main /> : <Navigate to="/login" />} />
        <Route path="/protected" element={auth ? <ProtectedPage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={auth ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/board" element={<Board />} /> {/* 누구나 접근 가능 */}
        <Route path="/detail/:username/:title" element={auth ? <DetailPage /> : <Navigate to="/login" />} />

      </Routes>
      </main>
        <footer className='flex justify-center items-center text-white bg-slate-800 h-20'>
          @2024 Kim seon sin. All Right reserved.
        </footer>
        </div>
  </BrowserRouter>
  );
}

export default App;
