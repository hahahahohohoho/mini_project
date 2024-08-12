// src/components/AdminPage.js
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
const AdminPage = () => {
  const [error, setError] = useState('');
  const [userData, setUserData] = useState()

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('/board');
          const data = response.data;
          setUserData(data);
          console.log(userData)
      } catch (error) {
        setError('권한이 없습니다.');
      }
    };
  
    fetchMessage();
  }, []);

  return (
    <div className="h-screen w-fuflex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AdminPage;