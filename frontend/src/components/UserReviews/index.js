import React, { useContext, useState } from 'react';
import ReviewDetailsForm from '../../components/ReviewDetailsForm';
import Modal from '../../components/UI/Modal';
import UsersContext from '../../hoc/Users/context';
import './UserReviews.css';
 
/**
 * UserReviews
 * List of Reviewee and status of review assigned to current user
 * @param {Array} props.reviews - Array of reviews
 */
const userReviews = (props) => {

    const { users } = useContext(UsersContext);
    const [showModal, setShowModal] = useState(false);
    const [reviewId, setReviewId] = useState(null);

    const toggleModal = () => setShowModal(!showModal);
    const editReview = (id) => {
        setReviewId(id);
        toggleModal();
    }

    const modal = 
            showModal ? <Modal classes={'Form'} show={showModal} modalClosed={toggleModal}>
                <ReviewDetailsForm reviewId={reviewId} cb={toggleModal} />
            </Modal>
            : null;

    const getUserName = (id) => {
        const namedUser = users.find(u => u.id === parseInt(id, 10));
        return namedUser ? namedUser.name : '';
    }

    const reviews = props.reviews.length ? props.reviews.map(review => {
        return (
            <div className={'row details'} onClick={() => editReview(review.id)} key={review.id}>
                <div className={'reviewee'}>{getUserName(review.revieweeId)}</div>
                <div className={'status'}>{review.status}</div>
            </div>
        );
    }) : <p className={'empty-msg'}>No reviews found</p>
    return (
        <div className={'UserReviews'}>
            {modal}
            <div className={'row head'}>
                <div className={'reviewee'}>Reviewee</div>
                <div className={'status'}>Status</div>
            </div>
            {reviews}
        </div>
    );
}

export default userReviews;