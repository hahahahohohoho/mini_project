import React from 'react';

export default function CommentDelete({ commentId, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      onDelete(commentId);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800"
    >
      삭제
    </button>
  );
}
