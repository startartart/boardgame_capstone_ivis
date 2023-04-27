import React, { useState, useEffect } from 'react';
import { Line } from 'rc-progress';
import { useJokerGameState, useJokerGameDispatch } from '../../../contexts/JokerGameContext';
import { TimeOutSocketEvent } from '../../../events/JokerGameSocket';
import styled from 'styled-components';

const MyAreaContainer = styled.div`
    width: 100%;
    height: 20%;

    position: fixed;
    top: 65%;
    left: 0;
`;

const MyArea = (props) => {
    const [percent, setPercent] = useState(0);
    const jokerGameDispatch = useJokerGameDispatch();
    const { myTurn } = useJokerGameState();

    console.log(myTurn);

    // myTurn이 true일 때만 percent를 증가시킨다.
    useEffect(() => {
        if (myTurn) {
            const timer = setInterval(increase, 1000);
            return () => {
                clearInterval(timer);
            }
        } else {
            setPercent(0);
        }
    }, [myTurn, percent]);

    const increase = () => {
        console.log("increase", percent);
        if (percent >= 100) {
            TimeOutSocketEvent();
            setPercent(0);
        } else {
            setPercent(percent + 3);
        }
    }

    return (
        <MyAreaContainer>
            <Line percent={percent} strokeWidth="4" strokeColor="#D3D3D3" max="30" />
        </MyAreaContainer>
    )
}

export default MyArea;