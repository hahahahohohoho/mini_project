import React from 'react';

const Error403 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">403 Forbidden</h1>
      <p className="text-4xl font-bold mb-4">접근 권한이 없습니다.</p>
      <a href="/login" className="mt-6 px-4 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-300">
        로그인 하기
      </a>
    </div>
  );
};

export default Error403;
