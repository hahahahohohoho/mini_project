import React, { useState } from 'react';

export default function CommentEdit({ comment, onCancel, onSave }) {
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(comment.id, editedContent);
  };

  return (
    <div>
      <textarea
        value={editedContent}
        onChange={handleEditChange}
        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="4"
      />
      <button
        onClick={handleSave}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
      >
        저장
      </button>
      <button
        onClick={onCancel}
        className="mt-2 ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
      >
        취소
      </button>
    </div>
  );
}
