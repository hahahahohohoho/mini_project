import BoardTable from '../board/utils/BoardTable';
import Pagination from '../board/utils/Pagination';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

export default function MyBoardList() {
    const [myInfo, setMyInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 항목 수
    const navigate = useNavigate();

    useEffect(() => {
        const loadMyBoard = async () => {
            try {
                const response = await axios.get('/auth/myinfo', {
                    params: { username: localStorage.getItem('username') },
                });
                const data = response.data.boards;
                setMyInfo(data); // 전체 데이터를 한 번만 로드
            } catch (error) {
                console.error('Error fetching board data:', error);
            }
        };
        loadMyBoard();
    }, []); // 빈 배열로 설정하여 이 로직은 컴포넌트 마운트 시 한 번만 실행

    // 페이지 전환 시 데이터를 슬라이스
    const currentBoardItems = myInfo.slice(
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
        console.log(currentBoardItems)
        setCurrentPage(pageNumber); // 페이지 번호만 업데이트
    };

    return (
        <div className="container mx-auto p-4 flex flex-col justify-between">
            <h1 className="text-2xl font-bold mb-4 text-center">{localStorage.getItem("username")}님이 작성한 게시글</h1>
            <div className="overflow-x-auto flex-grow" style={{ minHeight: 'calc(10 * 4rem + 2rem)' }}>
                <BoardTable boardItems={currentBoardItems} handleRowClick={handleRowClick} />
            </div>
            <Pagination
                totalItems={myInfo.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
