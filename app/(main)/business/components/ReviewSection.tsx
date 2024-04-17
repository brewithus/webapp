import React from 'react';
import ReviewComponent from './Review';
import  {Review}  from './type'; // Adjust the import based on your file structure
import styles from '../styles/Review.module.css';

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
    // Calculate the average rating
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
    // Calculate the distribution of ratings
    const ratingDistribution = Array(5).fill(0);
    reviews.forEach((review) => {
      ratingDistribution[review.rating - 1]++;
    });
    // console.log(ratingDistribution);
    return (
        
      <div className="review-section mt-8">
        <p className={styles.review}>Reviews</p>
        <div className={styles.overallRating}>
        <div className={styles.overallRatingLabel}>Overall rating</div>
          <div className={styles.stars}>
            {'⭐'.repeat(Math.round(averageRating))}
            <span>({reviews.length} reviews)</span>
          </div>
          
          {ratingDistribution.slice().reverse().map((count, index) => (
            <div key={index} className={styles.ratingBar}>
                <div className={styles.ratingLabel}>{5 - index} stars</div>
                <div className={styles.bar}>
                    <div
                        className={styles.filledBar}
                        style={{ width: `${(count / Math.max(...ratingDistribution)) * 100}%` }}
                    />
                </div>
            </div>
        ))}
        </div>

        {reviews.map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))}
      </div>
    );
  };
  
  export default ReviewSection;