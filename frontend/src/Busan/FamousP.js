// import React from 'react'
// import { useState, useEffect, useRef } from 'react'
// import TailSelect from '../UI/TailSelect';

// export default function FamousP() {
  
//   const [sel, setSel] = useState([]);
//   const [c1, setC1] = useState([])
//   const [tdata, setTdata] = useState([])
//   const selRef = useRef();

//   const select = (item) => {
//     setSel(item);
//   }
  
//   //    //구선택
//   //    const handleGuSelect = () => {
//   //     console.log(selRef.current.value)
//   //     let tm = tdata.filter(item => item.GUGUN_NM)
//   // }

//   useEffect(()=>{
//     let url = `https://apis.data.go.kr/6260000/AttractionService/getAttractionKr`
//       url = url + `?serviceKey=${process.env.REACT_APP_API_KEY}`;
//       url = url + `&pageNo=1&numOfRows=10`
//     console.log(url);
//     getData(url);
//   },[])  


//     //데이터 가져옴
//     const getData = (url) =>{
//       fetch(url)
//       .then(resp => resp.json())
//       .then(data => setTdata(data.data))
//       .catch(err => console.log(err));
//     }

//     useEffect(()=>{
//       let tm = c1.map((item)=>)
//     })
    
//   return (
//      <div className="w-full h-full flex flex-col justify-start items-start">
//       <form className="w-full flex justify-center items-center">
//         <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 my-5">
//           <label htmlFor="op" 
//                  className="block text-xl font-bold
//                             inline-flex justify-center items-center mr-5
//                            text-gray-900 dark:text-white">
//                  부산명소정보
//           </label>
//           {/* {ops && <TailSelect id = "op"
//                       selRef = {selRef}
//                       ops = {ops}
//                       initText = "---부산 지역 구 선택 ---" 
//                       handleChange = {handleGuSelect} /> } */}
//         </div>
//       </form>
//       <div className="w-full grid grid-cols-1 
//                   md:grid-cols-2 lg:grid-cols-3 
//                   gap-2">

//       </div>
//     </div>
//   )
// }
