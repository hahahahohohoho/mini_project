import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../axios';
import CommentList from './comment/CommentList';
import PostEdit from './utils/PostEdit';
import PostDelete from './utils/PostDelete';
import RestaurantRecommendButton from '../info/RestaurantRecommendButton';

const DetailPage = () => {
  const { state } = useLocation();
  const { boardItem } = state || {};
  const [isEditing, setIsEditing] = useState(false);
  const [replyCount, setReplyCount] = useState(boardItem.replys?.length || 0);
  const [replyList, setReplyList] = useState(boardItem.replys || []); // Initialize replyList with existing replies
  const [isCommentListVisible, setIsCommentListVisible] = useState(false);

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

  const toggleCommentList = () => {
    setIsCommentListVisible(!isCommentListVisible); // Toggle the visibility of the CommentList
  };

  // Update the replyList and replyCount when a new comment is added
  const handleCommentAdded = (newComment) => {
    setReplyList([...replyList, newComment]);
    setReplyCount(replyCount + 1);
  };

  // Update the replyList when a comment is edited
  const handleCommentEdited = (editedComment) => {
    setReplyList(
      replyList.map(comment =>
        comment.id === editedComment.id ? editedComment : comment
      )
    );
  };

  // Update the replyList and replyCount when a comment is deleted
  const handleCommentDeleted = (deletedCommentId) => {
    setReplyList(replyList.filter(comment => comment.id !== deletedCommentId));
    setReplyCount(replyCount - 1);
  };


  return (
    <div className="flex justify-center items-center w-full md:h-full p-8 bg-gray-100">
      <div className="relative w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        {!isEditing && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">{boardItem.title}</h1>
              <p className="text-sm text-gray-500">ID: {boardItem.username}</p>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-700">내용</p>
              <div className="mt-2 p-4 bg-gray-50 border border-gray-300 rounded-lg">
                <p className="text-gray-600">{boardItem.content}</p>
              </div>
            </div>
          </>
        )}

        {isEditing ? (
          <PostEdit boardItem={boardItem} onSave={handleSave} onCancel={cancelEditing} />
        ) : (
          <>
            {username === boardItem.username && (
              <div className="flex items-center justify-start mt-6">
                <button
                  onClick={startEditing}
                  type="button"
                  className="text-white inline-flex items-center bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1.5 text-center mx-1"
                >
                  <svg
                    aria-hidden="true"
                    className="mr-2 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  수정
                </button>
                <div></div>
                <PostDelete boardItem={boardItem} />
              </div>
            )}
            <div className="mt-4">
              <p className="text-gray-600">{new Date(boardItem.createTime).toLocaleString()}</p>
            </div>
            <div className="mt-4 flex">
              <RestaurantRecommendButton type='board'  restaurant={boardItem}/>
              {/* 댓글 버튼 */}
              <button
                onClick={toggleCommentList} // Toggle comment list visibility on click
                className="ml-2 flex justify-center items-center mt-1 p-1 text-sm font-medium text-white bg-slate-400 rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                </svg>
                <p className="text-lg font-bold p-1 text-white">{replyCount}</p>
              </button>
            </div>
          </>
        )}

        {/* 구분선 추가 */}
        <hr className="my-8 border-gray-300" />

        {isCommentListVisible && (
          <CommentList
            comments={replyList}  // Pass replyList as comments
            onCommentAdded={handleCommentAdded} // Pass the handler for adding comments
            onCommentEdited={handleCommentEdited} // Pass the handler for editing comments
            onCommentDeleted={handleCommentDeleted} // Pass the handler for deleting comments
          />
        )}

        <div className="mt-8 flex justify-end">
          <button
            className="px-6 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-300 transition-colors duration-300"
            onClick={() => window.history.back()}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
