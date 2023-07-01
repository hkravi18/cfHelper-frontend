import React from 'react'
import loader from '../assets/loader.gif';
import styled from 'styled-components'

const Loading = () => {
  return (
    <Container>
        <img src={loader} alt="loader"/>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
`;

export default Loading