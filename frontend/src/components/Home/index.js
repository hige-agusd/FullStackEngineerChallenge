import React, { Fragment, useContext } from 'react';
import { useHistory } from 'react-router';
import './Home.css';
import AuthUserContext from '../../hoc/Session/context';
import AdminView from '../../containers/Admin';
import UserView from '../../containers/User';

/**
 * Home
 * Main section. If not logged in, redirects to Login
 * If logged in, shows Admin or User view, according to role
 */
const Home = () => {
    const {authUser, setAuthUser} = useContext(AuthUserContext);

    const history = useHistory();
    if (!authUser) {
        history.push('/login');
    }

    const view = authUser ? 
        <Fragment>
            <div className={'header'}>
                <span onClick={() => {setAuthUser(null)}}>Logout</span>
            </div>
            {authUser && authUser.role === 'admin' ? <AdminView /> : <UserView />}
        </Fragment>
        : null
        
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

export default Home;