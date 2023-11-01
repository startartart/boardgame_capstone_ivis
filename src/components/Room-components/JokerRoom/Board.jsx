import React, { useState } from 'react';
import styled from 'styled-components';
import { useJokerGameState, useJokerGameDispatch } from '../../../contexts/JokerGameContext';
import { PeekSocketEvent, SelectSocketEvent, ListenJokerGameSocketEvents} from '../../../events/JokerGameSocket';
import { useSocketState } from '../../../contexts/SocketContext';

const BoardContainer = styled.div`
    width: 100%;
    height: 40%;

    position: fixed;
    top: 28%;
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

    & > :nth-child(1) {
        border-bottom: groove;
    }
    & > :nth-child(3) {
        border-top: groove;
    }
`;

const Card = styled.img`
    //img 크기 고정
    width: 5rem;
    height: auto;

    & + & {
        margin-left: -3.5rem;
    }

    // props.peeked
    ${props => props.peeked && `
        transform: translateY(-4rem);

        transition: transform 0.5s ease-in-out;
    `}
`;

const CardBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > :first-child {
        margin-left: 1rem;
        position: absolute;
        left: 0;
    }
`;


const Board = (props) => {

    const [current, setCurrent] = useState(-1);
    const jokerGameState = useJokerGameState();
    const jokerGameDispatch = useJokerGameDispatch();
    const { socket } = useSocketState();

    if (socket) {
        ListenJokerGameSocketEvents();
    }

    const cardPeekHandler = async (index) => {

        setCurrent(index);
        
        PeekSocketEvent(index);
    }

    const cardSelectHandler = async (index) => {
        if (jokerGameState.myTurn != 1) {
            cardPeekHandler(-1);
        } else {
            SelectSocketEvent(index);

        await jokerGameDispatch({
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
                    peeked={true}/>)
            }
            else {
                arr.push(<Card src={`./images/cards/back${props.theme.mode}.png`}
                alt="card" key={i} onClick={() => cardPeekHandler(i)}/>)
            }
        }
        return arr;
    }

    function ShowMyCard(value, index) {
        let arr = [];
        for (let i = 0; i < value; i++) {
            if (i == index) {
                // if joker is peeked
                if (jokerGameState.myHand[i] == 'joker') {
                    arr.push(<Card src={`./images/cards/${jokerGameState.myHand[i]}${props.theme.mode}.png`}
                    alt="card" key={i} onClick={() => cardCheatHandler(i)}
                    peeked={true}/>)
                } else {
                    arr.push(<Card src={`./images/cards/${jokerGameState.myHand[i]}.png`}
                    alt="card" key={i} onClick={() => cardCheatHandler(i)}
                    peeked={true}/>)
                }
                
            }
            else {
                if (jokerGameState.myHand[i] == 'joker') {
                    arr.push(<Card src={`./images/cards/${jokerGameState.myHand[i]}${props.theme.mode}.png`}
                    alt="card" key={i} onClick={() => cardCheatHandler(i)}/>)
                } else {
                    arr.push(<Card src={`./images/cards/${jokerGameState.myHand[i]}.png`}
                    alt="card" key={i} onClick={() => cardCheatHandler(i)}/>)
                }
            }
        }
        return arr;
    }

    return (
        <BoardContainer theme={props.theme} >
            <CardBox>
                <p>상대 카드</p>
                {ShowEnemyCard(jokerGameState.enemyHand, current)}
            </CardBox>

            {jokerGameState.expression == "./images/emoji/emoji0.png" ? <p>얼굴을 제대로 인식해주세요</p> : <p>조커 뽑기</p> } 

            <CardBox>
                <p>내 카드</p>
                {ShowMyCard(jokerGameState.myHand.length, jokerGameState.peek)}
            </CardBox>
        </BoardContainer>
    )
}

export default Board;