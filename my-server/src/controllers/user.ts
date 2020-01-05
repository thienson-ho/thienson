import express from 'express';
import { User } from '../models/User';
export const router = express.Router();

router.get('/users', async(req, res) => {
    try {
        const users = await User.find({}).exec();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

