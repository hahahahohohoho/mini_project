import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [error, setError] = useState('');
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // 클릭된 유저의 ID를 저장
  const [userPosts, setUserPosts] = useState([]); // 클릭된 유저의 게시글 목록을 저장
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 저장
  const postsPerPage = 5; // 페이지당 표시할 게시글 수

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

  // 이메일을 마스킹하는 함수
  const maskEmail = (email) => {
    const [localPart, domain] = email.split('@');
    const maskedLocalPart = localPart.slice(0, 3) + '●'.repeat(Math.max(0, localPart.length - 3));
    return `${maskedLocalPart}@${domain}`;
  };

  const handleRowClick = async (userId) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
      setUserPosts([]);
    } else {
      try {
        const response = await axios.get(`/admin/user/${userId}/posts`);
        setUserPosts(response.data);
        setSelectedUserId(userId);
        setCurrentPage(1); // 페이지를 초기화
      } catch (error) {
        console.error('Error fetching user posts:', error);
        setError('게시글을 불러오는 데 실패했습니다.');
      }
    }
  };

  // 게시물 세부 정보 페이지로 이동하는 함수
  const handleGoDetail = async (boardItem) => {
    try {
      const response = await axios.get(`/board/${boardItem.id}`);
      const boardDetail = response.data;
      navigate(`/detail/${boardItem.username}/${boardItem.title}`, { state: { boardItem: boardDetail } });
    } catch (error) {
      console.error('Error fetching board details:', error);
      alert('게시물 세부 정보를 가져오는 데 실패했습니다.');
    }
  };

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 현재 페이지에 맞는 게시글을 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);

  const renderPosts = () => {
    if (userPosts.length > 0) {
      return (
        <tr>
          <td colSpan="5">
            <div className="bg-gray-100 p-4">
              <h3 className="font-bold mb-2">작성한 게시글</h3>
              <ul className="list-disc pl-5">
                {currentPosts.map((post) => (
                  <li key={post.id} className="mb-2 cursor-pointer" onClick={() => handleGoDetail(post)}>
                    <strong>{post.title}</strong>
                    <p>{post.content}</p>
                  </li>
                ))}
              </ul>
              {/* 페이지네이션 */}
              <div className="mt-4">
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={userPosts.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </td>
        </tr>
      );
    }
    return null;
  };

  const loadData = () => {
    if (userData.length > 0) {
      return (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">로그인 날짜</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">게시글 수</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userData.filter(user => user.username !== '관리자').map(user => (
              <React.Fragment key={`${user.id}-${user.username}`}>
                <tr className="cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{maskEmail(user.email)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(user.signUpDate).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleRowClick(user.id)}>{user.boardCount}</td>
                </tr>
                {selectedUserId === user.id && renderPosts()}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          {loadData()}
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 ${
                currentPage === number ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminPage;
