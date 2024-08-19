import React, { useState } from 'react';
import axios from '../../axios';

export default function RestaurantRecommendButton({ restaurant }) {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  
  // 현재 사용자가 이미 추천했는지 확인
  const [isRecommended, setIsRecommended] = useState(
    restaurant.recommends?.some(recommend => recommend.username === username)
  );

  const handleRecommendSubmit = async () => {
    if (username) {
      try {
        const newRecommend = {
          username: username,
          restaurant_id: restaurant.id,  // 레스토랑의 ID 사용
        };
        const result = await axios.post(`/res/${restaurant.id}/recommend`, newRecommend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (result.status === 200) {
          setIsRecommended(true);
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
          const result = await axios.delete(`/res/${restaurant.id}/recommend`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              username: username,
              restaurant_id: restaurant.id,  // 레스토랑의 ID 사용
            },
          });
          if (result.status === 200) {
            setIsRecommended(false);
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
      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
    >
      {isRecommended ? '추천 취소' : '추천'}
    </button>
  );
}
