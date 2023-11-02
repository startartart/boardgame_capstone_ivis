import React, { useState } from 'react';
import styled from 'styled-components';
import {
  usePokerGameState,
  usePokerGameDispatch,
} from '../../../contexts/PokerGameContext';
import {
  PeekSocketEvent,
  SelectSocketEvent,
  ListenPokerGameSocketEvents,
} from '../../../events/PokerGameSocket';
import { useSocketState } from '../../../contexts/SocketContext';

const BoardContainer = styled.div`
  width: 100%;
  height: 45%;

  position: fixed;
  top: 25%;
  left: 0;

  --maincolor: ${(props) => props.theme.fifthColor};
  --subcolor: ${(props) => props.theme.thirdColor};
  --backgroundcolor: ${(props) => props.theme.darkColor};

  background: radial-gradient(var(--maincolor) 3px, transparent 4px),
    radial-gradient(var(--maincolor) 3px, transparent 4px),
    linear-gradient(#fff 4px, transparent 0),
    linear-gradient(
      45deg,
      transparent 74px,
      transparent 75px,
      var(--subcolor) 75px,
      var(--subcolor) 76px,
      transparent 77px,
      transparent 109px
    ),
    linear-gradient(
      -45deg,
      transparent 75px,
      transparent 76px,
      var(--subcolor) 76px,
      var(--subcolor) 77px,
      transparent 78px,
      transparent 109px
    ),
    #fff;
  background-size: 109px 109px, 109px 109px, 100% 6px, 109px 109px, 109px 109px;
  background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  border-radius: 2rem;

  margin: 1rem auto;

  & > :nth-child(2) {
    border-top: groove;
    border-bottom: groove;
    height: 15%;
  }
  & > :nth-child(4) {
    border-top: groove;
    border-bottom: groove;
    height: 15%;
  }
`;

const Card = styled.img`
  //img 크기 고정
  width: ${(props) => props.size}rem;
  height: auto;

  // props.peeked
  ${(props) =>
    props.peeked &&
    `
        transform: translateY(-2rem);
        transition: transform 0.5s ease-in-out;
    `}

  & + & {
    margin-left: -0.5rem;
  }

  @media screen and (min-width: 1200px) {
    width: 5rem;
    & + & {
      margin-left: -1rem;
    }
  }
`;

const CardBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  //첫번째요소만 맨 왼쪽으로
  & > :first-child {
    margin-left: 1rem;
    position: absolute;
    left: 0;
  }
`;

const GameText = styled.p`
  font-size: 1rem;
  @media screen and (min-width: 1200px) {
    font-size: 2.5rem;
  }
`;

const Board = (props) => {
  const {
    myHand,
    myShowHand,
    enemyHand,
    enemyShowHand,
    myTurn,
    expression,
    peek,
    guess,
    select,
  } = usePokerGameState();
  const pokerGameDispatch = usePokerGameDispatch();
  const { socket } = useSocketState();

  if (socket) {
    ListenPokerGameSocketEvents();
  }

  const cardPeekHandler = async (index) => {
    if (guess >= 1) return;

    pokerGameDispatch({
      type: 'SET_SELECT',
      select: index,
    });

    PeekSocketEvent(index);
  };

  const cardSelectHandler = async (index) => {
    if (guess >= 1) return;

    if (myTurn != 1) {
      pokerGameDispatch({
        type: 'SET_SELECT',
        select: -1,
      });
    }
  };

  const cardCheatHandler = async (index) => {};

  function ShowEnemyCard(value, index) {
    let arr = [];
    for (let i = 0; i < value; i++) {
      if (i == index) {
        arr.push(
          <Card
            src={`./images/cards/back${props.theme.mode}.png`}
            alt="card"
            key={i}
            onClick={() => cardSelectHandler(i)}
            peeked={true}
            size={3.5}
          />
        );
      } else {
        arr.push(
          <Card
            src={`./images/cards/back${props.theme.mode}.png`}
            alt="card"
            key={i}
            onClick={() => cardPeekHandler(i)}
            size={3.5}
          />
        );
      }
    }
    return arr;
  }

  function ShownEnemyCard(value) {
    let arr = [];
    for (let i = 0; i < value; i++) {
      arr.push(
        <Card
          src={`./images/poker_cards/${enemyShowHand[i]}.png`}
          alt="card"
          key={i}
          onClick={() => cardCheatHandler(i)}
          size={3}
        />
      );
    }
    return arr;
  }

  function ShowMyCard(value, index) {
    let arr = [];
    for (let i = 0; i < value; i++) {
      if (i == index) {
        // if joker is peeked
        arr.push(
          <Card
            src={`./images/poker_cards/${myHand[i]}.png`}
            alt="card"
            key={i}
            onClick={() => cardCheatHandler(i)}
            peeked={true}
            size={3.5}
          />
        );
      } else {
        arr.push(
          <Card
            src={`./images/poker_cards/${myHand[i]}.png`}
            alt="card"
            key={i}
            onClick={() => cardCheatHandler(i)}
            size={3.5}
          />
        );
      }
    }
    return arr;
  }

  function ShownMyCard(value) {
    let arr = [];
    for (let i = 0; i < value; i++) {
      arr.push(
        <Card
          src={`./images/poker_cards/${myShowHand[i]}.png`}
          alt="card"
          key={i}
          onClick={() => cardCheatHandler(i)}
          size={3}
        />
      );
    }
    return arr;
  }

  return (
    <BoardContainer theme={props.theme}>
      <CardBox>
        <GameText>상대방 카드</GameText>
        {ShowEnemyCard(enemyHand, select)}
      </CardBox>
      <CardBox>
        <GameText>상대방 수집 카드</GameText>
        {ShownEnemyCard(enemyShowHand.length)}
      </CardBox>

      {expression == './images/emoji/emoji0.png' ? (
        <GameText>얼굴을 제대로 인식해주세요</GameText>
      ) : (
        <GameText>동물 포커</GameText>
      )}

      <CardBox>
        <GameText>내 수집 카드</GameText>
        {ShownMyCard(myShowHand.length)}
      </CardBox>
      <CardBox>
        <GameText>내 카드</GameText>
        {ShowMyCard(myHand.length, peek)}
      </CardBox>
    </BoardContainer>
  );
};

export default Board;
