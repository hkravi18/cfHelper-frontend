import React, { useState, useEffect, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import styled from 'styled-components';
import timestamp from 'unix-timestamp';

import { showPastContest } from '../utils/APIRoutes';
import Loading from './Loading';
import { toastOptions } from '../utils/ToastOptions';
import { secToDate } from '../utils/SecToDate';
import { showUsersContestPerf } from '../utils/APIRoutes';

const ShowPastContest = ({ setId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [contests, setContests] = useState([]);
    const [usersPerf, setUsersPerf] = useState({});
    const [reqSend, setReqSend] = useState(false);
    
    useEffect(() => {
        const getContests = async() => {
            const { data } = await axios.get(showPastContest);
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

    // const handleSubmit = async(id) => {
    //     await localStorage.setItem('cf-contest-id', JSON.stringify(id))
    //     navigate(`/showUsersContestPerf`);
    // };

    const handleSubmit = async(id) => {
        setIsLoading(true);   
        setReqSend(true); 
        const { data } = await axios.post(showUsersContestPerf, { id });
        if (data.status === "OK") {
            setUsersPerf(data.usersPerf);
            toast.success(data.msg, toastOptions);
        } else {
            toast.error(data.msg, toastOptions);
        }
        setIsLoading(false);
    }

    return (
    <div>
        {isLoading && <Loading />}
        {!isLoading && !reqSend && (
            <Container1>
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
                            <div className='box'><button onClick={() => handleSubmit(contest.id)}>Show Users Performance</button></div>
                        </div>
                    </>)
                })}
            </Container1>
        )}
        { !isLoading && reqSend && (
                    <Container2>
                    <table cellSpacing={0} cellPadding={0}>
                        <thead>
                        <tr>
                            <th>Problems</th>
                            {usersPerf.problems.map((problem, index) => {
                                return (
                                    <th>{problem.index}</th> 
                                )     
                            })}
                            <th>Rank</th>
                            <th>Problems Solved</th>
                        </tr>
                        <tr>
                            <th>Users</th>
                            {usersPerf.problems.map((problem, index) => {
                                return (
                                    <th>{problem.name}</th>
                                )     
                            })}
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                           {usersPerf.rows.CONTESTANT.map((user, index) => {
                                return (
                                    <tr>
                                        <td>{user.handle}</td>
                                        {user.problemResults.map((problemVerdict, index) => {
                                            const pts = problemVerdict.points;
                                            const attempt = problemVerdict.rejectedAttemptCount;
                                            if (pts === 0 && !attempt) return <td>0</td>
                                            if (pts === 0 && attempt) return <td style={{ color: "red" }}>-{attempt}</td>
                                            if (pts > 0 && !attempt) return <td style={{ color: "green" }}>+{pts}</td> 
                                            if (pts > 0 && attempt) return <td style={{ color: "green"}}>+{pts}(<span style={{ color: "red" }}>-{attempt}</span>)</td>
                                        })}
                                        <td>{user.rank}</td>
                                        <td>{user.points}</td>
                                    </tr>
                                ) 
                            })}
                        </tbody>    
                    </table>
                    </Container2>
                )}
        <ToastContainer />
    </div>
  )
}

const Container1 = styled.div`
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
        margin: 4px;
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

    .contest .box button {
        width: 100%;
        border: 2px solid var(--dkblue);
        background-color: var(--lightpurple); 
        &:hover {
            background-color: var(--dkpurple);
        }
        color: var(--white);
        border-radius: 20px;
        font-size: 1.4rem;
        padding: 10px;
    }

`; 

const Container2 = styled.div`
    table {
        border: none;
        margin: 6px;
        min-width: 100vw;
    }
    
    tbody tr:nth-of-type(odd) {
        background-color: var(--dkblue);
    }

    tbody tr {
        height: 100px;
    }

    td {
        text-align: center;
    }

    thead {
        background-color: var(--dkblue);
        border: 1px solid var(--gray);
    }

    thead th {
        margin: 4px;
    }
    
`;

export default ShowPastContest