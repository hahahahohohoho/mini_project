import axios from 'axios';

const isLocal = process.env.REACT_APP_API_MODE === 'local';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api'
});

instance.interceptors.request.use(
  (config) => {
    if (isLocal) {
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
      // BE 헤드에 토큰을 보냄
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

// response 인터셉터 추가
instance.interceptors.response.use(
  (response) => {
    // 성공적으로 응답을 받았을 경우 그대로 반환
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      // 403 에러 발생 시 에러 페이지로 리다이렉트
      window.location.href = '/error-403';
    } else if (error.response && error.response.status === 404) {
      // 404 에러 발생 시 에러 페이지로 리다이렉트
      window.location.href = '/error-404';
    }
    return Promise.reject(error);
  }
);

export default instance;
