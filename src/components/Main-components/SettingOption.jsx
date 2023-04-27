import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useThemeDispatch } from '../../contexts/ThemeContext';
import Video from '../Video';

const SettingOptionContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.fontColor};
    width: 21rem;
    height: 24rem;
    border-radius: 1rem;

    padding: 1rem;
    color: ${props => props.theme.thirdColor};

    button {
        width: 100%;
        height: 3rem;
        border: none;
        background-color: transparent;
        font-size: 1.2rem;
        color: inherit;
        font-family: inherit;
        font-weight: 700;
    }
    p {
        font-size: 2rem;
        margin: 0;
        padding: 0;
        text-align: center;
    }

    svg {
        position: relative;
        left: 90%;
    };
`;
const SettingOption = (props) => {
    const dispatch = useThemeDispatch();
    const [showVideo, setShowVideo] = useState(false);
    const [emotion, setEmotion] = useState("😐");

    const ChangeThemeHandler = (themeNumber) => {
        dispatch({
            type: 'CHANGE_THEME_' + themeNumber
        });

        if (themeNumber === 1) {
            setEmotion("😡");
        } else if (themeNumber === 2) {
            setEmotion("😭");
        } else if (themeNumber === 3) {
            setEmotion("😆");
        } else if (themeNumber === 4) {
            setEmotion("😐");
        }
    }

    const ShowVideo = () => {
        setShowVideo(!showVideo);
    }

    const setEomtionHandler = (emotion) => {
        if (emotion === "angry" || emotion === "disgusted") {
            ChangeThemeHandler(1);
            setEmotion("😡");
        } else if (emotion === "sad") {
            ChangeThemeHandler(2);
            setEmotion("😭");
        } else if (emotion === "happy" || emotion === "surprised") {
            ChangeThemeHandler(3);
            setEmotion("😆");
        } else if (emotion === "neutral") {
            ChangeThemeHandler(4);
            setEmotion("😐");
        }
        console.log(emotion);
    }

    const closeSettingHandler = () => {
        props.closeSetting();
    }

    return (
        <SettingOptionContainer theme={props.theme}>
            <FontAwesomeIcon icon={faXmark} color="black" size="2x" onClick={closeSettingHandler}/>
            <p>색상 선택</p><hr/><p>{emotion}</p><hr/>
            <button concept={1} onClick={() => ChangeThemeHandler(1)}>Theme. Angry 1(😡)</button>
            <button concept={2} onClick={() => ChangeThemeHandler(2)}>Theme. Sad 2(😭)</button>
            <button concept={3} onClick={() => ChangeThemeHandler(3)}>Theme. Happy 3(😆)</button>
            <button concept={4} onClick={() => ChangeThemeHandler(4)}>Theme. Netural 4(😐)</button>

            {showVideo ? <Video setEmotion={setEomtionHandler} level={1}/> : <button onClick={ShowVideo}>감정 측정해보기</button>}
            
            
        </SettingOptionContainer>
    )
}

export default SettingOption;