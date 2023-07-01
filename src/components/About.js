import React from 'react'
import styled from 'styled-components';

const About = () => {
  return (
    <Container>
        <div className='info'>
            <h2 style={{ color: "#9575DE" }}>Hi All!</h2>
            <p>I am Harshit Kumar Ravi, currently pursuing BTech in Computer Science from Indian Institute of Technology Ropar. I love to code specially in Web Development.</p>
            <p>Feel Free to contact me. I'm always interest in hearing about new opportunities.</p>
        </div>
        <div className='pic'>
            <img />
        </div>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    .info {
      display: flex;
      flex-direction: column;
    }

    .info h2 {
      margin: 10px;
    } 
   
    .info p {
      margin: 10px;
    }
`;

export default About