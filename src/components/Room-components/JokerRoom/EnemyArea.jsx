import React, { useState, useEffect } from 'react';
import { Line } from 'rc-progress';
import styled from 'styled-components';
import { useJokerGameState } from '../../../contexts/JokerGameContext';
import { useUserState } from '../../../contexts/UserContext';

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
    const { enemyExpression } = useJokerGameState();
    const [percent, setPercent] = useState(0);
    const { myTurn } = useJokerGameState();
    const { room } = useUserState();
    const [ robot, setRobot ] = useState(true);

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
            setRobot(!robot);
            setPercent(percent + 5);
        }
    }

    return (
        <EnemyAreaContainer>
            <ExpreesionContainer theme={props.theme}>
                { room == 0 ? <img src={enemyExpression} alt="expression-emoji" /> :
                 robot ?
                 <img src="./images/emoji/robot1.png" alt="expression-emoji" />
                : <img src="./images/emoji/robot2.png" alt="expression-emoji" />
                }
            </ExpreesionContainer>
            <Line percent={percent} strokeWidth="2" strokeColor="#D3D3D3" max="30" />
        </EnemyAreaContainer>
    )
}

export default EnemyArea;