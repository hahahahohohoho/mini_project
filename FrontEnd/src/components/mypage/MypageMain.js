import axios from '../../axios';
import {React, useEffect, useState} from 'react'


export default function MypageMain() {
    const [myInfo, setMyInfo] = useState()
    useEffect(()=>{
        const loadMyBoard = async() => {
            // TODO myInfo 설정
            try {
                const response = await axios.get("/myinfo",{
                    params: { username : localStorage.getItem('username') },
                  });
                const data = response.data
                setMyInfo(data)
                console.log(data)
            } catch (error) {
                console.error('Error fetching board data:', error);
            }
        }  
        loadMyBoard()
    }, []);
  return (
    <div>
      <p>{localStorage.getItem("username")}</p>
      <p>{myInfo}</p>
    </div>
  )
}
