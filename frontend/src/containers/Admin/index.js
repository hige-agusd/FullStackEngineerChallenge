import React, { Component } from 'react';
import axios from '../../axios-instance';
import TabSelector from '../../components/UI/TabSelector';
import Employees from '../../components/Employees';
import Reviews from '../../components/Reviews';
import ReviewsContext from '../../hoc/Reviews/context';
import './Admin.css';

export default class AdminView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sections: ['employees', 'reviews'],
            selectedTab: 'employees',
            reviews: []
        }
    }

    tabSelectedHandler = (selectedTab) => {
        this.setState({selectedTab});
    }

    componentDidMount() {
        this.loadReviews();
    }

    loadReviews = () => {
        axios.get('/reviews').then(res => {
            this.setState({reviews: res.data.reviews})
        }).catch(err => {
            console.log(err);
        });
    }  

    render() {

        let selectedView;
        switch(this.state.selectedTab) {
            case 'employees': selectedView = (
                    <Employees  />
            ); 
            break;
            case 'reviews': selectedView = (
                <ReviewsContext.Provider value={{reviews: this.state.reviews, refreshReviews: this.loadReviews}} >
                    <Reviews reviews={this.state.reviews} />
                </ReviewsContext.Provider>
            ); 
            break;
            default: selectedView = null;
        }
        

        return (
            <section className={'AdminView'}>
                <TabSelector selected={this.state.selectedTab} tabs={this.state.sections} click={this.tabSelectedHandler} />
                {selectedView}
            </section>
        );
    }

}