import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from '../../axios-instance';
import { useAuthUserContext } from '../../hoc/Session/context';
import './Login.css';

const Login = () => {

    const {setAuthUser} = useAuthUserContext();

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
        
    const [errorMsg, setErrorMsg] = useState('');

    const history = useHistory();
    
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
            history.push('/');
        }).catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMsg(err.response.data.message);
            } else {
                setErrorMsg(err);
            }
            setAuthUser(null);
        });
    };

    let {username, password} = credentials;
    const disableBtn = !username || !password;
    
    return (
        <div className={'Login'}>
            <form onSubmit={submit}>
                <input type="text" placeholder="username" name="username" value={username} onChange={change} />
                <input type="password" placeholder="password" name="password" value={password} onChange={change} />
                <button type="submit" disabled={disableBtn}>Login</button>
                { errorMsg ? <p className={'error-msg'}>{errorMsg}</p> : null}
            </form>
        </div>
    )
}

export default Login;