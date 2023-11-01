import React, { useReducer, createContext, useContext } from 'react';

const initialPokerGameState = {
    myHand : [],
    myShowHand : [],
    enemyHand : 0,
    enemyShowHand : [],
    result : 0, // 1 : 승리, 2 : 패배, 4 : 무승부
    myTurn : 2,

    peek: -1, // 상대방이 선택한 카드
    select: -1, // 내가 선택한 카드
    guess: 0, // 내가 예상한 횟수 
    answer: "O", // 나의 질문 및 답변
    enemyAnswer: "O", // 상대방의 질문 및 답변

    select_card: 0, // 1 : guess, 2 : answer, 3 : waitting, 4 : decide

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
        case 'SET_GUESS':
            return {
                ...state,
                guess : action.guess,
                select_card : action.select_card
            }
        case 'SET_ANSWER':
            return {
                ...state,
                answer : action.answer
            }
        case 'SET_ENEMY_ANSWER':
            return {
                ...state,
                enemyAnswer : action.enemyAnswer,
                select_card : action.select_card
            }
        case 'SET_SELECT_CARD':
            return {
                ...state,
                select_card : action.select_card
            }
        case 'SET_DECK':
            return {
                ...state,
                myHand : action.myHand,
                myShowHand : action.myShowHand,
                enemyHand : action.enemyHand,
                enemyShowHand : action.enemyShowHand,
                peek : -1,
                guess : 0,
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