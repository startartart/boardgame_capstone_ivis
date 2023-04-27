import React from 'react';
import styled from 'styled-components';

const ReusltContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    width: 50%;
    height: 50%;
`;


const Result = () => {
    return (
        <ReusltContainer>
        </ReusltContainer>
    )
}

export default Result;