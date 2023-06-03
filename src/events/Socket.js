import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useSocketDispatch } from '../contexts/SocketContext';
import { InitSocketEvent } from './EnterRoomSocket';
// import { useUser } from '../contexts/UserContext';
// export const socket = io(process.env.REACT_APP_SOCKET_URL,
//     {"path": "/api/socket.io", "forceNew": true, "reconnectionAttempts": 3, "timeout": 2000});

const url =  process.env.NODE_ENV === 'development' ? "http://localhost:5000" : "https://capstone.ivis.dev";
export const socket = io("https://capstone.ivis.dev", {
    path: "/api/socket.io/",
    transports: ["websocket", "polling"],
    autoConnect: false,
    forceNew: true,
    reconnectionAttempts: 5,
});

export function ConnectSocket(num) {
    //socket connect() before any event
    socket.connect();
    socket.emit('init', num); // 1 조커, 11 조커난이도1, 12 조커난이도2, 13 조커난이도3, 2 포커
    console.log('emit 함, 방은', num);

    if (!socket) {
        console.log('Socket Error2');
    }
    
};

// export const ReconnectSocket = () => {
//     const user = useUser();
//     if (user.socket) {
//         socket.auth = { token: user.socket };
//         socket.connect();
//     }
// }

export const DisconnectSocket = () => {
    if (socket) socket.disconnect();
}

export function SocketEvents(num) {
    const dispatch = useSocketDispatch();
    const socketRef = useRef(false);

    useEffect(() => {

        // socketRef.current && ConnectSocket(num);
        // socketRef.current = true;

        ConnectSocket(num);
        
        dispatch({
            type: 'CONNECTED',
            socket: true,
            isStatus: 1,
        });

        return () => {
            if (socket.isStatus === 1) {
                DisconnectSocket();
                dispatch({
                    type: 'DISCONNECTED',
                    socket: false,
                    isStatus: -1
                });
            }
        };
    }, []);
}