import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import styled from 'styled-components';
import timestamp from 'unix-timestamp';

import { showUserSubmission } from '../utils/APIRoutes';
import Loading from './Loading';
import { toastOptions } from '../utils/ToastOptions';

const ShowUserSubmission = () => {
    const [userName, setUserName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [reqSend, setReqSend] = useState(false);
    const [submissions, setSubmissions] = useState([]);
    
    const handleSubmit = async(e) => {
        setIsLoading(true); 
        setReqSend(true);
        const { data } = await axios.post(showUserSubmission, {userName});

        if (data.status === "OK") {
            toast.success(data.msg, toastOptions);
            setSubmissions(data.submissions); 
        } else {
            toast.error(data.msg, toastOptions);
        }

        setIsLoading(false);
    }

    const colorVerdict = (verdict) => {
        if (verdict === "OK") return "green";
        if (verdict === "PARTIAL") return "yellow";
        return "red";
    }

    return (
    <div>
        {isLoading && <Loading />}
        {!isLoading && !reqSend && (
            <Container1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='username'>Enter User Name</label>
                <input type='text' name="username" placeholder='enter user name' value={userName} onChange={e => setUserName(e.target.value)}/>
                <button type='submit'>Add</button>
            </form>
            </Container1>
        )}
        {!isLoading && reqSend && (
            <Container2>
                <div className='problem problem-heading'>
                    <div className="box">INDEX</div>
                    <div className="box">NAME</div>
                    <div className='box'>TAGS</div>
                    <div className='box'>PROGRAMMING LANGUAGE</div>
                    <div className='box'>SUBMISSION TIME</div>   
                    <div className='box'>VERDICT</div>
                </div>
                {submissions.map((problem, index) => {
                    return (<>
                        <div className='problem' key={index}>
                            <div className="box">{problem.index}</div>
                            <div className="box">{problem.name}</div>
                            <div className='box tags'>{
                                problem.tags.map((tag, index) => {
                                    return <div className='tag'>{tag}</div>
                                })
                            }</div>
                            <div className='box'>{timestamp.toDate(problem.creationTimeSeconds).toString()}</div>
                            <div className='box'>{problem.programmingLanguage}</div>
                            <div className='box' style={{ color: colorVerdict(problem.verdict)}}>{problem.verdict}</div>   
                        </div>
                    </>)
                })}
            </Container2>
        )}
        <ToastContainer />
    </div>
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
    font-size: 1rem;



    .problem {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        min-width: 100vw;
        text-align: center;
        margin: 10px;
        flex-wrap: nowrap;
    }

    .problem-heading {
        background-color: var(--dkblue);
        color: var(--white);
    }

    .box {
        border: 2px solid var(--gray);
        background-color: var(--dkblue);
        flex-basis: 18%; 
        color: var(--white);
        border-radius: 10px;        
    }


`; 

export default ShowUserSubmission