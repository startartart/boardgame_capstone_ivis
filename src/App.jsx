import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { JokerGameProvider } from './contexts/JokerGameContext';
import './App.scss';
import Starting from './views/Starting';
import Main from './views/Main';
import JokerRoom from './views/JokerRoom';
import PokerRoom from './views/PokerRoom';
import Racing from './views/Racing';

function App() {

  return (
    <ThemeProvider>
      <UserProvider>
        <JokerGameProvider>
        <div className="App">
          <div className="App-background"/>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/room1" element={<JokerRoom/>}/>
              <Route path="/room2" element={<PokerRoom/>}/>
              <Route path="/racing" element={<Racing/>}/>
            </Routes>
          </BrowserRouter>
        </div>
        </JokerGameProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
