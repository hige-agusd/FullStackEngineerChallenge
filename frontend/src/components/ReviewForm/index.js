import React, { Fragment, useState, useContext } from 'react';
import axios from '../../axios-instance';
import ReviewsContext from '../../hoc/Reviews/context';
import UsersContext from '../../hoc/Users/context';
import AuthUserContext from '../../hoc/Session/context';
import './ReviewForm.css';

const ReviewForm = (props) => {

    const {reviews, refreshReviews} = useContext(ReviewsContext);
    const {users} = useContext(UsersContext);
    const {authUser} = useContext(AuthUserContext);

    let editReview = {};
    if (props.reviewId) {
        editReview = reviews.find(r => r.id === props.reviewId);
    }
    const [review, setReview] = useState({
        status: 'pending',
        revieweeId: undefined,
        reviewerId: undefined,
        details: undefined,
        ...editReview
    });

    const [errorMsg, setErrorMsg] = useState('');

    const change = event => {
        const newReview = {
            ...review,
            [event.target.name]: parseInt(event.target.value, 10)
        };
        setReview(newReview);
    }

    const submit = (e) => {
        e.preventDefault();
        setErrorMsg('')
        const method = props.reviewId ? 'put' : 'post';
        axios[method]('/reviews', {review}).then(() => {
            refreshReviews();
        }).catch((err) => {
            setErrorMsg(err.response.data.message);
        }).finally(() => {
            props.cb();
        });
    };


    let {revieweeId, reviewerId} = review;
    const duplicatedReview = !props.reviewId && reviews.find(r => +r.revieweeId === +revieweeId && +r.reviewerId === +reviewerId && r.status === 'pending');
    const disableBtn = !revieweeId || !reviewerId || duplicatedReview;
    return (
        <div className={'ReviewForm'}>
            <h1>{`${props.reviewId ? 'Edit' : 'Add'} Review`}</h1>
            <form onSubmit={submit}>
                <select
                    value={revieweeId}
                    name="revieweeId"
                    onChange={change}>
                    <option value={undefined}>Select the Employee to be reviewed</option>
                    {users.filter(u => u.id !== authUser.id).map(option => (
                        <Fragment>
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        </Fragment>
                    ))}
                </select>
                <select
                    value={reviewerId}
                    name="reviewerId"
                    disabled={!revieweeId}
                    onChange={change}>
                    <option value={undefined}>Select the Employee to perform the review</option>
                    {users.filter(u => u.id !== revieweeId && u.id !== authUser.id).map(option => (
                        <Fragment>
                            <option key={option.id} value={option.id}>
                                {option.name || option.username}
                            </option>
                        </Fragment>
                    ))}
                </select>
                { duplicatedReview ? <p>Duplicated Review</p> : null}

                <button type="submit" disabled={disableBtn}>
                    {props.reviewId ? 'Update' : 'Add'}
                </button>
                { errorMsg ? <p>{errorMsg}</p> : null}
            </form>
        </div>
    )
}

export default ReviewForm;