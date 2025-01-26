// node-practice/src/services/messageService

import MessageModel from "../models/messageModel";

class MessageService {
    static async create(content: string): Promise<MessageModel> {
        try {
            const message = await MessageModel.create({ content: content });
            return message;
        } catch (error) {
            throw new Error('Error creating message');
        };
    };

    static async get(id: number): Promise<MessageModel | null> {
        try {
            const message = await MessageModel.findByPk(id);
            if (!message) {
                throw new Error('Message not found');
            }
            return message;
        } catch (error) {
            throw new Error('Error fetching message');
        };
    };

    static async getAll(): Promise<MessageModel[]> {
        try {
            const messages = await MessageModel.findAll();
            return messages;
        } catch (error) {
            throw new Error('Error fetching all messages');
        }
    };

    static async update(id: number, newContent: string): Promise<MessageModel> {
        try {
            const message = await MessageModel.findByPk(id);
            if (!message) {
                throw new Error('Message not found');
            }
            message.content = newContent;
            await message.save();
            return message;
        } catch (error) {
            throw new Error('Error updating message');
        };
    };

    static async delete(id: number): Promise<void> {
        try {
            const message = await MessageModel.findByPk(id);
            if (!message) {
                throw new Error('Message not found');
            }
            await message.destroy();
        } catch (error) {
            throw new Error('Error deleting message');
        };
    };
};

export default MessageService;