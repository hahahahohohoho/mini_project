import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import MarkerComponent from './MarkerComponent';
import SearchComponent from './SearchComponent';
import LineComponent from './LineComponent';
import InfoPanel from '../info/InfoPanel';  // InfoPanel 컴포넌트 추가
import axios from '../../axios';
const MapMain = () => {
  const [map, setMap] = useState(null); // 네이버 지도 객체를 관리하는 상태
  const [markerData, setMarkerData] = useState([]); // 모든 마커 데이터를 저장하는 상태
  const [filteredMarkerData, setFilteredMarkerData] = useState([]); // 필터링된 마커 데이터를 저장하는 상태
  const { naver } = window; // naver 객체를 window에서 가져옴 (네이버 지도 API 사용)
  const lineString = "LINESTRING (129.03470525344528 35.10391678387709, 129.03475810896123 35.10391676936382, 129.0349571413246 35.10392724243077, 129.0352202401185 35.103941086464594)";

  // 지도 로드 완료 시 호출되는 함수
  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance); // 지도 객체를 상태로 저장
  };

  // 선택된 카테고리에 따라 마커 데이터를 가져오는 함수
  const fetchMarkerData = async (category) => {
    try {
      let response;
      if (category === '식당') {
        response = await axios.get('/restaurant'); // 식당 데이터를 서버에서 가져옴
      } else if(category === '명소'){
        response = await axios.get('/sight'); // 명소 데이터를 서버에서 가져옴
      }
      return response.data; // 데이터를 반환
    } catch (error) {
      console.error('Error fetching marker data:', error); // 데이터 로드 중 오류 발생 시 로그 출력
      return [];
    }
  };

  // 검색 시 호출되는 함수 (구/군과 카테고리를 받아 필터링 수행)
  const handleSearch = async (district, category) => {
    const data = await fetchMarkerData(category); // 선택된 카테고리에 따라 데이터를 가져옴
    setMarkerData(data); // 가져온 데이터를 markerData 상태에 저장

    const filtered = data.filter(location => 
      location.address.includes(district) // 선택된 구/군에 해당하는 데이터 필터링
    );
    setFilteredMarkerData(filtered); // 필터링된 데이터를 상태에 저장
    
    if(map){
      if (filtered.length > 0) { // 필터링된 데이터가 존재할 경우
        const bounds = new naver.maps.LatLngBounds(); // 지도에 표시할 범위를 계산하기 위한 객체
        filtered.forEach(location => {
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
          <LineComponent map={map} lineData={lineString} />
          {filteredMarkerData.length > 0 && <MarkerComponent map={map} markerData={filteredMarkerData} />}
        </>
      )}
    </div>
    <InfoPanel markerData={filteredMarkerData} />
  </div>
  );
};

export default MapMain;
