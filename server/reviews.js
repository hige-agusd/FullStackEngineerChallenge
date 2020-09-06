const empty = require('./empty');

class Reviews {
    constructor() {
        this.reviews = [];
    }

    getReviews = () => {
        return this.reviews;
    };
    getReview = (id) => {
        return this.reviews.find(r => r.id === parseInt(id)) || {};
    };
    getReviewByReviewer = (id) => {
        return this.reviews.filter(r => r.reviewerId === parseInt(id)) || [];
    };
    getNewId = () => {
        const lastReview = [...this.reviews].pop();
        return lastReview ? lastReview.id + 1 : 1;
    };
    createReview = (review) => {
        const newReview = {
          ...empty.review,
          details: empty.reviewDetails,
          ...review,
          id: this.getNewId()
        };
        this.reviews.push(newReview);
        return newReview;
    };
    updateReview = (review) => {
        const reviewIndex = this.reviews.findIndex(u => u.id === parseInt(review.id));
        if (reviewIndex >= 0) {
          this.reviews.splice(reviewIndex, 1, review);
          return this.getReview(reviewIndex);
        } else {
            return false;
        }
    };
}

const reviews = new Reviews();
module.exports = reviews;