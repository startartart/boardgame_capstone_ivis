import React, { useState, useEffect } from 'react';
import { Line } from 'rc-progress';
import { usePokerGameState } from '../../../contexts/PokerGameContext';
import { TimeOutSocketEvent } from '../../../events/JokerGameSocket';
import styled from 'styled-components';
import BubbleSpeech from './BubbleSpeech';

const MyAreaContainer = styled.div`
    width: 100%;
    height: 20%;

    position: fixed;

    top: 75%;
    left: 0;
`;

const ExpreesionContainer = styled.div`
    width: 100%;
    height: 20%;

    text-align: center;

    font-size: 1.5rem;
    color: ${props => props.theme.fontColor};
`;

const MyArea = (props) => {
    const [percent, setPercent] = useState(0);
    const { myTurn, expression, guess, answer, select, select_card } = usePokerGameState();

    // myTurn이 true일 때, select_card가 변할 때마다 percent를 0으로 초기화
    useEffect(() => {   
        if (myTurn == 1|| select_card == 2) {
            const timer = setInterval(increase, 1000);
            return () => {
                clearInterval(timer);
            }
        } else {
            setPercent(0);
        }
    }, [myTurn, percent, select_card]);


    const increase = () => {
        if (percent >= 100) {
            TimeOutSocketEvent();
            setPercent(0);
        } else {
            // if select_card is 1 or 3 time stop
            if (select_card == 3) {
                setPercent(0);
            } else if (myTurn == 1 && select_card == 2) {
                setPercent(0);
            }
            else {
                setPercent(percent + 7);
            }
        }
    }

    return (
        <MyAreaContainer>
            <Line percent={percent} strokeWidth="2" strokeColor="#D3D3D3" max="30" />
            <BubbleSpeech answer={answer} direction={"right"}/>
            <BubbleSpeech answer={answer} direction={"left"} area={"mine"}/>
            <ExpreesionContainer theme={props.theme}>
                <img src={expression} alt="expression-emoji" />
            </ExpreesionContainer>
        </MyAreaContainer>
    )
}

export default MyArea;