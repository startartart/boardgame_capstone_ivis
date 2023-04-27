import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Starting from './views/Starting';
import Main from './views/Main';
import JokerRoom from './views/JokerRoom';
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
              <Route path="/room1" element={<JokerRoom/>}/>
              <Route path="/room2" element={<PokerRoom/>}/>
              <Route path="/racing" element={<Racing/>}/>
              <Route path="/starting" element={<Starting/>}/>
            </Routes>
          </BrowserRouter>
        </div>
  );
}

export default App;
