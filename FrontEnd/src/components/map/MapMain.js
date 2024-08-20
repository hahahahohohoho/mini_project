import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import MarkerComponent from './MarkerComponent';
import SearchComponent from './SearchComponent';
import LineComponent from './LineComponent';
import RestaurantInfoPanel from '../info/RestaurantInfo';
import SightInfoPanel from '../info/SightInfo';
import axios from '../../axios';
import Draggable from 'react-draggable';

const MapMain = () => {
  const [map, setMap] = useState(null);
  const [filteredMarkerData, setFilteredMarkerData] = useState([]);
  const [filteredLineData, setFilteredLineData] = useState([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [category, setCategory] = useState('');
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ top: '10%', left: '10%' });
  const [center, setCenter] = useState({ lat: 35.1767, lng: 129.0817 }); // 연제구의 초기 좌표로 설정
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 초기 로드 상태

  const { naver } = window;

  const districtCodes = {
    '중구': 2611, '서구': 2614, '동구': 2617, '영도구': 2620, '부산진구': 2623, '동래구': 2626,
    '남구': 2629, '북구': 2632, '해운대구': 2635, '사하구': 2638, '금정구': 2641, '강서구': 2644,
    '연제구': 2647, '수영구': 2650, '사상구': 2653, '기장군': 2671
  };

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const fetchMarkerData = async (category, district) => {
    try {
      let baseUrl = '';
      if (category === '식당') {
        baseUrl = '/restaurant';
      } else if (category === '명소') {
        baseUrl = '/sight';
      }
      
      const url = district !== '부산 전체' ? `${baseUrl}/city/${districtCodes[district]}` : baseUrl;
      console.log('url : ',url)
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching marker data:', error);
      return [];
    }
  };

  const handleSearch = async (district, category) => {
    setFilteredLineData([]);
    setCategory(category);

    const data = await fetchMarkerData(category, district);
    setFilteredMarkerData(data);

    if (category === '명소' || category === '식당') {
      if (district !== '부산 전체') {
        const districtCode = districtCodes[district];
        const lineResponse = await axios.get(`/road/city/${districtCode}`);
        const lineData = lineResponse.data.filter(a => a.grade !== -999);
        setFilteredLineData(lineData);
      } else {
        setFilteredLineData([]);
      }
    }

    if (map) {
      if (data.length > 0) {
        const bounds = new naver.maps.LatLngBounds();
        data.forEach(location => {
          const pointMatch = location.point.match(/POINT \(([^ ]+) ([^ ]+)\)/);
          if (pointMatch) {
            const lng = parseFloat(pointMatch[1]);
            const lat = parseFloat(pointMatch[2]);
            bounds.extend(new naver.maps.LatLng(lat, lng));
          }
        });
        map.fitBounds(bounds);

        // 검색된 구/군의 중심으로 지도 설정 (초기 로드가 아닌 경우에만)
        if (!isInitialLoad) {
          const districtCenter = new naver.maps.LatLng(data[0].latitude, data[0].longitude);
          setCenter({ lat: data[0].latitude, lng: data[0].longitude }); // 지도의 중심을 변경
          map.setCenter(districtCenter);
        }
      }
    }
    setShowInfoPanel(true);
    setIsInitialLoad(false);
  };

  useEffect(() => {
    handleSearch('연제구', '식당');
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarkerId(marker.id);
    setShowInfoPanel(true);
  };

  return (
    <div className="relative flex h-screen">
      {showInfoPanel && selectedMarkerId && (
      <Draggable>
        <div
          className="absolute z-10 w-72 h-auto bg-white p-4 shadow-lg rounded-lg"
          style={{ top: panelPosition.top, left: panelPosition.left }}
        >
          {category === '식당' ? (
            <RestaurantInfoPanel id={selectedMarkerId} onClose={() => setShowInfoPanel(false)} />
          ) : (
            <SightInfoPanel id={selectedMarkerId} onClose={() => setShowInfoPanel(false)} />
          )}
          <button
            onClick={() => setShowInfoPanel(false)}
            className="absolute top-2 right-2 bg-blue-500 text-white py-1 px-3 rounded"
          >
            X
          </button>
        </div>
      </Draggable>
      )}
      <div className="flex-1 relative">
        <SearchComponent onSearch={handleSearch} />
        <MapComponent onMapLoad={handleMapLoad} center={center} zoomLevel={14} />
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
