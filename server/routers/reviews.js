const express = require('express');
const router = express.Router();
const helpers = require('../helpers');
const reviews = require('../reviews');

router.get('/', (req, res, next) => {
  res.status(200).json({ reviews: reviews.getReviews() });
});

router.get('/:reviewerId', (req, res, next) => {
  const filteredReviews = reviews.getReviewByReviewer(parseInt(req.params.reviewerId));
  res.status(filteredReviews && filteredReviews.length ? 200 : 404).json({reviews: filteredReviews});
});

router.post('/', (req, res, next) => {
  const review = reviews.createReview(req.body.review);
  res.status(200).json(review);
})

router.put('/', (req, res, next) => {
  const review = reviews.updateReview(req.body.review);
  if (review) {
    res.status(200).json(review);
  } else {
    res.status(404).json(req.body.review);
  }
})

module.exports = router