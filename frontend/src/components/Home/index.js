import React, { Fragment, useContext } from 'react';
import './Home.css';
import AuthUserContext from '../../hoc/Session/context';
import Login from '../Login';
import AdminView from '../../containers/Admin';
import UserView from '../../containers/User';

const home = (props) => {
    const {authUser, setAuthUser} = useContext(AuthUserContext);

    const view = authUser ? 
        <Fragment>
            <div className={'header'}>
                <span onClick={() => {setAuthUser(null)}}>Logout</span>
            </div>
            {authUser.role === 'admin' ? <AdminView /> : <UserView />}
        </Fragment>
        : <Login />
        
    const divStyle = {height: 'calc(100% - 125px)',
        fallbacks: [
            { height: '-moz-calc(100% - 125px)' },
            { height: '-webkit-calc(100% - 125px)' },
            { height: '-o-calc(100% - 125px)' }
        ]
    }
    return (
        <section className={'Home'} style={divStyle}>
            {view}
        </section>
    )
}

export default home;