import React, { useState, useContext } from 'react';
import axios from '../../axios-instance';
import ReviewsContext from '../../hoc/Reviews/context';

const reviewDetailsForm = (props) => {

    const {reviews, refreshReviews} = useContext(ReviewsContext);

    let editReview = {};
    if (props.reviewId) {
        console.log(props.reviewId);
        editReview = reviews.find(r => r.id === props.reviewId);
        console.log(editReview);
    }
    const [review, setReview] = useState({
        status: 'pending',
        revieweeId: undefined,
        reviewerId: undefined,
        details: {    
            quality: undefined,
            speed: undefined,
            communication: undefined,
            teamwork: undefined
        },
        ...editReview
    });

    
    const [errorMsg, setErrorMsg] = useState('');
    
    const change = event => {
        const details = {
            ...review.details,
            [event.target.name]: parseInt(event.target.value, 10)
        }
        const newReview = {
            ...review,
            details
        };
        setReview(newReview);
    }

    const submit = (e) => {
        e.preventDefault();
        setErrorMsg('')
        const newReview = {...review};
        newReview.status = 'submitted';
        const method = props.reviewId ? 'put' : 'post';
        axios[method]('/reviews', {review: newReview}).then(() => {
            refreshReviews();
        }).catch((err) => {
            setErrorMsg(err.response.data.message);
        }).finally(() => {
            props.cb();
        });
    };


    let {quality, speed, communication, teamwork} = review.details;
    const disableBtn = !quality || !speed || !communication || !teamwork || props.readonly;
    console.log(props);
   
    return (
        <form onSubmit={submit}>
            <label>Quality:</label>
            <input
                type="number" min="0" max="10" step="1"
                value={quality}
                disabled={props.readonly}
                name="quality"
                placeholder="quality"
                onChange={change} />
            <label>Speed:</label>
            <input
                type="number" min="0" max="10" step="1"
                value={speed}
                disabled={props.readonly}
                name="speed"
                placeholder="speed"
                onChange={change} />
            <label>Communication:</label>
            <input
                type="number" min="0" max="10" step="1"
                value={communication}
                disabled={props.readonly}
                name="communication"
                placeholder="communication"
                onChange={change} />
            <label>Teamwork:</label>
            <input
                type="number" min="0" max="10" step="1"
                value={teamwork}
                disabled={props.readonly}
                name="teamwork"
                placeholder="teamwork"
                onChange={change} />

            <button type="submit" disabled={disableBtn}>
                Submit Review
            </button>
            { errorMsg ? <p>{errorMsg}</p> : null}
        </form>
    )
}

export default reviewDetailsForm;