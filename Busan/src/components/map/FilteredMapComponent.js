// src/components/FilteredMapComponent.js
import React, { useEffect, useState } from 'react';

const FilteredMapComponent = ({ map, markerData, lineData, currentPosition }) => {
  const { naver } = window;
  const [currentMarker, setCurrentMarker] = useState(null);
  const [infoWindows, setInfoWindows] = useState([]);
  const [routeLine, setRouteLine] = useState(null);

  useEffect(() => {
    if (map && currentPosition) {
      // 현재 위치 마커 추가
      const currentPosLatLng = new naver.maps.LatLng(currentPosition.lat, currentPosition.lng);

      if (currentMarker) {
        currentMarker.setPosition(currentPosLatLng);
      } else {
        const marker = new naver.maps.Marker({
          position: currentPosLatLng,
          map: map,
          title: '현재 위치',
        });
        setCurrentMarker(marker);
      }
    }
  }, [map, currentPosition, currentMarker]);

  useEffect(() => {
    if (map) {
      // 마커 추가
      const newInfoWindows = [];
      const markers = markerData.map((location) => {
        const pointMatch = location.point ? location.point.match(/POINT \(([^ ]+) ([^ ]+)\)/) : null;
        if (pointMatch) {
          const lng = parseFloat(pointMatch[1]);
          const lat = parseFloat(pointMatch[2]);
          const title = location.title;
          const img2 = location.img2;

          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng),
            map: map,
            title: title,
          });

          const infoWindow = new naver.maps.InfoWindow({
            content: `
              <div style="width:200px;text-align:center;padding:10px;">
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

      // 경로 추가
      if (currentPosition && markerData.length > 0) {
        const currentPosLatLng = new naver.maps.LatLng(currentPosition.lat, currentPosition.lng);
        const searchCenterLatLng = new naver.maps.LatLng(markerData[0].lat, markerData[0].lng);

        if (routeLine) {
          routeLine.setMap(null);
        }
        const newRouteLine = new naver.maps.Polyline({
          map: map,
          path: [currentPosLatLng, searchCenterLatLng],
          strokeColor: '#5347AA',
          strokeWeight: 5,
        });
        setRouteLine(newRouteLine);
      }

      // 이전 마커와 경로 제거
      return () => {
        markers.forEach(marker => marker.setMap(null));
      };
    }
  }, [map, markerData, lineData, currentPosition]);

  return null;
};

export default FilteredMapComponent;