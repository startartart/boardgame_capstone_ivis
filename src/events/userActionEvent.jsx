import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useUser } from '../contexts/UserContext';

const ENDPOINT = 'http://localhost:3001';

const Battle = ({ onBackStarting }) => {
    const { user, dispatchUser } = useUser();
    const [response, setResponse] = useState('');
    const [response2, setResponse2] = useState('');

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('FromAPI', data => {
            setResponse(data);
        });
        socket.on('FromAPI2', data => {
            setResponse2(data);
        });
        return () => socket.disconnect();
    }, []);

    const onBackStartingHandler = () => {
        onBackStarting();
    }

    const onReadyHandler = () => {
        dispatchUser({ type: 'SET_READY', isReady: true });
    }

    return (
        <>
            <h1>Com vs User</h1>
            <button onClick={onBackStartingHandler}>Back</button>
            <button onClick={onReadyHandler}>Ready</button>
            <h1>{response}</h1>
            <h1>{response2}</h1>
        </>
    )
}

export default Battle;