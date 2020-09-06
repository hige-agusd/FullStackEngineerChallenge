import React, { useState, useContext } from 'react';
import axios from '../../axios-instance';
import AuthUserContext from '../../hoc/Session/context';
import UsersContext from '../../hoc/Users/context';

const employeeForm = (props) => {

    const {users, refreshUsers} = useContext(UsersContext);
    const {authUser} = useContext(AuthUserContext);

    let editUser = {};
    if (props.userId) {
        editUser = users.find(u => u.id === props.userId);
    }
    const [user, setUser] = useState({
        username: '',
        name: '',
        password: '',
        ...editUser
    });

        
    const [errorMsg, setErrorMsg] = useState('');

    const change = event => {
        const newUser = {
            ...user,
            [event.target.name]: event.target.value
        };
        setUser(newUser);
    }

    const submit = (e) => {
        e.preventDefault();
        setErrorMsg('')
        const method = props.userId ? 'put' : 'post';
        axios[method]('/users', {user}).then(() => {
            refreshUsers();
            props.cb();
        }).catch((err) => {
            setErrorMsg(err.response.data.message);
        });
    };

    const deleteUser = (e) => {
        e.preventDefault();
        setErrorMsg('');
        axios.delete(`/users/${props.userId}`).then(() => {
            refreshUsers();
        }).catch((err) => {
            setErrorMsg(err.message);
        }).finally(() => {
            props.cb();
        });

    }

    let {username, password, name} = user;
    const disableBtn = !username || !password || !name;
    
    return (
        <div className={'EmployeeForm'}>
            <h1>{`${props.userId ? 'Edit' : 'Add'} Employee`}</h1>
            <form onSubmit={submit}>
                <input type="text" placeholder="name" name="name" value={name} onChange={change} />
                <input type="text" placeholder="username" name="username" value={username} onChange={change} />
                <input type="password" placeholder="password" name="password" value={password} onChange={change} />
                { errorMsg ? <p>{errorMsg}</p> : null}
                <button type="submit" disabled={disableBtn}>{props.userId ? 'Update' : 'Add'}</button>
                {props.userId && props.userId !== authUser.id ? <p className={'delete'} onClick={deleteUser}>Delete User</p> : null }
            </form>
        </div>
    )
}

export default employeeForm;