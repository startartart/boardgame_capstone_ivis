import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { JokerGameProvider } from './contexts/JokerGameContext';
import { SocketProvider } from './contexts/SocketContext';
import { PokerGameProvider } from './contexts/PokerGameContext';
import App from './App';

const ProviderWrapper = () => {

    return (
    <SocketProvider>
      <ThemeProvider>
        <UserProvider>
          <PokerGameProvider>
            <JokerGameProvider>
              <App>
              </App>
            </JokerGameProvider>
          </PokerGameProvider>
        </UserProvider>
      </ThemeProvider>
    </SocketProvider>
    );
}

export default ProviderWrapper;