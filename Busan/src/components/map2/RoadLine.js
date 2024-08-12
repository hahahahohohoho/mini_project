import React from 'react';
import { Polyline } from 'react-naver-maps';

function RoadLine({ roadData }) {
  const path = roadData.geometry.coordinates.map(coord => ({
    lat: coord[1],
    lng: coord[0],
  }));

  return (
    <Polyline
      path={path}
      strokeColor="#FF0000"
      strokeStyle="solid"
      strokeWeight={4}
    />
  );
}

export default RoadLine;
