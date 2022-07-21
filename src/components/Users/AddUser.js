import { useRef, useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import styles from "./AddUser.module.css";

const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();
    const [error, setError] = useState();

    const addUserHandler =(event) => {
        event.preventDefault();
        const enteredUsername = nameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;

        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non empty values).'
            });
            return;
        }
        if(+enteredAge < 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid age (> 0).'
            })
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={styles.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input 
                        ref={nameInputRef}
                        type="text" 
                        id="username" />
                    <label htmlFor="age">Age (Years)</label>
                    <input 
                        ref={ageInputRef}
                        type="number" 
                        id="age" />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    )
}

export default AddUser;