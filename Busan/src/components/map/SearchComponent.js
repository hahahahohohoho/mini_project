import React, { useState } from 'react';

const SearchComponent = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = () => {
    onSearch(searchKeyword);
  };

  return (
    <div>
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="어디로 가고 싶으세요?"
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchComponent;