import React, { useReducer, createContext, useContext } from 'react';

const initialJokerGameState = {
    myHand : ['H02', 'D11', 'joker1', 'H03', 'S13'],
    enemyHand : 10,
    discardPile : [],
    deckSize: 23,
    result : 0,
    myTurn : true,
    expression : "EX - 1",
}

const jokerGameReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return {
                ...state,
                myHand : action.myHand,
                enemyHand : action.enemyHand,
            }
        case 'SET_TURN':
            return {
                ...state,
                myTurn : action.myTurn,
            }
        case 'SET_DECK':
            return {
                ...state,
                myHand : action.myHand,
                enemyHand : action.enemyHand,
            }
        case 'SET_RESULT':
            return {
                ...state,
                turn : action.result,
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const JokerGameStateContext = createContext();
const JokerGameDispatchContext = createContext();

export const JokerGameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(jokerGameReducer, initialJokerGameState);

    return (
        <JokerGameStateContext.Provider value={state}>
            <JokerGameDispatchContext.Provider value={dispatch}>
                {children}
            </JokerGameDispatchContext.Provider>
        </JokerGameStateContext.Provider>
    )
}

export const useJokerGameState = () => {
    const context = useContext(JokerGameStateContext);
    if (!context) {
        throw new Error('Cannot find JokerGameProvider');
    }
    return context;
}

export const useJokerGameDispatch = () => {
    const context = useContext(JokerGameDispatchContext);
    if (!context) {
        throw new Error('Cannot find JokerGameProvider');
    }
    return context;
}

export const useJokerGame = () => {
    return [useJokerGameState(), useJokerGameDispatch()];
}
