import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
const DataDisplay = () => {
    const [dataBoard, setDataBoard] = useState([]);
    const [boardItem, setBoardItem] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const loadBoard = async () => {
            console.log(process.env.REACT_APP_API_MODE);
            try {
                const response = await axios.get('/board');
                const data = response.data;
                setDataBoard(data);
            }catch (error) {
                console.error('Error fetching board data:', error);
            }
        };

        loadBoard();
    }, []);

    const handleCreatePost = () => {
        navigate('/create');
    };

    const handleRowClick = async (boardItem) => {
        try {
            // 서버에서 게시물 세부 정보를 가져옴
            const response = await axios.get(`/board/${boardItem.id}`);
            const boardDetail = response.data;

            // 게시물 세부 정보를 DetailPage로 전달
            navigate(`/detail/${boardItem.username}/${boardItem.title}`, { state: { boardItem: boardDetail } });
        } catch (error) {
            console.error('Error fetching board details:', error);
            alert('게시물 세부 정보를 가져오는 데 실패했습니다.');
        }
    };

    const loadData = () => {
        return (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">순번</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View Count</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create Time</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {dataBoard.map(board => (
                        <tr key={`${board.username}-${board.title}`} onClick={() => handleRowClick(board)} className="cursor-pointer" key={board.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{board.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{board.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{board.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{board.viewcount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(board.createTime).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Board</h1>
            <div className="flex justify-between mb-4">
                <button 
                    onClick={handleCreatePost} 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    게시글 작성
                </button>
                <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Refresh Board
                </button>
            </div>
            <div className="overflow-x-auto">
                {loadData()}
            </div>
        </div>
    );
};

export default DataDisplay;
