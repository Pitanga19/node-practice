// node-practice/src/controllers/chatController.ts

import { Socket } from 'socket.io';
import MessageService from '../services/messageService';
import MessageModel from '../models/messageModel';
import UserModel from '../models/userModel';

export const handleChatMessage = (socket: Socket, io: any): void => {
    socket.on('chat message', async (messageData: {messageContent: string, userId: number}): Promise<void> => {
        const { messageContent, userId } = messageData;
        console.log(`Data received - messageContent: ${messageContent} - userId: ${userId}`)

        try {
            const message = await MessageService.create(messageContent, userId);
            const messageWithUser = await MessageModel.findOne({
                where: { id: message.id },
                include: [{
                    model: UserModel,
                    as: 'user',
                    attributes: ['username'],
                }]
            })
            
            if (messageWithUser) {
                console.log('[handleChatMessage]: ', messageWithUser);
                io.emit('chat message', {
                    content: message.content,
                    user: messageWithUser.user ? messageWithUser.user : { username: 'Unkwnown' }
                });
            }

        } catch (error) {
            throw new Error('Error saving new message')
        };
    });
};
