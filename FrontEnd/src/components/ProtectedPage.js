// src/components/ProtectedPage.js
import React, { useEffect, useState } from 'react';
import axios from '../axios';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('/auth/protected');
        setMessage(response.data.message);
      } catch (error) {
        setError('Failed to fetch the protected message');
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default ProtectedPage;
