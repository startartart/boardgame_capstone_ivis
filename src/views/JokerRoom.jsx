import React from 'react';
import styled from 'styled-components';
import { useThemeState } from '../contexts/ThemeContext';
import { useUserState } from '../contexts/UserContext';
import Board from '../components/Room-components/JokerRoom/Board';
import EnemyArea from '../components/Room-components/JokerRoom/EnemyArea';
import MyArea from '../components/Room-components/JokerRoom/MyArea';
import { useJokerGameState, useJokerGameDispatch } from '../contexts/JokerGameContext';

const JokerRoom = () => {
    const theme = useThemeState();
    const user = useUserState();

    const jokerGameState = useJokerGameState();
    const jokerGameDispatch = useJokerGameDispatch();

    const ShuffleHandler = () => {
        let deck = [];

        for (let i = 0; i < 6; i++) {
            //중복하지 않는 1~13까지의 랜덤한 숫자를 뽑아서 넣기
            let num = Math.floor(Math.random() * 9) + 2;
            while (deck.includes("clover_"+num)) {
                num = Math.floor(Math.random() * 9) + 2;
            }
            deck.push("clover_"+num);
            deck.push("rspace_"+num);
        }

        //deck을 나의 덱과 상대덱으로 나누기
        let myDeck = [];
        let enemyDeck = [];
        for (let i = 0; i < deck.length; i++) {
            if (i % 2 === 0) {
                myDeck.push(deck[i]);
            } else {
                enemyDeck.push(deck[i]);
            }
        }
        enemyDeck.push("joker");
        
        jokerGameDispatch({
            type: 'INITIALIZE',
            myHand: myDeck,
            enemyHand: enemyDeck,
        })
    }

    return (
        <div>
            <h1>방이름 : {user.room}</h1>
            <button onClick={ShuffleHandler}>섞기</button>
            <EnemyArea theme={theme} user={user}/>
            <Board theme={theme} user={user}/>
            <MyArea theme={theme} user={user}/>
        </div>
    )
}

export default JokerRoom;