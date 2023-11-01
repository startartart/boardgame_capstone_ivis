import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { DisconnectSocket } from '../../events/Socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';

const DrawerContainer = styled.div`
    position: fixed;
    top: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;

    //흐릿하게

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

const TextExit = styled.h1`
    color: ${props => props.theme.thirdColor};
    font-size: 2rem;
    text-align: center;
`;

const Text = styled.h1`
    color: ${props => props.theme.secondaryColor};
    font-size: 3rem;
    text-align: center;
`;

const StyledButton = styled.button`
    border: none;
    outline: none;
    border-radius: 3rem;
    background-color: ${props => props.theme.thirdColor};
    color: ${props => props.theme.fontColor};
    font-size: 1.5rem;
    padding: 1rem 2rem;
    margin: 1rem 0;

    width: 50%;
    align-self: center;
`;

const Draw = (props) => {
    const navigate = useNavigate();

    const GoMainHandler = () => {
        DisconnectSocket();
        navigate('/');

        setTimeout(() => {
            window.location.reload()
        }, 100);
    }

    return (
        <DrawerContainer theme={props.theme}>
            <TextExit theme={props.theme}>게임종료</TextExit>
            <Text theme={props.theme}>무승부</Text>
            <FontAwesomeIcon icon={faFaceSadTear} size="4x" color={props.theme.fontColor}/>
            <StyledButton onClick={GoMainHandler}>메인으로</StyledButton>
        </DrawerContainer>
    )
}

export default Draw;