// src/App.js
import React, { useState } from 'react';
import MarkerComponent from './MarkerComponent';
import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';
import LineComponent from './LineComponent';

const App = () => {
  const [map, setMap] = useState(null);

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  return (
    <div>
      <SearchComponent map={map} />
      <MapComponent onMapLoad={handleMapLoad} />
      {map && <MarkerComponent map={map} />}
      {map && <LineComponent map={map} />}
    </div>
  );
};

export default App;
