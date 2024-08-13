import React, { useEffect } from 'react';

const LineComponent = ({ map, lineData }) => {
  const { naver } = window;

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

      // Polyline 생성
      const polyline = new naver.maps.Polyline({
        map: map,
        path: coordinates, // 파싱된 LatLng 배열 설정
        strokeColor: '#FF0000', // 선 색상 설정 (빨간색)
        strokeWeight: 5, // 선 두께 설정
        strokeOpacity: 1, // 선 불투명도 설정
      });

      // 컴포넌트 언마운트 시 또는 lineData가 변경될 때 Polyline을 제거하는 정리 작업
      return () => {
        polyline.setMap(null); // 지도에서 라인 제거
      };
    }
  }, [map, lineData]); // map과 lineData가 변경될 때만 이 useEffect 훅이 실행됨

  return null; // 이 컴포넌트는 UI를 렌더링하지 않으므로 null 반환
};

export default LineComponent;
