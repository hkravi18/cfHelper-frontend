import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import styled from 'styled-components';

import { removeUserList } from '../utils/APIRoutes';
import Loading from './Loading';
import { toastOptions } from '../utils/ToastOptions';

const RemoveUserList = () => {
    const [userName, setUserName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        setIsLoading(true); 

        const { data } = await axios.post(removeUserList, {userName});

        if (data.status === "OK") {
            toast.success(data.msg, toastOptions);
            setUserName("");
        } else {
            toast.error(data.msg, toastOptions);
        }

        setIsLoading(false);
        navigate('/removeUserList');
    }
    return (
    <div>
        {
            isLoading ? <Loading /> : (
            <Container>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='username'>Enter User Name</label>
                <input type='text' name="username" placeholder='enter user name' value={userName} onChange={e => setUserName(e.target.value)}/>
                <button type='submit'>Remove</button>
            </form>
            </Container>
            )
        }
        <ToastContainer />
    </div>
  )
}

const Container = styled.div`
    font-family: var(--mono);
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 20px;
        padding: 20px;

        input {
            font-family: var(--mono);
            border: 1px solid gray;
            height: 2rem;
            width: 20%; 
            text-align: center;
            border-radius: 20px;
            background-color: var(--dkblue);
            color: var(--white);
        }

        button {
            font-family: var(--mono);
            font-size: 80%;
            margin: 40px; 
            width: 10%;
            height: 40px;
            border-radius: 10px;
            background-color: var(--lightpurple);
            &:hover {
                background-color: var(--dkpurple);
            }
        }
    }
`; 

export default RemoveUserList