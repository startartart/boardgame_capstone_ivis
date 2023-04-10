import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useThemeState } from '../contexts/ThemeContext';
import { useUserState } from '../contexts/UserContext';
import Board from '../components/Room-components/JokerRoom/Board';
import EnemyArea from '../components/Room-components/JokerRoom/EnemyArea';
import MyArea from '../components/Room-components/JokerRoom/MyArea';
import { useJokerGameState, useJokerGameDispatch } from '../contexts/JokerGameContext';
import Video from '../components/Video';

const Text = styled.h1`
    color: ${props => props.theme.fontColor};
    font-size: 2rem;
    letter-spacing: 0.2rem;
    margin: 0 0 1rem 1rem;
`;

const JokerRoom = () => {
    const theme = useThemeState();
    const user = useUserState();

    const jokerGameState = useJokerGameState();
    const jokerGameDispatch = useJokerGameDispatch();
    
    useEffect(() => {
        ShuffleHandler();
    }, []);

    const ShuffleHandler = () => {
        let deck = [];

        for (let i = 0; i < 3; i++) {
            //중복하지 않는 1~13까지의 랜덤한 숫자를 뽑아서 넣기
            let num = Math.floor(Math.random() * 13) + 1;
            if (num < 10) num = "0" + num;
            while (deck.includes("S"+num) || deck.includes("H"+num) || deck.includes("D"+num) || deck.includes("C"+num)) {
                num = Math.floor(Math.random() * 13) + 1;
                if (num < 10) {
                    num = "0" + num;
                }
            }
            deck.push("S"+num);
            deck.push("H"+num);

            num = Math.floor(Math.random() * 13) + 1;
            if (num < 10) num = "0" + num;
            while (deck.includes("S"+num) || deck.includes("H"+num) || deck.includes("D"+num) || deck.includes("C"+num)) {
                num = Math.floor(Math.random() * 13) + 1;
                if (num < 10) {
                    num = "0" + num;
                }
            }
            deck.push("D"+num);
            deck.push("C"+num);
        }

        //deck을 상대방과 나누기
        let myDeck = [];
        let enemyDeck = [];
        for (let i =0; i<deck.length; i++) {
            if (i % 2 === 0) {
                myDeck.push(deck[i]);
            } else {
                enemyDeck.push(deck[i]);
            }
        }

        let joker = Math.floor(Math.random() * 2);
        if (joker === 0) {
            myDeck.push("joker"+theme.mode);
        } else {
            enemyDeck.push("joker"+theme.mode);
        }

        myDeck = myDeck.sort(() => Math.random() - 0.5);
        enemyDeck = enemyDeck.sort(() => Math.random() - 0.5);
        
        jokerGameDispatch({
            type: 'INITIALIZE',
            myHand: myDeck,
            enemyHand: enemyDeck,
        })

        //start event 필요함
        setTimeout(() => {
            jokerGameDispatch({
                type: 'SET_MY_TURN',
                myTurn: true,
            })
        }, 1000);
    }

    const setCheckHandler = (emotion) => {
        console.log(emotion);
    }

    return (
        <>
            {/* <Video setCheck={setCheckHandler} level={3}/> */}
            <Text>방이름 : {user.room}</Text>
            {/* <button onClick={ShuffleHandler}>섞기</button> */}
            <EnemyArea theme={theme} user={user}/>
            <Board theme={theme} user={user}/>
            {jokerGameState.myTurn ? <MyArea theme={theme} user={user}/> : null}
        </>
    )
}

export default JokerRoom;