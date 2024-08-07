import React from 'react'
import { useRef,useState, useEffect } from 'react';

export default function Main() {
    
    // const mapElement = useRef(null);
    // const [AddressX, setAddressX] = useState(0);
    // const [AddressY, setAddressY] = useState(0);
    // const { naver } = window;
    // const [newMap, setNewMap] = useState(null);
    // let map;
    // const createMarkerList = [];
    
//     useEffect(() => {
//         if (searchKeyword) {
//           naver.maps.Service.geocode(
//             { query: searchKeyword },
//             function (status, res) {
//               if (res.v2.addresses.length === 0) {
//                 // 요청실패 (searchKeyword에 대한 응답이 없을 경우) 에러 핸들링
//               } else {
//                 // 요청 성공에 대한 핸들링
//                 // 검색된 주소에 해당하는 위도, 경도를 숫자로 변환후 상태 저장
//                 const resAddress = res.v2.addresses[0];
//                 const x = parseFloat(resAddress.x);
//                 const y = parseFloat(resAddress.y);
//                 setAddressX(x);
//                 setAddressY(y);
//               }
//             }
//           );
//         }
//       }, [searchKeyword]);
      
//       useEffect(() => {
//         if (!mapElement.current || !naver) return;
    
//         // Map 클래스는 지도를 표현하는 클래스
//         // new 연산자를 이용하여 새 인스턴스를 생성
//         // 변환해놓은 좌표값을 이용하여 지도 중심 인스턴스 생성
//         const center = new naver.maps.LatLng(AddressY, AddressX);
//         //지도 옵션 설정
//         const mapOptions = {
//           //center 옵션에 생성한 지도 중심 인스턴스 넣기
//           center: center,
//           zoom: 12,
//           minZoom: 11,
//           maxZoom: 19,
//           zoomControl: true,
//           zoomControlOptions: {
//             style: naver.maps.ZoomControlStyle.SMALL,
//             position: naver.maps.Position.TOP_RIGHT,
//           },
//           mapDataControl: false,
//           scaleControl: false,
//         };
//         //설정해놓은 옵션을 바탕으로 지도 생성
//         map = new naver.maps.Map(mapElement.current, mapOptions);
//         setNewMap(map);
//         //마커 생성 함수 호출
//         addMarkers();
//         //검색 결과 거리순으로 재정렬하는 함수 호출
//         resetListHandler();
//       }, [AddressX, AddressY, totalDomData, viewportWidth]);

//       //반복문을 통해 데이터 배열 순회하면서 마커 생성 진행!
//   const addMarkers = () => {
//     for (let i = 0; i < totalDataArray.length; i++) {
//       let markerObj = totalDataArray[i];
//       const { dom_id, title, lat, lng } = markerObj;
//       addMarker(dom_id, title, lat, lng);
//     }
//   };
//   //마커 생성 하고 createMarkerList에 추가!!
//   const addMarker = (id, name, lat, lng) => {
//     try {
//       let newMarker = new naver.maps.Marker({
//         position: new naver.maps.LatLng(lng, lat),
//         map,
//         title: name,
//         clickable: true,
//       });
//       newMarker.setTitle(name);
//       //마커리스트에 추가
//       createMarkerList.push(newMarker);
//       //마커에 이벤트 핸들러 등록
//       naver.maps.Event.addListener(newMarker, 'click', () =>
//         markerClickHandler(id)
//       );
//     } catch (e) {}
//   };
//   const showMarker = (map, marker) => {
//     // 지도에 표시되어있는지 확인
//     if (marker.getMap()) return;
//     // 표시되어있지 않다면 오버레이를 지도에 추가
//     marker.setMap(map);
//   };

//   const hideMarker = (marker) => {
//     // 지도에 표시되어있는지 확인
//     if (!marker.getMap()) return;
//     // 표시되어있다면 오버레이를 지도에서 삭제
//     marker.setMap(null);
//   };
//   const updateMarkers = (map,markers) => {
//     if (!map) return;
//     // 현재 지도의 화면 영역을 mapBounds 변수에 저장
//     let mapBounds = map.getBounds();
//     let marker, position;
    
//     // 마커 객체 배열을 순회하며 각 마커의 위치를 position 변수에 저장   
//     for (var i = 0; i < markers.length; i++) {
//       marker = markers[i];
//       position = marker.getPosition();
      
//       // mapBounds와 비교하며 마커가 현재 화면에 보이는 영역에 있는지 확인
//       if (mapBounds.hasPoint(position)) {
//         // 보이는 영역에 있다면 마커 표시
//         showMarker(map, marker);
//       } else {
//         // 숨겨진 영역에 있다면 마커 숨김 
//         hideMarker(marker);
//       }
//     }
//   };

//   //마커를 클릭했을 때 실행할 이벤트 핸들러
//   const markerClickHandler = (id) => {
//     navigate(`/ground/${id}`);
//   };
//   //이벤트 핸들러 등록
//   useEffect(() => {
//     if (newMap) {
//       const MoveEventListner = naver.maps.Event.addListener(
//         newMap,
//         'idle',
//         idleHandler
//       );
//       return () => {
//         naver.maps.Event.removeListener(MoveEventListner);
//       };
//     }
//   }, [newMap]);

//   const idleHandler = () => {
//     updateMarkers(newMap, createMarkerList);
//   };

//   return (
//     <div>
//       <StyledMap id="map" ref={mapElement}></StyledMap> 
//     </div>
//   )
}
