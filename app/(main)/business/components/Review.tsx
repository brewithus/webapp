// components/Review.tsx
import React from 'react';
import { Review } from './type'; // Adjust the import based on your file structure

interface ReviewProps {
  review: Review;
}

const ReviewComponent: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div className="review p-4 border-b">
      <div className="review-header flex justify-between items-center">
        <h3 className="review-author font-semibold">{review.author}</h3>
        <div className="review-rating">
          {'⭐'.repeat(review.rating)}
        </div>
      </div>
      <p className="review-comment mt-2">{review.comment}</p>
    </div>
  );
};

export default ReviewComponent;