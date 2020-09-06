import React, { useContext, useState } from 'react';
import EmployeeForm from '../../components/EmployeeForm';
import Modal from '../../components/UI/Modal';
import UsersContext from '../../hoc/Users/context';
import './Employees.css';
 
const employees = (props) => {

    const {users} = useContext(UsersContext);
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState(null);

    const toggleModal = () => setShowModal(!showModal);
    const editUser = (id) => {
        setUserId(id);
        toggleModal();
    }

    const modal = 
            showModal ? <Modal classes={'Form'} show={showModal} modalClosed={toggleModal}>
                <EmployeeForm userId={userId} cb={toggleModal} />
            </Modal>
            : null;

    const employees = users.map(employee => {
        return (
            <div className={'row detail'} onClick={() => editUser(employee.id)} key={employee.id}>
                <div className={'id'}>{employee.id}</div>
                <div className={'name'}>{employee.name}</div>
                <div className={'username'}>{employee.username}</div>
            </div>
        );
    })
    return (
        <div className={'Employees'}>
            {modal}
            <div className={'add'} onClick={() => editUser(undefined)}>Add employee</div>
            <div className={'row head'}>
                <div className={'id'}>Employee ID</div>
                <div className={'name'}>Name</div>
                <div className={'username'}>Username</div>
            </div>
            {employees}
        </div>
    );
}

export default employees;