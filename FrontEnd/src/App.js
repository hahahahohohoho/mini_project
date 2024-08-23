import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/login/RegisterForm';
import LoginForm from './components/login/LoginForm';
import AdminPage from './components/login/AdminPage';
import Board from './components/board/BoardList';
import DetailPage from './components/board/DetailPage';
import CreatePost from './components/board/utils/PostCreate';
import MypageMain from './components/mypage/MypageMain';
import MapMain from './components/map/MapMain'; // MapMain을 사용
import Error403 from './components/Error403';
import Error404 from './components/Error404';
import HeadetNav from './components/UI/HeadetNav';
import Logout from './components/login/LogOut';
import EmailVerificationRequired from './components/login/EmailVerificationRequired';

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
      <div className="flex flex-col w-3/4 h-screen mx-auto bg-neutral-100"> {/* h-screen을 사용하여 화면 전체를 차지하게 설정 */}
        <HeadetNav auth={auth}/>

        <main className=' flex-grow  w-full overflow-hidden '> {/* flex-grow를 사용하여 남은 공간을 모두 차지하게 설정 */}
          <Routes className= 'h-full overflow-auto '>
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
            <Route path="/myinfo" element={<MypageMain />} />
            <Route path="/error-403" element={<Error403 />} />
            <Route path="/error-404" element={<Error404 />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} /> {/* 로그아웃 라우트 설정 */}
            <Route path="/email-verification-required" element={<EmailVerificationRequired />} /> {/* 추가 */}
            </Routes>
        </main>

        <footer className='flex justify-center items-center text-black bg-neutral-200 h-25 w-full'>
          @2024 All Right reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
