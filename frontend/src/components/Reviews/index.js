import React, { useState } from 'react';
import ReviewForm from '../../components/ReviewForm';
import ReviewDetailsForm from '../../components/ReviewDetailsForm';
import Modal from '../../components/UI/Modal';
import { useReviewsContext } from '../../hoc/Reviews/context';
import { useUsersContext } from '../../hoc/Users/context';
import './Reviews.css';
 
const Reviews = (props) => {

    const { users } = useUsersContext();
    const {reviews} = useReviewsContext();
    const [showModal, setShowModal] = useState(false);
    const [reviewId, setReviewId] = useState(null);
    const [modalContent, setModalContent] = useState('reviews');

    const toggleModal = () => setShowModal(!showModal);
    const editReview = (id) => {
        setModalContent('reviews');
        setReviewId(id);
        toggleModal();
    }
    const viewDetails = (e, status, id) => {
        e.preventDefault();
        if(status !== 'submitted') return;
        e.stopPropagation();
        setModalContent('details');
        setReviewId(id);
        toggleModal();
    }

    const modal = 
            showModal ? <Modal classes={'Form'} show={showModal} modalClosed={toggleModal}>
                { modalContent === 'details' ? <ReviewDetailsForm reviewId={reviewId} readonly={true} cb={toggleModal} />
                    : <ReviewForm reviewId={reviewId} cb={toggleModal} /> }
            </Modal>
            : null;
    const getUserName = (id) => {
        const namedUser = users.find(u => u.id === parseInt(id, 10));
        return namedUser ? namedUser.name ? namedUser.name : namedUser.username : '';
    }
    const reviewsList = reviews && reviews.map(review => {
        return (
            <div className={'row detail'} onClick={() => editReview(review.id)} key={review.id}>
                <div className={'reviewee'}>{getUserName(review.revieweeId)}</div>
                <div className={`status ${review.status}`} onClick={(e)=>{viewDetails(e,review.status, review.id)}}>{review.status}</div>
                <div className={'username'}>{getUserName(review.reviewerId)}</div>
            </div>
        );
    });

    return (
        <div className={'Reviews'}>
            {modal}
            <div className={'add'} onClick={() => editReview(undefined)}>Add review</div>
            <div className={'row head'}>
                <div className={'reviewee'}>Reviewee</div>
                <div className={'status'}>Status</div>
                <div className={'username'}>Reviewer</div>
            </div>
            {reviewsList}
        </div>
    );
}

export default Reviews;