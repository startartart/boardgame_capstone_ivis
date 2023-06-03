import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useThemeState } from '../contexts/ThemeContext';
import { useUserState } from '../contexts/UserContext';
import { SocketEvents, socket, ConnectSocket, DisconnectSocket } from '../events/Socket';
import Board from '../components/Room-components/JokerRoom/Board';
import EnemyArea from '../components/Room-components/JokerRoom/EnemyArea';
import MyArea from '../components/Room-components/JokerRoom/MyArea';
import { useJokerGameState, useJokerGameDispatch } from '../contexts/JokerGameContext';
import Video from '../components/Video';
import { GetEmotionEvent } from '../events/EmotionSocket';
import Win from '../components/Room-components/JokerRoom/Win';
import Lose from '../components/Room-components/JokerRoom/Lose';
import { ReadySocketEvent } from '../events/EnterRoomSocket';
import Loading from '../components/Main-components/Loading';

const Text = styled.h1`
    color: ${props => props.theme.thirdColor};
    font-size: 2rem;
`;

const JokerRoomAI = () => {
    const theme = useThemeState();
    const user = useUserState();

    const [connected, setConnected] = useState(false);

    const { room } = useUserState();
    const {myTurn, result} = useJokerGameState();
    const jokerGameDispatch = useJokerGameDispatch();
    const socketDispatch = useJokerGameDispatch();
    
    SocketEvents(room);
    GetEmotionEvent();
    // socket connect

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
                    <Text theme={theme}>턴 : {myTurn == 1 ? "내 차례" : "컴퓨터 차례"}</Text>
                    <Video setCheck={setCheckHandler} level={4}/>

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

export default JokerRoomAI;