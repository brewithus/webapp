import type { ReviewWithBiz } from '@/types/brew';

export const sortReviews = (reviews: ReviewWithBiz[]): ReviewWithBiz[] => {
  return reviews.sort((a, b) => {
    // Use the 'updated' date if available; otherwise, fall back to the 'created' date
    const dateA = new Date(a.updated ?? a.created);
    const dateB = new Date(b.updated ?? b.created);

    // Compare the dates to determine the order
    return dateB.getTime() - dateA.getTime(); // For descending order
    // Use `dateA.getTime() - dateB.getTime()` for ascending order
  });
};
