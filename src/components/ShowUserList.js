import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import styled from 'styled-components';

import { showUserList } from '../utils/APIRoutes';
import Loading from './Loading';
import { toastOptions } from '../utils/ToastOptions';
import { colorCoding } from '../utils/ColorCoding';

const ShowUserList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const getAllUsers = async() => {
            const { data } = await axios.get(showUserList);
            if (data.status === "OK" && data.usersList.length > 0) {
                toast.success(data.msg, toastOptions);
                setUsers(data.usersList);
            } else if (data.status === "OK" && data.usersList.length === 0) {
                toast.info("User List is Empty.", toastOptions);
                setUsers(data.usersList);
            } else {
                toast.error(data.msg, toastOptions);
            }
        };
        getAllUsers();
        setIsLoading(false);
    }, []);

    return (
    <div>
        {
            isLoading ? <Loading /> : (
            <Container>
                {users.map((user, index) => {
                    return (<>
                        <div className='user'>
                            <div className="box">{user.username}</div>
                            <div className="box" style={{ color : colorCoding(user.rating, undefined), }}>{user.rating}</div>
                            <div className='box' style={{ color : colorCoding(undefined, user.rank), }}>{user.rank}</div>   
                        </div>
                    </>)
                })}
            </Container>
            )
        }
        <ToastContainer />
    </div>
  )
}

const Container = styled.div`
    width: 100vw;
    font-family: var(--mono);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;

    .user {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        min-width: 100vw;
        text-align: center;
        margin: 10px;
        flex-wrap: nowrap;
    }

    .box {
        border: 2px solid var(--gray);
        background-color: var(--dkblue);
        flex-basis: 30%; 
        color: var(--gray);
        border-radius: 10px;
    }
`; 

export default ShowUserList