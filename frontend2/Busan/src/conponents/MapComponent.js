// src/components/MapComponent.js
import React, { useRef, useEffect, useState } from 'react';

const MapComponent = ({ onMapLoad }) => {
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const { naver } = window;

  // 부산의 좌표
  const addressX = 129.0756416; // 경도
  const addressY = 35.1795543; // 위도

  useEffect(() => {
    if (mapElement.current && !map) {
      const newMap = new naver.maps.Map(mapElement.current, {
        center: new naver.maps.LatLng(addressY, addressX),
        zoom: 12,
      });
      setMap(newMap);
      onMapLoad(newMap); // 지도 객체를 부모 컴포넌트로 전달
    }
  }, [mapElement, map, addressX, addressY, onMapLoad]);

  return <div ref={mapElement} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
