// src/components/MarkerComponent.js
import React, { useEffect, useState } from 'react';

const MarkerComponent = ({ map, markerData }) => {
  const { naver } = window;
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map && markerData.length > 0) {
      // 기존의 마커 삭제
      markers.forEach(marker => marker.setMap(null));

      // 새로운 마커 추가
      const newMarkers = markerData.map((location) => {
        const pointMatch = location.point.match(/POINT \(([^ ]+) ([^ ]+)\)/);
        if (pointMatch) {
          const lng = parseFloat(pointMatch[1]);
          const lat = parseFloat(pointMatch[2]);

          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng),
            map: map,
            title: location.title,
          });

          return marker;
        }
        return null;
      }).filter(marker => marker !== null);

      setMarkers(newMarkers);
    }
  }, [map, markerData]);

  return null;
};

export default MarkerComponent;
