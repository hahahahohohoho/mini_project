import React, { useRef, useEffect, useState } from 'react';

const MapComponent = ({ onMapLoad, center, zoomLevel }) => {
  const mapElement = useRef(null); // 지도를 렌더링할 HTML 요소를 참조하는 ref
  const [map, setMap] = useState(null); // 네이버 지도 객체를 상태로 관리
  const { naver } = window; // window 객체에서 네이버 지도 API를 가져옴
  const busanCenter = new naver.maps.LatLng(35.1796, 129.0756); // 부산의 초기 중심 좌표 설정

  // 초기 지도를 설정하는 useEffect 훅
  useEffect(() => {
    // mapElement가 존재하고, 아직 map이 설정되지 않은 경우에만 실행
    if (mapElement.current && !map) {
      // 새로운 지도 객체 생성
      const newMap = new naver.maps.Map(mapElement.current, {
        center: busanCenter, // 초기 중심 좌표를 부산으로 설정
        zoom: 10, // 초기 줌 레벨 설정
      });
      setMap(newMap); // map 상태에 새로운 지도 객체 저장
      onMapLoad(newMap); // 부모 컴포넌트에 지도 객체를 전달
    }
  }, [mapElement, map, onMapLoad]); // mapElement, map, onMapLoad가 변경될 때마다 이 훅이 실행됨

  // 지도 중심과 줌 레벨을 업데이트하는 useEffect 훅
  useEffect(() => {
    // map 객체와 center가 존재할 때 실행
    if (map && center) {
      const newCenter = new naver.maps.LatLng(center.lat, center.lng); // 새로운 중심 좌표 설정
      map.setCenter(newCenter); // 지도 중심을 새로 설정된 좌표로 이동
      if (zoomLevel) {
        map.setZoom(zoomLevel); // 줌 레벨이 제공된 경우 지도 줌 레벨을 설정
      }
    }
  }, [map, center, zoomLevel]); // map, center, zoomLevel이 변경될 때마다 이 훅이 실행됨

  return <div ref={mapElement} style={{ width: '100%', height: '87%' }} />; // 지도를 렌더링할 div 요소 반환
};

export default MapComponent;
