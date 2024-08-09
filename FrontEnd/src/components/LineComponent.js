// src/components/LineComponent.js
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';

// UTM-K to WGS84 변환 함수
const utmkToWgs84 = (x, y) => {
  proj4.defs([
    [
      'EPSG:5179',
      '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs',
    ],
    [
      'EPSG:4326',
      '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees',
    ],
  ]);
  const [lng, lat] = proj4('EPSG:5179', 'EPSG:4326', [x, y]);
  return { lat, lng };
};

// 등급별 색상 설정 함수
const getGradeColor = (grade) => {
  switch (grade) {
    case '1':
      return '#FF0000'; // 빨강
    case '2':
      return '#00FF00'; // 초록
    case '3':
      return '#0000FF'; // 파랑
    case '4':
      return '#FFFF00'; // 노랑
    case '5':
      return '#FFA500'; // 주황
    default:
      return '#000000'; // 검정
  }
};

const LineComponent = ({ map, lineData }) => {
  const { naver } = window;
  const [roadLines, setRoadLines] = useState([]);

  const displayRoadLines = (lines) => {
    // 기존의 라인 지우기
    roadLines.forEach(line => line.setMap(null));

    const newRoadLines = lines.map((line) => {
      const polyline = new naver.maps.Polyline({
        map: map,
        path: line.coords,
        strokeColor: getGradeColor(line.grade),
        strokeWeight: 3,
      });
      return polyline;
    });

    setRoadLines(newRoadLines);
  };

  useEffect(() => {
    if (map) {
      // road.json에서 LINESTRING 경로를 지도에 표시
      const roadCoords = lineData.map((road) => {
        const lineMatch = road.geometry.match(/LINESTRING \(([^)]+)\)/);
        if (lineMatch) {
          const lineString = lineMatch[1];
          const coords = lineString.split(', ').map(point => {
            const [x, y] = point.split(' ').map(coord => parseFloat(coord));
            const { lat, lng } = utmkToWgs84(x, y);
            return new naver.maps.LatLng(lat, lng);
          });
          return { coords, grade: road.grade };
        }
        return null;
      }).filter(line => line !== null);

      console.log('Processed road coordinates:', roadCoords); // 디버그 정보 추가

      displayRoadLines(roadCoords);
    }
  }, [map, lineData]);

  return null;
};

export default LineComponent;
