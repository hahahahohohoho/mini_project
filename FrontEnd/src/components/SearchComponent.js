// src/components/SearchComponent.js
import React, { useState } from 'react';

const SearchComponent = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
