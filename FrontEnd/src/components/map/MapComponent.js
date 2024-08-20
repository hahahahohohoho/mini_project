import React, { useRef, useEffect, useState } from 'react';

const MapComponent = ({ onMapLoad, center, zoomLevel }) => {
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const { naver } = window;

  useEffect(() => {
    if (mapElement.current && !map) {
      const newMap = new naver.maps.Map(mapElement.current, {
        center: new naver.maps.LatLng(center.lat, center.lng), // 초기 중심을 prop에서 가져옴
        zoom: zoomLevel || 10, // 초기 줌 레벨 설정
      });
      setMap(newMap);
      onMapLoad(newMap); // 지도 객체를 부모 컴포넌트로 전달
    }
  }, [mapElement, map, onMapLoad, center, zoomLevel]); // center와 zoomLevel도 의존성에 추가

  useEffect(() => {
    if (map && center) {
      const newCenter = new naver.maps.LatLng(center.lat, center.lng);
      map.setCenter(newCenter);
      if (zoomLevel) {
        map.setZoom(zoomLevel);
      }
    }
  }, [map, center, zoomLevel]);

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default MapComponent;
