import React, { useReducer, createContext, useContext } from 'react';

const initialUserState = {
    name : "Guest",
    avatar : "https://www.w3schools.com/howto/img_avatar.png",
    point : 0,
    introudce : "Hello, I'm a new player",
    level : 1,
    room : "",
    socket : null,
    isStatus : false,
    isReady : false,
    isPlaying : false,
    isWin : false,
    isLose : false,
    error : null,
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name : action.name,
            }
        case 'SET_ROOM':
            return {
                ...state,
                room : action.room,
            }
        case 'SET_SOCKET':
            return {
                ...state,
                socket : action.socket,
            }
        case 'SET_HOST':
            return {
                ...state,
                isHost : action.isStatus,
            }
        case 'SET_READY_TOGGLE':
            return {
                ...state,
                isReady : action.isReady,
                socket : action.socket,
            }
        case 'SET_PLAYING':
            return {
                ...state,
                isPlaying : action.isPlaying,
                room : action.room,
            }
        case 'SET_WIN':
            return {
                ...state,
                isWin : action.isWin,
            }
        case 'SET_LOSE':
            return {
                ...state,
                isLose : action.isLose,
            }
        case 'SET_ERROR':
            return {
                ...state,
                error : action.error,
            }
        default:
            return state;
    }
}

const UserStateContext = createContext();
const UserDispatchContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialUserState);

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    )
}

export const useUserState = () => {
    const context = useContext(UserStateContext);
    if (!context) {
        throw new Error('Cannot find UserProvider');
    }
    return context;
}

export const useUserDispatch = () => {
    const context = useContext(UserDispatchContext);
    if (!context) {
        throw new Error('Cannot find UserProvider');
    }
    return context;
}

export const useUser = () => {
    return [useUserState(), useUserDispatch()];
}