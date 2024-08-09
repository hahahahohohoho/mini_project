import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios'; // axios 인스턴스 가져오기

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const username = localStorage.getItem('username'); // 로그인된 사용자의 이름
    const token = localStorage.getItem('token'); // 인증 토큰

    useEffect(() => {
        if (!token) {
            // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
            navigate('/login', { state: { from: '/create' } });
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim() === '' || content.trim() === '') {
            setError('제목과 내용을 모두 입력해주세요.');
            return;
        }

        const newPost = {
            title: title,
            content: content,
            username: username, // 작성자 이름 저장
            createTime: new Date().toISOString(), // 현재 시간
        };

        try {
            const response = await axios.post('/board', newPost, {
                headers: {
                    Authorization: `Bearer ${token}` // 인증 토큰을 헤더에 포함
                }
            });

            if (response.status === 201) {
                alert('게시글이 성공적으로 등록되었습니다.');
                navigate('/board'); // 게시글 작성 후 게시판으로 이동
            } else {
                setError('게시글 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('게시글 등록 중 오류 발생:', error);
            setError('게시글 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">게시글 작성</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        제목
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="제목을 입력하세요"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        내용
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="8"
                        placeholder="내용을 입력하세요"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        작성
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
