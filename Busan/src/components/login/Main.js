// src/components/Main.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage에서 토큰 삭제
    localStorage.removeItem('token');
    // 로그인 상태 변경
    navigate('/login');
    };
    
    const goAdmin = () => {
      navigate('/admin')
    }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-500 mb-8">메인 페이지 입니다</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={goAdmin}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        admin
      </button>
    </div>
  );
};

export default Main;