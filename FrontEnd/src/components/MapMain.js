// src/App.js
import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import MarkerComponent from './MarkerComponent';
import LineComponent from './LineComponent';
import SearchComponent from './SearchComponent';

const App = () => {
  const [map, setMap] = useState(null);
  const [markerData, setMarkerData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [searchCenter, setSearchCenter] = useState(null);
  const [filteredMarkerData, setFilteredMarkerData] = useState([]);

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleSearch = (keyword) => {
    const filtered = markerData.filter(location => location.title.includes(keyword));
    setFilteredMarkerData(filtered);
    if (filtered.length > 0) {
      const pointMatch = filtered[0].point.match(/POINT \(([^ ]+) ([^ ]+)\)/);
      if (pointMatch) {
        const lng = parseFloat(pointMatch[1]);
        const lat = parseFloat(pointMatch[2]);
        setSearchCenter({ lat, lng });
      }
    }
  };

  useEffect(() => {
    const fetchLineData = async () => {
      try {
        const response = await fetch('/road.json');
        const data = await response.json();
        setLineData(data.slice(0, 5)); // 필요에 따라 경로 수를 조정하세요
      } catch (error) {
        console.error('Error fetching road data:', error);
      }
    };

    const fetchMarkerData = async () => {
      try {
        const response = await fetch('/sight (1).json');
        const data = await response.json();
        setMarkerData(data);
        setFilteredMarkerData(data); // 초기 상태는 모든 마커를 표시
      } catch (error) {
        console.error('Error fetching sight data:', error);
      }
    };

    fetchLineData();
    fetchMarkerData();
  }, []);

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      <MapComponent 
        onMapLoad={handleMapLoad} 
        center={{ lat: 35.1796, lng: 129.0756 }} // 부산 중심 좌표
        zoomLevel={14} 
      />
      {map && <MarkerComponent map={map} markerData={filteredMarkerData} />}
      {map && <LineComponent map={map} lineData={lineData} />}
      {map && searchCenter && (
        <MarkerComponent map={map} markerData={filteredMarkerData} searchCenter={searchCenter} />
      )}
    </div>
  );
};

export default App;
