import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    // 공통 로그아웃 함수를 호출
    if (onLogout) {
      onLogout();
    }

    // 로그아웃 후 메인 페이지로 리다이렉트
    navigate('/');
  }, [navigate, onLogout]);

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-2xl font-bold mb-4">로그아웃 중...</h1>
      <p>잠시만 기다려 주세요.</p>
    </div>
  );
}

export default Logout;
