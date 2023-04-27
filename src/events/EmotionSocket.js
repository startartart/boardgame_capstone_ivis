import { useEffect } from 'react';
import { socket } from './Socket';

export function SendEmotionEvent(result) {
    socket.emit('emotion', result);
    console.log('emotion 이벤트 보냄 : ' + result)
}

export function GetEmotionEvent() {
    useEffect(() => {
        socket.on('emotion', (data) => {
            console.log('emotion 이벤트 받음 : ' + data);
        });
        return () => {
            socket.off('emotion');
        };
    }, []);
}