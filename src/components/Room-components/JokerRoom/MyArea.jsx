import React, { useState, useEffect } from 'react';
import { Line } from 'rc-progress';
import { useJokerGameState, useJokerGameDispatch } from '../../../contexts/JokerGameContext';

const MyArea = (props) => {
    const [percent, setPercent] = useState(0);
    const jokerGameDispatch = useJokerGameDispatch();

    //1s 마다 percent 증가 시키기
    useEffect(() => {
        const timer = setInterval(() => {
            increase();
        }, 1000);
        return () => clearInterval(timer);
    }, [percent]);

    const increase = () => {
        if (percent >= 100) {
            jokerGameDispatch({
                type: 'SET_MY_TURN',
                myTurn: false,
            });
        } else {
            setPercent(percent + 3);
        }
    }

    return (
        <div>
            <h1>내 영역</h1>
            <Line percent={percent} strokeWidth="4" strokeColor="#D3D3D3" max="30" />
        </div>
    )
}

export default MyArea;