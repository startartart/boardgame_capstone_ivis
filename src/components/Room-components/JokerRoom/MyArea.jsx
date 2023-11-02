import React, { useState, useEffect } from 'react';
import { Line } from 'rc-progress';
import { useJokerGameState } from '../../../contexts/JokerGameContext';
import { TimeOutSocketEvent } from '../../../events/JokerGameSocket';
import styled from 'styled-components';

const MyAreaContainer = styled.div`
  width: 100%;
  height: 20%;

  position: fixed;
  top: 75%;
  left: 0;
`;

const ExpreesionContainer = styled.div`
  width: 100%;
  height: 20%;

  text-align: center;

  font-size: 1.5rem;
  color: ${(props) => props.theme.fontColor};
`;

const MyArea = (props) => {
  const [percent, setPercent] = useState(0);
  const { myTurn } = useJokerGameState();
  const { expression } = useJokerGameState();

  // myTurn이 true일 때만 percent를 증가시킨다.
  useEffect(() => {
    if (myTurn == 1) {
      const timer = setInterval(increase, 1000);
      return () => {
        clearInterval(timer);
      };
    } else {
      setPercent(0);
    }
  }, [myTurn, percent]);

  const increase = () => {
    if (percent >= 100) {
      TimeOutSocketEvent();
      setPercent(0);
    } else {
      setPercent(percent + 5);
    }
  };

  return (
    <MyAreaContainer>
      <Line percent={percent} strokeWidth="2" strokeColor="#D3D3D3" max="30" />
      <ExpreesionContainer theme={props.theme}>
        <img src={expression} alt="expression-emoji" />
      </ExpreesionContainer>
    </MyAreaContainer>
  );
};

export default MyArea;
