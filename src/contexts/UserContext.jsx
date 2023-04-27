import React, { useReducer, createContext, useContext } from 'react';
import {v4 as uuidv4} from 'uuid';

const initialUserState = {
    name : "Guest_" + Math.floor(Math.random() * 100000),
    avatar : "https://www.w3schools.com/howto/img_avatar.png",
    point : 0,
    introudce : "Hello, I'm a new player",
    level : 1,

    uuid : uuidv4(),
    room : "매칭 완료 시 자동 생성",
    status : 0,
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
        case 'SET_STATUS':
            return {
                ...state,
                status : action.status,
            }
        case 'LEAVE_ROOM':
            return {
                ...state,
                status : 0
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