import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import UsernameInput from './UsernameInput';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [isUsernameValid, setIsUsernameValid] = useState(false); // 유저네임 유효성 상태
  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태
  const [isPasswordValid, setIsPasswordValid] = useState(false); // 비밀번호 유효성 상태
  
  const navigate = useNavigate();

  // 회원가입 처리 함수
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isUsernameValid || !isEmailValid || !isPasswordValid) { // 모든 유효성 검사가 통과되지 않은 경우
      alert('Please ensure all fields are valid and availability checks are complete.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/auth/signup', {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        navigate('/email-verification-required');
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleRegister}>
          <UsernameInput
            username={username}
            setUsername={setUsername}
            loading={loading}
            isUsernameValid={isUsernameValid}
            setIsUsernameValid={setIsUsernameValid}
          />
          <EmailInput
            email={email}
            setEmail={setEmail}
            loading={loading}
            isEmailValid={isEmailValid}
            setIsEmailValid={setIsEmailValid}
          />
          <PasswordInput
            password={password}
            setPassword={setPassword}
            loading={loading}
            isPasswordValid={isPasswordValid}
            setIsPasswordValid={setIsPasswordValid}
          />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-slate-400 hover:bg-slate-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading && 'opacity-50 cursor-not-allowed'
              }`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
