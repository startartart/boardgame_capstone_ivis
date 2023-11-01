import React, { useState } from 'react';
import styled from 'styled-components';
import { useThemeState } from '../contexts/ThemeContext';
import { useUserState } from '../contexts/UserContext';
import './Starting.scss'

const Text = styled.p`
    //center
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    margin: 0;
    padding: 0;
    text-align: center;
`;

const GoAnimation = styled.div`
    animation: goleft 1s ease-in-out;
    animation-fill-mode: forwards;

    width: 100%;
    height: 100%;

    //horizontal center
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @keyframes goleft {
        0% {
            transform: translate(-50%, -50%);
        }
        100% {
            transform: translate(-150%, -50%);
        }
    }

`;

const Starting = ( props ) => {
    const theme = useThemeState();
    const user = useUserState();
    const [showHeader, setShowHeader] = useState(true);

    const passHeaderHandler = () => {
        setShowHeader(!showHeader);
    }
    return (
        showHeader ? 
            <div className="Header">
                <svg className="Header__svg" viewBox="0 0 1337.97 684.43">
                    <path className="Header__shape bigSquare" fill="#16d5d1" d="M546.519 349.271l86.383-56.098 56.097 86.383-86.383 56.098z"/>
                    <path className="Header__shape triangle" fill="none" stroke="#ff4676" stroke-width="8" d="M372.15 462.17L321 434.58l-4.88 56.16z"/>
                    <circle className="Header__shape bigCircle" fill="#ff4676" cx="1076.52" cy="262.17" r="59"/>
                    <path className="Header__shape littleSquare" fill="#ffe430" d="M285.523 262.61l12.372-53.59 53.59 12.372-12.372 53.59z"/>
                    <circle className="Header__shape hoop" fill="none" stroke="#ffe430" stroke-width="13" cx="905.52" cy="447.17" r="45"/>
                    <circle className="Header__shape littleCircle" fill="#0f1c70"cx="1036.52" cy="203.17" r="27"/>
                </svg>
                <Text onClick={passHeaderHandler}>IVIS</Text>
            </div> : 
            <GoAnimation>
                    <svg className="Header__svg" viewBox="0 0 1337.97 684.43">
                        <path className="Header__shape bigSquare" fill="#16d5d1" d="M546.519 349.271l86.383-56.098 56.097 86.383-86.383 56.098z"/>
                        <path className="Header__shape triangle" fill="none" stroke="#ff4676" stroke-width="8" d="M372.15 462.17L321 434.58l-4.88 56.16z"/>
                        <circle className="Header__shape bigCircle" fill="#ff4676" cx="1076.52" cy="262.17" r="59"/>
                        <path className="Header__shape littleSquare" fill="#ffe430" d="M285.523 262.61l12.372-53.59 53.59 12.372-12.372 53.59z"/>
                        <circle className="Header__shape hoop" fill="none" stroke="#ffe430" stroke-width="13" cx="905.52" cy="447.17" r="45"/>
                        <circle className="Header__shape littleCircle" fill="#0f1c70"cx="1036.52" cy="203.17" r="27"/>
                    </svg>
                    <Text onClick={passHeaderHandler}>시작</Text>
            </GoAnimation> 
    )
}

export default Starting;