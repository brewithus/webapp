import type { BrewReview } from '@/types/brew';
import React from 'react';
import DisplayReviewStars from './stars';
import { cn } from '@/lib/utils';

interface Props {
  reviews: BrewReview[];
}
const ReviewRatingDistributions: React.FC<Props> = ({ reviews }) => {
  // Calculate the average rating
  const averageRating =
    reviews.length === 0
      ? 0
      : reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;

  // Calculate the distribution of ratings, explicitly stating the type as number[]
  const ratingDistribution: number[] = Array(5).fill(0);
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      // Ensure rating is within expected range
      ratingDistribution[review.rating - 1]++;
    }
  });

  // Ensure Math.max argument is safe by providing a default value (0) for empty arrays
  const maxRatingCount = Math.max(0, ...ratingDistribution);
  return (
    <div className="flex flex-col gap-8 sm:flex-row">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold">Overall rating</div>
        <DisplayReviewStars
          rating={averageRating}
          className="text-primary-light"
        />
        <span className="text-foreground/60">
          {averageRating.toFixed(1)} ({reviews.length} reviews)
        </span>
      </div>

      <div className="w-full">
        {ratingDistribution
          .slice()
          .reverse()
          .map((count, index) => (
            <div key={index} className="flex w-full items-center gap-4">
              <div
                className={cn(
                  'min-w-fit font-medium text-foreground/50',
                  count > 0 && 'text-foreground',
                )}
              >
                {5 - index} stars
              </div>
              <div className="h-[8px] w-full rounded-lg bg-foreground/50">
                <div
                  className="h-full rounded-lg bg-primary"
                  style={{
                    width: `${(count / (maxRatingCount || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewRatingDistributions;
