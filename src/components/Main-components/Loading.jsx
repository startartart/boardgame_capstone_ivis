import React, {useState} from 'react';
import styled from 'styled-components';
import HashLoader from "react-spinners/HashLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faVideo, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useUserDispatch, useUserState } from '../../contexts/UserContext';
import { useSocketState, useSocketDispatch } from '../../contexts/SocketContext';
import { Link } from 'react-router-dom';
import Video from '../Video';
import { EnterRommSocketEvents, ReadySocketEvent } from '../../events/EnterRoomSocket';

const LoadingContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;

    h2 {
        color: ${props => props.theme.fontColor};
        font-size: 2rem;
        letter-spacing: 0.2rem;
    }

    p {
        color: ${props => props.theme.fontColor};
        font-size: 1.5rem;
        letter-spacing: 0.2rem; 
    }

    width:100%;
    height:100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    svg {
        padding: 3rem;
    }
`;

const Loading = (props) => {
    const userDispatch = useUserDispatch();
    // const socketDispatch = useSocketDispatch();
    const [check, setCheck] = useState(0);
    const [camera, setCamera] = useState(false);
    const [test, setTest] = useState(false);

    const {socket, isStatus } = useSocketState();

    EnterRommSocketEvents();

    const closeLoadingHandler = async () => {

        // 서버한테 방 나가기 이벤트 보내기
        await userDispatch({
            type: 'LEAVE_ROOM',
        });

        // then ..
    }

    const cameraCheckHandler = async () => {
        await setCamera(true);
    }

    const setCheckHandler = (value) => {
        setCheck(value);

        if (value === 10) {
            setTest(true);
        }
    }
    const gameStartHandler = async () => {

        // 서버한테 게임 시작 이벤트 보내기
        await ReadySocketEvent();
        await userDispatch({
            type: 'SET_STATUS',
            status: 2,
        });
        // then

    }

    return (
        <LoadingContainer theme={props.theme}>
            {isStatus === 1 ?
            <>
                <HashLoader
                color={props.theme.fontColor}
                // loading={loading}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <h2>매칭중 ...</h2>
            <Link to={'/'}>
                <FontAwesomeIcon icon={faCircleXmark} size="4x" color={props.theme.darkColor} onClick={closeLoadingHandler}/>
            </Link>
            </>:
                <>
                {test === true ?
                <>
                    <h2>테스트 성공 !</h2>
                    <p>준비하세요.</p>
                        <FontAwesomeIcon icon={faArrowRight} size="4x" color={props.theme.fontColor} onClick={gameStartHandler}/>
                </>: 
                <>
                    <>
                        <h2>매칭이 잡혔습니다 !</h2>
                        <p>카메라 버튼을 눌러 테스트하세요.</p>
                        <p>진행률</p>
                        <p>{check}/10</p>
                        {camera === true ?
                            <>
                                
                                <Video setCheck={setCheckHandler} level={2}/>
                            </>:
                            <>
                            <FontAwesomeIcon icon={faVideo} size="4x" color={props.theme.fontColor} onClick={cameraCheckHandler}/>
                            </>
                        }
                    </>
                </>
                }
                </>
            }
        </LoadingContainer>
    )
}

export default Loading;