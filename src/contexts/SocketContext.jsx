import React, { useReducer, createContext, useContext } from 'react';

const initalSocketState = {
    socket : false,
    isStatus : 0,
    error : null,
    event : null,
}

const socketReducer = (state, action) => {
    switch (action.type) {
        case 'CONNECTED':
            return {
                ...state,
                socket : action.socket,
                isStatus : action.isStatus,
            }
        case 'DISCONNECTED':
            return {
                ...state,
                socket : action.socket,
                isStatus : action.isStatus,
            }
        case 'EVNET_LISTENER':
            return {
                ...state,
                event : action.event,
            }
        default:
            return state;
    }
}

const SocketStateContext = createContext();
const SocketDispatchContext = createContext();

export const SocketProvider = ({ children }) => {
    const [state, dispatch] = useReducer(socketReducer, initalSocketState);

    return (
        <SocketStateContext.Provider value={state}>
            <SocketDispatchContext.Provider value={dispatch}>
                {children}
            </SocketDispatchContext.Provider>
        </SocketStateContext.Provider>
    )
}

export const useSocketState = () => {
    const context = useContext(SocketStateContext);
    if (!context) {
        throw new Error('Cannot find SocketProvider');
    }
    return context;
}

export const useSocketDispatch = () => {
    const context = useContext(SocketDispatchContext);
    if (!context) {
        throw new Error('Cannot find SocketProvider');
    }
    return context;
}

export const useSocket = () => {
    return [useSocketState(), useSocketDispatch()];
}
