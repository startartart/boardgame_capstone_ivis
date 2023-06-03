import React, { useState } from 'react';
import styled from 'styled-components';
import { usePokerGameState, usePokerGameDispatch } from '../../../contexts/PokerGameContext';
import { PeekSocketEvent, SelectSocketEvent, ListenPokerGameSocketEvents} from '../../../events/PokerGameSocket';
import { useSocketState } from '../../../contexts/SocketContext';

const BoardContainer = styled.div`
    width: 100%;
    height: 45%;

    position: fixed;
    top: 25%;
    left: 0;
    
    --maincolor: ${props => props.theme.fifthColor};
    --subcolor: ${props => props.theme.thirdColor};
    --backgroundcolor: ${props => props.theme.darkColor};

    background:
    radial-gradient(var(--maincolor) 3px, transparent 4px),
    radial-gradient(var(--maincolor) 3px, transparent 4px),
    linear-gradient(#fff 4px, transparent 0),
    linear-gradient(45deg, transparent 74px, transparent 75px, var(--subcolor) 75px, var(--subcolor) 76px, transparent 77px, transparent 109px),
    linear-gradient(-45deg, transparent 75px, transparent 76px, var(--subcolor) 76px, var(--subcolor) 77px, transparent 78px, transparent 109px),
    #fff;
    background-size: 109px 109px, 109px 109px, 100% 6px, 109px 109px, 109px 109px;
    background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
    
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    border-radius: 2rem;

    margin: 1rem auto;

    
    & > :nth-child(2) {
        border-top: groove;
        border-bottom: groove;
        height: 15%;
    }
    & > :nth-child(4) {
        border-top: groove;
        border-bottom: groove;
        height: 15%;
    }
`;

const Card = styled.img`
    //img 크기 고정
    width: ${props => props.size}rem;
    height: auto;

    // props.peeked
    ${props => props.peeked && `
        transform: translateY(-2rem);
        transition: transform 0.5s ease-in-out;
    `}

    & + & {
        margin-left: -0.5rem;
    }
`;

const CardBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    //첫번째요소만 맨 왼쪽으로
    & > :first-child {
        margin-left: 1rem;
        position: absolute;
        left: 0;
        
    }
`;


const Board = (props) => {

    const [current, setCurrent] = useState(-1);
    const pokerGameState = usePokerGameState();
    const pokerGameDispatch = usePokerGameDispatch();
    const { socket } = useSocketState();

    if (socket) {
        ListenPokerGameSocketEvents();
    }

    const cardPeekHandler = async (index) => {

        setCurrent(index);
        
        PeekSocketEvent(index);
    }

    const cardSelectHandler = async (index) => {
        if (pokerGameState.myTurn != 1) {
            cardPeekHandler(-1);
        } else {
            SelectSocketEvent(index);

        await pokerGameDispatch({
            type: 'SET_TURN',
            myTurn: 0,
        })
        setCurrent(-1);
        }
        
    }

    const cardCheatHandler = async (index) => {
    }

    function ShowEnemyCard(value, index) {
        let arr = [];
        for (let i = 0; i < value; i++) {
            if (i == index) {
                arr.push(<Card 
                    src={`./images/cards/back${props.theme.mode}.png`}
                    alt="card" key={i} onClick={() => cardSelectHandler(i)}
                    peeked={true} size={3.5}/>)
            }
            else {
                arr.push(<Card src={`./images/cards/back${props.theme.mode}.png`}
                alt="card" key={i} onClick={() => cardPeekHandler(i)} size={3.5}/>)
            }
        }
        return arr;
    }

    function ShownEnemyCard(value) {
        let arr = [];
        for (let i = 0; i < value; i++) {
            arr.push(<Card src={`./images/poker_cards/${pokerGameState.enemyShowHand[i]}.png`}
                alt="card" key={i} onClick={() => cardCheatHandler(i)} size={3}/>)
        }
        return arr;
    }

    function ShowMyCard(value, index) {
        let arr = [];
        for (let i = 0; i < value; i++) {
            if (i == index) {
                // if joker is peeked
                arr.push(<Card src={`./images/poker_cards/${pokerGameState.myHand[i]}.png`}
                alt="card" key={i} onClick={() => cardCheatHandler(i)}
                peeked={true} size={3.5}/>)
            }
            else {
                arr.push(<Card src={`./images/poker_cards/${pokerGameState.myHand[i]}.png`}
                alt="card" key={i} onClick={() => cardCheatHandler(i)} size={3.5}/>)
            }
        }
        return arr;
    }

    function ShownMyCard(value) {
        let arr = [];
        for (let i = 0; i < value; i++) {
            arr.push(<Card src={`./images/poker_cards/${pokerGameState.myShowHand[i]}.png`}
                alt="card" key={i} onClick={() => cardCheatHandler(i)} size={3}/>)
        }
        return arr;
    }

    return (
        <BoardContainer theme={props.theme}>
            <CardBox>
                <p>상대방 카드</p>
                {ShowEnemyCard(pokerGameState.enemyHand, current)}
            </CardBox>
            <CardBox>
                <p>상대방 수집 카드</p>
                {ShownEnemyCard(pokerGameState.enemyShowHand.length)}
            </CardBox>

            {pokerGameState.expression == "./images/emoji/emoji0.png" ? <CardBox>얼굴을 제대로 인식해주세요</CardBox> : <CardBox>동물 포커</CardBox> } 
            
            <CardBox>
                <p>내 수집 카드</p>
                {ShownMyCard(pokerGameState.myShowHand.length)}
            </CardBox>
            <CardBox>
                <p>내 카드</p>
                {ShowMyCard(pokerGameState.myHand.length, pokerGameState.peek)}
            </CardBox>
            
        </BoardContainer>
    )
}

export default Board;