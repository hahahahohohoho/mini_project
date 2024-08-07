// src/components/SearchComponent.js
import React, { useState } from 'react';

const SearchComponent = ({ map, setAddressX, setAddressY }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { naver } = window;

  const handleSearch = () => {
    if (searchKeyword && map && naver && naver.maps && naver.maps.Service) {
      naver.maps.Service.geocode(
        { query: searchKeyword },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR || response.v2.addresses.length === 0) {
            console.error('No addresses found or an error occurred');
          } else {
            const resAddress = response.v2.addresses[0];
            const x = parseFloat(resAddress.x);
            const y = parseFloat(resAddress.y);
            setAddressX(x);
            setAddressY(y);
            const newPosition = new naver.maps.LatLng(y, x);
            map.setCenter(newPosition);
          }
        }
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Search location"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
