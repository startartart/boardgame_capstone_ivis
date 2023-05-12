import React, { useState } from 'react';
import Content from '../components/Main-components/Content';
import Header from '../components/Main-components/Header';
import Footer from '../components/Main-components/Footer';
import SettingOption from '../components/Main-components/SettingOption';
import Profile from '../components/Main-components/Profile';

import { useThemeState } from '../contexts/ThemeContext';
import { useUserState } from '../contexts/UserContext';
import styled from 'styled-components';

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
        <>
            <Header theme={theme} user={user} showSetting={showSettingHandler} showProfile={showProfileHandler}/> 
            <Content theme={theme}/>
            <Footer theme={theme}/>
            {showSetting && <SettingOption theme={theme} closeSetting={showSettingHandler}/>}
            {showProfile && <Profile theme={theme} user={user} closeProfile={showProfileHandler}/>}
        </>
        
        </>
    )
}

export default Main;