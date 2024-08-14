import React from 'react';
import { useNavigate } from 'react-router-dom';

const InfoPanel = ({ markerData }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  // title을 기준으로 오름차순(가나다 순)으로 정렬
  const sortedData = markerData.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="w-72 h-full border-l border-gray-300 bg-gray-100 p-4 overflow-y-auto">
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
                onClick={() => navigate(`/board/${location.id}`)} // 게시판으로 이동
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
