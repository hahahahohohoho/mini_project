import React, { useState } from 'react';
import axios from '../../axios';

const UsernameInput = ({ username, setUsername, loading, isUsernameValid, setIsUsernameValid }) => {
  const [isUsernameTaken, setIsUsernameTaken] = useState(null);

  // 유저네임 중복 검사 함수
  const checkUsername = async () => {
    if (!username.trim()) { // 공백 입력 여부 검사
      alert('Please enter a username');
      return;
    }
    
    try {
      const response = await axios.get('/auth/check_username', {
        params: { username: username.trim() },
      });
      setIsUsernameTaken(response.data);
      setIsUsernameValid(!response.data); // 중복되지 않으면 유효성 상태를 true로 설정
    } catch (error) {
      console.error('Username check failed:', error);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
      <input
        type="text"
        placeholder="Username"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setIsUsernameTaken(null);
          setIsUsernameValid(false); // 유저네임이 변경되면 유효성 상태 초기화
        }}
        disabled={loading}
      />
      <button
        type="button"
        onClick={checkUsername}
        disabled={loading || !username}
        className="bg-slate-400 hover:bg-slate-300 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2"
      >
        Check Availability
      </button>
      {isUsernameTaken !== null && (
        <p className={`text-sm mt-2 ${isUsernameTaken ? 'text-red-500' : 'text-green-500'}`}>
          {isUsernameTaken ? 'Username is already taken.' : 'Username is available!'}
        </p>
      )}
    </div>
  );
};

export default UsernameInput;
