import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

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

const FooterText = styled.p`

    font-size: 1.3rem;

    @media screen and (max-width: 600px) {
        font-size: 0.8rem;
    }

    color: #fff;
`;

const Footer = () => {
    return (
        <FooterContainer>
            {/* <Link to={'/Racing'}><FontAwesomeIcon icon={faGamepad} color="white" size="2x"/></Link> */}
            <FooterText>Product. IVIS Team</FooterText>
            <FooterText>Front : 박병권, Back : 김상범, Engine : 김은지</FooterText>
        </FooterContainer>
    )
}

export default Footer;