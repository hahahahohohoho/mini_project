import React from 'react'
import { useState } from 'react';
export default function Asd() {

   
    let url = `https://apis.data.go.kr/6260000/AttractionService/getAttractionKr`
    url = url + `?serviceKey=${process.env.REACT_APP_API_KEY}`;
    url = url + `&pageNo=1&numOfRows=10&resultType=json`

const [dataBoard, setDataBoard] = useState([]);

const loadBoard = async() =>{
    await fetch(url)
    .then(resp => {
        return resp.json();
    }).then(result => {
        setDataBoard(result);
    }).catch(error => {
        console.error("Error",error);
    });
};

const loadData = ()=>{
    return (
        <table align='center'>
            <thead>
                <tr>
                    <th>title</th><th>tel</th><th>address</th>
                </tr>
            </thead>
            <tbody>
                {dataBoard.map(board=>{
                    <tr>
                        <td>{board.MAIN_TITLE}</td>
                        <td>{board.CNTCT_TEL}</td>
                        <td>{board.ADDR1}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )};

    return (
      <div>
        <h2>부산 명소</h2>
        <button onClick={() => loadBoard()}>Board</button>
        <div>{loadData()}</div>
      </div>
    )
}


