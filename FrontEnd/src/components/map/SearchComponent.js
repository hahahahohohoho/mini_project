import React, { useState, useEffect } from 'react';

const SearchComponent = ({ onSearch }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    // 서버에서 구/군 목록을 받아오거나 하드코딩된 목록 사용
    const options = [
      '해운대구', '동래구','사상구','기장군', '부산진구', '수영구', '남구'
      , '서구', '동구', '영도구', '강서구', '중구', '북구', '금정구'
      // 다른 구/군 추가
    ];
    setDistrictOptions(options);
  }, []);

  const handleSearch = () => {
    onSearch(selectedDistrict);
  };

  return (
    <div className="flex flex-grow justify-center p-1 ">
      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        className="border rounded p-1 h-8 w-60"
      >
        <option value>구/군을 선택하세요</option>
        {districtOptions.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
      <button onClick={handleSearch} className="bg-blue-500 mx-2 text-white p-1 rounded h-8 w-30">
        검색
      </button>
    </div>
  );
};

export default SearchComponent;