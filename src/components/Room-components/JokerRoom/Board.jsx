import React, { useState } from 'react';
import styled from 'styled-components';
import { useJokerGameState, useJokerGameDispatch } from '../../../contexts/JokerGameContext';

const BoardContainer = styled.div`
    width: 100%;
    height: 30rem;
    background-color: ${props => props.theme.primaryColor};

    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    border-radius: 2rem;

    margin: 1rem auto;
`;

const Card = styled.img`
    //img 크기 고정
    width: 5rem;
    height: auto;

    & + & {
        margin-left: -3.5rem;
    }
`;

const CardBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ClickedCard = styled.img`
    width: 5rem;
    height: auto;

    border: 1px solid ${props => props.theme.fontColor};
    border-radius: 0.5rem;
`;

const Board = (props) => {
    const [clicked, setClicked] = useState(false);
    const jokerGameState = useJokerGameState();
    const jokerGameDispatch = useJokerGameDispatch();

    const cardSelectHandler = async (index) => {
        console.log(jokerGameState.enemyHand[index]);
        // enemyHand에서 선택한 카드를 myHand로 옮기기
        let enemyHand = jokerGameState.enemyHand;
        let myHand = jokerGameState.myHand;

        myHand.push(jokerGameState.enemyHand[index]);
        enemyHand.splice(index, 1);

        await jokerGameDispatch({
            type: 'TURN_ACTION',
            myHand: myHand,
            enemyHand: enemyHand,
        })

        setTimeout(() => {
            checkMyHand();
        }, 1000);
        
    }

    const checkMyHand = () => {
        let myHand = jokerGameState.myHand;

        // myHand에서 같은 숫자의 카드가 2장 이상이면 제거
        for (let i = 0; i < myHand.length; i++) {
            let card = myHand[i];
            let cardNum = card.split("_")[1];
            for (let j = i + 1; j < myHand.length; j++) {
                if (cardNum === myHand[j].split("_")[1]) {
                    myHand.splice(i, 1);
                    myHand.splice(j - 1, 1);
                    i = 0;
                    j = 0;
                }
            }
        }
        jokerGameDispatch({
            type: 'SET_MY_HAND',
            myHand: myHand,
        })
    }
    return (
        <BoardContainer theme={props.theme} >
            <CardBox onClick={() => setClicked(!clicked)}>
                {jokerGameState.enemyHand.map((card, index) => {
                    return (
                        <Card src={`./images/cards/${card}.png`} alt="card" key={index} onClick={() => cardSelectHandler(index)}/>
                        // clicked ? <ClickedCard src={`./images/cards/${card}.png`} alt="card" key={index}/> :
                    )
                })}
            </CardBox>

            <CardBox onClick={() => setClicked(!clicked)}>
                {jokerGameState.myHand.map((card, index) => {
                    return (
                        <Card src={`./images/cards/${card}.png`} alt="card" key={index}/>
                        // clicked ? <ClickedCard src={`./images/cards/${card}.png`} alt="card" key={index}/> :
                    )
                })}
            </CardBox>
        </BoardContainer>
    )
}

export default Board;