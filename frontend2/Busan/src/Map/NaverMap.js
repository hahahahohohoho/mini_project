import React, { useRef, useEffect, useState } from 'react';

const NaverMap = ({ searchKeyword }) => {
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const [addressX, setAddressX] = useState(129.07756889651216);
  const [addressY, setAddressY] = useState(35.237845938444636);
  const [marker, setMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const { naver } = window; // window 객체에서 naver를 가져옵니다.

  // 지도 초기화
  useEffect(() => {
    if (mapElement.current && !map) {
      const newMap = new naver.maps.Map(mapElement.current, {
        center: new naver.maps.LatLng(addressY, addressX),
        zoom: 10,
      });
      setMap(newMap);
    }
  }, [mapElement, map, addressX, addressY]);

  // 마커 데이터 가져와서 지도에 추가
  useEffect(() => {
    if (map) {
      fetch('/sight.json')
        .then((response) => response.json())
        .then((data) => {
          // 기존 마커 삭제
          markers.forEach(marker => marker.setMap(null));
          console.log(data)
          const newMarkers = data.map((location) => {
            const point = location.point.match(/POINT \(([^ ]+) ([^ ]+)\)/);
            if (point) {
              const lng = parseFloat(point[1]);
              const lat = parseFloat(point[2]);

              const newMarker = new naver.maps.Marker({
                position: new naver.maps.LatLng(lat, lng),
                map: map,
              });
              return newMarker;
            }
            return null;
          }).filter(marker => marker !== null);
          
          setMarkers(newMarkers);
        })
        .catch((error) => console.error('Error fetching sight data:', error));
    }
  }, [map]);

  // 검색 키워드 변경 처리
  useEffect(() => {
    if (searchKeyword && naver && naver.maps && naver.maps.Service) {
      naver.maps.Service.geocode(
        { query: searchKeyword },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR || response.v2.addresses.length === 0) {
            console.error('No addresses found or an error occurred');
          } else {
            const resAddress = response.v2.addresses[0];
            const x = parseFloat(resAddress.x);
            const y = parseFloat(resAddress.y);
            setAddressX(x);
            setAddressY(y);
            if (map) {
              const newPosition = new naver.maps.LatLng(y, x);
              map.setCenter(newPosition);
              if (marker) {
                marker.setPosition(newPosition);
              } else {
                const newMarker = new naver.maps.Marker({
                  position: newPosition,
                  map: map,
                });
                setMarker(newMarker);
              }
            }
          }
        }
      );
    }
  }, [searchKeyword, map]);

  return (
    <div>
      <div ref={mapElement} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default NaverMap;
