import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useUserDispatch } from '../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Text = styled.p`
    font-size: ${props => props.size}rem;
    margin: 0;
    padding: 0;
    text-align: center;
    color: ${props => props.theme.fourthColor};

    svg {
        //position right center
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);

        font-size: 1.5rem;
    }
`;
const SelectContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 46%;
    transform: translate(-50%, -45%);
    background-color: ${props => props.theme.fontColor};
    height: 20rem;
    width: 15rem;
    border-radius: 1rem;
    z-index: 3;

    padding: 1rem;
    color: ${props => props.theme.thirdColor};

    @media screen and (min-width: 1200px) {
        height: 35rem;
        width: 30rem;
    }

    button {
        width: 80%;
        margin-left: 10%;
        height: 2rem;
        background-color: transparent;
        font-size: 1rem;
        color: inherit;
        font-family: inherit;
        font-weight: 700;
        border: 1px solid;

        @media screen and (min-width: 1200px) {
            font-size: 3rem;
            height: 5rem;
        }
    }
`;

const Select = ( props ) => {

    const [showLevel, setShowLevel] = useState(false);
    const [goToRoom, setGoToRoom] = useState("");
    const dispatch = useUserDispatch();

    const showLevelSelectHandler = () => {
        setShowLevel(!showLevel);
    }

    const selectGoTo = (level) => {

        let levelNumber = 0;

        if (level === "쉬움") {
            levelNumber = 1;
        } else if (level === "보통") {
            levelNumber = 2;
        } else {
            levelNumber = 3;
        }
        dispatch({
            type: 'SET_ROOM',
            room : levelNumber
        });
        if (goToRoom === "" || goToRoom !== level) {
            setGoToRoom(level);
        } else  if (goToRoom === level) {
            setGoToRoom("");
        }
    }
    return (
        <SelectContainer theme={props.theme}>
            <Text theme={props.theme} size={3}>{props.text.name}</Text>

            {props.index === 0 ? 
                <>
                    
                {showLevel ? 
                    <>
                        <Text size={1.5}>난이도를 선택해주세요<FontAwesomeIcon icon={faArrowLeft} /></Text>
                        <button onClick={()=>selectGoTo("쉬움")}>쉬움</button>
                        <button onClick={()=>selectGoTo("보통")}>보통</button>
                        <button onClick={()=>selectGoTo("어려움")}>어려움</button>

                        { goToRoom !== "" ? <Link to={`/room${props.index}ai`}>
                        <button>{goToRoom} 시작하기</button></Link> : <button onClick={showLevelSelectHandler}>뒤로 가기</button>
                        }
                    </> : <button onClick={showLevelSelectHandler}>Player vs Computer</button>
                } </>: null
            }

            {showLevel ? null :
                <>
                
                <Link to={`/room${props.index}`}> 
                    <button>Player vs Player</button>
                </Link>

                <button onClick={props.closeSelectHandler}>메인으로</button>
                </>
            }

        </SelectContainer>
    )
}

export default Select