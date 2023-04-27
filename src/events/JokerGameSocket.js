import { socket } from './Socket';
import { useEffect } from 'react';
import { useSocketDispatch } from '../contexts/SocketContext';
import { useJokerGameDispatch } from '../contexts/JokerGameContext';

export const PeekSocketEvent = (data) => {
    socket.emit('peek', data);
    console.log('peek 이벤트 발생', data);
}

export const SelectSocketEvent = (data) => {
    socket.emit('select', data);
    console.log('select 이벤트 발생', data);
}

export const TimeOutSocketEvent = () => {
    socket.emit('time_out');
    console.log('time_out 이벤트 발생');
}

export const ListenJokerGameSocketEvents = () => {
    const userDispatch = useSocketDispatch();
    const jokerGameDispatch = useJokerGameDispatch();

    useEffect(() => {
        socket.on('role', (data) => {
            jokerGameDispatch({
                type: 'SET_TURN',
                myTurn: data
            });
            console.log('당신의 차례 : ', data);
        });

        socket.on('deck', (data) => {
            jokerGameDispatch({
                type: 'SET_DECK',
                myHand: data.myDeck,
                enemyHand: data.enemyDeckSize,
            });
            console.log('당신의 패는 ' + data.myDeck);
            console.log('상대방의 덱 사이즈는', data.enemyDeckSize);
        });

        socket.on('result', (data) => {
            jokerGameDispatch({
                type: 'SET_RESULT',
                result: data,
            });
            console.log('당신의 결과는 ' + data + ' 입니다.');
        });

        return () => {
            socket.off('role');
            socket.off('deck');
            socket.off('result');
        }

    }, []);
}