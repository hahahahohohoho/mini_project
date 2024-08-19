import React, { useEffect, useRef } from 'react';

const LineComponent = ({ map, lineData }) => {
  const polylineRef = useRef([]); // 각 폴리라인을 참조하기 위한 useRef 훅
  const { naver } = window; // 네이버 지도 API 객체를 window에서 가져옴

  // grade에 따른 색상 딕셔너리
  const gradeColors = {
    1: '#FF0000', // 빨간색
    2: '#FF7F00', // 주황색
    3: '#FFFF00', // 노란색
    4: '#00FF00', // 녹색
    5: '#0000FF', // 파란색
  };

  useEffect(() => {
    const convertLineData = async () => {
      if (map && lineData && Array.isArray(lineData)) { // lineData가 배열인지 확인

        // 기존 폴리라인 제거 (필요할 경우)
        polylineRef.current.forEach(polyline => polyline.setMap(null)); // 기존 폴리라인을 지도에서 제거
        polylineRef.current = []; // 참조 배열 초기화

        for (const line of lineData) {
          const { geometry, grade } = line; // geometry와 grade를 추출
          const strokeColor = gradeColors[grade] || '#D3D3D3'; // grade에 따른 색상 설정
          // LINESTRING 데이터를 파싱하여 LatLng 배열로 변환
          const coordinates = geometry
            .replace('LINESTRING (', '') // 'LINESTRING (' 부분 제거
            .replace(')', '') // ')' 부분 제거
            .split(', ') // ', '로 좌표 구분
            .map(coord => {
              const [X, Y] = coord.split(' ').map(parseFloat); // 좌표 문자열을 숫자로 변환
              return [Y, X]; // 좌표 배열 반환 (위도(Y), 경도(X) 순서로)
            })
            .filter(coord => !isNaN(coord[0]) && !isNaN(coord[1])); // 유효한 좌표만 필터링
          if (coordinates.length === 0) {
            console.error("All coordinates are invalid or conversion failed."); // 모든 좌표가 유효하지 않으면 오류 로그 출력
            continue; // 다음 라인으로 이동
          }

          // Polyline 생성
          const polyline = new naver.maps.Polyline({
            map: map,
            path: coordinates.map(coord => new naver.maps.LatLng(coord[0], coord[1])), // 위도(Y), 경도(X) 순서로 LatLng 객체 생성
            strokeColor: strokeColor,
            strokeWeight: 3,
            strokeOpacity: 1,
            strokeStyle: 'solid'
          });

          polylineRef.current.push(polyline); // 생성된 폴리라인을 참조 배열에 추가
        }

      } else {
        console.error("Map or lineData is not defined."); // 맵이나 라인 데이터가 정의되지 않았을 때 오류 로그 출력
      }
    };

    convertLineData(); // 비동기 함수 호출
  }, [map, lineData, naver]); // map과 lineData가 변경될 때만 이 useEffect 훅이 실행됨

  return null; // 이 컴포넌트는 UI를 렌더링하지 않으므로 null 반환
};

export default LineComponent;
