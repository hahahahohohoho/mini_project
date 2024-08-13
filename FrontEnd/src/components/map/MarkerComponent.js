import React, { useEffect, useState } from 'react';

const MarkerComponent = ({ map, markerData }) => {
  const { naver } = window; // naver 지도 객체를 window에서 가져옵니다.
  const [infoWindows, setInfoWindows] = useState([]);

  useEffect(() => {
    if (map) { // 지도 객체가 준비되었는지 확인
      const newInfoWindows = [];
      const markers = markerData.map((location) => {
        // 좌표 정보를 파싱
        const pointMatch = location.point ? location.point.match(/POINT \(([^ ]+) ([^ ]+)\)/) : null;
        if (pointMatch) {
          const lng = parseFloat(pointMatch[1]); // 경도 추출
          const lat = parseFloat(pointMatch[2]); // 위도 추출
          const title = location.title;
          const img2 = location.img2;
          // 마커 생성
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng), // 마커 위치 설정
            map: map, // 마커가 표시될 지도 객체
            title: title, // 마커의 타이틀 설정
          });

          const infoWindow = new naver.maps.InfoWindow({
            content: `
              <div style="width:150px;text-align:center;padding:5px;">
                <h4>${title}</h4>
                <img src=${img2} alt="${title}" style="width:100%;"/>
              </div>
            `,
          });

          newInfoWindows.push(infoWindow);

          naver.maps.Event.addListener(marker, 'click', () => {
            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              infoWindow.open(map, marker);
            }
          });

          return marker;
        }
        return null;
      }).filter(marker => marker !== null);

      setInfoWindows(newInfoWindows);

      // 컴포넌트 언마운트 시 또는 markerData가 변경될 때 마커를 제거하는 정리 작업
      return () => {
        markers.forEach(marker => marker.setMap(null)); // 모든 마커를 지도에서 제거
      };
    }
  }, [map, markerData]); // map과 markerData가 변경될 때만 이 useEffect 훅이 실행됨

  return null; // 이 컴포넌트는 UI를 렌더링하지 않으므로 null 반환
};

export default MarkerComponent;