// src/components/MapComponent.js
import React, { useRef, useEffect, useState } from 'react';

const MapComponent = ({ onMapLoad, center, zoomLevel }) => {
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const { naver } = window;
  const busanCenter = new naver.maps.LatLng(35.1796, 129.0756); // 부산 좌표

  useEffect(() => {
    if (mapElement.current && !map) {
      const newMap = new naver.maps.Map(mapElement.current, {
        center: busanCenter, // 부산을 초기 중심으로 설정
        zoom: 10,
      });
      setMap(newMap);
      onMapLoad(newMap); // 지도 객체를 부모 컴포넌트로 전달
    }
  }, [mapElement, map, onMapLoad]);

  useEffect(() => {
    if (map && center) {
      const newCenter = new naver.maps.LatLng(center.lat, center.lng);
      map.setCenter(newCenter);
      if (zoomLevel) {
        map.setZoom(zoomLevel);
      }
    }
  }, [map, center, zoomLevel]);

  return <div ref={mapElement} style={{ width: '75%', height: '95%' }} />;
};

export default MapComponent;