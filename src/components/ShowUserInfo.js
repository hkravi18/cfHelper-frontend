import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import { toastOptions } from '../utils/ToastOptions';
import { showUserInfo } from '../utils/APIRoutes';
import Loading from './Loading';
import { colorCoding } from '../utils/ColorCoding';

const ShowUserInfo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const [reqSend, setReqSend] = useState(false);
    const [userName, setUserName] = useState("");

    const handleSubmit = async() => {
        setIsLoading(true);
        setReqSend(true);
        const { data } = await axios.post(showUserInfo, { userName });
        if (data.status === "OK") {
            toast.success(data.msg, toastOptions);
        } else {
            toast.error(data.msg, toastOptions);
        }
        console.log(data);
        setUser(data.user);
        setIsLoading(false);
    }


    
    
    return (
    <>    
        { isLoading && <Loading />}
        {
            !reqSend && !isLoading && (
                <Container1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor='username'>Enter User Name</label>
                        <input type='text' name="username" placeholder='enter user name' value={userName} onChange={e => setUserName(e.target.value)}/>
                        <button type='submit'>Add</button>
                    </form>
                </Container1>
            )
        } 
        {
            reqSend && !isLoading && (
                <Container2>
                    <div className='user-info'>
                        <div className='box' style={{ color : colorCoding(user.rating)}}><span>Handle : </span> {user.handle}</div>
                        <div className='box' style={{ color : colorCoding(user.rating)}}><span>Rating :</span> {user.rating}</div>
                        <div className='box' style={{ color : colorCoding(user.rating)}}><span>Rank : </span> {user.rank}</div>
                        <div className='box'>Friends Count: {user.friendOfCount}</div>
                        <div className='box' style={{ color : colorCoding(user.maxRating, undefined)}}><span>MaxRating : </span> {user.maxRating}</div>
                        <div className='box' style={{ color : colorCoding(undefined, user.maxRank)}}><span>MaxRank : </span> {user.maxRank}</div>
                        <div className='box'>Contribution : {user.contribution}</div>
                    </div>
                    <div className='user-pic'>
                        <img src={user.avatar} alt="user-pic"/>
                    </div>
                </Container2>
            )
        }      
        <ToastContainer />
    </>
    )
}

const Container1 = styled.div`
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

const Container2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 40px;
        gap: 1rem;
    } 

    .user-pic {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            border: 2px solid var(--gray);
            height: 40%;
            padding: 10px;
        }
    }

    .box {
        border: 2px solid var(--gray);
        background-color: var(--dkblue);
        color: var(--white);
        text-align: center;
        min-width: 90%;
        border-radius: 20px;

        span {
            color: var(--white);
        }
    }
`;

export default ShowUserInfo