import React, { useState } from 'react';
import MapComponent from './MapComponent';
import MarkerComponent from './MarkerComponent';
import SearchComponent from './SearchComponent';
import LineComponent from './LineComponent';
import RestaurantInfoPanel from '../info/RestaurantInfo';
import axios from '../../axios';

const MapMain = () => {
  const [map, setMap] = useState(null);
  const [filteredMarkerData, setFilteredMarkerData] = useState([]);
  const [filteredLineData, setFilteredLineData] = useState([]);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [panelPosition, setPanelPosition] = useState({ top: '10%', left: '10%' });
  const { naver } = window;

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };
  
  const districtCodes = {
    '중구': 2611, '서구': 2614, '동구': 2617, '영도구': 2620, '부산진구': 2623, '동래구': 2626,
    '남구': 2629, '북구': 2632, '해운대구': 2635, '사하구': 2638, '금정구': 2641, '강서구': 2644,
    '연제구': 2647, '수영구': 2650, '사상구': 2653, '기장군': 2671
  };

  const fetchMarkerData = async (category, district) => {

    try {
      let baseUrl = '';
      if (category === '식당') {
        baseUrl = '/restaurant';
      } else if (category === '명소') {
        baseUrl = '/sight';
      } else if (category === '자전거 도로') {
        baseUrl = '/road';
      }
      
      const url = district !== '부산' ? `${baseUrl}/city/${districtCodes[district]}` : baseUrl;
      const response = await axios.get(url);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching marker data:', error);
      return [];
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarkerId(marker.id);
    setShowInfoPanel(true);
  };

  const handleSearch = async (district, category) => {
    setFilteredLineData([]);// 이전에 그려진 라인 데이터 초기화
    
    const data = await fetchMarkerData(category, district); // 선택된 카테고리 및 구/군에 따라 데이터를 가져옴
    setFilteredMarkerData(data); // 필터링된 데이터를 상태에 저장

    if (category === '명소' || category === '식당') {
      const districtCode = districtCodes[district];
      const lineResponse = await axios.get(`/road/city/${districtCode}`); // 해당 구/군의 라인 데이터 요청
      const data = lineResponse.data
      .filter(a=> a.grade != -999) // 필요시 주석 처리
      setFilteredLineData(data); // 라인 데이터를 상태에 저장
    }  

    if (map) {
      if (filteredMarkerData.length > 0) {
        const bounds = new naver.maps.LatLngBounds();
        filteredMarkerData.forEach(location => {
          const pointMatch = location.point.match(/POINT \(([^ ]+) ([^ ]+)\)/);
          if (pointMatch) {
            const lng = parseFloat(pointMatch[1]);
            const lat = parseFloat(pointMatch[2]);
            bounds.extend(new naver.maps.LatLng(lat, lng));
          }
        });
        map.fitBounds(bounds);
      }
    }
    setShowInfoPanel(true);
  };

  return (
    <div className="relative flex h-screen">
      {showInfoPanel && selectedMarkerId && (
        <div
          className="absolute z-10 w-72 h-auto bg-white p-4 shadow-lg rounded-lg"
          style={{ top: panelPosition.top, left: panelPosition.left }}
        >
          <RestaurantInfoPanel id={selectedMarkerId} onClose={() => setShowInfoPanel(false)} />
          <button
            onClick={() => setShowInfoPanel(false)}
            className="absolute top-2 right-2 bg-blue-500 text-white py-1 px-3 rounded"
          >
            X
          </button>
        </div>
      )}
      <div className="flex-1 relative">
        <SearchComponent onSearch={handleSearch} />
        <MapComponent onMapLoad={handleMapLoad} center={{ lat: 35.1796, lng: 129.0756 }} zoomLevel={11} />
        {map && (
          <>
            {filteredLineData.length > 0 && <LineComponent map={map} lineData={filteredLineData} />}
            {filteredMarkerData.length > 0 && (
              <MarkerComponent map={map} markerData={filteredMarkerData} onMarkerClick={handleMarkerClick} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MapMain;
