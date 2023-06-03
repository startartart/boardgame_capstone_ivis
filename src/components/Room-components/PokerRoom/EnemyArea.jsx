import React, { useState, useEffect } from 'react';
import { Line } from 'rc-progress';
import styled from 'styled-components';
import { usePokerGameState } from '../../../contexts/PokerGameContext';
import BubbleSpeech from '../PokerRoom/BubbleSpeech';

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
    const [percent, setPercent] = useState(0);
    const { enemyExpression, myTurn, enemyGuess } = usePokerGameState();

    useEffect(() => {
        if (myTurn == 0) {
            const timer = setInterval(increase, 1000);
            return () => {
                clearInterval(timer);
            }
        } else {
            setPercent(0);
        }
    }, [myTurn, percent]);

    const increase = () => {
        if (percent >= 100) {
            setPercent(0);
        } else {
            setPercent(percent + 5);
        }
    }

    return (
        <EnemyAreaContainer>
            <BubbleSpeech guess={enemyGuess}></BubbleSpeech>
            <ExpreesionContainer theme={props.theme}>
                <img src={enemyExpression} alt="expression-emoji" />
            </ExpreesionContainer>
            <Line percent={percent} strokeWidth="4" strokeColor="#D3D3D3" max="30" />
        </EnemyAreaContainer>
    )
}

export default EnemyArea;