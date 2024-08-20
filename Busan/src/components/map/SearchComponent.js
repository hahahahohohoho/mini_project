import React, { useState, useEffect } from 'react';

const SearchComponent = ({ onSearch }) => {
  // 선택된 구/군을 관리하는 상태
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // 선택된 카테고리를 관리하는 상태 (자전거 도로, 명소, 식당 중 하나)
  const [selectedCategory, setSelectedCategory] = useState('');

  // 구/군 옵션을 관리하는 상태 (초기값은 빈 배열)
  const [districtOptions, setDistrictOptions] = useState([]);

  // 카테고리 옵션을 하드코딩하여 설정
  const [categoryOptions] = useState(['명소', '식당']);

  // 컴포넌트가 처음 렌더링될 때 구/군 목록을 설정
  useEffect(() => {
    const options = [
      '부산 전체','강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구',
      '사상구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구', 
      // 다른 구/군 추가 가능
    ];
    setDistrictOptions(options); // 설정된 구/군 목록을 상태로 저장
  }, []);

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = () => {
    onSearch(selectedDistrict, selectedCategory); // 선택된 구/군과 카테고리를 부모 컴포넌트로 전달
  };

  return (
    <div className="flex flex-grow justify-center p-1">
      {/* 카테고리 선택 드롭다운 */}
      <select
        value={selectedCategory} // 현재 선택된 카테고리 상태와 연결
        onChange={(e) => setSelectedCategory(e.target.value)} // 선택된 값이 변경되면 상태 업데이트
        className="border rounded p-1 h-8 w-60"
      >
        <option value="">카테고리를 선택하세요</option> {/* 기본 옵션 */}
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* 구/군 선택 드롭다운 */}
      <select
        value={selectedDistrict} // 현재 선택된 구/군 상태와 연결
        onChange={(e) => setSelectedDistrict(e.target.value)} // 선택된 값이 변경되면 상태 업데이트
        className="border rounded p-1 h-8 w-60 mx-2"
      >
        <option value="">구/군을 선택하세요</option> {/* 기본 옵션 */}
        {districtOptions.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>

      {/* 검색 버튼 */}
      <button onClick={handleSearch} className="bg-blue-500 text-white p-1 rounded h-8 w-30">
      <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
      </svg>

      </button>
    </div>
  );
};

export default SearchComponent;