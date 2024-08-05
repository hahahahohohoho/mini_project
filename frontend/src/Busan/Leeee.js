import React from 'react'
import { useState } from 'react';
export default function Leeee() {

    let url = `https://apis.data.go.kr/6260000/AttractionService/getAttractionKr`
    url = url + `?serviceKey=${process.env.REACT_APP_API_KEY}`;
    url = url + `&pageNo=1&numOfRows=10&resultType=json`

const [dataBoard, setDataBoard] = useState([]);

const loadBoard = async() =>{//보드 불러움
    await fetch(url)//url 연결
    .then(resp => {
        return resp.json();//응답을 json형식으로 바꿈
    }).then(result => {
        setDataBoard(result.getAttractionKr.item);//getAttractionKr.item에서 데이터 찾음
        console.log(result.getAttractionKr.item)
    }).catch(error => {
        console.error("Error",error);
    });
};

const loadData = ()=>{
    return (
        <table align='center'>
            <thead>
                <tr>
                    <th>title</th>
                    <th>tel</th>
                    <th>address</th>
                </tr>
            </thead>
            <tbody>
                {dataBoard.map(board=>{//databoard안을 board변수로 순환하면서 함수적용
                    return(//문자열 반환
                    <tr>
                        <td>{board.MAIN_TITLE}</td>
                        <td>{board.CNTCT_TEL}</td>
                        <td>{board.ADDR1}</td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    )};
    const sel = ()=>{
        const select = dataBoard.filter((item)=>item.GUGUN_NM !== "영도구");
        setDataBoard(select);
    }
        
    

    return (
      <div>
        <h2>부산 명소</h2>
        <button onClick={() => loadBoard()}>Board</button>
        <button onClick={() => sel()}>select</button>
        <div>{loadData()}</div>
      </div>
    )
}




