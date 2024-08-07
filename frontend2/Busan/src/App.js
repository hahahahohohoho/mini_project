
import React, { useState } from 'react';
// import NaverMap from './Map/NaverMap';
import MapMain from './conponents/MapMain';

function App() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = () => {
    // 검색어 설정
    setSearchKeyword(document.getElementById('searchKeyword').value);
  };

  return (
    <div className="App">
      <h1>Naver Map Example</h1>
      <MapMain/>
      {/* <input type="text" id="searchKeyword" placeholder="Search for an address" />
      <button onClick={handleSearch}>Search</button>
      <NaverMap searchKeyword={searchKeyword} /> */}
    </div>
  );
}

export default App;
