import React, { useState } from 'react';
import axios from '../../../axios';

export default function PostEdit({ boardItem, onSave, onCancel }) {
  const [editedTitle, setEditedTitle] = useState(boardItem.title);  // 제목 수정
  const [editedContent, setEditedContent] = useState(boardItem.content); // 내용 수정
  const token = localStorage.getItem('token');

  const handleSave = async () => {
    try {
      const result = await axios.put(`/board/${boardItem.id}`, {
        title: editedTitle,
        content: editedContent,
        username: localStorage.getItem("username"),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result) {
        onSave(editedTitle, editedContent);  // 수정된 제목과 내용을 저장
      }
    } catch (error) {
      console.error('Error editing post:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="4"
        placeholder="내용을 입력하세요"
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          저장
        </button>
        <button
          onClick={onCancel}
          className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          취소
        </button>
      </div>
    </div>
  );
}
