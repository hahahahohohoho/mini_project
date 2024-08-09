// src/axios.js
import axios from 'axios';
const isLocal = process.env.REACT_APP_API_MODE === 'local';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

instance.interceptors.request.use(
  (config) => {
    if (isLocal) {
      // 요청 경로에 따라 로컬 파일 경로 설정
      if (config.url === '/board') {
        config.url = '/data/board.json';
      } else if (config.url === '/sight') {
        config.url = './sight (1).json';
      } else if (config.url === '/board') {
        config.url = '/data/board.json';  // 올바른 경로로 수정
      }
      config.baseURL = '';  // baseURL 무시
    } else {
    
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;