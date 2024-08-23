import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import ReviewForm from './ReviewForm';
import RestaurantRecommendButton from './RestaurantRecommendButton';

const SightInfoPanel = ({ id, onClose }) => {
  const [sightData, setSightData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxLength = 50;

  useEffect(() => {
    const fetchSightData = async () => {
      try {
        const response = await axios.get(`/sight/${id}`);
        setSightData(response.data);
      } catch (err) {
        setError('데이터를 가져오는 데 실패했습니다.');
        console.error('Error fetching restaurant data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSightData();
  }, [id]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReviewSubmitted = async (newReview) => {
    try {
      const updatedReviews = [...sightData.replys, newReview];
      setSightData({ ...sightData, replys: updatedReviews });
      alert('리뷰가 작성되었습니다.');
    } catch (error) {
      console.error('Error updating reviews:', error);
      alert('리뷰 업데이트에 실패했습니다.');
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-2 rounded-sm">
      <h2 className="text-xl font-bold">{sightData.title}</h2>
      <div className="flex space-x-3">
        <img 
          src={sightData.img2} 
          alt={sightData.name} 
          className="rounded-lg w-full h-auto max-w-xs" 
          onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=%EC%9A%94%EC%B2%AD%ED%95%98%EC%8B%A0+%EC%82%AC%EC%A7%84%EC%9D%80+%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4'} 
        />
      </div>
      <p className="text-gray-600"><strong>주소:</strong> {sightData.address}</p>
      <p className="text-gray-600"><strong>홈페이지:</strong>
      {sightData.homepage !== '-'? <a href={sightData.homepage}>링크</a> : '없음'}
      </p>
      {/* <p className="text-gray-600"><strong>메뉴:</strong> {sightData.menu}</p> */}
      
      <p className="text-gray-600">
        {isExpanded ? sightData.content : `${sightData.content.slice(0, maxLength)}...`}
        {sightData.content.length > maxLength && (
          <button onClick={handleToggleExpand} className="text-blue-500 ml-2">
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </p>
      <div className="flex justify-end">
        <RestaurantRecommendButton type= 'sight' restaurant={sightData} />
        </div>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">리뷰</h3>
        {sightData.replys && sightData.replys.length > 0 ? (
          sightData.replys.map(reply => (
            <div key={reply.id+reply.username} className="p-2 border rounded-lg bg-gray-100">
              <p className="text-sm font-semibold">{reply.username}</p>
              <p className="text-gray-600">{reply.content}</p>
              <p className="text-xs text-gray-500">{new Date(reply.createDate).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">리뷰가 없습니다.</p>
        )}
      </div>
      <ReviewForm type ='sig' resId={sightData.id} onReviewSubmitted={handleReviewSubmitted} />
    </div>
  );
};

export default SightInfoPanel;
