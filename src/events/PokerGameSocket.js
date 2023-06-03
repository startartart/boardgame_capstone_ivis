import { socket } from './Socket';
import { useEffect } from 'react';
import { useSocketDispatch } from '../contexts/SocketContext';
import { usePokerGameDispatch } from '../contexts/PokerGameContext';

export const PeekSocketEvent = (data) => {
    socket.emit('poker_peek', data);
    console.log('poker_peek 이벤트 발생', data);
}

export const SelectSocketEvent = (data) => {
    socket.emit('poker_select', data);
    console.log('poker_select 이벤트 발생', data);
}

export const GuessSocketEvent = (data) => {
    socket.emit('poker_guess', data);
    console.log('poker_guess 이벤트 발생', data);
}

export const TimeOutSocketEvent = () => {
    socket.emit('poker_time_out');
    console.log('poker_time_out 이벤트 발생');
}

export const ListenPokerGameSocketEvents = () => {
    const pokerGameDispatch = usePokerGameDispatch();

    useEffect(() => {
        socket.on('poker_role', (data) => {
            pokerGameDispatch({
                type: 'SET_TURN',
                myTurn: data
            });
            console.log('당신의 차례 : ', data);
        });

        socket.on('poker_deck', (data) => {
            pokerGameDispatch({
                type: 'SET_DECK',
                myHand: data.myDeck,
                myShowHand: data.myShowDeck,
                enemyHand: data.enemyDeckSize,
                enemyShowHand: data.enemyShowDeck,
            });
            console.log('당신의 패는 ' + data.myDeck + '보여지는 덱은' + data.myShowDeck + ' 입니다.');
            console.log('상대방의 덱 사이즈는', data.enemyDeckSize + '보여지는 덱은' + data.enemyShowDeck + ' 입니다.');
        });

        socket.on('poker_peek', (data) => {
            pokerGameDispatch({
                type: 'SET_PEEK',
                peek: data,
            });
            console.log('상대의 픽은 ' + data + ' 입니다.');
        });

        socket.on('poker_guess', (data) => {
            pokerGameDispatch({
                type: 'SET_MY_GUESS',
                select: data,
            });
            console.log('당신의 선택은 ' + data + ' 입니다.');
        });

        socket.on('poker_select', (data) => {
            pokerGameDispatch({
                type: 'SET_SELECT',
                select: data,
            });
            console.log('당신의 선택은 ' + data + ' 입니다.');
        });

        socket.on('poker_exception', (data) => {
            pokerGameDispatch({
                type: 'SET_EXCEPTION',
                exceptionMessage: data,
            });
            console.log('예외 발생 : ' + data);
        })

        socket.on('poker_result', (data) => {
            if (data == 3) {
                pokerGameDispatch({
                    type: 'SET_RESULT',
                    result: 2,
                });
            } else {
                pokerGameDispatch({
                    type: 'SET_RESULT',
                    result: data,
                });
            }
            
            console.log('당신의 결과는 ' + data + ' 입니다.');
        });

        return () => {
            socket.off('poker_role');
            socket.off('poker_peek');
            socket.off('poker_select');
            socket.off('poker_deck');
            socket.off('poker_exception');
            socket.off('poker_result');
        }

    }, []);
}