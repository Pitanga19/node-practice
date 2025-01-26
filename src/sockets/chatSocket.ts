// node-practice/src/sockets/chatSocket.ts

import { Server, Socket } from 'socket.io';
import { handleChatMessage } from '../controllers/chatController';

export const chatSocket = (io: Server): void => {
    io.on('connection', (socket: Socket): void => {
        console.log('[chatSocket.on connection]: User connected');

        handleChatMessage(socket, io);

        socket.on('disconnect', (): void => {
            console.log('[chatSocket.on disconnect]: User disconnected');
        });
    });
};
