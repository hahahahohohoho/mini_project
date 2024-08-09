import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/board';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/signin', {
        email,
        password,
      });
      if (response.status === 200) {
        const { token, username } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setAuth(true);
        navigate(from); // 로그인 후 원래 페이지로 리다이렉트
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleLogin}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
