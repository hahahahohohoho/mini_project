import React, { useEffect, useState } from 'react';

const LineComponent = ({ map, lineData }) => {
  const { naver } = window;
  const [routeLines, setRouteLines] = useState([]);

  useEffect(() => {
    if (map && Array.isArray(lineData) && lineData.length > 0) {
      // 이전에 그린 라인이 있다면 제거
      routeLines.forEach(line => line.setMap(null));

      const newRouteLines = lineData.map((line) => {
        const coordinatesString = line.geometry.match(/LINESTRING \(([^)]+)\)/)[1];
        const coordinates = coordinatesString.split(',').map(coord => {
          const [x, y] = coord.trim().split(' ');
          // x, y 값을 lat, lng로 변환해야 할 수도 있음 (여기서는 좌표계가 일치한다고 가정)
          return new naver.maps.LatLng(parseFloat(y), parseFloat(x));
        });

        return new naver.maps.Polyline({
          map: map,
          path: coordinates,
          strokeColor: '#FF9E2C',
          strokeWeight: 5,
        });
      });

      setRouteLines(newRouteLines);

      // Cleanup 라인 설정
      return () => {
        newRouteLines.forEach(line => line.setMap(null));
      };
    }
  }, [map, lineData]);

  return null;
};

export default LineComponent;
