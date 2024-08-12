import React, { useEffect, useState } from 'react';

const MarkerComponent = ({ map, markerData, onMarkerClick }) => {
  const { naver } = window;
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map && markerData.length > 0) {
      // 기존 마커 삭제
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

          naver.maps.Event.addListener(marker, 'click', () => {
            onMarkerClick(location);
          });

          return marker;
        }
        return null;
      }).filter(marker => marker !== null);

      setMarkers(newMarkers);
    }
    // 마커들이 맵을 움직일 때 사라지지 않도록 의존성 배열에 markerData만 포함
  }, [markerData]);

  return null;
};

export default MarkerComponent;
