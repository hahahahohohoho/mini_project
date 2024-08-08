// src/App.js
import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';
import FilteredMapComponent from './FilteredMapComponent';

const App = () => {
  const [map, setMap] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null); // 부산의 좌표를 기본값으로 설정
  const [searchCenter, setSearchCenter] = useState(null); // 검색된 좌표를 저장
  const [zoomLevel, setZoomLevel] = useState(10); // 기본 확대 수준

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentPosition(newPosition);
      });
    }
  }, []);

  useEffect(() => {
    if (searchKeyword && map) {
      console.log('Fetching sight data...');
      fetch('/sight (1).json')
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched sight data:', data);
          const filtered = data.filter(location => location.title.includes(searchKeyword));
          console.log('Filtered sight data:', filtered);
          setFilteredData(filtered);
          if (filtered.length > 0) {
            const pointMatch = filtered[0].point.match(/POINT \(([^ ]+) ([^ ]+)\)/);
            if (pointMatch) {
              const lng = parseFloat(pointMatch[1]);
              const lat = parseFloat(pointMatch[2]);
              setSearchCenter({ lat, lng });
              setZoomLevel(14); // 검색 시 확대 수준 설정
            }
          }
        })
        .catch((error) => console.error('Error fetching sight data:', error));

      console.log('Fetching road data...');
      fetch('/road.json')
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched road data:', data);
          setLineData(data);
        })
        .catch((error) => console.error('Error fetching road data:', error));
    }
  }, [searchKeyword, map]);

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      <MapComponent onMapLoad={handleMapLoad} center={searchCenter} zoomLevel={zoomLevel} />
      {map && (
        <FilteredMapComponent
          map={map}
          markerData={filteredData}
          lineData={lineData}
          currentPosition={currentPosition}
        />
      )}
    </div>
  );
};

export default App;
