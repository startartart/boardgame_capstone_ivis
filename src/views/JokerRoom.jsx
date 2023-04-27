import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useThemeState } from '../contexts/ThemeContext';
import { useUserState } from '../contexts/UserContext';
import { useSocketState, useSocketDispatch } from '../contexts/SocketContext';
import { SocketEvents, ConnectSocket, DisconnectSocket, socket } from '../events/Socket';
import Board from '../components/Room-components/JokerRoom/Board';
import EnemyArea from '../components/Room-components/JokerRoom/EnemyArea';
import MyArea from '../components/Room-components/JokerRoom/MyArea';
import { useJokerGameState, useJokerGameDispatch } from '../contexts/JokerGameContext';
import Video from '../components/Video';
import Loading from '../components/Main-components/Loading';
import { GetEmotionEvent } from '../events/EmotionSocket';
import { ListenJokerGameSocketEvents} from '../events/JokerGameSocket';

const Text = styled.h1`
    color: ${props => props.theme.thirdColor};
    font-size: 2rem;
`;


const JokerRoom = () => {
    const theme = useThemeState();
    const user = useUserState();
    const [noFaceCnt, setNoFaceCnt] = useState(0);
    const [expression, setExpression] = useState(null);
    const [connected, setConnected] = useState(false);
    const [events, setEvents] = useState([]);

    const jokerGameState = useJokerGameState();
    const jokerGameDispatch = useJokerGameDispatch();
    
    SocketEvents();
    GetEmotionEvent();

    useEffect(() => {
        // 1초마다 socket 연결 확인
        const interval = setInterval(() => {
            if (socket.connected) {
                console.log("소켓 연결됨");
                clearInterval(interval);
            } else {
                console.log("소켓 연결 안됨");
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        }

    }, [setConnected]);

    const setCheckHandler = async (detections, cnt) => {
        console.log(detections);
        if (detections === 'LOSE') {
            // ...
        }
        setExpression(detections);
        // expression 알고리즘을 이용하고, 소켓통신을 통해 서버로 보내야함.
        setNoFaceCnt(cnt);
        
    }

    return (
        <>
            
            <Text theme={theme}>방이름 : {user.room}</Text>
            {user.status >= 1 ? <Loading theme={theme}/> :
                <>
                <Video setCheck={setCheckHandler} level={3}/>
                {/* <button onClick={ShuffleHandler}>섞기</button> */}

                <EnemyArea theme={theme} user={user}/>
                <Board theme={theme} user={user}/>
                
                <MyArea theme={theme} user={user} turn={jokerGameState.myTurn}/>
                
                </>
            }
        </>
    )
}

export default JokerRoom;