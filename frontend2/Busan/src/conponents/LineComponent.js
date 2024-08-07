// src/components/LineComponent.js
import React, { useEffect } from 'react';

const LineComponent = ({ map }) => {
  const {naver} = window;
  useEffect(() => {
    if (map) {
      fetch('/road.json')
        .then((response) => response.json())
        .then((data) => {
          const lines = data.map((location) => {
            if (location.geometry) {
              const lineString = location.geometry.match(/LINESTRING \(([^)]+)\)/)[1];
              const path = lineString.split(', ').map(point => {
                const [lng, lat] = point.split(' ').map(coord => parseFloat(coord));
                return new naver.maps.LatLng(lat, lng);
              });

              const polyline = new naver.maps.Polyline({
                map: map,
                path: path,
                strokeColor: '#5347AA',
                strokeWeight: 5
              });

              return polyline;
            }
            return null;
          }).filter(line => line !== null);

          // 기존 경로를 모두 지우고 새로운 경로로 대체
          lines.forEach(line => line.setMap(map));
        })
        .catch((error) => console.error('Error fetching sight data:', error));
    }
  }, [map]);

  return null;
};

export default LineComponent;
