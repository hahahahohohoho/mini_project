import React, { useEffect } from 'react';

const LineComponent = ({ map, lineData }) => {
  const { naver } = window;
  const polylineRef = React.useRef(null);

  useEffect(() => {
    if (map && lineData) {
      // LINESTRING 데이터를 파싱하여 LatLng 배열로 변환
      const coordinates = lineData
        .replace('LINESTRING (', '')
        .replace(')', '')
        .split(', ')
        .map(coord => {
          const [lng, lat] = coord.split(' ').map(parseFloat);
          return new naver.maps.LatLng(lat, lng); // naver.maps.LatLng 객체로 변환
        });

      console.log("Parsed coordinates:", coordinates); // 좌표 배열 확인

      if (!coordinates || coordinates.length === 0) {
        console.error("Coordinates are empty or invalid.");
        return;
      }

      // 기존 폴리라인 제거 (필요할 경우)
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
     

      // Polyline 생성
      polylineRef.current = new naver.maps.Polyline({
        map: map,
        path: coordinates, // 파싱된 LatLng 배열 설정
        // strokeColor: '#FF0000', // 선 색상 설정 (빨간색)
        // strokeWeight: 14, // 선 두께 설정
        // strokeOpacity: 1, // 선 불투명도 설정
      });

      console.log("Polyline created:", polylineRef.current);

      // 컴포넌트 언마운트 시 또는 lineData가 변경될 때 Polyline을 제거하는 정리 작업
      return () => {
        if (polylineRef.current) {
          polylineRef.current.setMap(null); // 지도에서 폴리라인 제거
        }
      };
    } else {
      console.error("Map or lineData is not defined.");
    }
  }, [map, lineData]); // map과 lineData가 변경될 때만 이 useEffect 훅이 실행됨

  return null; // 이 컴포넌트는 UI를 렌더링하지 않으므로 null 반환
};

export default LineComponent;