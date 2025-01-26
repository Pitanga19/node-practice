// node-practice/src/routes/chatRoutes.ts

import { Router, Request, Response } from 'express';
import MessageService from '../services/messageService';

const router = Router();

router.get('/status', (req: Request, res: Response): void => {
    res.json({status: 'Chat server is running'});
});

router.get('/messages', async (req: Request, res: Response): Promise<void> => {
    try {
        const messages = await MessageService.getAll();
        res.json({ success: true, messages: messages });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error fetching all messages' });
    };
});

export default router;