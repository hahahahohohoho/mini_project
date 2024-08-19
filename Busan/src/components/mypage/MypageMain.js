import axios from '../../axios';
import {React, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import MyBoardList from './MyBoardList';
import MyReplyList from './MyReplyList';


export default function MypageMain() {
  const [myState, setMyState] = useState('Board')
   // 상태를 변경하는 함수
   const changeReply = () => {
    setMyState(myState === 'Board' ? 'Reply' : 'Board'); 
    // 현재 상태가 'Board'이면 'Reply'로, 그렇지 않으면 'Board'로 변경
  };
  return (
    <div className='flex items-center flex-col'>
      {/* changeReply 함수를 onClick 이벤트 핸들러로 지정 */}
      <div onClick={changeReply} className='my-4'>
        <h1>{myState === 'Board' ? 'ReplyList' : 'BoardList'}</h1>
      </div>
      
      {/* 상태에 따라 컴포넌트를 조건부로 렌더링 */}
      {myState === 'Board' ? <MyBoardList /> : <MyReplyList />}
    </div>
  );
}