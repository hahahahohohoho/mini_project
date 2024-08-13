import React, { useState, useEffect, useCallback, useRef } from 'react';
import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';
import MarkerComponent from './MarkerComponent';
import LineComponent from './LineComponent';
import axios from '../../axios'; // axios 인스턴스 가져오기

const MapMain = () => {
  const [map, setMap] = useState(null);
  const [markerData, setMarkerData] = useState([]);
  const [filteredMarkerData, setFilteredMarkerData] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const { naver } = window;
  const lineString = "LINESTRING (498953.838884654 291893.32538160635, 498954.27452711645 291894.6438727996, 498954.4311342301 291895.1178213439, 498958.3066291502 291906.84644122375)";
  
  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleSearch = useCallback((district) => {
    const filtered = markerData.filter(location => location.address.includes(district));
    setFilteredMarkerData(filtered);

    if (filtered.length > 0) {
      // 검색된 위치로 지도의 중심 이동
      const firstLocation = new naver.maps.LatLng(
        parseFloat(filtered[0].point.split(' ')[1]),
        parseFloat(filtered[0].point.split(' ')[0].replace('POINT(', '').replace(')', ''))
      );
      map.panTo(firstLocation);  // 중심 좌표 이동에 애니메이션 효과를 주기 위해 panTo 사용
      map.setZoom(14);  // 적절한 줌 레벨로 조정 가능
    }
  }, [markerData, map]);

  useEffect(() => {
    // 마커 데이터 불러오기
    const fetchMarkerData = async () => {
      try {
        const response = await axios.get('/sight'); // 해당 경로에서 데이터 로드
        setMarkerData(response.data);
      } catch (error) {
        console.error('Error fetching sight data:', error);
      }
    };

    fetchMarkerData();
  }, []);

  //라인
  

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow h-2/3">
        <SearchComponent onSearch={handleSearch} />
        <MapComponent 
          onMapLoad={handleMapLoad} 
          center={{ lat: 35.1796, lng: 129.0756 }} 
          zoomLevel={10} // 기본 줌 레벨
        />
        {map && <LineComponent map={map} lineData={lineString} />}
      </div>

      <div className="h-1/3 bg-gray-100 p-4 overflow-y-auto">
        {selectedInfo ? (
          <div className="flex flex-col items-start">
            <h2 className="text-2xl font-bold">{selectedInfo.title}</h2>
            <p>{selectedInfo.address}</p>
            <p>{selectedInfo.content}</p>
            <a href={`/board/${selectedInfo.id}`} className="text-blue-500 mt-4">관련 게시판으로 이동</a>
          </div>
        ) : (
          <p>지도의 마커를 클릭하거나 검색 결과를 선택하면 해당 정보가 여기에 표시됩니다.</p>
        )}
      </div>
      {/* 마커 컴포넌트 추가 */}
      {map && <MarkerComponent map={map} markerData={filteredMarkerData} />}
    </div>
  );
};

export default MapMain;