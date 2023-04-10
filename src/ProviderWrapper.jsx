import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { JokerGameProvider } from './contexts/JokerGameContext';
import App from './App';

const ProviderWrapper = () => {

    return (
      <ThemeProvider>
        <UserProvider>
          <JokerGameProvider>
            <App>
            </App>
            </JokerGameProvider>
        </UserProvider>
    </ThemeProvider>
    );
}

export default ProviderWrapper;