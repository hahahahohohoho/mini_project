import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CommentList from './comment/CommentList';
import PostEdit from './utils/PostEdit';
import PostDelete from './utils/PostDelete';
import RecommendButton from './utils/RecommendButton';
import axios from '../../axios';

const DetailPage = () => {
  const { state } = useLocation();
  const { boardItem } = state || {};
  const [isEditing, setIsEditing] = useState(false);
  const [recommendCount, setRecommendCount] = useState(boardItem.recommends?.length || 0);
  const [isRecommended, setIsRecommended] = useState(
    boardItem.recommends?.some(recommend => recommend.username === localStorage.getItem('username'))
  );

  const username = localStorage.getItem('username'); // 로그인된 사용자의 이름
  const token = localStorage.getItem('token'); // 로그인 토큰

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => setIsEditing(false);

  const handleSave = (newTitle, newContent) => {
    boardItem.title = newTitle; // 게시글 제목 업데이트
    boardItem.content = newContent; // 게시글 내용 업데이트
    setIsEditing(false);
  };

  // 현재 로그인한 사용자가 게시글 작성자인지 확인
  const isAuthor = username === boardItem.username;

  const handleRecommendSubmit = async () => {
    if (username) {
      try {
        const newRecommend = {
          username: username,
          board_id: boardItem.id,
        };
        const result = await axios.post(`/board/${boardItem.id}/recommend`, newRecommend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (result) {
          setIsRecommended(true);
          setRecommendCount(recommendCount + 1); // 추천 수 증가
          alert('추천이 완료되었습니다.');
        }
      } catch (error) {
        alert('추천에 실패했습니다.');
      }
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const handleCancelRecommendSubmit = async () => {
    if (username) {
      if (window.confirm('추천을 취소하시겠습니까?')) {
        try {
          const result = await axios.delete(`/board/${boardItem.id}/recommend`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              username: username,
              board_id: boardItem.id,
            },
          });
          if (result) {
            setIsRecommended(false);
            setRecommendCount(recommendCount - 1); // 추천 수 감소
            alert('추천이 취소되었습니다.');
          }
        } catch (error) {
          alert('추천 취소에 실패했습니다.');
        }
      }
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{boardItem.title}</h1>
      <div className="space-y-4">
        {isEditing ? (
          <PostEdit boardItem={boardItem} onSave={handleSave} onCancel={cancelEditing} />
        ) : (
          <>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">작성자</p>
              <p className="text-gray-600">{boardItem.username}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">내용</p>
              <p className="text-gray-600">{boardItem.content}</p>
              {isAuthor && (
                <button
                  onClick={startEditing}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  수정
                </button>
              )}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">작성 시간</p>
              <p className="text-gray-600">{new Date(boardItem.createTime).toLocaleString()}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">추천 수</p>
              <p className="text-gray-600">{recommendCount}</p>
            </div>
            {isAuthor && (
              <PostDelete boardItem={boardItem} />
            )}
          </>
        )}
      </div>

      <CommentList />
      <button
        onClick={isRecommended ? handleCancelRecommendSubmit : handleRecommendSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        {isRecommended ? '추천 취소' : '추천'}
      </button>

      <div className="mt-8">
        <button 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          onClick={() => window.history.back()}
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
