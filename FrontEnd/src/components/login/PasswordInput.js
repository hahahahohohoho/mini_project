import React, { useState } from 'react';

const PasswordInput = ({ password, setPassword, loading, isPasswordValid, setIsPasswordValid }) => {
  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const isValid = passwordRegex.test(password);
    setIsPasswordValid(isValid); // 유효성 상태 업데이트
    return isValid;
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
      <input
        type="password"
        placeholder="Password"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validatePassword(e.target.value);
        }}
        disabled={loading}
      />
      {isPasswordValid !== null && (
        <p className={`text-sm mt-2 ${isPasswordValid ? 'text-green-500' : 'text-red-500'}`}>
          {isPasswordValid
            ? '사용 가능한 비밀번호입니다.'
            : '소문자, 숫자, 특수문자를 포함하여 8글자 이상이어야 합니다.'}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
