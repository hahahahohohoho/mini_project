// src/components/AdminPage.js
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [error, setError] = useState('');
  const [userData, setUserData] = useState()

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('/admin/user');
        setUserData(response.data);
      } catch (error) {
        setError('권한이 없습니다.');
      }
    };

    fetchMessage();
  }, []);
  // TODO 외래키 때문에 설정 X
  // const deleteUser = async(userId)=>{
  //   if(window.confirm("삭제하시겠습니까?")){
  //     try{
  //       const response = await axios.delete(`/admin/user/${userId}`);
  //       if(response){
  //         alert("유저 정보가 삭제되었습니다.")
  //       }else{
  //         alert("삭제에 실패했습니다.")
  //       }
  //     }catch(error){
  //       setError('권한이 없습니다.')
  //     }
  //   }
  // }

  const loadData = () => {
    if(userData){
      return (
          <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">순번</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SIGNUP DATE</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">게시글 수</th>
                  </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {userData.filter(user=> user.username!=='관리자').map(user => (
                      <tr key={`${user.id}-${user.username}`} className="cursor-pointer">
                          <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.signUpDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleRowClick(user.id)}>{user.boardCount}</td>
                          {/* <td className="px-6 py-4 whitespace-nowrap" onClick={() => deleteUser(user.id)}>추방</td> */}
                      </tr>
                  ))}
              </tbody>
          </table>
      );
    }
  };

  const handleRowClick = async (userId) => {
    alert("아직 구현되지 않았습니다.")
    // try {
    //     // 서버에서 게시물 세부 정보를 가져옴
    //     const response = await axios.get(`/board/${userId.id}`);
    //     const boardDetail = response.data;

    //     // 게시물 세부 정보를 DetailPage로 전달
    //     navigate(`/detail/${userId.username}/${userId.title}`, { state: { boardItem: boardDetail } });
    // } catch (error) {
    //     console.error('Error fetching board details:', error);
    //     alert('게시물 세부 정보를 가져오는 데 실패했습니다.');
    // }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
        {error && <p className="text-red-500">{error}</p>}
      <div>
        {loadData()}
      </div>
      </div>
    </div>
  );
};

export default AdminPage;