import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useThemeState } from '../contexts/ThemeContext';
import { useUserState } from '../contexts/UserContext';
import { SocketEvents, socket } from '../events/Socket';
import Board from '../components/Room-components/PokerRoom/Board';
import EnemyArea from '../components/Room-components/PokerRoom/EnemyArea';
import MyArea from '../components/Room-components/PokerRoom/MyArea';
import { usePokerGameState, usePokerGameDispatch } from '../contexts/PokerGameContext';
import Video from '../components/Video';
import Loading from '../components/Main-components/Loading';
import { GetEmotionEvent } from '../events/EmotionSocket';
import Win from '../components/Room-components/Win';
import Lose from '../components/Room-components/Lose';
import Draw from '../components/Room-components/Draw';
import Guess from '../components/Room-components/PokerRoom/Guess';

const Text = styled.h1`
    color: ${props => props.theme.thirdColor};
    font-size: 2rem;
`;

const PookerRoom = () => {
    const theme = useThemeState();
    const user = useUserState();

    const [connected, setConnected] = useState(false);

    const { myTurn, result, select_card } = usePokerGameState();
    const pokerGameDispatch = usePokerGameDispatch();

    SocketEvents(4);
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
        await pokerGameDispatch({ type: 'SET_MY_EXPRESSION', expression: detections });
    }

    return (
        <>
          {result == 1 ? <Win theme={theme} user={user}/> : 
            result == 2 ? <Lose theme={theme} user={user}/> : 
            result == 4 ? <Draw theme={theme} user={user}/> : 
            <>

            {user.status <= 2 ? <Loading theme={theme}/> :
                <>
                <Text theme={theme}>턴 : {myTurn == 1 ? "내 차례" : "상대 차례"}</Text>
                <Video setCheck={setCheckHandler} level={3}/>

                <EnemyArea theme={theme} user={user} turn={myTurn}/>
                {(select_card == 1 || select_card == 2 || select_card == 4) && <Guess theme={theme} user={user}/>}
                <Board theme={theme} user={user}/>
                <MyArea theme={theme} user={user} turn={myTurn}/>

                </>
            }
            </>
            }
        </>
    )
}

export default PookerRoom;