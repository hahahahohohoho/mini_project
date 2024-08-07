// src/App.js
import React, { useState } from 'react';
import MarkerComponent from './MarkerComponent';
import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';


const App = () => {
  const [addressX, setAddressX] = useState(129.07756889651216);
  const [addressY, setAddressY] = useState(35.237845938444636);
  const [map, setMap] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchKeyword}
        onChange={handleSearchChange}
        placeholder="Search location"
      />
      <MapComponent addressX={addressX} addressY={addressY} onMapLoad={handleMapLoad} />
      {map && <MarkerComponent map={map} />}
      {map && <SearchComponent map={map} searchKeyword={searchKeyword} setAddressX={setAddressX} setAddressY={setAddressY} />}
    </div>
  );
};

export default App;
