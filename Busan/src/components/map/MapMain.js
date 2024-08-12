import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';
import MarkerComponent from './MarkerComponent';
import LineComponent from './LineComponent';
import axios from '../../axios'; // axios 인스턴스 가져오기

const MapMain = () => {
  const [map, setMap] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [searchCenter, setSearchCenter] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(10);

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
      axios.get('/sight') // axios를 사용하여 sight 데이터를 가져옴
        .then((response) => {
          console.log('Fetched sight data:', response.data);
          const filtered = response.data.filter(location => location.title.includes(searchKeyword));
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
      axios.get('/road') // axios를 사용하여 road 데이터를 가져옴
        .then((response) => {
          console.log('Fetched road data:', response.data);
          setLineData(response.data);
        })
        .catch((error) => console.error('Error fetching road data:', error));
    }
  }, [searchKeyword, map]);

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      <MapComponent onMapLoad={handleMapLoad} center={searchCenter} zoomLevel={zoomLevel} />
      {map && (
        <>
          <MarkerComponent map={map} markerData={filteredData} />
          <LineComponent map={map} currentPosition={currentPosition} markerData={lineData} />
        </>
      )}
    </div>
  );
};

export default MapMain;
