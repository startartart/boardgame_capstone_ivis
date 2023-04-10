import React, {useState} from 'react';
import styled from 'styled-components';
import HashLoader from "react-spinners/HashLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faVideo, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useUserDispatch, useUserState } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import Video from '../Video';

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
    const { isPlaying, room } = useUserState();
    const [check, setCheck] = useState(0);
    const [camera, setCamera] = useState(false);
    const [test, setTest] = useState(false);

    const closeLoadingHandler = () => {
        userDispatch({
            type: 'SET_READY_TOGGLE',
            isReady: false,
            socket: 0
        });
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

    return (
        <LoadingContainer theme={props.theme}>
            {isPlaying === false ?
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
            <FontAwesomeIcon icon={faCircleXmark} size="4x" color={props.theme.darkColor} onClick={closeLoadingHandler}/>
            </>:
                <>
                {test === true ?
                <>
                    <h2>테스트 성공 !</h2>
                    <p>방에 입장하세요.</p>
                    <Link to={`/room1?room_name=` + room}>
                        <FontAwesomeIcon icon={faArrowRight} size="4x" color={props.theme.fontColor}/>
                    </Link>
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