import React from 'react';

export default function BoardTable({ boardItems, handleRowClick }) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">순번</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View Count</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create Time</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {boardItems.map(board => (
                    <tr
                        key={`${board.id}-${board.username}-${board.title}`} // 변경된 고유 키
                        onClick={() => handleRowClick(board)}
                        className="cursor-pointer"
                        style={{ height: '3rem' }} // 각 행의 높이를 일정하게 설정
                    >
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
}