import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axios'; // axios 인스턴스를 가져옴
import CommentList from './CommentList';

const DetailPage = () => {
    const { state } = useLocation();
    const { boardItem } = state || {};
    const [comments, setComments] = useState(boardItem?.replys || []);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token'); // 로그인 상태 확인
    const username = localStorage.getItem('username'); // 로그인된 사용자의 이름
    
    // 추천 수 계산
    const recommendCount = boardItem.recommends ? boardItem.recommends.length : 0;

    // BoardDetailDTO의 recommends 배열을 사용하여 추천 여부 확인
    const [isRecommended, setIsRecommended] = useState(
        boardItem.recommends?.some(recommend => recommend.username === username)
    );

    const handleLoginRedirect = () => {
        const redirectAfterLogin = `/detail/${boardItem.username}/${boardItem.title}`;
        navigate('/login', { state: { from: redirectAfterLogin } });
    };

    const handleRecommendSubmit = async () => {
        if (username) {
            try {
                const newRecommend = {
                    username: username,
                    board_id: boardItem.id, // 게시물 ID 포함
                };
                const result = await axios.post(`/board/${boardItem.id}/recommend`, newRecommend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (result) {
                    setIsRecommended(true);
                    alert('추천이 완료되었습니다.');
                    // window.location.reload(); // 추천 상태를 업데이트하기 위해 페이지 새로고침
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
                    alert('추천이 취소되었습니다.');
                }
            } catch (error) {
                alert('추천 취소에 실패했습니다.');
            }
        } else {
            alert('로그인이 필요합니다.');
        }
    };

    return (
        <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{boardItem.title}</h1>
            <div className="space-y-4">
                {token ? (
                    <>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-lg font-semibold text-gray-700">작성자</p>
                            <p className="text-gray-600">{boardItem.username}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-lg font-semibold text-gray-700">내용</p>
                            <p className="text-gray-600">{boardItem.content}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-lg font-semibold text-gray-700">작성 시간</p>
                            <p className="text-gray-600">{new Date(boardItem.createTime).toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-lg font-semibold text-gray-700">추천 수</p>
                            <p className="text-gray-600">{recommendCount}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-lg font-semibold text-gray-700">작성자</p>
                            <p className="text-gray-600 blur-sm select-none">로그인 후 확인 가능합니다</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-lg font-semibold text-gray-700">내용</p>
                            <p className="text-gray-600 blur-sm select-none">로그인 후 확인 가능합니다</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-lg font-semibold text-gray-700">작성 시간</p>
                            <p className="text-gray-600 blur-sm select-none">로그인 후 확인 가능합니다</p>
                        </div>
                        <div className="text-center mt-4">
                            <button
                                onClick={handleLoginRedirect}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                            >
                                로그인
                            </button>
                        </div>
                    </>
                )}
            </div>

            {token && (
                <>
                    <CommentList/>
                    <button
                        onClick={isRecommended ? handleCancelRecommendSubmit : handleRecommendSubmit}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        {isRecommended ? '추천 취소' : '추천'}
                    </button>
                </>
            )}

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
