import React, { useState } from 'react';
import styled from 'styled-components';
import { BeatLoader, HashLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faVideo,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { useSocketState } from '../../contexts/SocketContext';
import Video from '../Video';
import {
  EnterRommSocketEvents,
  ReadySocketEvent,
} from '../../events/EnterRoomSocket';
import { DisconnectSocket } from '../../events/Socket';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../contexts/UserContext';

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;

  h2 {
    color: ${(props) => props.theme.fontColor};
    font-size: 2rem;
    letter-spacing: 0.2rem;
    @media screen and (min-width: 1200px) {
      font-size: 4rem;
    }
  }

  p {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.5rem;
    letter-spacing: 0.2rem;
    @media screen and (min-width: 1200px) {
      font-size: 3rem;
    }
  }

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    padding: 3rem;
    cursor: pointer;
    width: 5rem;
    height: 5rem;
    color: ${(props) => props.theme.fifthColor};
    @media screen and (min-width: 1200px) {
      width: 8rem;
      height: 8rem;
    }
  }
`;

const Loading = (props) => {
  // const socketDispatch = useSocketDispatch();
  const [check, setCheck] = useState(0);
  const [camera, setCamera] = useState(false);
  const [test, setTest] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  const { isStatus } = useSocketState();
  const { status } = useUserState();

  EnterRommSocketEvents();

  const closeLoadingHandler = () => {
    DisconnectSocket();
    navigate('/');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const cameraCheckHandler = async () => {
    await setCamera(true);
  };

  const setCheckHandler = (value) => {
    setCheck(value);

    if (value === 3) {
      setTest(true);
    }
  };
  const gameStartHandler = async () => {
    setIsReady(true);
    await ReadySocketEvent();
  };

  return (
    <LoadingContainer theme={props.theme}>
      {isStatus === 1 ? (
        <>
          <HashLoader
            color={props.theme.fontColor}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h2>매칭중 ...</h2>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="4x"
            color={props.theme.darkColor}
            onClick={closeLoadingHandler}
          />
        </>
      ) : status === -1 ? (
        <>
          <h2>상대방이 나갔어요.</h2>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="4x"
            color={props.theme.darkColor}
            onClick={closeLoadingHandler}
          />
        </>
      ) : (
        <>
          {test === true ? (
            <>
              {isReady === false ? (
                <>
                  <h2>테스트 성공 !</h2>
                  <p>준비하세요.</p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size="4x"
                    color={props.theme.fontColor}
                    onClick={gameStartHandler}
                  />
                </>
              ) : (
                <>
                  <h2>준비 완료 !</h2>
                  <p>상대방을 기다리는 중입니다...</p>
                  <BeatLoader
                    color={props.theme.fontColor}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </>
              )}
            </>
          ) : (
            <>
              <>
                <h2>매칭이 잡혔습니다 !</h2>
                <p>카메라 버튼을 눌러 테스트하세요.</p>
                <p>진행률</p>
                <p>{check}/3</p>
                {camera === true ? (
                  <>
                    <Video setCheck={setCheckHandler} level={2} />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faVideo}
                      size="4x"
                      color={props.theme.fontColor}
                      onClick={cameraCheckHandler}
                    />
                  </>
                )}
              </>
            </>
          )}
        </>
      )}
    </LoadingContainer>
  );
};

export default Loading;
