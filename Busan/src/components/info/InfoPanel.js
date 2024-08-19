import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InfoPanel = ({ markerData }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const [alertMessage, setAlertMessage] = useState(''); // 알림 메시지 상태 추가
  const [showAlert, setShowAlert] = useState(false); // 알림 표시 상태 추가

  // title을 기준으로 오름차순(가나다 순)으로 정렬
  const sortedData = markerData.sort((a, b) => a.title.localeCompare(b.title));

  // 알림 메시지를 일정 시간 후에 숨기는 효과
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000); // 3초 후 알림 숨김
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // 게시판으로 이동하는 함수
  const handleBoardNavigation = (locationId) => {
    // 예: 실제 게시판이 있는지 확인하는 로직을 여기에 추가
    const boardExists = checkBoardExistence(locationId);

    if (boardExists) {
      navigate(`/board/${locationId}`); // 게시판이 존재하면 해당 페이지로 이동
    } else {
      setAlertMessage('해당 게시판이 없습니다.'); // 알림 메시지 설정
      setShowAlert(true); // 알림 표시
    }
  };

  // 게시판 존재 여부를 확인하는 함수 (임시로 false를 반환)
  const checkBoardExistence = (locationId) => {
    // 실제 게시판 존재 여부를 확인하는 로직 추가 (예: API 호출)
    return false; // 예제에서는 게시판이 없다고 가정
  };

  return (
    <div className="relative w-72 h-full border-l border-gray-300 bg-gray-100 p-4 overflow-y-auto">
      {showAlert && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center p-2">
          {alertMessage}
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">선택된 구/군의 장소</h2>
      {sortedData.length > 0 ? (
        <ul>
          {sortedData.map((location, index) => (
            <li key={index} className="mb-4 p-3 bg-white rounded shadow">
              <h3 className="text-lg font-bold mb-2">{location.title}</h3>
              <p><strong>주소:</strong> {location.address}</p>
              {location.phone && <p><strong>전화번호:</strong> {location.phone}</p>}
              {location.img2 && (
                <img src={location.img2} alt={location.title} className="w-full h-32 object-cover my-2 rounded" />
              )}
              <button
                onClick={() => handleBoardNavigation(location.id)} // 게시판으로 이동
                className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                게시판으로 이동
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default InfoPanel;
