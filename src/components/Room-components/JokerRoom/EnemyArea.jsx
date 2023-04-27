import React, { useState } from 'react';
import { Line } from 'rc-progress';
import styled from 'styled-components';
import { useJokerGameState } from '../../../contexts/JokerGameContext';

const EnemyAreaContainer = styled.div`
    width: 100%;
    height: 20%;

    position: fixed;
    top: 8%;
    left: 0;
`;

const ExpreesionContainer = styled.div`
    width: 100%;
    height: 20%;

    text-align: center;

    font-size: 1.5rem;
    color: ${props => props.theme.fontColor};
`;

const EnemyArea = (props) => {
    const { expression } = useJokerGameState();
    const [percent, setPercent] = useState(0);

    return (
        <EnemyAreaContainer>
            <ExpreesionContainer theme={props.theme}>
                <p>Expreesion : {expression}</p>
            </ExpreesionContainer>
            <Line percent={percent} strokeWidth="4" strokeColor="#D3D3D3" max="30" />
        </EnemyAreaContainer>
    )
}

export default EnemyArea;