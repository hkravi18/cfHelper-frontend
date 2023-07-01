import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import styled from 'styled-components';
import timestamp from 'unix-timestamp';

import { showUpcomingContest } from '../utils/APIRoutes';
import Loading from './Loading';
import { toastOptions } from '../utils/ToastOptions';
import { secToDate } from '../utils/SecToDate';

const ShowUpcomingContest = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [contests, setContests] = useState([]);
    
    useEffect(() => {
        const getContests = async() => {
            const { data } = await axios.get(showUpcomingContest);
            if (data.status === "OK") {
                toast.success(data.msg, toastOptions);
                setContests(data.contests);
            } else {
                toast.error(data.msg, toastOptions);
            }
        };
        getContests();
        setIsLoading(false);
    }, []);

    return (
    <div>
        {
            isLoading ? <Loading /> : (
            <Container>
                <div className='contest contest-heading'>
                    <div className="box">ID</div>
                    <div className="box">NAME</div>
                    <div className='box'>DURATION</div>
                    <div className='box'>STARTING TIME</div>
                    <div className='box'>TIME LEFT</div>   
                </div>
                {contests.map((contest, index) => {
                    return (<>
                        <div className='contest' key={index}>
                            <div className="box">{contest.id}</div>
                            <div className="box">{contest.name}</div>
                            <div className='box'>{secToDate(contest.duration)}</div>
                            <div className='box'>{timestamp.toDate(contest.startTime).toString()}</div>
                            <div className='box'>{secToDate(Math.abs(contest.relativeTime))}</div>   
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
        flex-basis: 18%; 
        color: var(--white);
        border-radius: 10px;        
    }


`; 

export default ShowUpcomingContest