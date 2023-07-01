import React from 'react'
import styled from 'styled-components';

const Contact = () => {
  return (
    <Container>
       <div>
            <p>Don't be a Stranger.</p>
            <h1>Contact Me.</h1>
       </div>
       <div className="box">
           <div>
                <p>Let's Work Together.</p>
                <p>Drop Me A Email.</p>
           </div>
           <div className='email-box'>
                <a className='email-btn' href="mailto:hkravi2002@gmail.com">Email</a>
                <p>Email : hkravi2002@gmail.com</p>
           </div>
       </div>  
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .box {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 40px;
    }

    .email-box {
        display: flex;

    }

    .email-btn {
        font-family: var(--mono);
        margin: 0 40px;
        width: 10%;
        height: 40px;
        border-radius: 10px;
        padding: 1rem 3rem 1rem 2rem;
        background-color: var(--lightpurple);
        &:hover {
            background-color: var(--dkpurple);
            color: var(--dkblue);
        }
        color: var(--gray);
        text-decoration: none;
    }
`;

export default Contact