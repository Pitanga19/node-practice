// node-practice/src/controllers/chatController.ts

import { Socket } from 'socket.io';
import MessageService from '../services/messageService';

export const handleChatMessage = (socket: Socket, io: any): void => {
    socket.on('chat message', async (messageContent: string): Promise<void> => {
        try {
            await MessageService.create(messageContent);
            console.log('[handleChatMessage]: ', messageContent);
            io.emit('chat message', messageContent);
        } catch (error) {
            throw new Error('Error saving new message')
        };
    });
};
