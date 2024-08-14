import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../../axios';
import CommentForm from './CommentForm';
import CommentEdit from './CommentEdit';
import CommentDelete from './CommentDelete';

export default function CommentList() {
  const { state } = useLocation();
  const { boardItem } = state || {};
  const [comments, setComments] = useState(boardItem?.replys || []);
  const [editCommentId, setEditCommentId] = useState(null);

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleCommentSubmit = async (content) => {
    const newCommentObj = {
      username: username,
      content: content,
      createDate: new Date().toISOString(),
      board_id: boardItem.id,
    };
    try {
      const result = await axios.post(`/board/${boardItem.id}/reply`, newCommentObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result) {
        setComments([...comments, newCommentObj]);
      } else {
        alert('댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleEditSubmit = async (id, content) => {
    try {
      const result = await axios.put(`/board/${boardItem.id}/reply/${id}`, {
        content: content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result) {
        setComments(
          comments.map((comment) =>
            comment.id === id ? { ...comment, content: content } : comment
          )
        );
        setEditCommentId(null);
        alert('댓글 수정이 완료되었습니다.');
      }
    } catch (error) {
      console.error('Error editing comment:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`/board/${boardItem.id}/reply/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result) {
        setComments(comments.filter((comment) => comment.id !== id));
        alert('댓글 삭제가 완료되었습니다.');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const startEditing = (id) => {
    setEditCommentId(id);
  };

  const cancelEditing = () => {
    setEditCommentId(null);
  };

  return (
    <div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">댓글</h2>
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-700">{comment.username}</p>
                {editCommentId === comment.id ? (
                  <CommentEdit
                    comment={comment}
                    onCancel={cancelEditing}
                    onSave={handleEditSubmit}
                  />
                ) : (
                  <p className="text-gray-600">{comment.content}</p>
                )}
                <p className="text-xs text-gray-500">{new Date(comment.createDate).toLocaleString()}</p>
                <div className="flex justify-end">
                  {comment.username === username && editCommentId !== comment.id && (
                    <button
                      onClick={() => startEditing(comment.id)}
                      className="text-blue-600 hover:text-blue-800 mx-3"
                    >
                      수정
                    </button>
                  )}
                  {comment.username === username && (
                    <CommentDelete
                      commentId={comment.id}
                      onDelete={handleDelete}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">댓글이 없습니다. 첫 댓글을 달아보세요!</p>
          )}
        </div>
      </div>

      <CommentForm onSubmit={handleCommentSubmit} />
    </div>
  );
}
