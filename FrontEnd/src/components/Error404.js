import React from 'react';

const Error403 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">403 Forbidden</h1>
      <p className="text-lg">요청하신 페이지가 없습니다.</p>
      <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Main으로 돌아가기
      </a>
    </div>
  );
};

export default Error403;
