import React, { useReducer, createContext, useContext } from 'react';

const initialJokerGameState = {
    myHand : [],
    enemyHand : 0,
    result : 0, // 1 : 승리, 2 : 패배
    myTurn : 2,
    peek: -1,
    select: -1,
    cheat: -1,
    expression : "./images/emoji/emoji1.png",
    enemyExpression : "./images/emoji/emoji1.png",
    exceptionMessage : "실력",
}

const jokerGameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TURN':
            return {
                ...state,
                myTurn : action.myTurn,
            }
        case 'SET_PEEK':
            return {
                ...state,
                peek : action.peek,
            }
        case 'SET_SELECT':
            return {
                ...state,
                select : action.select,
            }
        case 'SET_CHEAT':
            return {
                ...state,
                cheat : action.cheat,
            }
        case 'SET_DECK':
            return {
                ...state,
                myHand : action.myHand,
                enemyHand : action.enemyHand,
                peek : -1,
            }
        case 'SET_RESULT':
            return {
                ...state,
                result : action.result,
            }
        case 'SET_MY_EXPRESSION':
            return {
                ...state,
                expression : action.expression,
            }
        case 'SET_ENEMY_EXPRESSION':
            return {
                ...state,
                enemyExpression : action.enemyExpression,
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
