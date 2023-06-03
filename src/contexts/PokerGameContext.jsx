import React, { useReducer, createContext, useContext } from 'react';

const initialPokerGameState = {
    myHand : ["D4", "D3","K4", "D4", "D3","K4", "D4", "D3"],
    myShowHand : ["D4", "D3","K4", "D4"],
    enemyHand : 8,
    enemyShowHand : ["D4", "D3","K4", "D4"],
    result : 0, // 1 : 승리, 2 : 패배
    myTurn : 2,
    peek: -1,
    select: -1,
    guess: "./images/poker_cards/O.png",
    enemyGuess: "./images/poker_cards/D.png",
    cheat: -1,
    expression : "./images/emoji/emoji0.png",
    enemyExpression : "./images/emoji/emoji1.png",
    exceptionMessage : "실력",
}

const pokerGameReducer = (state, action) => {
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
        case 'SET_MY_GUESS':
            return {
                ...state,
                guess : action.guess,
            }
        case 'SET_DECK':
            return {
                ...state,
                myHand : action.myHand,
                myShowHand : action.myShowHand,
                enemyHand : action.enemyHand,
                enemyShowHand : action.enemyShowHand,
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

const PokerGameStateContext = createContext();
const PokerGameDispatchContext = createContext();

export const PokerGameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pokerGameReducer, initialPokerGameState);

    return (
        <PokerGameStateContext.Provider value={state}>
            <PokerGameDispatchContext.Provider value={dispatch}>
                {children}
            </PokerGameDispatchContext.Provider>
        </PokerGameStateContext.Provider>
    )
}

export const usePokerGameState = () => {
    const context = useContext(PokerGameStateContext);
    if (!context) {
        throw new Error('Cannot find PokerGameProvider');
    }
    return context;
}

export const usePokerGameDispatch = () => {
    const context = useContext(PokerGameDispatchContext);
    if (!context) {
        throw new Error('Cannot find PokerGameProvider');
    }
    return context;
}

export const usePokerGame = () => {
    return [usePokerGameState(), usePokerGameDispatch()];
}