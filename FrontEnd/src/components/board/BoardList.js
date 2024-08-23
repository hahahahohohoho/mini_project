import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import BoardTable from './utils/BoardTable';
import Pagination from './utils/Pagination';

export default function BoardList() {
    const [dataBoard, setDataBoard] = useState([]);
    const [filteredBoardItems, setFilteredBoardItems] = useState([]); // 필터링된 데이터를 위한 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('date_desc'); // 기본 정렬은 날짜 내림차순
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 상태
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const loadBoard = async () => {
            try {
                const response = await axios.get('/board');
                const data = response.data;
                setDataBoard(data);
                setFilteredBoardItems(data); // 기본적으로 전체 데이터를 표시
            } catch (error) {
                console.error('Error fetching board data:', error);
            }
        };
        loadBoard();
    }, []);

    const sortData = (boardItems) => {
        return boardItems.sort((a, b) => {
            switch (sortOrder) {
                case 'id_asc':
                    return a.id - b.id;
                case 'id_desc':
                    return b.id - a.id;
                case 'username_asc':
                    return a.username.localeCompare(b.username);
                case 'username_desc':
                    return b.username.localeCompare(a.username);
                case 'viewcount_asc':
                    return a.viewcount - b.viewcount;
                case 'viewcount_desc':
                    return b.viewcount - a.viewcount;
                case 'date_asc':
                    return new Date(a.createTime) - new Date(b.createTime);
                case 'date_desc':
                    return new Date(b.createTime) - new Date(a.createTime);
                default:
                    return 0;
            }
        });
    };

    const handleSortChange = (column) => {
        if (sortOrder.includes(column)) {
            setSortOrder(sortOrder.includes('_asc') ? `${column}_desc` : `${column}_asc`);
        } else {
            setSortOrder(`${column}_asc`);
        }
    };

    const handleSearchChange = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearchKeyword(keyword);
        const filtered = dataBoard.filter(
            (item) =>
                item.title.toLowerCase().includes(keyword) ||
                item.username.toLowerCase().includes(keyword)
        );
        setFilteredBoardItems(filtered); // 검색 결과 업데이트
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    const currentBoardItems = sortData(filteredBoardItems).slice(
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
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col justify-between max-w-screen-lg py-2">
            {/* <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Board</h1> */}

            <div className="flex justify-center items-center m-2">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Search by title or username"
                        value={searchKeyword}
                        onChange={handleSearchChange} // 검색 상태를 관리
                        className="p-2 w-96 border border-gray-300 rounded-md items-start "
                    />
                </div>

            </div>

            <div
                className="overflow-x-auto flex-grow bg-white shadow rounded-sm"
                style={{ minHeight: 'calc(10 * 4rem + 2rem)' }}
            >
                <BoardTable
                    boardItems={currentBoardItems}
                    handleRowClick={handleRowClick}
                    onSortChange={handleSortChange}
                    sortOrder={sortOrder}
                />
                <div className='flex justify-end py-2'>

                    <button
                        onClick={() => navigate('/create')}
                        className="p-2 mr-4 text-white font-medium bg-slate-400 rounded-md hover:bg-slate-300  transition duration-200"
                    >
                        <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z" />
                        </svg>

                    </button>
                </div>
                <Pagination
                    totalItems={filteredBoardItems.length} // 필터링된 항목의 길이로 페이지네이션을 구성
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>

        </div>
    );
}
