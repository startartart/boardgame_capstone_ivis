import React from 'react';
import styled from 'styled-components';
import { useThemeState } from '../contexts/ThemeContext';
import { useUserState } from '../contexts/UserContext';


const PookerRoom = () => {
    const theme = useThemeState();
    const user = useUserState();

    return (
        <div>
            <h1>방이름 : {user.room}</h1>
            <h2>{theme.primaryColor}</h2>
            <img src="./images/cards/clover_2.png" alt="clover_2"/>
        </div>
    )
}

export default PookerRoom;