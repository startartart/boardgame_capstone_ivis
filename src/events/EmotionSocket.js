import { useEffect } from 'react';
import { socket } from './Socket';
import { useJokerGameDispatch } from '../contexts/JokerGameContext';
import { usePokerGameDispatch } from '../contexts/PokerGameContext';
import { useUserState } from '../contexts/UserContext';

export function SendEmotionEvent(result) {
    socket.emit('emotion', result);
    console.log('emotion 이벤트 보냄 : ' + result)
}

export function GetEmotionEvent() {
    const jokerGameDispatch = useJokerGameDispatch();
    const pokerGameDispatch = usePokerGameDispatch();
    const { room } = useUserState();

    useEffect(() => {
        socket.on('emotion', (data) => {
            console.log('emotion 이벤트 받음 : ' + data);

            if (room >= 4) {
                pokerGameDispatch({
                    type: 'SET_ENEMY_EXPRESSION',
                    enemyExpression : data,
                });
            } else {
                jokerGameDispatch({
                    type: 'SET_ENEMY_EXPRESSION',
                    enemyExpression : data,
                });
            }
            
        });
        return () => {
            socket.off('emotion');
        };
    }, []);
}