import React, { useEffect, useState } from 'react';

const MarkerComponent = ({ map, markerData }) => {
  const { naver } = window; // naver 지도 객체를 window에서 가져옵니다.
  const [infoWindows, setInfoWindows] = useState([]);
  const [markers, setMarkers] = useState([]); // 현재 표시된 마커들을 관리하는 상태

  useEffect(() => {
    if (map) { // 지도 객체가 준비되었는지 확인
      // 이전 마커와 InfoWindow 제거
      markers.forEach(marker => marker.setMap(null)); // 지도에서 마커 제거
      infoWindows.forEach(infoWindow => infoWindow.close()); // 모든 InfoWindow 닫기

      const newMarkers = [];
      const newInfoWindows = [];

      markerData.forEach((location) => {
        let lng, lat;

        // 좌표 정보를 파싱
        if (location.point) { // 기존 POINT 형식의 데이터를 처리
          const pointMatch = location.point.match(/POINT \(([^ ]+) ([^ ]+)\)/);
          if (pointMatch) {
            lng = parseFloat(pointMatch[1]); // 경도 추출
            lat = parseFloat(pointMatch[2]); // 위도 추출
          }
        } else if (location.WKT) { // 식당 데이터에서 WKT 형식의 데이터를 처리
          const wktMatch = location.WKT.match(/POINT \(([^ ]+) ([^ ]+)\)/);
          if (wktMatch) {
            lng = parseFloat(wktMatch[1]); // 경도 추출
            lat = parseFloat(wktMatch[2]); // 위도 추출
          }
        }

        if (lng !== undefined && lat !== undefined) {
          const title = location.title || location.name; // 제목 설정 (name 필드는 식당 데이터에서 사용 가능)
          const img2 = location.img2 || location.main_img_t; // 이미지 설정 (imageUrl 필드는 식당 데이터에서 사용 가능)

          // 마커 생성
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng), // 마커 위치 설정
            map: map, // 마커가 표시될 지도 객체
            title: title, // 마커의 타이틀 설정
          });

          // 정보창 생성
          const infoWindow = new naver.maps.InfoWindow({
            content: `
              <div style="width:150px;text-align:center;padding:5px;">
                <h4>${title}</h4>
                <img src=${img2} alt="${title}" style="width:100%;" onError="this.onerror=null; this.src='';"/>
              </div>
            `,
          });

          newInfoWindows.push(infoWindow);
          newMarkers.push(marker);

          // 마커 클릭 이벤트 설정
          naver.maps.Event.addListener(marker, 'click', () => {
            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              infoWindow.open(map, marker);
            }
          });
        }
      });

      // 새로 생성된 마커와 InfoWindow를 상태로 저장
      setMarkers(newMarkers);
      setInfoWindows(newInfoWindows);

      // 컴포넌트 언마운트 시 또는 markerData가 변경될 때 마커와 InfoWindow를 제거하는 정리 작업
      return () => {
        newMarkers.forEach(marker => marker.setMap(null)); // 모든 마커를 지도에서 제거
        newInfoWindows.forEach(infoWindow => infoWindow.close()); // 모든 InfoWindow 닫기
      };
    }
  }, [map, markerData]); // map과 markerData가 변경될 때만 이 useEffect 훅이 실행됨

  return null; // 이 컴포넌트는 UI를 렌더링하지 않으므로 null 반환
};

export default MarkerComponent;
