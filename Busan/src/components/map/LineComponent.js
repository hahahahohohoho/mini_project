import React, { useEffect, useRef } from 'react';
import axios from 'axios';

// 네이버 지도에 라인을 그리는 컴포넌트
const LineComponent = ({ map, lineData }) => {
  const polylineRef = useRef(null); // 폴리라인을 참조하기 위한 useRef 훅
  const { naver } = window; // window 객체에서 네이버 지도 API 가져오기
  
  useEffect(() => {
    // 라인 데이터를 지도에 그리기 위한 비동기 함수
    const convertLineData = async () => {
      if (map && lineData) {
        console.log('Starting line data conversion'); // 라인 데이터 변환 시작 로그
        
        // LINESTRING 데이터를 파싱하여 LatLng 배열로 변환
        const coordinatesPromises = lineData
          .replace('LINESTRING (', '') // 'LINESTRING (' 부분 제거
          .replace(')', '') // ')' 부분 제거
          .split(', ') // ', '로 좌표 구분
          .map(async coord => {
            const [Y, X] = coord.split(' ').map(parseFloat) // 좌표 문자열을 숫자로 변환
            // console.log("adaasd",coord)
            // console.log("ss",Y,X)
            return [X, Y] // KATEC 좌표를 WGS84 좌표로 변환
          });
   
        const coordinates = await Promise.all(coordinatesPromises); // 모든 좌표 변환이 완료될 때까지 대기

        // 변환된 좌표 중 null이 아닌 것만 필터링
        const validCoordinates = coordinates.filter(coord => coord !== null); 
        console.log('Valid coordinates:', validCoordinates); // 유효한 좌표 배열 출력 로그

        if (validCoordinates.length === 0) {
          console.error("All coordinates are invalid or conversion failed."); // 모든 좌표가 유효하지 않으면 오류 로그 출력
          return;
        }
        
        // 기존 폴리라인 제거 (필요할 경우)
        if (polylineRef.current) {
          console.log('Removing existing polyline'); // 기존 폴리라인 제거 로그
          polylineRef.current.setMap(null);
        }
        const pathlist = validCoordinates.map(coord => new naver.maps.LatLng(coord[0], coord[1]))
        console.log(pathlist)
        // Polyline 생성
        polylineRef.current = new naver.maps.Polyline({
          map: map, // 폴리라인을 표시할 지도 객체
          path: pathlist, // 변환된 좌표로 경로 설정
          strokeColor: '#000000', // 선 색상 설정
          strokeWeight: 3, // 선 두께 설정 - 값 줄임
          strokeOpacity: 1, // 선 불투명도 설정
          strokeStyle: 'solid' // 선 스타일 설정 (solid)
          
        });
        
        console.log("Polyline created:", polylineRef.current); // 폴리라인 생성 완료 로그
      } else {
        console.error("Map or lineData is not defined."); // 맵이나 라인 데이터가 정의되지 않았을 때 오류 로그 출력
      }
    };

    convertLineData(); // 비동기 함수 호출
  }, [map, lineData, naver]); // map과 lineData가 변경될 때만 이 useEffect 훅이 실행됨

  return null; // 이 컴포넌트는 UI를 렌더링하지 않으므로 null 반환
};

export default LineComponent;
