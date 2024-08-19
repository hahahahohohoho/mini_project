import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import RegisterForm from './components/login/RegisterForm';
import LoginForm from './components/login/LoginForm';
import AdminPage from './components/login/AdminPage';
import Board from './components/board/BoardList';
import DetailPage from './components/board/DetailPage';
import CreatePost from './components/board/utils/PostCreate';
import MypageMain from './components/mypage/MypageMain';
import MapMain from './components/map/MapMain'; // MapMain을 사용


function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      if (Date.now() >= expirationTime) {
        // 토큰이 만료된 경우 로그아웃 처리
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('tokenExpiration');
        alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
    } else {
        setAuth(true);
      }
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('tokenExpiration');
    setAuth(false);
    window.location.href = '/'; // 로그아웃 후 메인 페이지로 이동
  };

  return (
    <Router>
      <div className="flex flex-col w-full h-screen overflow-hidden"> {/* h-screen을 사용하여 화면 전체를 차지하게 설정 */}
        <header className='flex justify-between items-center text-xl font-bold h-10 p-5 bg-blue-100 w-full'>
          <div>자전거로 떠나자!</div>
          <ul className="flex items-center">
            {auth ? (
              <>
              {localStorage.getItem('username')==='관리자' && <li><Link to='/admin' className="mx-3">관리자</Link></li> }
                <li><Link to='/main' className="mx-3">메인</Link></li>
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

        <main className='flex-grow w-full overflow-y-auto'> {/* flex-grow를 사용하여 남은 공간을 모두 차지하게 설정 */}
          <Routes>
            <Route path="/" element={<MapMain />} /> {/* 메인 페이지에 MapMain을 설정 */}
            <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/main" element={<MapMain />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/board" element={<Board />} />
            <Route path="/detail/:username/:title" element={<DetailPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/map" element={<MapMain />} />
            <Route path="*" element={<MapMain />} />
          </Routes>
        </main>

        <footer className='flex justify-center items-center text-white bg-slate-800 h-20 w-full'>
          @2024 All Right reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
