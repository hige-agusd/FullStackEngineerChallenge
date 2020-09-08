import React, { useContext } from 'react';

export const useReviewsContext = () => useContext(ReviewsContext);

const ReviewsContext = React.createContext(null);

export default ReviewsContext;