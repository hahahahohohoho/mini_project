import React, { useState } from 'react';
import { Marker, InfoWindow } from 'react-naver-maps';

function LocationMarker({ sight }) {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const position = {
    lat: parseFloat(sight.point.split(' ')[1]), // POINT 데이터에서 위도 추출
    lng: parseFloat(sight.point.split(' ')[0].replace('POINT(', '').replace(')', '')) // 경도 추출
  };

  return (
    <Marker
      position={position}
      onClick={() => setInfoWindowOpen(!infoWindowOpen)}
    >
      {infoWindowOpen && (
        <InfoWindow>
          <div>
            <h4>{sight.title}</h4>
            <p>{sight.address}</p>
            <a href={sight.homepage} target="_blank" rel="noopener noreferrer">
              홈페이지
            </a>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
}

export default LocationMarker;
