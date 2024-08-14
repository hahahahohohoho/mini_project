import React from 'react';
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom';

export default function PostDelete({ boardItem }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/board/${boardItem.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert('게시글이 삭제되었습니다.');
        navigate('/'); // 삭제 후 메인 페이지로 이동
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
    >
      게시글 삭제
    </button>
  );
}
