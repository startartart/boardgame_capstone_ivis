import React, { uesState } from 'react';
import styled from 'styled-components';
import { usePokerGameState, usePokerGameDispatch } from '../../../contexts/PokerGameContext';
import { GuessSocketEvent, AnswerSocketEvent, SelectSocketEvent } from '../../../events/PokerGameSocket';

const GuessContainer = styled.div`
    //center
    width: 100%;
    height: 25%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    //맨앞으로
    z-index: 1;
    //연하게
    opacity: 0.8;
`;

const GuessText = styled.p`
    text-align: center;
    margin: 0;
    font-size: ${props => props.size}rem;
`;

const GuessCardContainer = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & + & {
        border-top : groove;
    }
`;

const GuessCard = styled.img`
    width: 25%;
    height: 50%;
    object-fit: contain;

    & + & {
       border-left : groove;
    }
`;


const Guess = () => {
    const pokerGameDispatch = usePokerGameDispatch();
    const { guess, select_card, select } = usePokerGameState();

    const guessEventHandler = (card) => {
        pokerGameDispatch({
            type: 'SET_ANSWER',
            answer: card
        })
        if (select_card == 2) {
            AnswerSocketEvent(card);

            pokerGameDispatch({
                type: 'SET_SELECT_CARD',
                select_card: 0
            })

        } else {
            GuessSocketEvent(card);

            pokerGameDispatch({
                type: 'SET_GUESS',
                guess: guess + 1,
                select_card: 3
            })
        }
    }

    const decideEventHandler = (card) => {

        SelectSocketEvent(select, card);

        pokerGameDispatch({
            type: 'SET_SELECT',
            select: -1
        })

        pokerGameDispatch({
            type: 'SET_GUESS',
            guess: 0,
            select_card: 0
        })
        
    }

    return (
        <GuessContainer>
            <GuessText>카드를 선택해주세요 !</GuessText>
            <GuessCardContainer>
                {select_card == 4 ? 
                <>
                <GuessCard onClick={()=> decideEventHandler(true)} src="./images/poker_cards/O.png" alt="guess-card" />
                <GuessCard onClick={()=> decideEventHandler(false)} src="./images/poker_cards/X.png" alt="guess-card" />
                </> :
                <>
                <GuessCard onClick={()=> guessEventHandler("D")} src="./images/poker_cards/D.png" alt="guess-card" />
                <GuessCard onClick={()=> guessEventHandler("R")} src="./images/poker_cards/R.png" alt="guess-card" />
                <GuessCard onClick={()=> guessEventHandler("K")} src="./images/poker_cards/K.png" alt="guess-card" />
                <GuessCard onClick={()=> guessEventHandler("E")} src="./images/poker_cards/E.png" alt="guess-card" />
                </>
                }
            </GuessCardContainer>
            <GuessCardContainer>
            {select_card == 4 ? 
                <>
                <GuessText size={1} onClick={()=> decideEventHandler("true")}>그렇다</GuessText>
                <GuessText size={1} onClick={()=> decideEventHandler("false")}>아니다</GuessText>
                </> :
                <>
                <GuessText size={1} onClick={()=> guessEventHandler("D")}>강아지</GuessText>
                <GuessText size={1} onClick={()=> guessEventHandler("R")}>토옥끼</GuessText>
                <GuessText size={1} onClick={()=> guessEventHandler("K")}>코뿔소</GuessText>
                <GuessText size={1} onClick={()=> guessEventHandler("E")}>코끼리</GuessText>
                </>
                }
            </GuessCardContainer>


        </GuessContainer>
    )
}

export default Guess;