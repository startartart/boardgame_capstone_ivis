import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

const ProfileContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.fontColor};
    color: ${props => props.theme.darkColor};
    width: 20rem;
    height: 35rem;
    border-radius: 1rem;
    border: 2px solid ${props => props.theme.thirdColor};
    padding: 1rem;
    overflow: auto;
`;

const PlayerBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid ${props => props.theme.darkColor};
    border-radius: 1rem;
    margin: 2rem;

    img {
        padding: 1rem;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        object-fit: cover;
    }

`;

const Text = styled.p`
    font-size: 1rem;
    font-size: ${props => props.fontSize}rem;
    margin: 0.1rem;

    svg {
        width: 1rem;
        height: 1rem;
        margin: 0;
    }

    & + & {
        margin-bottom: 1rem;
    }
`;

const Color = styled.b`
    color: ${props => props.color};
`

const UserImageContainer = styled.div`
    position: relative;
    top: 2.5rem;
    left: 2.5rem;
`;

const Profile = (props) => {

    const closeProfileHandler = () => {
        props.closeProfile();
    }
    return (
        <ProfileContainer theme={props.theme}>
            <FontAwesomeIcon icon={faXmark} color={props.theme.thirdColor} size="2x" onClick={closeProfileHandler} pull="right"/>
            <h2>Player Information.</h2>
            <PlayerBoxContainer theme={props.theme}>
                <UserImageContainer>
                    <FontAwesomeIcon icon={faPenToSquare} color={props.theme.thirdColor} size="2x"/>
                </UserImageContainer>
                <img src={props.user.avatar} alt="avatar" width="100" height="100" />
                <Text fontSize={2}>{props.user.name} <FontAwesomeIcon icon={faPen} color={props.theme.thirdColor} loc={"side"} size="1x" /></Text>
                <Text fontSize={0.8}>Status: <Color color={props.user.status === 1 ? "green" : "gray"}>{props.user.status === 1 ? "Online" : "Offline"}</Color></Text>
                <Text>POINT: {props.user.point} point</Text>
                <Text fontSize={0.9}>- BIO -</Text>
                <Text fontSize={0.9}>{props.user.introudce}</Text>
                {props.user.level === 1 ? <Text>Level: <Color color={"green"}>Beginner</Color></Text> : <Text>Level: <Color color={"red"}>Beginner</Color></Text>}
            </PlayerBoxContainer>

            <h2>Player History.</h2>
            <PlayerBoxContainer theme={props.theme}>
                {/* <UserImageContainer>
                    <FontAwesomeIcon icon={faPenToSquare} color={props.theme.thirdColor} size="2x"/>
                </UserImageContainer>
                <img src={props.user.avatar} alt="avatar" width="100" height="100" />
                <Text fontSize={2}>{props.user.name} <FontAwesomeIcon icon={faPen} color={props.theme.thirdColor} loc={"side"} size="1x" /></Text>
                <Text fontSize={0.8}>Status: <Color color={props.user.status === 1 ? "green" : "gray"}>{props.user.status === 1 ? "Online" : "Offline"}</Color></Text>
                <Text>POINT: {props.user.point} point</Text>
                <Text fontSize={0.9}>- BIO -</Text>
                <Text fontSize={0.9}>{props.user.introudce}</Text>
                {props.user.level === 1 ? <Text>Level: <Color color={"green"}>Beginner</Color></Text> : <Text>Level: <Color color={"red"}>Beginner</Color></Text>} */}
            </PlayerBoxContainer>
        </ProfileContainer>

        

    )
}

export default Profile;