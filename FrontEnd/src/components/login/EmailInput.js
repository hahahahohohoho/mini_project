import React, { useState } from 'react';
import axios from '../../axios';

const EmailInput = ({ email, setEmail, loading, isEmailValid, setIsEmailValid }) => {
  const [isEmailTaken, setIsEmailTaken] = useState(null);
  const [emailError, setEmailError] = useState('');

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email) && email.split('@')[0].length >= 5;
    if (!isValid) {
      setEmailError('Please enter a valid email address with at least 5 characters before "@"');
    } else {
      setEmailError('');
    }
    setIsEmailValid(isValid); // 유효성 상태 업데이트
    return isValid;
  };

  // 이메일 중복 검사 함수
  const checkEmail = async () => {
    if (!email.trim()) { // 공백 입력 여부 검사
      alert('Please enter an email');
      return;
    }
    
    if (validateEmail(email)) {
      try {
        const response = await axios.get('/auth/check_email', {
          params: { email: email.trim() },
        });
        setIsEmailTaken(response.data);
        setIsEmailValid(!response.data); // 중복되지 않으면 유효성 상태를 true로 설정
      } catch (error) {
        console.error('Email check failed:', error);
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <input
        type="email"
        placeholder="Email"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setIsEmailTaken(null);
          setIsEmailValid(false); // 이메일이 변경되면 유효성 상태 초기화
        }}
        disabled={loading}
      />
      <button
        type="button"
        onClick={checkEmail}
        disabled={loading || !email}
        className="bg-slate-400 hover:bg-slate-300 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2"
      >
        Check Availability
      </button>
      {emailError && <p className="text-sm mt-2 text-red-500">{emailError}</p>}
      {isEmailTaken !== null && (
        <p className={`text-sm mt-2 ${isEmailTaken ? 'text-red-500' : 'text-green-500'}`}>
          {isEmailTaken ? 'Email is already taken.' : 'Email is available!'}
        </p>
      )}
    </div>
  );
};

export default EmailInput;
