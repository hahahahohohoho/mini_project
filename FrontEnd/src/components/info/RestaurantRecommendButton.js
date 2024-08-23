import React, { useState } from 'react';
import axios from '../../axios';

export default function RestaurantRecommendButton({ type, restaurant }) {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  // 현재 사용자가 이미 추천했는지 확인
  const [isRecommended, setIsRecommended] = useState(
    restaurant.recommends?.some(recommend => recommend.username === username)
  );
  // 추천 수 가져오기
  const [recommendCount, setRecommendCount] = useState(restaurant.recommends?.length || 0);

  const handleRecommendSubmit = async () => {
    if (username) {
      try {
        const newRecommend = {
          username: username,
          board_id: restaurant.id,  // 레스토랑의 ID 사용
        };
        const result = await axios.post(`/${type}/${restaurant.id}/recommend`, newRecommend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (result.status === 200) {
          setIsRecommended(true);
          setRecommendCount(prevCount => prevCount + 1); // 추천 수 증가
          alert('추천이 완료되었습니다.');
        }
      } catch (error) {
        alert('추천에 실패했습니다.');
        console.error('Error recommending:', error);
      }
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const handleCancelRecommendSubmit = async () => {
    if (username) {
      if (window.confirm('추천을 취소하시겠습니까?')) {
        try {
          const result = await axios.delete(`/${type}/${restaurant.id}/recommend`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              username: username,
              board_id: restaurant.id,  // 레스토랑의 ID 사용
            },
          });
          if (result.status === 200) {
            setIsRecommended(false);
            setRecommendCount(prevCount => prevCount - 1); // 추천 수 감소
            alert('추천이 취소되었습니다.');
          }
        } catch (error) {
          alert('추천 취소에 실패했습니다.');
          console.error('Error canceling recommendation:', error);
        }
      }
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  return (
    <button
      onClick={isRecommended ? handleCancelRecommendSubmit : handleRecommendSubmit}
      className="flex justify-center items-center mt-1 p-1 text-sm font-medium text-white bg-slate-400 rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {isRecommended ?
        <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
        </svg>
        : <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
        </svg>
      }
      <p className="text-lg font-bold p-1 text-white">{recommendCount}</p>
    </button>
  );
}
