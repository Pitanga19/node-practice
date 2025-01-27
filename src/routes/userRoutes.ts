import { Router, Request, Response } from 'express'
import UserService from '../services/userService';

const router = Router();

router.get('/list', async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserService.getAll();
        res.json({ success: true, users: users });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error fetching all users'});
    };
});

router.post('/findOrCreate', async (req: Request, res: Response): Promise<void> => {
    const { username } = req.body;

    try {
        let user = await UserService.getOrCreateByUsername(username);
        res.json({ success: true, user: user });
    } catch (error) {
        console.error(error);
        res.json({ succes: false, error: 'Error finding or creating user'});
    };
});

export default router;