import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Starting from './views/Starting';
import Main from './views/Main';
import JokerRoom from './views/JokerRoom';
import JokerRoomAI from './views/JokerRoomAI';
import PokerRoom from './views/PokerRoom';
import Racing from './views/Racing';
import { useThemeState } from './contexts/ThemeContext'; 
import styled from 'styled-components';

const AppBackground = styled.div`
  position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.theme.backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: -1;
`;

const App = () => {
  const theme = useThemeState();

  return (
        <div className="App">

          <AppBackground theme={theme}/>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/room0" element={<JokerRoom/>}/>
              <Route path="/room0ai" element={<JokerRoomAI/>}/>
              <Route path="/room4" element={<PokerRoom/>}/>
              <Route path="/room5" element={<Racing/>}/>
              <Route path="/starting" element={<Starting/>}/>
            </Routes>
          </BrowserRouter>
        </div>
  );
}

export default App;
