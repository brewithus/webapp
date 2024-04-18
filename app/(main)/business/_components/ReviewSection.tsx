import React from 'react';
import ReviewComponent from './Review';
import type { Review } from './type'; // Use `import type` for type-only imports
import styles from '../_styles/Review.module.css';

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
    // Calculate the average rating
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
    // Calculate the distribution of ratings, explicitly stating the type as number[]
    const ratingDistribution: number[] = Array(5).fill(0);
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) { // Ensure rating is within expected range
        ratingDistribution[review.rating - 1]++;
      }
    });
    
    // Ensure Math.max argument is safe by providing a default value (0) for empty arrays
    const maxRatingCount = Math.max(0, ...ratingDistribution);

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
                        style={{ width: `${(count / (maxRatingCount || 1)) * 100}%` }}
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
