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
        <div className="container mx-auto p-4 min-h-screen flex flex-col justify-between">
            <h1 className="text-2xl font-bold mb-4 text-center">Board</h1>
            <div className="flex items-end mb-4">
                    <button 
                        onClick={() => navigate('/create')} 
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        게시글 작성
                    </button>
            </div>
            <div className="overflow-x-auto flex-grow" style={{ minHeight: 'calc(10 * 4rem + 2rem)' }}>
                {/* 10개 항목의 높이와 패딩을 고려한 최소 높이 설정 */}
                <BoardTable boardItems={currentBoardItems} handleRowClick={handleRowClick} />
            </div>
            <Pagination
                totalItems={dataBoard.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
