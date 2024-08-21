// src/components/EmailVerificationRequired.js
import React from 'react';
import { Link } from 'react-router-dom';

const EmailVerificationRequired = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">이메일 인증 필요</h1>
        <p className="text-gray-700 mb-6">
          회원 가입을 완료하려면 이메일을 확인하고 인증을 완료해주세요.
        </p>
        <p className="text-gray-700 mb-6">
          이메일 인증 링크가 포함된 메시지를 발송했습니다. 인증을 완료하신 후 로그인해 주세요.
        </p>
        <Link 
          to="/login" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          로그인 페이지로 이동
        </Link>
      </div>
    </div>
  );
};

export default EmailVerificationRequired;
