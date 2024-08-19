import React, { useState } from 'react';
import axios from '../../axios';

const ReviewForm = ({type, resId, onReviewSubmitted }) => {
  const [reviewContent, setReviewContent] = useState('');
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewContent.trim()) {
      alert('리뷰 내용을 입력하세요.');
      return;
    }

    const newReview = {
      username: username,
      content: reviewContent,
    };
    console.log(`/${type}/reply/${resId}`)
    try {
      const response = await axios.post(`/${type}/reply/${resId}`, newReview, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Review submitted successfully:", response.data);

      if (response) {
        setReviewContent('');
        onReviewSubmitted(response.data); // 부모 컴포넌트에 새로운 리뷰를 전달
      } else {
        alert('리뷰 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error posting review:', error);
      alert('리뷰 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleReviewSubmit} className="mt-4">
      <textarea
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="3"
        placeholder="리뷰를 작성하세요..."
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        리뷰 제출
      </button>
    </form>
  );
};

export default ReviewForm;
