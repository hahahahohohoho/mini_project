import React, { useState } from 'react';
import { useLocation} from 'react-router-dom';
import axios from '../../axios'; // axios 인스턴스를 가져옴


export default function CommentList() {
    const { state } = useLocation();
    const { boardItem } = state || {};
    const [comments, setComments] = useState(boardItem?.replys || []);
    const [newComment, setNewComment] = useState('');

    const token = localStorage.getItem('token'); // 로그인 상태 확인
    const username = localStorage.getItem('username'); // 로그인된 사용자의 이름

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const postComment = async (commentData) => {
        try {
            const response = await axios.post(`/board/${boardItem.id}/reply`, commentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error posting comment:', error);
            return null;
        }
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() && username) {
            const newCommentObj = {
                username: username,
                content: newComment,
                createDate: new Date().toISOString(),
                board_id: boardItem.id, // 게시물 ID 포함
            };
            const result = await postComment(newCommentObj);
            if (result) {
                setComments([...comments, newCommentObj]);
                setNewComment('');
            } else {
                alert('댓글 작성에 실패했습니다.');
            }
        } else if (!username) {
            alert("로그인이 필요합니다.");
        }
    };

    const deleteComment = async (replyId) => {
        if(window.confirm("삭제하시겠습니까?")){
            try {
                console.log(replyId)
                const result = await axios.delete(`/board/${boardItem.id}/reply/${replyId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (result) {
                    alert('댓글 삭제가 완료되었습니다.');
                    // 댓글 목록에서 삭제된 댓글 제거
                    setComments(comments.filter(comment => comment.id !== replyId));
                }
            } catch (error) {
                console.error('Error deleting comment:', error);
                alert('댓글 삭제에 실패했습니다.');
            }
        }
    };
    
    const putComment = ()=>{
        alert("아직 구현되지 않았습니다.")
    }
  return (
    <div>
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">댓글</h2>
            <div className="space-y-4">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-sm font-semibold text-gray-700">{comment.username}</p>
                            <p className="text-gray-600">{comment.content}</p>
                            <p className="text-xs text-gray-500">{new Date(comment.createDate).toLocaleString()}</p>
                            <div className='flex justify-end'>
                            {comment.username === username && (
                                <button
                                    onClick={() => putComment()} // replyId를 사용하여 삭제 요청
                                    className="text-blue-600 hover:text-blue-800 mx-3"
                                >
                                    수정
                                </button>
                            )}
                            {comment.username === username && (
                                <button
                                    onClick={() => deleteComment(comment.id)} // replyId를 사용하여 삭제 요청
                                    className="text-red-600 hover:text-red-800"
                                >
                                    삭제
                                </button>
                            )}
                            {/* TODO '수정' 구현 필요 */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">댓글이 없습니다. 첫 댓글을 달아보세요!</p>
                )}
            </div>
        </div>

        <div className="mt-8">
            <textarea
                value={newComment}
                onChange={handleCommentChange}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
                placeholder="댓글을 작성하세요..."
            />
            <button
                onClick={handleCommentSubmit}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
                댓글 달기
            </button>
        </div>
    </div>
  )
}
