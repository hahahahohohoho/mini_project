import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import RegisterForm from './components/login/RegisterForm';
import LoginForm from './components/login/LoginForm';
import AdminPage from './components/login/AdminPage';
import Board from './components/board/Board';
import DetailPage from './components/board/DetailPage';
import CreatePost from './components/board/CreatePost';
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
      <div className="flex flex-col w-full max-w-screen-xl mx-auto h-screen overflow-y-auto max-w-auto">
        <header className='flex justify-between items-center text-xl font-bold h-20 p-10 bg-slate-300'>
          <div>리액트연습</div>
          <ul className="flex items-center">
            {auth ? (
              <>
                {localStorage.getItem('username')==='관리자'? <li><Link to='/admin' className="mx-3">관리자</Link></li> 
                : <li><Link to='/myinfo' className="mx-3">{localStorage.getItem('username')}님</Link></li>}
                <li><Link to='/map' className="mx-3">지도</Link></li>
                <li><Link to='/board' className="mx-3">게시판</Link></li>
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

        <main className='grow flex justify-center items-center'>
          <Routes>
            <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/admin" element={auth ? <AdminPage /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/board" element={<Board />} /> {/* 누구나 접근 가능 */}
            <Route path="/detail/:username/:title" element={auth ? <DetailPage /> : <Navigate to="/login" />} />
            <Route path="/create" element={auth ? <CreatePost /> : <Navigate to="/login" />} /> {/* 게시글 작성 페이지 */}
            <Route path="/myinfo" element={auth ? <MypageMain /> : <Navigate to="/login" />} />
            <Route path="/map" element={<MapMain />} />
          </Routes>
        </main>

        <footer className='flex justify-center items-center text-white bg-slate-800 h-20'>
          @2024 Kim Seon Sin. All Right reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
