import React from 'react';
import './BubbleSpeech.scss';
import { usePokerGameState, usePokerGameDispatch } from '../../../contexts/PokerGameContext';

import styled from 'styled-components';

const GuessLabel = styled.img`
    display: block;
    width: 50%;
    height: auto;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
`;

const GuessSelect = styled.p`
    text-align: center;
    margin: 0;
    height: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
        color: #D3D3D3;
    }
`;

const GuessText = styled.p`
    width: 100%;
    height: 100%;
    text-align: center;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const BubbleSpeech = (props) => {

    const pokerGameDispatch = usePokerGameDispatch();
    const { guess, select, select_card, answer } = usePokerGameState();

    const SelectGuessHandler = () => {
        pokerGameDispatch({
            type: 'SET_GUESS',
            guess: guess,
            select_card : 1,
        })
    }

    const SelectDecideHandler = () => {
        pokerGameDispatch({
            type: 'SET_GUESS',
            select_card : 4,
        })
    }

    return (
        <>
            {props.direction == "left" ?
            <div className="left-center">
                <div className="dialog">
                    {select_card == 3 && props.area == "enemy" ? <GuessText>. . . .</GuessText> : <>
                    <GuessLabel src={`./images/poker_cards/${props.answer}.png`} alt="guess-emoji" />
                    </>}
                    
                    <div className="left-point"/>
                </div>
            </div>:<>
            { select != -1 &&
                <div className="right-center">
                    <div className="dialog">
                        {select_card == 1 ? <GuessText>이미지 혹은 동물 이름을 클릭하면 Guess 완료!</GuessText> : <>
                        {select_card == 2 ? <GuessText>시간 내에 답변하세요!</GuessText> : <>
                        {select_card == 3 ? <GuessText>상대방의 답변을 기다리는 중 ..</GuessText> :
                        <>
                            {guess <= 2 && <GuessSelect onClick={SelectGuessHandler}>- 추측하기 ({guess}/3)</GuessSelect>}
                            {guess >= 1  && <GuessSelect onClick={SelectDecideHandler}>- 이 카드로 결정</GuessSelect>}
                        </>
                        }
                        </>
                        }
                        </>
                        }
                        
                        <div className="right-point"/>
                    </div>
                </div>
                }
            </>
            }
        </>
        
    )
}

export default BubbleSpeech;