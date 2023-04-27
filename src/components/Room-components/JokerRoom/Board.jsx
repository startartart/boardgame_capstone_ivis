import React, { useState } from 'react';
import styled from 'styled-components';
import { useJokerGameState, useJokerGameDispatch } from '../../../contexts/JokerGameContext';
import { PeekSocketEvent, SelectSocketEvent, ListenJokerGameSocketEvents} from '../../../events/JokerGameSocket';

const BoardContainer = styled.div`
    width: 100%;
    height: 40%;

    position: fixed;
    top: 20%;
    left: 0;
    
    --units: 1.5vmax;
	--brick1: ${props => props.theme.fifthColor};
	--brick2: ${props => props.theme.thirdColor};
	--lines: ${props => props.theme.darkColor};
	--gp-ln: 50%/calc(var(--units) * 10) calc(var(--units) * 5);
	--gp-cn: 50%/calc(var(--units) * 5) calc(var(--units) * 5);
	background: 
		repeating-conic-gradient(from 90deg at 95% 55%, var(--lines) 0% 25%, #fff0 0% 100%) var(--gp-cn), 
		repeating-linear-gradient(180deg, var(--lines) 0 5%, #fff0 0 50%, var(--lines) 0 55%, var(--brick2) 0 100% ) var(--gp-ln), 
		repeating-linear-gradient(90deg, var(--brick1) 0 47.5%, var(--lines) 0 50%, var(--brick1) 0 97.5%, var(--lines) 0 100% ) var(--gp-ln);

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
`;


const Board = (props) => {
    const [clicked, setClicked] = useState(false);
    const [current, setCurrent] = useState(-1);
    const jokerGameState = useJokerGameState();
    const jokerGameDispatch = useJokerGameDispatch();

    ListenJokerGameSocketEvents();

    const cardPeekHandler = async (index) => {

        setCurrent(index);
        
        PeekSocketEvent(index);
    }

    const cardSelectHandler = async (index) => {
        // console.log(jokerGameState.enemyHand[index]);
        // enemyHand에서 선택한 카드를 myHand로 옮기기
        let enemyHand = jokerGameState.enemyHand;
        let myHand = jokerGameState.myHand;

        myHand.push(jokerGameState.enemyHand[index]);
        // enemyHand.splice(index, 1);

        SelectSocketEvent(index);

        await jokerGameDispatch({
            type: 'SET_TURN',
            myTurn: false,
        })

        setTimeout(() => {
            // checkMyHand();
            
            jokerGameDispatch({
                type: 'SET_TURN',
                myTurn: true,
            })
        }, 5000);

        // await jokerGameDispatch({
        //     type: 'SET_MY_TURN',
        //     myTurn: false,
        // })
    }

    // const checkMyHand = () => {
    //     let myHand = jokerGameState.myHand;

    //     // myHand에서 같은 숫자의 카드가 2장 이상이면 제거
    //     for (let i = 0; i < myHand.length; i++) {
    //         let card = myHand[i];
    //         let cardNum = card.slice(1, 3);
    //         for (let j = i + 1; j < myHand.length; j++) {
    //             if (cardNum === myHand[j].slice(1, 3)) {
    //                 myHand.splice(i, 1);
    //                 myHand.splice(j - 1, 1);
    //                 i = 0;
    //                 j = 0;
    //             }
    //         }
    //     }
    // }

    function ShowEnemyCard(value, index) {
        let arr = [];
        for (let i = 0; i < value; i++) {
            if (i === index) {
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

    return (
        <BoardContainer theme={props.theme} >
            <CardBox onClick={() => setClicked(!clicked)}>
                {/* jokerGameState.enemyHand is number, not array. then enemyHand 만큼 반복 */}
                {ShowEnemyCard(jokerGameState.enemyHand, current)}

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