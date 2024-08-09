import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import RegisterForm from './components/login/RegisterForm';
import LoginForm from './components/login/LoginForm';
import Main from './components/login/Main';
import AdminPage from './components/login/AdminPage';
import Board from './components/board/Board';
import DetailPage from './components/board/DetailPage';
import CreatePost from './components/board/CreatePost'; // CreatePost 컴포넌트 가져오기

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuth(false);
    window.location.href = '/'; // 로그아웃 후 메인 페이지로 이동
  };

  return (
    <Router>
      <div className="flex flex-col w-full max-w-screen-xl mx-auto h-screen overflow-y-auto">
        <header className='flex justify-between items-center text-xl font-bold h-20 p-10 bg-slate-300'>
          <div>리액트연습</div>
          <ul className="flex items-center">
            {auth ? (
              <>
                <li><Link to='/main' className="mx-3">메인</Link></li>
                <li><Link to='/admin' className="mx-3">관리자</Link></li>
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
            {/* 로그인 페이지로 이동 */}
            <Route path="/login" element={<LoginForm setAuth={setAuth} />} />

            {/* 회원가입 페이지로 이동 */}
            <Route path="/register" element={<RegisterForm />} />

            {/* 메인 페이지로 이동. 로그인된 사용자만 접근 가능. */}
            <Route path="/main" element={auth ? <Main /> : <Navigate to="/login" />} />

            {/* 관리자 페이지로 이동. 로그인된 사용자만 접근 가능. */}
            <Route path="/admin" element={auth ? <AdminPage /> : <Navigate to="/login" />} />

            {/* 게시판 페이지로 이동. 누구나 접근 가능. */}
            <Route path="/board" element={<Board />} />

            {/* 게시글 상세 페이지로 이동. 로그인된 사용자만 접근 가능. */}
            <Route path="/detail/:username/:title" element={auth ? <DetailPage /> : <Navigate to="/login" />} />

            {/* 게시글 작성 페이지로 이동. 로그인된 사용자만 접근 가능. */}
            <Route path="/create" element={auth ? <CreatePost /> : <Navigate to="/login" />} />

            {/* 위에서 정의되지 않은 모든 경로는 로그인 페이지로 리다이렉트 */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>

        <footer className='flex justify-center items-center text-white bg-slate-800 h-20'>
          @2024 Kim seon sin. All Right reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
