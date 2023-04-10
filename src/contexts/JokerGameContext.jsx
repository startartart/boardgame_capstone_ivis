import React, { useReducer, createContext, useContext } from 'react';

const initialJokerGameState = {
    myHand : [],
    enemyHand : [],
    discardPile : [],
    deckSize: 23,
    turn : 0,
    myTurn : false,
}

const jokerGameReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return {
                ...state,
                myHand : action.myHand,
                enemyHand : action.enemyHand,
            }
        case 'TURN_ACTION':
            return {
                ...state,
                myHand : action.myHand,
                enemyHand : action.enemyHand,
            }

        case 'SET_MY_HAND':
            return {
                ...state,
                myHand : action.myHand,
            }
        case 'SET_ENEMY_HAND':
            return {
                ...state,
                enemyHand : action.enemyHand,
            }
        case 'SET_DISCARD_PILE':
            return {
                ...state,
                discardPile : action.discardPile,
            }
        case 'SET_MY_TURN':
            return {
                ...state,
                myTurn : action.myTurn,
            }
        case 'SET_TURN':
            return {
                ...state,
                turn : action.turn,
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
