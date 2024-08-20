import React, { useState,useEffect } from 'react';
import MapComponent from './MapComponent';
import MarkerComponent from './MarkerComponent';
import SearchComponent from './SearchComponent';
import LineComponent from './LineComponent';
import InfoPanel from '../info/InfoPanel';  // InfoPanel 컴포넌트 추가
import axios from '../../axios';

// const MapMain = () => {
//   const [map, setMap] = useState(null); // 네이버 지도 객체를 관리하는 상태
//   const [filteredMarkerData, setFilteredMarkerData] = useState([]); // 필터링된 마커 데이터를 저장하는 상태
//   const [filteredLineData, setFilteredLineData] = useState([]); // 필터링된 라인 데이터를 저장하는 상태
//   const { naver } = window; // naver 객체를 window에서 가져옴 (네이버 지도 API 사용)
//   const [showInfoPanel, setShowInfoPanel] = useState(false); // 정보창 표시 상태를 관리하는 상태

//   // 구/군 코드 정의
//   const districtCodes = {
//     '중구': 2611, '서구': 2614, '동구': 2617, '영도구': 2620, '부산진구': 2623, '동래구': 2626,
//     '남구': 2629, '북구': 2632, '해운대구': 2635, '사하구': 2638, '금정구': 2641, '강서구': 2644,
//     '연제구': 2647, '수영구': 2650, '사상구': 2653, '기장군': 2671
//   };

//   // 특정 구/군에 해당하는 라인 데이터를 필터링하는 함수
//   const filterLineDataByDistrict = (lineData, district) => {
//     const districtCode = districtCodes[district]; // district에 해당하는 코드 가져오기
//     if (!districtCode) return []; // districtCode가 없으면 빈 배열 반환

//     return lineData.filter(line => line.cty_cd === districtCode); // lineData의 CTY_CD가 districtCode와 일치하는지 확인
//   };

//   // 지도 로드 완료 시 호출되는 함수
//   const handleMapLoad = (mapInstance) => {
//     setMap(mapInstance); // 지도 객체를 상태로 저장
//   };

//   // 선택된 카테고리에 따라 마커 데이터를 가져오는 함수
//   const fetchMarkerData = async (category) => {
//     try {
//       let response;
//       if (category === '식당') {
//         response = await axios.get('/restaurant'); // 식당 데이터를 서버에서 가져옴
//       } else if (category === '명소') {
//         response = await axios.get('/sight'); // 명소 데이터를 서버에서 가져옴
//       }
//       return response.data; // 데이터를 반환
//     } catch (error) {
//       console.error('Error fetching marker data:', error); // 데이터 로드 중 오류 발생 시 로그 출력
//       return [];
//     }
//   };
  
//   // 검색 시 호출되는 함수 (구/군과 카테고리를 받아 필터링 수행)
//   const handleSearch = async (district, category) => {
//     // // 이전에 그려진 라인 데이터를 초기화
//     // setFilteredLineData([]);
    
//     // 마커 데이터를 가져옴
//     const markerData = await fetchMarkerData(category);
//     setFilteredMarkerData(markerData); // 필터링된 마커 데이터를 상태에 저장
    
//     // 자전거 도로 데이터를 가져옴
//     const roadResponse = await axios.get('/road'); // 자전거 도로 데이터를 서버에서 가져옴
//     const filteredLines = filterLineDataByDistrict(roadResponse.data, district); // 선택된 구/군에 따라 라인 데이터 필터링
//     setFilteredLineData(filteredLines); // 필터링된 라인 데이터를 상태에 저장
//     console.log(filteredLineData, 'adfs')
//     if (map && markerData.length > 0) { // 필터링된 데이터가 존재할 경우
//       const bounds = new naver.maps.LatLngBounds(); // 지도에 표시할 범위를 계산하기 위한 객체
//       markerData.forEach(location => {
//         const pointMatch = location.point.match(/POINT \(([^ ]+) ([^ ]+)\)/); // 좌표를 파싱
//         if (pointMatch) {
//           const lng = parseFloat(pointMatch[1]); // 경도 추출
//           const lat = parseFloat(pointMatch[2]); // 위도 추출
//           bounds.extend(new naver.maps.LatLng(lat, lng)); // 좌표를 범위에 추가
//         }
//       });
//       map.fitBounds(bounds); // 모든 마커가 보이도록 지도 범위 설정
//     }
//     setShowInfoPanel(true);
//   };

