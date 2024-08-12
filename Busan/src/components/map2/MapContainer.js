import React, { useEffect, useRef, useState } from 'react';
import axios from '../../axios';

function MapContainer() {
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const [sightData, setSightData] = useState([]);
  const [roadData, setRoadData] = useState(null);
const {naver} = window;
  useEffect(() => {
    // 지도 초기화
    const mapOptions = {
      center: new naver.maps.LatLng(35.1795543, 129.0756416), // 부산 시청 좌표
      zoom: 12,
    };
    const naverMap = new naver.maps.Map(mapElement.current, mapOptions);
    setMap(naverMap);
  }, []);

  useEffect(() => {
    if (map) {
      // sight 데이터 가져오기
      axios.get('/sight')
        .then(response => {
          setSightData(response.data);
        })
        .catch(error => {
          console.error("Sight 데이터를 가져오는데 실패했습니다.", error);
        });

      // road 데이터 가져오기
      axios.get('/road')
        .then(response => {
          setRoadData(response.data);
        })
        .catch(error => {
          console.error("Road 데이터를 가져오는데 실패했습니다.", error);
        });
    }
  }, [map]);

  useEffect(() => {
    if (map && sightData.length > 0) {
      sightData.forEach(sight => {
        const position = new naver.maps.LatLng(
          parseFloat(sight.point.split(' ')[1]), 
          parseFloat(sight.point.split(' ')[0].replace('POINT(', '').replace(')', ''))
        );

        const marker = new naver.maps.Marker({
          position,
          map,
          title: sight.title,
        });

        const infoWindow = new naver.maps.InfoWindow({
          content: `<div style="padding:10px;"><strong>${sight.title}</strong><br>${sight.address}</div>`,
        });

        naver.maps.Event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker);
        });
      });
    }
  }, [map, sightData]);

  useEffect(() => {
    if (map && roadData && roadData.geometry && roadData.geometry.coordinates) {
      const path = roadData.geometry.coordinates.map(coord => new naver.maps.LatLng(coord[1], coord[0]));
      new naver.maps.Polyline({
        path,
        map,
        strokeColor: '#FF0000',
        strokeStyle: 'solid',
        strokeWeight: 4,
      });
    }
  }, [map, roadData]);

  return (
    <div>
      <div ref={mapElement} style={{ width: '100%', height: '400px' }} />
    </div>
  );
}

export default MapContainer;
