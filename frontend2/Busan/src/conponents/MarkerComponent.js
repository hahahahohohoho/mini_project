// src/components/MarkerComponent.js
import React, { useEffect } from 'react';

const MarkerComponent = ({ map }) => {
  const {naver} = window;
  useEffect(() => {
    if (map) {
      fetch('/sight.json')
        .then((response) => response.json())
        .then((data) => {
          const markers = data.map((location) => {
            const point = location.point.match(/POINT \(([^ ]+) ([^ ]+)\)/);
            if (point) {
              const lng = parseFloat(point[1]);
              const lat = parseFloat(point[2]);
              const sight_title = location.sight_title;
              const main_img_t = location.main_img_t;

              const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(lat, lng),
                map: map,
                sight_title: sight_title,
              });

              const infoWindow = new naver.maps.InfoWindow({
                content: `
                  <div style="width:200px;text-align:center;padding:10px;">
                    <h4>${sight_title}</h4>
                    <img src = ${main_img_t}></img>
                  </div>
                `,
              });

              naver.maps.Event.addListener(marker, 'click', () => {
                infoWindow.open(map, marker);
              });

              return marker;
            }
            return null;
          }).filter(marker => marker !== null);

          // 기존 마커를 모두 지우고 새로운 마커로 대체
          markers.forEach(marker => marker.setMap(map));
        })
        .catch((error) => console.error('Error fetching sight data:', error));
    }
  }, [map]);

  return null;
};

export default MarkerComponent;
