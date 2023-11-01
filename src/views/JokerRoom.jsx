import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useThemeState } from '../contexts/ThemeContext';
import { useUserState } from '../contexts/UserContext';
import { SocketEvents, socket } from '../events/Socket';
import Board from '../components/Room-components/JokerRoom/Board';
import EnemyArea from '../components/Room-components/JokerRoom/EnemyArea';
import MyArea from '../components/Room-components/JokerRoom/MyArea';
import { useJokerGameState, useJokerGameDispatch } from '../contexts/JokerGameContext';
import Video from '../components/Video';
import Loading from '../components/Main-components/Loading';
import { GetEmotionEvent } from '../events/EmotionSocket';
import Win from '../components/Room-components/Win';
import Lose from '../components/Room-components/Lose';

const Text = styled.h1`
    color: ${props => props.theme.thirdColor};
    font-size: 2rem;
`;

const JokerRoom = () => {
    const theme = useThemeState();
    const user = useUserState();

    const [connected, setConnected] = useState(false);

    const {myTurn, result} = useJokerGameState();
    const jokerGameDispatch = useJokerGameDispatch();
    
    SocketEvents(0);
    GetEmotionEvent();

    useEffect(() => {
        const interval = setInterval(() => {
            if (socket.connected) {
                clearInterval(interval);
            } else {
                console.log("소켓 연결 안됨");
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        }

    }, [setConnected]);

    const setCheckHandler = async (detections) => {
        await jokerGameDispatch({ type: 'SET_MY_EXPRESSION', expression: detections });
    }

    return (
        <>
            {result == 1 ? <Win theme={theme} user={user}/> : 
            result == 2 ? <Lose theme={theme} user={user}/> : <>
            
            {user.status <= 2 ? <Loading theme={theme}/> :
                <>
                    <Text theme={theme}>턴 : {myTurn == 1 ? "내 차례" : "상대 차례"}</Text>
                    <Video setCheck={setCheckHandler} level={3}/>

                    <EnemyArea theme={theme} user={user} turn={myTurn}/>
                    <Board theme={theme} user={user}/>
                    
                    <MyArea theme={theme} user={user} turn={myTurn}/>
                </>
            }
            </>
            }
        </>
    )
}

export default JokerRoom;