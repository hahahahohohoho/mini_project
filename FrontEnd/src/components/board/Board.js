import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DataDisplay = () => {
    const [dataBoard, setDataBoard] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadBoard = async () => {
            try {
                const response = await fetch('/board.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setDataBoard(data);
            } catch (error) {
                console.error('Error fetching board data:', error);
            }
        };

        loadBoard();
    }, []);

    const handleRowClick = (boardItem) => {
        navigate(`/detail/${boardItem.username}/${boardItem.title}`, { state: { boardItem } });
    };

    const loadData = () => {
        return (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View Count</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create Time</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {dataBoard.map(board => (
                        <tr key={`${board.username}-${board.title}`} onClick={() => handleRowClick(board)} className="cursor-pointer">
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
            <div className="flex justify-center mb-4">
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