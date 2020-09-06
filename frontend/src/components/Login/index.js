import React, { useState, useContext } from 'react';
import axios from '../../axios-instance';
import AuthUserContext from '../../hoc/Session/context';
import './Login.css';

const login = (props) => {

    const {setAuthUser} = useContext(AuthUserContext);

    const [credentials, setCredentials] = useState({
        username: 'admin',
        password: '1234'
    });
        
    const [errorMsg, setErrorMsg] = useState('');

    const change = event => {
        const newCredentials = {
            ...credentials,
            [event.target.name]: event.target.value
        };
        setCredentials(newCredentials);
    }

    const submit = (e) => {
        e.preventDefault();
        setErrorMsg('')
        axios.post('/login', credentials).then(res => {
            const {data: {user = {}} = {}} = res;
            setAuthUser(user);
        }).catch((err) => {
            setErrorMsg(err.response.data.message);
            setAuthUser(null);
            // authUser = null;
        });
    };

    let {username, password} = credentials;
    
    return (
        <div className={'Login'}>
            <form onSubmit={submit}>
                <input type="text" placeholder="username" name="username" value={username} onChange={change} />
                <input type="password" placeholder="password" name="password" value={password} onChange={change} />
                <button type="submit">Login</button>
                { errorMsg ? <p>{errorMsg}</p> : null}
            </form>
        </div>
    )
}

export default login;