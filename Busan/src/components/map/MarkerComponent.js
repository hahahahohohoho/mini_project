// src/components/MarkerComponent.js
import React, { useEffect, useState } from 'react';

const MarkerComponent = ({ map, markerData }) => {
  const { naver } = window;
  const [infoWindows, setInfoWindows] = useState([]);

  useEffect(() => {
    if (map) {
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

      // Cleanup markers when the component unmounts or markerData changes
      return () => {
        markers.forEach(marker => marker.setMap(null));
      };
    }
  }, [map, markerData]);

  return null;
};

export default MarkerComponent;
