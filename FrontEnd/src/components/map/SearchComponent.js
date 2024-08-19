import React, { useState, useEffect } from 'react';

const SearchComponent = ({ onSearch }) => {
  // 선택된 구/군을 관리하는 상태
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // 선택된 카테고리를 관리하는 상태 (자전거 도로, 명소, 식당 중 하나)
  const [selectedCategory, setSelectedCategory] = useState('');

  // 구/군 옵션을 관리하는 상태 (초기값은 빈 배열)
  const [districtOptions, setDistrictOptions] = useState([]);

  // 카테고리 옵션을 하드코딩하여 설정
  const [categoryOptions] = useState(['자전거 도로', '명소', '식당']);

  // 컴포넌트가 처음 렌더링될 때 구/군 목록을 설정
  useEffect(() => {
    const options = [
      '부산', '해운대구', '동래구', '사상구', '기장군', '부산진구', '수영구', '남구',
      '서구', '동구', '영도구', '강서구', '중구', '북구', '금정구'
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
        검색
      </button>
    </div>
  );
};

export default SearchComponent;