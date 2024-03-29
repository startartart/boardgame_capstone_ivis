import styled from 'styled-components';
import './Win.scss';
import { useNavigate } from 'react-router-dom';
import { DisconnectSocket } from '../../events/Socket';
import { useJokerGameState } from '../../contexts/JokerGameContext';

const WinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  flex-direction: column;

  animation: appear 1s;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TextMain = styled.h1`
  color: ${(props) => props.theme.thirdColor};
  font-size: 2rem;
  text-align: center;
  @media screen and (min-width: 1200px) {
    font-size: 5rem;
  }
`;

const Text = styled.h1`
  color: ${(props) => props.theme.fontColor};
  font-size: 3rem;
  text-align: center;

  @media screen and (min-width: 1200px) {
    font-size: 7rem;
  }

  animation: jump 1s infinite;
  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1rem);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const StyledButton = styled.button`
  border: none;
  outline: none;
  border-radius: 3rem;
  background-color: ${(props) => props.theme.thirdColor};
  color: ${(props) => props.theme.fontColor};
  font-size: 1.5rem;
  padding: 1rem 2rem;
  margin: 1rem 0;

  width: 50%;
  align-self: center;
`;

const Win = (props) => {
  const navigate = useNavigate();

  const GoMainHandler = () => {
    DisconnectSocket();
    navigate('/');

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const { exceptionMessage } = useJokerGameState();
  return (
    <div class="pyro">
      <div class="before"></div>
      <div class="after"></div>
      <WinnerContainer theme={props.theme}>
        <TextMain theme={props.theme}>게임 종료</TextMain>
        <Text theme={props.theme}>승 리</Text>
        <StyledButton onClick={GoMainHandler}>메인으로</StyledButton>
      </WinnerContainer>
    </div>
  );
};

export default Win;
