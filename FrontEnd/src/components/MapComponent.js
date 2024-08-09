// src/components/MapComponent.js
import React, { useEffect, useRef } from 'react';

const MapComponent = ({ onMapLoad, center, zoomLevel }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const handleMapLoad = () => {
      const { naver } = window;
      if (naver && mapRef.current) {
        const map = new naver.maps.Map(mapRef.current, {
          center: new naver.maps.LatLng(center.lat, center.lng),
          zoom: zoomLevel,
        });
        onMapLoad(map);
      }
    };

    window.addEventListener('naver-map-loaded', handleMapLoad);
    
    return () => {
      window.removeEventListener('naver-map-loaded', handleMapLoad);
    };
  }, [center, zoomLevel, onMapLoad]);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
