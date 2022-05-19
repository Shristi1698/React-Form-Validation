import React, { useState } from 'react';
import Card from '../UI/Card.js';
import Button from '../UI/Button.js'
import classes from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal.js';
const AddUser = props => {
    const [enteredUserName, setEnteredUserName] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();
    const userHandler = (event) => {
        event.preventDefault();
        if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter valid Name and Age (non empty values)'
            });
            return;
        }
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter valid Age (greater than 1)'
            });
            return;
        }
        props.onAddUser(enteredUserName, enteredAge);
        setEnteredUserName('');
        setEnteredAge('');
    }
    const userNameChangeHandler = (event) => {
        setEnteredUserName(event.target.value);
    }
    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    }
    const ErrorHandler = () => {
        setError(null);
    }
    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={ErrorHandler} />};
            <Card className={classes.input}>
                <form onSubmit={userHandler}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={enteredUserName} onChange={userNameChangeHandler} />
                    <label htmlFor="age">Age (Years)</label>
                    <input type="number" id="age" value={enteredAge} onChange={ageChangeHandler} />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    );
};

export default AddUser;