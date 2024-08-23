import React, { useState } from 'react';

export default function CommentForm({ onSubmit }) {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onSubmit(newComment);
      setNewComment(''); // 전송 후 입력 필드 초기화
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <textarea
        value={newComment}
        onChange={handleCommentChange}
        className="resize-none w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="4"
        placeholder="댓글을 작성하세요..."
      />
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition-colors duration-300"
      >
        댓글 달기
      </button>
    </form>
  );
}