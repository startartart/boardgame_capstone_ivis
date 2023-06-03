import { useEffect } from 'react';
import { useSocketDispatch } from '../contexts/SocketContext';
import { useUserDispatch } from '../contexts/UserContext';
import { socket } from './Socket';

export const InitSocketEvent = () => {
    socket.emit('init', 0);
    console.log('init 이벤트 발생');
}

export const ReadySocketEvent = () => {
    socket.emit('ready', 'ok');
    console.log('ready 이벤트 발생');
}

export function EnterRommSocketEvents() {
    const userDispatch = useUserDispatch();
    const socketDispatch = useSocketDispatch();

    useEffect(() => {
        console.log(socket, "준비과정 시작.")

        socket.on('set_id', (data) => {
            userDispatch({
                type: 'SET_STATUS',
                status: 1,
            });
            console.log('소켓 아이디가 설정되었습니다. : ' + data);
        });
        
        socket.on('set_room', (data) => {
            socketDispatch({
                type: 'CONNECTED',
                socket: true,
                isStatus: 2
            });
            // userDispatch({
            //     type: 'SET_ROOM',
            //     room: data,
            // });
            console.log('매칭이 잡혔습니다. 카메라 인식을 확인하고 룸번호를 확인해주세요. : ' + data);
        });

        socket.on('ready', (data) => {
            console.log('곧 게임이 시작됩니다. 서버에서 패 나누는 중 ...');

            if (data === "ok") {
                userDispatch({
                    type: 'SET_STATUS',
                    status: 3
                });
            } else if (data === 'timeout') {
                userDispatch({
                    type: 'SET_STATUS',
                    status: -1
                });
            }
        });

        socket.on('result', (data) => {
            console.log('상대가 나갔습니다. 게임을 종료합니다.');

            userDispatch({
                type: 'SET_STATUS',
                status: -1
            });

            socketDispatch({
                type: 'DISCONNECTED',
                socket: false,
                isStatus: -1
            });
        });

        console.log('on 함')

        return () => {
            socket.off('set_id');
            socket.off('set_room');
            socket.off('ready');
            socket.off('result');
            // socket.off('init');
            console.log(socket, "준비과정 끝.")
        }

    }, []);
}

    