
import React, { useState } from 'react';
import NaverMap from './Map/NaverMap';

function App() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = () => {
    // 검색어 설정
    setSearchKeyword(document.getElementById('searchKeyword').value);
  };

  return (
    <div className="App">
      <h1>Naver Map Example</h1>
      <input type="text" id="searchKeyword" placeholder="Search for an address" />
      <button onClick={handleSearch}>Search</button>
      <NaverMap searchKeyword={searchKeyword} />
    </div>
  );
}

export default App;