const MapMain = () => {
  const [map, setMap] = useState(null);
  const [filteredMarkerData, setFilteredMarkerData] = useState([]);
  const [filteredLineData, setFilteredLineData] = useState([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [category, setCategory] = useState('');
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ top: '10%', left: '10%' });
  const [center, setCenter] = useState({ lat: 35.1767, lng: 129.0817 }); // 연제구의 초기 좌표로 설정
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 초기 로드 상태

  const { naver } = window;

  const districtCodes = {
    '중구': 2611, '서구': 2614, '동구': 2617, '영도구': 2620, '부산진구': 2623, '동래구': 2626,
    '남구': 2629, '북구': 2632, '해운대구': 2635, '사하구': 2638, '금정구': 2641, '강서구': 2644,
    '연제구': 2647, '수영구': 2650, '사상구': 2653, '기장군': 2671
  };

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const fetchMarkerData = async (category, district) => {
    try {
      let baseUrl = '';
      if (category === '식당') {
        baseUrl = '/restaurant';
      } else if (category === '명소') {
        baseUrl = '/sight';
      }
      
      const url = district !== '부산 전체' ? `${baseUrl}/city/${districtCodes[district]}` : baseUrl;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching marker data:', error);
      return [];
    }
  };

  const handleSearch = async (district, category) => {
    setFilteredLineData([]);
    setCategory(category);

    const data = await fetchMarkerData(category, district);
    setFilteredMarkerData(data);

    if (category === '명소' || category === '식당') {
      if (district !== '부산 전체') {
        const districtCode = districtCodes[district];
        const lineResponse = await axios.get(`/road/city/${districtCode}`);
        const lineData = lineResponse.data.filter(a => a.grade !== -999);
        setFilteredLineData(lineData);
      } else {
        setFilteredLineData([]);
      }
    }

    if (map) {
      if (data.length > 0) {
        const bounds = new naver.maps.LatLngBounds();
        data.forEach(location => {
          const pointMatch = location.point.match(/POINT \(([^ ]+) ([^ ]+)\)/);
          if (pointMatch) {
            const lng = parseFloat(pointMatch[1]);
            const lat = parseFloat(pointMatch[2]);
            bounds.extend(new naver.maps.LatLng(lat, lng));
          }
        });
        map.fitBounds(bounds);

        // 검색된 구/군의 중심으로 지도 설정 (초기 로드가 아닌 경우에만)
        if (!isInitialLoad) {
          const districtCenter = new naver.maps.LatLng(data[0].latitude, data[0].longitude);
          setCenter({ lat: data[0].latitude, lng: data[0].longitude }); // 지도의 중심을 변경
          map.setCenter(districtCenter);
        }
      }
    }
    setShowInfoPanel(true);
    setIsInitialLoad(false);
  };

  useEffect(() => {
    handleSearch('연제구', '식당');
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarkerId(marker.id);
    setShowInfoPanel(true);
  };

  return (
    <div className="relative flex h-screen">
      {showInfoPanel && selectedMarkerId && (
        <div
          className="absolute z-10 w-72 h-auto bg-white p-4 shadow-lg rounded-lg"
          style={{ top: panelPosition.top, left: panelPosition.left }}
        >
          {/* {category === '식당' ? (
            <RestaurantInfoPanel id={selectedMarkerId} onClose={() => setShowInfoPanel(false)} />
          ) : (
            <SightInfoPanel id={selectedMarkerId} onClose={() => setShowInfoPanel(false)} />
          )} */}
          <button
            onClick={() => setShowInfoPanel(false)}
            className="absolute top-2 right-2 bg-blue-500 text-white py-1 px-3 rounded"
          >
            X
          </button>
        </div>
      )}
      <div className="flex-1 relative">
        <SearchComponent onSearch={handleSearch} />
        <MapComponent onMapLoad={handleMapLoad} center={center} zoomLevel={14} />
        {map && (
          <>
            {filteredLineData.length > 0 && <LineComponent map={map} lineData={filteredLineData} />}
            {filteredMarkerData.length > 0 && (
              <MarkerComponent map={map} markerData={filteredMarkerData} onMarkerClick={handleMarkerClick} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MapMain;