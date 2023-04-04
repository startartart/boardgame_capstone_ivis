import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';

const FooterContainer = styled.footer`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${props => props.theme.secondaryColor};
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 10vh;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FontAwesomeIcon icon={faGamepad} color="white" size="2x"/>
            <FontAwesomeIcon icon={faGamepad} color="white" size="2x"/>
        </FooterContainer>
    )
}

export default Footer;