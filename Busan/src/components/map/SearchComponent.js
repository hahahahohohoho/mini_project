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
        placeholder="Search by title"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;