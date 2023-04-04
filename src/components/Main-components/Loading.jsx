import React, {useState} from 'react';
import styled from 'styled-components';
import HashLoader from "react-spinners/HashLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useUserDispatch, useUserState } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

const LoadingContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;

    p {
        color: ${props => props.theme.fontColor};
        font-size: 2rem;
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
    const [loading, setLoading] = useState(true);
    const userDispatch = useUserDispatch();
    const { isPlaying, room } = useUserState();
    const closeLoadingHandler = () => {
        userDispatch({
            type: 'SET_READY_TOGGLE',
            isReady: false,
            socket: 0
        });
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
            <p>매칭중 ...</p>
            <FontAwesomeIcon icon={faCircleXmark} size="4x" color={props.theme.darkColor} onClick={closeLoadingHandler}/>
            </>:
            <>
            <p>매칭이 잡혔습니다 !</p>
            <Link to={`/room1?room_name=` + room}>GO !</Link>
            </>
            }
            
        </LoadingContainer>
    )
}

export default Loading;