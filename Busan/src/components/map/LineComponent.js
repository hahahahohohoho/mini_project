import React, { useEffect, useRef } from 'react';

// 네이버 지도에 라인을 그리는 컴포넌트
const LineComponent = ({ map, lineData }) => {
  const polylineRef = useRef([]); // 각 폴리라인을 참조하기 위한 useRef 훅
  const { naver } = window; // window 객체에서 네이버 지도 API 가져오기

  // grade에 따른 색상 딕셔너리
  const gradeColors = {
    1: '#FF0000', // 빨간색
    2: '#FF7F00', // 주황색
    3: '#FFFF00', // 노란색
    4: '#00FF00', // 녹색
    5: '#0000FF', // 파란색
  };

  useEffect(() => {
    // 라인 데이터를 지도에 그리기 위한 비동기 함수
    const convertLineData = async () => {
      if (map && lineData && Array.isArray(lineData)) { // lineData가 배열인지 확인
        console.log('Starting line data conversion'); // 라인 데이터 변환 시작 로그

        // 기존 폴리라인 제거 (필요할 경우)
        polylineRef.current.forEach(polyline => polyline.setMap(null)); // 기존 폴리라인을 지도에서 제거
        polylineRef.current = []; // 참조 배열 초기화

        // 각 라인 데이터를 순회하면서 폴리라인 생성
        for (const line of lineData) {
          const { geometry, GRADE } = line; // geometry와 grade를 추출

          // grade에 따른 색상 설정
          const strokeColor = gradeColors[GRADE] || '#000000'; // grade에 해당하는 색상 또는 기본 색상(검정색)

          // LINESTRING 데이터를 파싱하여 LatLng 배열로 변환
          const coordinatesPromises = geometry
            .replace('LINESTRING (', '') // 'LINESTRING (' 부분 제거
            .replace(')', '') // ')' 부분 제거
            .split(', ') // ', '로 좌표 구분
            .map(async coord => {
              const [Y, X] = coord.split(' ').map(parseFloat); // 좌표 문자열을 숫자로 변환
              return [X, Y]; // 좌표 배열 반환 (X, Y 순서)
            });

          const coordinates = await Promise.all(coordinatesPromises); // 모든 좌표 변환이 완료될 때까지 대기

          // 변환된 좌표 중 null이 아닌 것만 필터링
          const validCoordinates = coordinates.filter(coord => coord !== null); 
          console.log('Valid coordinates:', validCoordinates); // 유효한 좌표 배열 출력 로그

          if (validCoordinates.length === 0) {
            console.error("All coordinates are invalid or conversion failed."); // 모든 좌표가 유효하지 않으면 오류 로그 출력
            continue; // 다음 라인으로 이동
          }

          // Polyline 생성
          const polyline = new naver.maps.Polyline({
            map: map, // 폴리라인을 표시할 지도 객체
            path: validCoordinates.map(coord => new naver.maps.LatLng(coord[0], coord[1])), // 변환된 좌표로 경로 설정
            strokeColor: strokeColor, // grade에 따른 선 색상 설정
            strokeWeight: 3, // 선 두께 설정
            strokeOpacity: 1, // 선 불투명도 설정
            strokeStyle: 'solid' // 선 스타일 설정 (solid)
          });

          polylineRef.current.push(polyline); // 생성된 폴리라인을 참조 배열에 추가
        }

        console.log("Polylines created:", polylineRef.current); // 폴리라인 생성 완료 로그
      } else {
        console.error("Map or lineData is not defined."); // 맵이나 라인 데이터가 정의되지 않았을 때 오류 로그 출력
      }
    };

    convertLineData(); // 비동기 함수 호출
  }, [map, lineData, naver]); // map과 lineData가 변경될 때만 이 useEffect 훅이 실행됨

  return null; // 이 컴포넌트는 UI를 렌더링하지 않으므로 null 반환
};

export default LineComponent;
