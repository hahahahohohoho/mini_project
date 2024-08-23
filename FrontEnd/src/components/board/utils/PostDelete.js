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
      type="button"
      className="inline-flex items-start text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-1 py-1.5 text-center">
      <svg
        aria-hidden="true"
        className="w-5 h-5 mr-1.5 -ml-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
      <path
        fillRule="evenodd"
        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
        clipRule="evenodd"
      ></path>
      </svg>
      삭제
    </button>
  );
}
