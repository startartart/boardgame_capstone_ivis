import React, { useState } from 'react';
import styled from 'styled-components';
import { useUserDispatch } from '../../contexts/UserContext';
import { DescriptionText } from './GameDescriptionText';
import { useSocketDispatch } from '../../contexts/SocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80vh;
    align-self: center;


`;

const SelectGameModeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
    height: 10vh;
    margin: 1rem 0 0 1rem;

    @media screen and (min-width: 1200px) {
        height: 15vh;
        //center
        justify-content: center;
    }
`;

const SelectGameModeBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 60%;
    border-radius: 1rem 1rem 0 0;
    border: 2px solid ${props => props.theme.fifthColor};
    border-bottom: none;
    background-color: ${props => props.isActive ? props.theme.thirdColor : props.theme.unselectedColor};
    color: ${props => props.isActive ? props.theme.fourthColor : props.theme.fifthColor};

    @media screen and (min-width: 1200px) {
        font-size: 2rem;
        width: 20%;
        height: 50%;
    }
`;

const GameModeDescription = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 40%;
    border-radius: 0 1rem 1rem 1rem;
    border: 2px solid ${props => props.theme.fifthColor};
    //graident
    background: linear-gradient(to bottom right, ${props => props.theme.darkColor}, ${props => props.theme.primaryColor}, ${props => props.theme.secondaryColor});
    color: ${props => props.theme.fontColor};
    margin-left: 1rem;

    @media screen and (min-width: 1200px) {
        width: 80%;
        height: 50%;
        //center
        margin-left: 11%;
        border-radius: 1rem;
    }

    img {
        width: 8.5rem;
        height: 11rem;
        margin-right: 1rem;

        @media screen and (min-width: 1200px) {
            width: 15rem;
            height: 20rem;
        }

        animation: fadein 10s infinite;

        @keyframes fadein {
            0% { opacity: 0.5; }
            10% { opacity: 1; }
            20% { opacity: 0; }
            30% { opacity: 0.8; }
            40% { opacity: 0.2; }
            50% { opacity: 0.7; }
            60% { opacity: 0.3; }
            70% { opacity: 0.9; }
            80% { opacity: 0.2; }
            90% { opacity: 1; }
            100% { opacity: 0.5; }
        }
    }

    div {
        display: flex;
        flex-direction: row;

        div {
            display: flex;
            flex-direction: column;
            align-items: left;
            justify-content: space-around;

            h1 {
                font-size: 2rem;
                @media screen and (min-width: 1200px) {
                    font-size: 3.5rem;
                }
            }

            p {
                font-size: 0.8rem;
                @media screen and (min-width: 1200px) {
                    font-size: 1.5rem;
                }
            }

            svg {
                position: relative;
                top: 0.5rem;
                left: 0;
                font-size: 1.5rem;
                width: 1.5rem;
                height: 1.5rem;

                @media screen and (min-width: 1200px) {
                    font-size: 4rem;
                    width: 4rem;
                    height: 4rem;
                }
            }
            margin-left: 1rem;
        }
    }
`;

const Content = (props) => {

    const [selectedGameMode, setSelectedGameMode] = useState(0);
    const userDispatch = useUserDispatch();
    const socketDispatch = useSocketDispatch();

    const SelectedGameHandler = async (selectedGameMode) => {
        // await userDispatch({
        //     type: 'SET_STATUS',
        //     status: 1,
        // });
        // // then
        // await socketDispatch({
        //     type: 'CONNECTED',
        //     socket: false,
        //     isStatus: 1
        // });
    }
    return (
        <ContentContainer>
            <SelectGameModeContainer theme={props.theme}>
                <SelectGameModeBlock 
                theme={props.theme} onClick={() => setSelectedGameMode(0)} 
                isActive={selectedGameMode === 0}>조커뽑기</SelectGameModeBlock>
                <SelectGameModeBlock 
                theme={props.theme} onClick={() => setSelectedGameMode(1)}
                isActive={selectedGameMode === 1}>동물 포커</SelectGameModeBlock>
                <SelectGameModeBlock 
                theme={props.theme} onClick={() => setSelectedGameMode(2)}
                isActive={selectedGameMode === 2}>감정 경마</SelectGameModeBlock>
            </SelectGameModeContainer>
            <GameModeDescription theme={props.theme}>
                {DescriptionText.map((text, index) => {
                    if (index === selectedGameMode) {
                        return (
                            <div key={index}>
                                <div>
                                    <h1>{text.name}</h1>
                                    <p>{text.description}</p>
                                    <Link to={`/room${index}`}> 
                                        <FontAwesomeIcon
                                        icon={faChevronRight}
                                        onClick={() => SelectedGameHandler(selectedGameMode)}
                                        color={props.theme.fifthColor}/>
                                    </Link>
                                </div>
                                <img src={text.path_link} alt={text.name}/>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </GameModeDescription>
        </ContentContainer>
    )
}

export default Content;