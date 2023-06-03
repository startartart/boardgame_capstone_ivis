import React from 'react';
import './BubbleSpeech.scss';
import { usePokerGameState } from '../../../contexts/PokerGameContext';
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


const BubbleSpeech = (props) => {

    return (
        <div className="center">
            <div className="dialog">
                <GuessLabel src={props.guess} alt="guess-emoji" />
                    <div className="point"/>
            </div>
        </div>
    )
}

export default BubbleSpeech;