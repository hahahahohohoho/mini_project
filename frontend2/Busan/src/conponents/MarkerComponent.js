// src/components/MarkerComponent.js
import React, { useEffect, useState } from 'react';

const MarkerComponent = ({ map }) => {
  const {naver} = window;
  const [infoWindows, setInfoWindows] = useState([]);

  useEffect(() => {
    if (map) {
      fetch('/sight (1).json')
        .then((response) => response.json())
        .then((data) => {
          const newInfoWindows = [];

          const markers = data.map((location, index) => {
            const point = location.point.match(/POINT \(([^ ]+) ([^ ]+)\)/);
            if (point) {
              const lng = parseFloat(point[1]);
              const lat = parseFloat(point[2]);
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
                    <img src=${img2}/>
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
        })
        .catch((error) => console.error('Error fetching sight data:', error));
    }
  }, [map]);

  return null;
};

export default MarkerComponent;
