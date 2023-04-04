import React, { useState } from 'react';
import styled from 'styled-components';
import { useUserDispatch } from '../../contexts/UserContext';
import { DescriptionText } from './GameDescriptionText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80vh;
`;

const SelectGameModeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
    height: 10vh;
    margin: 1rem 0 0 1rem;
`;

const SelectGameModeBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 60%;
    border-radius: 1rem 1rem 0 0;
    border: 2px solid ${props => props.theme.fourthColor};
    border-bottom: none;
    background-color: ${props => props.isActive ? props.theme.fifthColor : props.theme.primaryColor};
    color: ${props => props.isActive ? props.theme.fontColor : props.theme.fifthColor};
`;

const GameModeDescription = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 40%;
    border-radius: 0 1rem 1rem 1rem;
    border: 2px solid ${props => props.theme.fourthColor};
    //graident
    background: linear-gradient(to bottom right, ${props => props.theme.darkColor}, ${props => props.theme.primaryColor}, ${props => props.theme.secondaryColor});
    color: ${props => props.theme.fontColor};
    margin-left: 1rem;

    img {
        width: 10rem;
        height: 12rem;
        margin: 1rem;

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
                font-size: 1.8rem;
            }

            p {
                font-size: 0.8rem;
            }

            svg {
                position: relative;
                top: 0.5rem;
                left: 0;
                font-size: 1.5rem;
                width: 1.5rem;
                height: 1.5rem;

            }
            margin: 1rem;
        }
    }
`;

const Content = (props) => {

    const [selectedGameMode, setSelectedGameMode] = useState(0);
    const userDispatch = useUserDispatch();

    const SelectedGameHandler = async (selectedGameMode) => {
        let socket = selectedGameMode + "P231";
        await userDispatch({
            type: 'SET_READY_TOGGLE',
            isReady: true,
            socket: socket
        });

        await setTimeout(() => {
            userDispatch({
                type: 'SET_PLAYING',
                isPlaying: true,
                room: "SERVER323"
            });
        }, 3000);
    }
    return (
        <ContentContainer>
            <SelectGameModeContainer theme={props.theme}>
                <SelectGameModeBlock 
                theme={props.theme} onClick={() => setSelectedGameMode(0)} 
                isActive={selectedGameMode === 0}>도둑잡기</SelectGameModeBlock>
                <SelectGameModeBlock 
                theme={props.theme} onClick={() => setSelectedGameMode(1)}
                isActive={selectedGameMode === 1}>포커</SelectGameModeBlock>
            </SelectGameModeContainer>
            <GameModeDescription theme={props.theme}>
                {DescriptionText.map((text, index) => {
                    if (index === selectedGameMode) {
                        return (
                            <div key={index}>
                                <div>
                                    <h1>{text.name}</h1>
                                    <p>{text.description}</p>
                                    <FontAwesomeIcon icon={faChevronRight} onClick={() => SelectedGameHandler(selectedGameMode)}/>
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