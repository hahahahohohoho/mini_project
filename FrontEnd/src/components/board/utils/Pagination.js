import React from 'react';

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // 페이지 번호를 배열로 생성
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4 flex justify-center">
            <ul className="inline-flex -space-x-px">
                {/* 이전 페이지 버튼 */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        이전
                    </button>
                </li>

                {/* 페이지 번호 버튼 */}
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            className={`px-3 py-2 ml-0 leading-tight 
                                ${
                                currentPage === number ? 'bg-blue-500 text-blue-600' : ''
                            }text-gray-400 bg-white border border-gray-300 hover:bg-gray-200 hover:text-gray-700 `}
                        >
                            {number}
                        </button>
                    </li>
                ))}

                {/* 다음 페이지 버튼 */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        다음
                    </button>
                </li>
            </ul>
        </nav>
    );
}
