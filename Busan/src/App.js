import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterForm from './components/login/RegisterForm';
import LoginForm from './components/login/LoginForm';
import Main from './components/login/Main';
import AdminPage from './components/login/AdminPage';
import Board from './components/board/Board';
import DetailPage from './components/board/DetailPage';
import CreatePost from './components/board/CreatePost';
import MapMain from './components/map/MapMain'; // MapMain을 사용

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuth(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="flex flex-col w-full h-screen overflow-hidden"> {/* h-screen을 사용하여 화면 전체를 차지하게 설정 */}
        <header className='flex justify-between items-center text-xl font-bold h-20 p-10 bg-slate-300 w-full'>
          <div>리액트연습</div>
          <ul className="flex items-center">
            {auth ? (
              <>
                <li><Link to='/main' className="mx-3">메인</Link></li>
                <li><Link to='/admin' className="mx-3">관리자</Link></li>
                <li><Link to='/board' className="mx-3">게시판</Link></li>
                <li><Link to='/map' className="mx-3">지도</Link></li>
                
                <li><button onClick={handleLogout} className="mx-3">로그아웃</button></li>
              </>
            ) : (
              <>
                <li><Link to='/login' className="mx-3">로그인</Link></li>
                <li><Link to='/register' className="mx-3">회원가입</Link></li>
              </>
            )}
          </ul>
        </header>

        <main className='flex-grow w-full'> {/* flex-grow를 사용하여 남은 공간을 모두 차지하게 설정 */}
          <Routes>
            <Route path="/" element={<MapMain />} /> {/* 메인 페이지에 MapMain을 설정 */}
            <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/main" element={<Main />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/board" element={<Board />} />
            <Route path="/detail/:username/:title" element={<DetailPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/map" element={<MapMain />} />
            <Route path="*" element={<MapMain />} />
          </Routes>
        </main>

        <footer className='flex justify-center items-center text-white bg-slate-800 h-20 w-full'>
          @2024 Kim seon sin. All Right reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
