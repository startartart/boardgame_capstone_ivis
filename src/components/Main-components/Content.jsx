import React, { useState } from 'react';
import styled from 'styled-components';
import { DescriptionText } from './GameDescriptionText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Select from '../Select';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  align-self: center;
  margin: 1rem;
`;

const SelectGameModeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  height: 10vh;

  @media screen and (min-width: 1200px) {
    height: 15vh;
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
  border: 2px solid ${(props) => props.theme.fifthColor};
  border-bottom: none;
  background-color: ${(props) =>
    props.isActive ? props.theme.thirdColor : props.theme.unselectedColor};
  color: ${(props) =>
    props.isActive ? props.theme.fourthColor : props.theme.fifthColor};

  @media screen and (min-width: 1200px) {
    font-size: 2rem;
    width: 20%;
    height: 50%;
  }
`;

const GameModeDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 40%;
  border-radius: 0 1rem 1rem 1rem;
  border: 2px solid ${(props) => props.theme.fifthColor};
  padding: 1rem;
  gap: 1rem;

  background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.darkColor},
    ${(props) => props.theme.primaryColor},
    ${(props) => props.theme.secondaryColor}
  );
  color: ${(props) => props.theme.fontColor};

  @media screen and (min-width: 1200px) {
    width: 80%;
    height: 50%;
    margin-left: 11%;
    border-radius: 1rem;
    padding: 2rem;
  }

  img {
    width: 100%;
    @media screen and (min-width: 1200px) {
      width: 15rem;
      height: 15rem;
    }

    animation: fadein 10s infinite;

    @keyframes fadein {
      0% {
        opacity: 0.5;
      }
      10% {
        opacity: 1;
      }
      20% {
        opacity: 0;
      }
      30% {
        opacity: 0.8;
      }
      40% {
        opacity: 0.2;
      }
      50% {
        opacity: 0.7;
      }
      60% {
        opacity: 0.3;
      }
      70% {
        opacity: 0.9;
      }
      80% {
        opacity: 0.2;
      }
      90% {
        opacity: 1;
      }
      100% {
        opacity: 0.5;
      }
    }
  }
`;

const GameContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: space-around;
  gap: 2rem;

  svg {
    font-size: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;

    @media screen and (min-width: 1200px) {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
    }
  }
`;

const GameMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
`;

const GameImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 75%;
    width: 75%;

    @media screen and (min-width: 1200px) {
      height: 100%;
    }
  }
`;
const GameNameText = styled.p`
  font-size: 2rem;
  @media screen and (min-width: 1200px) {
    font-size: 3.5rem;
  }
`;
const GameContentText = styled.p`
  font-size: 1rem;
  @media screen and (min-width: 1200px) {
    font-size: 2rem;
  }
`;

const Content = (props) => {
  const [selectedGameMode, setSelectedGameMode] = useState(0);
  const [showSelect, setShowSelect] = useState(false);

  const SelectedGameHandler = async () => {
    setShowSelect(true);
  };

  const closeSelectHandler = () => {
    setShowSelect(false);
  };
  return (
    <ContentContainer>
      <SelectGameModeContainer theme={props.theme}>
        <SelectGameModeBlock
          theme={props.theme}
          onClick={() => setSelectedGameMode(0)}
          isActive={selectedGameMode === 0}
        >
          조커뽑기
        </SelectGameModeBlock>
        <SelectGameModeBlock
          theme={props.theme}
          onClick={() => setSelectedGameMode(1)}
          isActive={selectedGameMode === 1}
        >
          동물 포커
        </SelectGameModeBlock>
      </SelectGameModeContainer>
      <GameModeDescription theme={props.theme}>
        {DescriptionText.map((text, index) => {
          if (index === selectedGameMode) {
            return (
              <GameContent key={index}>
                <GameMain>
                  <GameNameText>{text.name}</GameNameText>
                  <GameContentText>{text.description}</GameContentText>
                  {showSelect ? (
                    <Select
                      text={text}
                      theme={props.theme}
                      index={text.room}
                      closeSelectHandler={closeSelectHandler}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      onClick={() => SelectedGameHandler()}
                      color={props.theme.fifthColor}
                    />
                  )}
                </GameMain>
                <GameImageContainer>
                  <img src={text.path_link} alt={text.name} />
                </GameImageContainer>
              </GameContent>
            );
          } else {
            return null;
          }
        })}
      </GameModeDescription>
    </ContentContainer>
  );
};

export default Content;
