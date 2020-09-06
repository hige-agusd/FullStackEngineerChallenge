import React, { Component } from 'react';
import axios from '../../axios-instance';
import TabSelector from '../../components/UI/TabSelector';
import UserReviews from '../../components/UserReviews';
import AuthUserContext from '../../hoc/Session/context';
import ReviewsContext from '../../hoc/Reviews/context';
import './User.css';

/**
 * UserView
 * Loads the reviews assinged to the current user
 * With that and the Users list from the Context, it lists the pending reviews
 */
export default class UserView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sections: {
                reviews: []
            },
            selectedTab: 'reviews',
        }
    }

    static contextType = AuthUserContext;

    tabSelectedHandler = (selectedTab) => {
        this.setState({selectedTab});
    }

    componentDidMount() {
        this.loadReviews();
    }

    loadReviews = () => {
        axios.get(`/reviews/${this.context.authUser.id}`).then(res => {
            const newState = {...this.state};
            newState.sections.reviews = res.data.reviews.filter(r => r.status === 'pending');
            this.setState(newState)
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        let selectedView;
        switch(this.state.selectedTab) {
            case 'reviews': selectedView = (
                <ReviewsContext.Provider value={{reviews: this.state.sections.reviews, refreshReviews: this.loadReviews}} >
                    <UserReviews reviews={this.state.sections.reviews} />
                </ReviewsContext.Provider>
            ); 
            break;
            default: selectedView = null;
        }
        

        return (
            <section className={'UserView'}>
                <TabSelector selected={this.state.selectedTab} tabs={Object.keys(this.state.sections)} click={this.tabSelectedHandler} />
                { selectedView }
            </section>
        );
    }

}