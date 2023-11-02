import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.primaryColor},
    ${(props) => props.theme.secondaryColor}
  );
  padding: 1rem;
  text-align: center;

  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;

  width: auto;
  height: 10vh;
`;

const UserProfile = styled.div`
  color: ${(props) => props.theme.fifthColor};
  display: flex;
  align-items: center;
  margin: 1rem;
  gap: 1rem;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
  }

  @media screen and (min-width: 1200px) {
    img {
      width: 5rem;
      height: 5rem;
    }

    font-size: 2.5rem;
  }
`;

const Setting = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.fontColor};
  border-radius: 50%;

  button {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    color: inherit;
    font-family: inherit;

    margin: 0;
    padding: 0;

    &:active {
      outline: none;
      opacity: 0.5;
    }

    @media screen and (min-width: 1200px) {
      font-size: 2rem;
    }
  }
  @media screen and (min-width: 1200px) {
    width: 7rem;
    height: 7rem;
  }
`;

const Header = (props) => {
  const ShowSettingHandler = () => {
    props.showSetting();
  };

  const ShowProfileHandler = () => {
    props.showProfile();
  };

  return (
    <HeaderContainer theme={props.theme}>
      <Setting theme={props.theme}>
        <button onClick={ShowSettingHandler}>Setting</button>
      </Setting>
      <UserProfile theme={props.theme}>
        <p>{props.user.name}</p>
        <img
          onClick={ShowProfileHandler}
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="user profile"
        />
      </UserProfile>
    </HeaderContainer>
  );
};

export default Header;
