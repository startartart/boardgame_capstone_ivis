import React, { useState } from 'react';
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
    background-color: ${props => props.theme.secondaryColor};
    width: 21rem;
    height: 21rem;
    border-radius: 1rem;

    padding: 1rem;
    color: ${props => props.theme.fontColor};

    opacity: 0.7;
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

    const ChangeThemeHandler = (themeNumber) => {
        dispatch({
            type: 'CHANGE_THEME_' + themeNumber
        });
    }

    const ShowVideo = () => {
        setShowVideo(!showVideo);
    }

    const setEomtionHandler = (emotion) => {
        console.log(emotion);
    }

    const closeSettingHandler = () => {
        props.closeSetting();
    }

    return (
        <SettingOptionContainer theme={props.theme}>
            <FontAwesomeIcon icon={faXmark} color="white" size="2x" onClick={closeSettingHandler}/>
            <p>색상 선택</p><hr/>
            <button concept={1} onClick={() => ChangeThemeHandler(1)}>Toggle Theme 1(분노)</button>
            <button concept={2} onClick={() => ChangeThemeHandler(2)}>Toggle Theme 2(슬픔)</button>
            <button concept={3} onClick={() => ChangeThemeHandler(3)}>Toggle Theme 3(기쁨)</button>
            <button concept={4} onClick={() => ChangeThemeHandler(4)}>Toggle Theme 4(Default)</button>
            <button onClick={ShowVideo}>감정 측정해보기(미구현)</button>
            {showVideo ? <Video setEmotion={setEomtionHandler}/> : null}
            
        </SettingOptionContainer>
    )
}

export default SettingOption;