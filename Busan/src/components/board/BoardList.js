import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import BoardTable from './utils/BoardTable';
import Pagination from './utils/Pagination';

export default function BoardList() {
    const [dataBoard, setDataBoard] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 항목 수
    const navigate = useNavigate();

    useEffect(() => {
        const loadBoard = async () => {
            try {
                const response = await axios.get('/board');
                const data = response.data;
                setDataBoard(data); // 전체 데이터를 한 번만 로드
            } catch (error) {
                console.error('Error fetching board data:', error);
            }
        };
        loadBoard();
    }, []); // 빈 배열로 설정하여 이 로직은 컴포넌트 마운트 시 한 번만 실행

    // 페이지 전환 시 데이터를 슬라이스
    const currentBoardItems = dataBoard.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleRowClick = async (boardItem) => {
        try {
            const response = await axios.get(`/board/${boardItem.id}`);
            const boardDetail = response.data;
            navigate(`/detail/${boardItem.username}/${boardItem.title}`, { state: { boardItem: boardDetail } });
        } catch (error) {
            console.error('Error fetching board details:', error);
            alert('게시물 세부 정보를 가져오는 데 실패했습니다.');
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // 페이지 번호만 업데이트
    };

    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col justify-between max-w-screen-lg py-2">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Board</h1>
            <div className="flex justify-end mb-1">
                <button
                    onClick={() => navigate('/create')}
                    className="px-1 py-1  text-white font-medium rounded-full  focus:outline-none focus:ring-4 focus:ring-cyan-300 transition duration-200"
                >
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                    </svg>

                </button>
            </div>

            <div
                className="overflow-x-auto flex-grow bg-white shadow rounded-sm"
                style={{ minHeight: 'calc(10 * 4rem + 2rem)' }}
            >
                {/* 10개 항목의 높이와 패딩을 고려한 최소 높이 설정 */}
                <BoardTable boardItems={currentBoardItems} handleRowClick={handleRowClick} />
            </div>

            <Pagination
                totalItems={dataBoard.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                className="mt-8"
            />
        </div>
    );
}