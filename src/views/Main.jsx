import React, { useState } from 'react';
import Content from '../components/Main-components/Content';
import Header from '../components/Main-components/Header';
import Footer from '../components/Main-components/Footer';
import SettingOption from '../components/Main-components/SettingOption';
import Profile from '../components/Main-components/Profile';
import Loading from '../components/Main-components/Loading';
import { useThemeState } from '../contexts/ThemeContext';
import { useUserState } from '../contexts/UserContext';
import styled from 'styled-components';

const MainContainer = styled.div`
    ${props => props.loading === "true" && `filter: blur(5px);`}
`;

const Main = () => {
    const theme = useThemeState();
    const user = useUserState();
    const [showSetting, setShowSetting] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    
    const showSettingHandler =  () => {
        setShowSetting(!showSetting);
        setShowProfile(false);
    }

    const showProfileHandler = () => {
        setShowProfile(!showProfile);
        setShowSetting(false);
    }

    return (
        <>
        <MainContainer loading={user.isReady.toString()}>
            <Header theme={theme} user={user} showSetting={showSettingHandler} showProfile={showProfileHandler}/> 
            <Content theme={theme}/>
            <Footer theme={theme}/>
            {showSetting && <SettingOption theme={theme} closeSetting={showSettingHandler}/>}
            {showProfile && <Profile theme={theme} user={user} closeProfile={showProfileHandler}/>}
        </MainContainer>
        {user.isReady && <Loading theme={theme}/>}
        </>
    )
}

export default Main;