import React, { useState } from 'react';
import MyBoardList from './MyBoardList';
import MyReplyList from './MyReplyList';
import MyProfileEdit from './MyprofileEdit';

export default function MypageMain() {
  const [myState, setMyState] = useState('Board');

  // 상태를 변경하는 함수
  const changeState = (state) => {
    setMyState(state);
  };

  return (
    <div className="flex items-center flex-col ">
      <div className="my-4 flex space-x-4">
        {/* 각각의 상태 변경 버튼 */}
        <button
          onClick={() => changeState('게시판')}
          className={`px-4 py-2 rounded-md ${myState === 'Board' ? 'bg-slate-400 text-white' : 'bg-slate-300 text-white'}`}
        >
          내가 작성한 게시글
        </button>
        <button
          onClick={() => changeState('Reply')}
          className={`px-4 py-2 rounded-md ${myState === 'Reply' ? 'bg-slate-400 text-white' : 'bg-slate-300 text-white'}`}
        >
          내가 작성한 댓글
        </button>
        <button
          onClick={() => changeState('EditProfile')}
          className={`px-4 py-2 rounded-md ${myState === 'EditProfile' ? 'bg-slate-400 text-white' : 'bg-slate-300 text-white'}`}
        >
          회원정보수정
        </button>
      </div>

      {/* 상태에 따라 컴포넌트를 조건부로 렌더링 */}
      {myState === 'Board' && <MyBoardList />}
      {myState === 'Reply' && <MyReplyList />}
      {myState === 'EditProfile' && <MyProfileEdit />}
    </div>
  );
}
