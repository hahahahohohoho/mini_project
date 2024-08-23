import React from 'react';

export default function BoardTable({ boardItems, handleRowClick, onSortChange, sortOrder }) {
    const getSortIcon = (column) => {
        if (sortOrder.includes(column)) {
            return sortOrder.includes('_asc') ? '▲' : '▼';
        }
        return '';
    };

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th
                        className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => onSortChange('id')}
                    >
                        번호 {getSortIcon('id')}
                    </th>
                    <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => onSortChange('username')}
                    >
                        작성자 {getSortIcon('username')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                    <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => onSortChange('viewcount')}
                    >
                        조회수 {getSortIcon('viewcount')}
                    </th>
                    <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => onSortChange('date')}
                    >
                        작성일 {getSortIcon('date')}
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {boardItems.map(board => (
                    <tr
                        key={`${board.id}-${board.username}-${board.title}`}
                        onClick={() => handleRowClick(board)}
                        className="cursor-pointer"
                        style={{ height: '3rem' }}
                    >
                        <td className="px-6 py-4 whitespace-nowrap">{board.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{board.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{board.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{board.viewcount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(board.createTime).toLocaleDateString() === new Date().toLocaleDateString()
                                ? new Date(board.createTime).toLocaleTimeString()
                                : new Date(board.createTime).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
