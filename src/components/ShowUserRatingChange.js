import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import { toastOptions } from '../utils/ToastOptions';
import { showUserRatingChange } from '../utils/APIRoutes';
import Loading from './Loading';
import { colorCoding } from '../utils/ColorCoding';

const ShowUserRatingChange = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userRatingChanges, setUserRatingChanges] = useState([]);
    const [reqSend, setReqSend] = useState(false);
    const [userName, setUserName] = useState("");

    const handleSubmit = async() => {
        setIsLoading(true);
        setReqSend(true);
        const { data } = await axios.post(showUserRatingChange, { userName });
        if (data.status === "OK") {
            toast.success(data.msg, toastOptions);
        } else {
            toast.error(data.msg, toastOptions);
        }
        setUserRatingChanges(data.userRatingChange);
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
                    <div className='contest contest-heading'>
                        <div className="box">ID</div>
                        <div className="box">NAME</div>
                        <div className='box'>RANK</div>
                        <div className='box'>OLD RATING</div>
                        <div className='box'>NEW RATING</div>   
                        <div className='box'>RATING CHANGE</div>   
                    </div>
                    {userRatingChanges.map((contest, index) => {
                        return (<>
                            <div className='contest' key={index}>
                                <div className="box">{contest.contestId}</div>
                                <div className="box">{contest.contestName}</div>
                                <div className='box' style={{ color : colorCoding(undefined, contest.rank)}} >{contest.rank}</div>
                                <div className='box' style={{ color : colorCoding(contest.oldRating, undefined)}}>{contest.oldRating}</div>
                                <div className='box' style={{ color : colorCoding(contest.newRating, undefined)}}>{contest.newRating}</div>
                                <div className='box' style={{ color : contest.oldRating > contest.newRating ? "red" : "green"}}>{contest.oldRating > contest.newRating ?  "-"  : "+"}{Math.abs(contest.oldRating - contest.newRating)}</div>
                            </div>
                        </>)
                    })}
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
    width: 100vw;
    font-family: var(--mono);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;



    .contest {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        min-width: 100vw;
        text-align: center;
        margin: 10px;
        flex-wrap: nowrap;
    }

    .contest-heading {
        background-color: var(--dkblue);
        color: var(--white);
    }

    .box {
        border: 2px solid var(--gray);
        background-color: var(--dkblue);
        flex-basis: 14%; 
        color: var(--white);
        border-radius: 10px;        
    }
`;

export default ShowUserRatingChange