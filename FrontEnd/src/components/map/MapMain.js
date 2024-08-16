import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import MarkerComponent from './MarkerComponent';
import SearchComponent from './SearchComponent';
import axios from '../../axios';
import LineComponent from './LineComponent';

const MapMain = () => {
  const [map, setMap] = useState(null); // 네이버 지도 객체를 관리하는 상태
  const [markerData, setMarkerData] = useState([]); // 모든 마커 데이터를 저장하는 상태
  const [filteredMarkerData, setFilteredMarkerData] = useState([]); // 필터링된 마커 데이터를 저장하는 상태
  const { naver } = window; // naver 객체를 window에서 가져옴 (네이버 지도 API 사용)
  const lineString = "LINESTRING (494574.14525293617 278842.4106379978, 494574.2871565765 278842.421066954, 494605.4818847798 278844.3251714521, 494634.92758189834 278846.122664924, 494661.8761756725 278847.76819719985)";

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

  // 컴포넌트 마운트 시 초기 데이터를 로드하는 useEffect 훅
  useEffect(() => {
    // 초기에는 마커를 로드하지 않음.
  }, []); // 빈 배열을 의존성으로 사용하여 최초 렌더링 시 한 번만 실행

  return (
    <div className="w-full h-full">
      {/* 검색 컴포넌트 (카테고리와 구/군 선택) */}
      <SearchComponent onSearch={handleSearch} />
      {/* 지도 컴포넌트 */}
      <MapComponent onMapLoad={handleMapLoad} center={{ lat: 35.1796, lng: 129.0756 }} zoomLevel={11} />
      {/* 지도에 라인을 표시 */}
      {map && (
        <>
          <LineComponent map={map} lineData={lineString} />
          {/* 검색을 통해서만 마커가 렌더링 되도록 설정 */}
          {filteredMarkerData.length > 0 && <MarkerComponent map={map} markerData={filteredMarkerData} />}
        </>
      )}
    </div>
  );
};

export default MapMain;