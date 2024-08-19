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
  const { naver } = window; // naver 객체를 window에서 가져옴 (네이버 지도 API 사용)
  
  

  // 지도 로드 완료 시 호출되는 함수
  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance); // 지도 객체를 상태로 저장
  };

  // 선택된 카테고리 및 구/군에 따라 데이터를 가져오는 함수 (2024-08-12 15:10)
  const fetchMarkerData = async (category, district) => {
    const districtCodes = {
      '중구': 2611, '서구': 2614, '동구': 2617, '영도구': 2620, '부산진구': 2623, '동래구': 2626,
      '남구': 2629, '북구': 2632, '해운대구': 2635, '사하구': 2638, '금정구': 2641, '강서구': 2644,
      '연제구': 2647, '수영구': 2650, '사상구': 2653, '기장군': 2671
    };

    try {
      // 카테고리별 기본 URL 설정
      let baseUrl = '';
      if (category === '식당') {
        baseUrl = '/restaurant';
      } else if (category === '명소') {
        baseUrl = '/sight';
      } else if (category === '자전거 도로') {
        baseUrl = '/road';
      }

      // 지역에 따라 URL 결정
      const url = district !== '부산' ? `${baseUrl}/city/${districtCodes[district]}` : baseUrl;

      const response = await axios.get(url); // 서버에서 데이터 가져오기
      return response.data; // 데이터를 반환
    } catch (error) {
      console.error('Error fetching marker data:', error); // 데이터 로드 중 오류 발생 시 로그 출력
      return [];
    }
  };

  // 검색 시 호출되는 함수 (구/군과 카테고리를 받아 필터링 수행)
  const handleSearch = async (district, category) => {
    const data = await fetchMarkerData(category, district); // 선택된 카테고리 및 구/군에 따라 데이터를 가져옴

    if (category === '자전거 도로') {
      setFilteredLineData(data); // 필터링된 라인 데이터를 상태에 저장
    } else {
      setFilteredMarkerData(data); // 필터링된 데이터를 상태에 저장
    }

    if(map){
      if (filteredMarkerData.length > 0) { // 필터링된 데이터가 존재할 경우
        const bounds = new naver.maps.LatLngBounds(); // 지도에 표시할 범위를 계산하기 위한 객체
        filteredMarkerData.forEach(location => {
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
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 relative">
        <SearchComponent onSearch={handleSearch} />
        <MapComponent onMapLoad={handleMapLoad} center={{ lat: 35.1796, lng: 129.0756 }} zoomLevel={11} />
        {map && (
          <>
            {filteredLineData.length > 0 && <LineComponent map={map} lineData={filteredLineData} />} {/* 필터링된 라인 데이터 전달 */}
            {filteredMarkerData.length > 0 && <MarkerComponent map={map} markerData={filteredMarkerData} />}
          </>
        )}
      </div>
      <InfoPanel markerData={filteredMarkerData} />
    </div>
  );
};

export default MapMain;
