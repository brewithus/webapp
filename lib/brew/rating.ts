export const ratingToExpression = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'Not good';
    case 2:
      return 'Average';
    case 3:
      return 'Good';
    case 4:
      return 'Very good';
    case 5:
      return 'Excellent';
    default:
      return 'Invalid rating';
  }
};
