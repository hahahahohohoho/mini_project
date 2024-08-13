import axios from '../../axios';
import {React, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function MyBoardList() {
    const navigate = useNavigate();

    const [myInfo, setMyInfo] = useState()
    useEffect(()=>{
        const loadMyBoard = async() => {
            // TODO myInfo 설정
            try {
                const response = await axios.get("/auth/myinfo",{
                    params: { username : localStorage.getItem('username') },
                  });
                const data = response.data.boards
                setMyInfo(data)
            } catch (error) {
                console.error('Error fetching board data:', error);
            }
        }  
        loadMyBoard()
    }, []);

    const loadData = () => {
      if(myInfo){
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
                    {myInfo.map(board => (
                        <tr key={`${board.username}-${board.title}`} onClick={() => handleRowClick(board)} className="cursor-pointer">
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
    return (
    <div>
      <h1>{localStorage.getItem("username")}님이 작성한 게시글</h1>
      <div>
        {loadData()}
      </div>
    </div>
  )
}
