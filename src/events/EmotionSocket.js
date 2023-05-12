import { useEffect } from 'react';
import { socket } from './Socket';
import { useJokerGameDispatch } from '../contexts/JokerGameContext';

export function SendEmotionEvent(result) {
    socket.emit('emotion', result);
    console.log('emotion 이벤트 보냄 : ' + result)
}

export function GetEmotionEvent() {
    const jokerGameDispatch = useJokerGameDispatch();

    useEffect(() => {
        socket.on('emotion', (data) => {
            console.log('emotion 이벤트 받음 : ' + data);

            jokerGameDispatch({
                type: 'SET_ENEMY_EXPRESSION',
                enemyExpression : data,
            });
        });
        return () => {
            socket.off('emotion');
        };
    }, []);
}