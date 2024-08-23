import React from 'react';

const Error403 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">403 Forbidden</h1>
      <h1 className="text-4xl font-bold mb-4">요청하신 페이지가 없습니다.</h1>
      <a href="/" className="mt-6 px-4 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-300">
        Main으로 돌아가기
      </a>
    </div>
  );
};

export default Error403;
