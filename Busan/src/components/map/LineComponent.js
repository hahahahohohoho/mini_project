import React, { useEffect, useRef } from 'react';
import axios from 'axios';

// Tmap API를 위한 axios 인스턴스 생성
const tmapAxios = axios.create({
  baseURL: 'https://apis.openapi.sk.com/tmap/geo',
  headers: {
    accept: 'application/json',
    appKey: 'YEWVxfrK4j8xTNQZURJ4z1Te4JTZs26v45fgmfn7'
  }
});

const katecToLatLng = async (x, y) => {
  try {
    console.log(`Converting KATEC to LatLng: (${x}, ${y})`); // 콘솔 로그: KATEC 좌표 변환 시작
    const response = await tmapAxios.get('/coordconvert', {
      params: {
        version: '1',
        lat: x,
        lon: y,
        fromCoord: 'KATECH',
        toCoord: 'WGS84GEO'
      }
    });
    const lat = parseFloat(response.data.coordinate['lat']);
    const lng = parseFloat(response.data.coordinate['lon']);
    console.log(`Converted LatLng: (${lat}, ${lng})`); // 콘솔 로그: 변환된 LatLng 출력
    return { lat, lng };
  } catch (error) {
    console.error('Error converting coordinates:', error); // 콘솔 로그: 변환 오류
    return null; // 오류 발생 시 null 반환
  }
};

const LineComponent = ({ map, lineData }) => {
  const polylineRef = useRef(null);

  useEffect(() => {
    const convertLineData = async () => {
      if (map && lineData) {
        const naverMaps = window.naver.maps;

        console.log('Starting line data conversion'); // 콘솔 로그: 라인 데이터 변환 시작

        // LINESTRING 데이터를 파싱하여 LatLng 배열로 변환
        const coordinatesPromises = lineData
          .replace('LINESTRING (', '')
          .replace(')', '')
          .split(', ')
          .map(async coord => {
            const [katecX, katecY] = coord.split(' ').map(parseFloat);
            return katecToLatLng(katecX, katecY);
          });

        const coordinates = await Promise.all(coordinatesPromises); // 모든 좌표 변환 완료 대기
        console.log('Converted coordinates:', coordinates); // 콘솔 로그: 변환된 좌표 배열 출력

        // 변환된 좌표 중 null이 아닌 것만 필터링
        const validCoordinates = coordinates.filter(coord => coord !== null);
        console.log('Valid coordinates:', validCoordinates); // 콘솔 로그: 유효한 좌표 배열 출력

        if (validCoordinates.length === 0) {
          console.error("All coordinates are invalid or conversion failed."); // 콘솔 로그: 모든 좌표가 유효하지 않음
          return;
        }

        // // 기존 폴리라인 제거 (필요할 경우)
        // if (polylineRef.current) {
        //   console.log('Removing existing polyline'); // 콘솔 로그: 기존 폴리라인 제거
        //   polylineRef.current.setMap(null);
        // }

        // Polyline 생성
        polylineRef.current = new naverMaps.Polyline({
          map: map,
          path: validCoordinates.map(coord => new naverMaps.LatLng(coord.lat, coord.lng)), // LatLng 객체로 변환
          strokeColor: '#5347AA', // 선 색상 설정 (빨간색)
          strokeWeight: 100, // 선 두께 설정
          strokeOpacity: 1, // 선 불투명도 설정
        });

        console.log("Polyline created:", polylineRef.current); // 콘솔 로그: 폴리라인 생성 완료
      } else {
        console.error("Map or lineData is not defined."); // 콘솔 로그: 맵이나 라인 데이터가 정의되지 않음
      }
    };

    convertLineData(); // 비동기 함수 호출
  }, [map, lineData]); // map과 lineData가 변경될 때만 이 useEffect 훅이 실행됨

  return null; // 이 컴포넌트는 UI를 렌더링하지 않으므로 null 반환
};

export default LineComponent;
