import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { JokerGameProvider } from './contexts/JokerGameContext';
import { SocketProvider } from './contexts/SocketContext';
import App from './App';

const ProviderWrapper = () => {

    return (
    <SocketProvider>
      <ThemeProvider>
        <UserProvider>
          <JokerGameProvider>
            <App>
            </App>
            </JokerGameProvider>
        </UserProvider>
      </ThemeProvider>
    </SocketProvider>
    );
}

export default ProviderWrapper;