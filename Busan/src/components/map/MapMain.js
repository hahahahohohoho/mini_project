import React, { useState } from 'react';
import MapComponent from './MapComponent';
import MarkerComponent from './MarkerComponent';
import SearchComponent from './SearchComponent';
import LineComponent from './LineComponent';
import InfoPanel from '../info/InfoPanel';  // InfoPanel 컴포넌트 추가
import axios from '../../axios';

const MapMain = () => {
  const [map, setMap] = useState(null); // 네이버 지도 객체를 관리하는 상태
  const [filteredMarkerData, setFilteredMarkerData] = useState([]); // 필터링된 마커 데이터를 저장하는 상태
  const [filteredLineData, setFilteredLineData] = useState([]); // 필터링된 라인 데이터를 저장하는 상태
  const [showInfoPanel, setShowInfoPanel] = useState(false); // 정보창 표시 상태를 관리하는 상태
  const { naver } = window; // naver 객체를 window에서 가져옴 (네이버 지도 API 사용)
  
  const districtCodes = {
    '중구': 2611, '서구': 2614, '동구': 2617, '영도구': 2620, '부산진구': 2623, '동래구': 2626,
    '남구': 2629, '북구': 2632, '해운대구': 2635, '사하구': 2638, '금정구': 2641, '강서구': 2644,
    '연제구': 2647, '수영구': 2650, '사상구': 2653, '기장군': 2671
  };
  // 지도 로드 완료 시 호출되는 함수
  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance); // 지도 객체를 상태로 저장
  };
  
  // 선택된 카테고리 및 구/군에 따라 데이터를 가져오는 함수
  const fetchMarkerData = async (category, district) => {
    const districtCode = districtCodes[district];

    try {
      // 카테고리별 기본 URL 설정
      let baseUrl = '';
      if (category === '식당') {
        baseUrl = '/restaurant';
      } else if (category === '명소') {
        baseUrl = '/sight';
      }

      // const url = district !== '부산' ? `${baseUrl}/city/${districtCodes[district]}` : baseUrl;
      
      // 지역에 따라 URL 결정
      // 선택된 구의 코드를 사용하여 URL 생성
      const url = districtCode ? `${baseUrl}/city/${districtCode}` : baseUrl;

      const response = await axios.get(url); // 서버에서 데이터 가져오기
      return response.data; // 데이터를 반환
    } catch (error) {
      return [];
    }
  };

  // 검색 시 호출되는 함수 (구/군과 카테고리를 받아 필터링 수행)
  const handleSearch = async (district, category) => {
    setFilteredLineData([]);// 이전에 그려진 라인 데이터 초기화
    
    const data = await fetchMarkerData(category, district); // 선택된 카테고리 및 구/군에 따라 데이터를 가져옴
    setFilteredMarkerData(data); // 필터링된 데이터를 상태에 저장

    if (category === '명소' || category === '식당') {
      const districtCode = districtCodes[district];
      const lineResponse = await axios.get(`/road/city/${districtCode}`); // 해당 구/군의 라인 데이터 요청
      setFilteredLineData(lineResponse.data); // 라인 데이터를 상태에 저장
    }  

    if (map) {
      if (data.length > 0) { // 필터링된 데이터가 존재할 경우
        const bounds = new naver.maps.LatLngBounds(); // 지도에 표시할 범위를 계산하기 위한 객체
        data.forEach(location => {
          const pointMatch = location.point.match(/POINT \(([^ ]+) ([^ ]+)\)/); // 좌표를 파싱
          if (pointMatch) {
            const lng = parseFloat(pointMatch[1]); // 경도 추출
            const lat = parseFloat(pointMatch[2]); // 위도 추출
            bounds.extend(new naver.maps.LatLng(lat, lng)); // 좌표를 범위에 추가
          }
        });
        map.fitBounds(bounds); // 모든 마커가 보이도록 지도 범위 설정
      }
    }
    setShowInfoPanel(true);
  };

  return (
    <div className="relative flex h-screen">
      {/* 정보창을 왼쪽에 고정시키고, 지도를 밀어내지 않도록 z-index를 조정 */}
      {showInfoPanel && (
        <div className="absolute left-0 top-0 z-10 w-72 h-full">
          <InfoPanel markerData={filteredMarkerData} />
          {/* 정보창을 숨길 수 있는 버튼 */}
          <button
            onClick={() => setShowInfoPanel(false)}
            className="absolute top-10 left-full ml-2 bg-blue-500 text-white py-1 px-3 rounded"
          >
            X
          </button>
        </div>
      )}
      <div className="flex-grow">
        <SearchComponent onSearch={handleSearch} />
        <MapComponent onMapLoad={handleMapLoad} center={{ lat: 35.1796, lng: 129.0756 }} zoomLevel={11} />
        {map && (
          <>
            {filteredMarkerData.length > 0 && (
              <MarkerComponent map={map} markerData={filteredMarkerData}  />
            )}
            {filteredLineData.length > 0 && <LineComponent map={map} lineData={filteredLineData} />} {/* 필터링된 라인 데이터 전달 */}
          </>
        )}
      </div>
    </div>
  );
};

export default MapMain;
